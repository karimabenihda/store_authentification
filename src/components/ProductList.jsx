import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, addProduct, updateProduct, deleteProduct } from '../reducers/productSlice';
import { addToCart } from '../reducers/cartSlice';
import { authenticateUser, logoutUser } from '../reducers/authSlice';
import '../App.css';

function ProductList() {
    const dispatch = useDispatch();
    const { items: products } = useSelector((state) => state.products);
    const { isAuthenticated, user, error } = useSelector((state) => state.auth);
    const [formVisible, setFormVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        category: '',
        images: [''],
    });

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(fetchProducts());
        }
    }, [dispatch, isAuthenticated]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (selectedProduct) {
            dispatch(updateProduct({ id: selectedProduct.id, ...formData }));
        } else {
            dispatch(addProduct(formData));
        }
        resetForm();
    };

    const resetForm = () => {
        setFormData({ title: '', description: '', price: '', category: '', images: [''] });
        setFormVisible(false);
        setSelectedProduct(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleLogin = (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;
        dispatch(authenticateUser({ username, password }));
    };

    // Authentication form
    const renderAuthForm = () => (
        <div className="auth-form">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input type="text" name="username" placeholder="Username" required />
                <input type="password" name="password" placeholder="Password" required />
                <button type="submit">Login</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    );

    // Product list after authentication
    const renderProductList = () => (
        <div>
            <h2>Products</h2>
            <button onClick={() => setFormVisible(true)}>Add New Product</button>
            <div className="card-container">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div className="card" key={product.id} style={{ width: '200px' }}>
                            <img className="card-img-top" src={product.images[0]} alt={product.title} />
                            <div className="card-body">
                                <h3 className="card-title">{product.title}</h3>
                                <p className="card-text">{product.description}</p>
                                <p className="card-text">${product.price}</p>
                                <button onClick={() => dispatch(addToCart(product))} className="btn btn-primary">Add to Cart</button>
                                {user?.role === 'admin' && (
                                    <>
                                        <button className="btn btn-secondary" onClick={() => {
                                            setSelectedProduct(product);
                                            setFormVisible(true);
                                            setFormData(product);
                                        }}>Update</button>
                                        <button className="btn btn-danger" onClick={() => dispatch(deleteProduct(product.id))}>Delete</button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No Products Found</p>
                )}
            </div>

            {formVisible && (
                <form onSubmit={handleFormSubmit}>
                    <h3>{selectedProduct ? 'Update Product' : 'Add Product'}</h3>
                    <input type="text" name="title" placeholder="Product Title" value={formData.title} onChange={handleChange} required />
                    <input type="text" name="description" placeholder="Product Description" value={formData.description} onChange={handleChange} required />
                    <input type="number" name="price" placeholder="Product Price" value={formData.price} onChange={handleChange} required />
                    <input type="text" name="category" placeholder="Product Category" value={formData.category} onChange={handleChange} required />
                    <input type="text" name="images" placeholder="Product Image URL" value={formData.images[0]} onChange={handleChange} required />
                    <button type="submit">{selectedProduct ? 'Update Product' : 'Add Product'}</button>
                    <button type="button" onClick={resetForm}>Cancel</button>
                </form>
            )}
        </div>
    );

    return <div>{!isAuthenticated ? renderAuthForm() : renderProductList()}</div>;
}

export default ProductList;
