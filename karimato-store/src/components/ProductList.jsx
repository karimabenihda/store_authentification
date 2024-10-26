import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, addProduct, updateProduct, deleteProduct } from '../reducers/productSlice';
import { addToCart } from '../reducers/cartSlice';
import '../App.css';

function ProductList() {
    const dispatch = useDispatch();
    const { items: products } = useSelector((state) => state.products);
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
        dispatch(fetchProducts()); 
    }, [dispatch]);

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

    return (
        <div>
            <h2>Products</h2>
            <div className="card-container">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div className="card" key={product.id} style={{ width: '200px' }}>
                            <img
                                className="card-img-top"
                                src={product.images[0]}
                                alt={product.title}
                                style={{ maxWidth: '100%', height: 'auto', maxHeight: '150px', objectFit: 'cover' }}
                            />
                            <div className="card-body">
                                <h3 className="card-title">{product.title}</h3>
                                <p className="card-text">{product.description}</p>
                                <p className="card-text">${product.price}</p>
                                <button onClick={() => dispatch(addToCart(product))} className="btn btn-primary">Add to Cart</button>
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
}

export default ProductList;
