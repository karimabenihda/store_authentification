import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, updateProduct } from '../reducers/productSlice';

function AddUpdateProductForm({ existingProduct }) {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const productData = {
            id: existingProduct ? existingProduct.id : Date.now(), // Use a unique ID for new products
            title,
            price: parseFloat(price),
            category,
            images: [image],
        };

        if (existingProduct) {
            dispatch(updateProduct(productData)); // Update existing product
        } else {
            dispatch(addProduct(productData)); // Add new product
        }

        // Clear form after submission
        setTitle('');
        setPrice('');
        setCategory('');
        setImage('');
    };

    useEffect(() => {
        if (existingProduct) {
            setTitle(existingProduct.title);
            setPrice(existingProduct.price);
            setCategory(existingProduct.category);
            setImage(existingProduct.images[0]);
        }
    }, [existingProduct]);

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Price:</label>
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Category:</label>
                <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Image URL:</label>
                <input
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    required
                />
            </div>
            <button type="submit">
                {existingProduct ? 'Update Product' : 'Add Product'}
            </button>
        </form>
    );
}

export default AddUpdateProductForm;
