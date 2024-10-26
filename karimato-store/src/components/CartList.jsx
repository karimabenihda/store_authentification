import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, incrementQuantity, decrementQuantity, checkout } from '../reducers/cartSlice';
import { useNavigate } from 'react-router-dom';

function CartList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartItems = useSelector((state) => state.cart.items);

    const handleRemove = (itemId) => {
        dispatch(removeFromCart(itemId)); 
    };

    const handleIncrement = (itemId) => {
        dispatch(incrementQuantity(itemId));
    };

    const handleDecrement = (itemId) => {
        dispatch(decrementQuantity(itemId));
    };

    const handleCheckout = () => {
        const username = localStorage.getItem('username');
        dispatch(checkout({ username })); 
        navigate('/home');
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    return (
        <div className="container">
            <h2 className="text-center mt-5">Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <p className="text-center">Your cart is empty.</p>
            ) : (
                <ul className="list-group">
                    {cartItems.map((item) => (
                        <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <span>
                                    <img src={item.images[0]} alt={item.title} style={{ width: '50px' }} />
                                    <h3>{item.title}</h3>
                                </span>
                                <p>Price: ${item.price.toFixed(2)}</p>
                                <p>Quantity: {item.quantity}</p>
                            </div>
                            <div>
                                <button
                                    className="btn btn-secondary mx-1"
                                    onClick={() => handleDecrement(item.id)}>−</button>
                                <button
                                    className="btn btn-secondary mx-1"
                                    onClick={() => handleIncrement(item.id)}>+</button>
                                <button
                                    className="btn btn-danger mx-1"
                                    onClick={() => handleRemove(item.id)}>Remove</button>
                            </div>
                            <b>
                                <div>Total Price: ${(item.price * item.quantity).toFixed(2)} $</div>
                            </b>
                        </li>
                    ))}
                </ul>
            )}
            {cartItems.length > 0 && (
                <div className="text-center mt-3">
                    <h4>Total Amount: ${calculateTotal()} $</h4>
                    <button className="btn btn-success" onClick={handleCheckout}>Checkout</button>
                </div>
            )}
        </div>
    );
}

export default CartList;
