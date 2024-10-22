import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, addProduct, updateProduct, deleteProduct} from '../reducers/productSlice';
import '../App.css';
import {addToCart }from '../reducers/cartSlice';
function ProductList() {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.items);
    const user = useSelector((state) => state.user); // Assuming the user state contains authentication info
    const [authenticated, setAuthenticated] = useState(false); // Track whether the user is authenticated
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
        if (authenticated) {
            dispatch(fetchProducts()); // Fetch products only if authenticated
        }
    }, [dispatch, authenticated]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (selectedProduct) {
            dispatch(updateProduct({ id: selectedProduct.id, ...formData }));
        } else {
            dispatch(addProduct(formData));
        }
        setFormData({ title: '', description: '', price: '', category: '', images: [''] });
        setFormVisible(false);
        setSelectedProduct(null);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        // Simple example for authentication, replace this with actual authentication logic
        if (e.target.username.value === "admin" && e.target.password.value === "password") {
            setAuthenticated(true); // If correct credentials, authenticate user
        } else {
            alert("Invalid credentials");
        }
    };

    // Authentication form
    const renderAuthForm = () => (
        <div className="auth-form">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input type="text" name="username" placeholder="Username" required />
                <input type="password" name="password" placeholder="Password" required />
                <button type="submit">Login</button>
            </form>
        </div>
    );

    // Product list after authentication
    const renderProductList = () => (
        <div>
            <h2>Products</h2>
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
                                {user.role === 'admin' && (
                                    <>
                                        <button className="btn btn-secondary" onClick={() => handleProductUpdate(product)}>Update</button>
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
                    <input type="text" name="title" placeholder="Product Title" value={formData.title} onChange={(e) => handleChange(e)} required />
                    <input type="text" name="description" placeholder="Product Description" value={formData.description} onChange={(e) => handleChange(e)} required />
                    <input type="number" name="price" placeholder="Product Price" value={formData.price} onChange={(e) => handleChange(e)} required />
                    <input type="text" name="category" placeholder="Product Category" value={formData.category} onChange={(e) => handleChange(e)} required />
                    <input type="text" name="images" placeholder="Product Image URL" value={formData.images[0]} onChange={(e) => handleChange(e)} required />
                    <button type="submit">{selectedProduct ? 'Update Product' : 'Add Product'}</button>
                    <button type="button" onClick={() => setFormVisible(false)}>Cancel</button>
                </form>
            )}
        </div>
    );

    // Main render
    return (
        <div>
            {!authenticated ? renderAuthForm() : renderProductList()}
        </div>
    );
}

export default ProductList;
