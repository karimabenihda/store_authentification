import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, incrementQuantity, decrementQuantity } from '../reducers/cartSlice';

function CartList() {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);

    const handleRemove = (itemId) => {
        dispatch(removeFromCart(itemId)); 
    };

    const handleIncrement = (itemId) => {
        dispatch(incrementQuantity(itemId)); // Increment the item's quantity
    };

    const handleDecrement = (itemId) => {
        dispatch(decrementQuantity(itemId)); // Decrement the item's quantity
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
                                <p>Quantity: {item.quantity}</p> {/* Display item quantity */}
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
                            
                           <b> <div >Total Price: {(item.price*item.quantity).toFixed(2)} $</div></b>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default CartList
