import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
    },
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += 1; 
            } else {
                state.items.push({ ...action.payload, quantity: 1 }); 
            }
        },
        removeFromCart: (state, action) => {
            const existingItem = state.items.find(item => item.id === action.payload);
            if (existingItem) {
                if (existingItem.quantity > 1) {
                    existingItem.quantity -= 1;
                } else {
                    state.items = state.items.filter(item => item.id !== action.payload); 
                }
            }
        },
        incrementQuantity: (state, action) => {
            const existingItem = state.items.find(item => item.id === action.payload);
            if (existingItem) {
                existingItem.quantity += 1;
            }
        },
        decrementQuantity: (state, action) => {
            const existingItem = state.items.find(item => item.id === action.payload);
            if (existingItem) {
                if (existingItem.quantity > 1) {
                    existingItem.quantity -= 1; 
                } else {
                    state.items = state.items.filter(item => item.id !== action.payload); 
                }
            }
        },
        checkout: (state) => {
            const username = localStorage.getItem('username');

            const orderDetails = {
                username,
                cartItems: state.items,
                totalAmount: state.items.reduce((total, item) => total + item.price * item.quantity, 0),
                timestamp: new Date().toISOString(),
            };

            console.log("Checking out with the following data:", orderDetails);

            fetch('http://localhost:3001/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderDetails),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data.message);
                state.items = [];  // Clear cart after successful checkout
            })
            .catch(error => {
                console.error('Error during checkout:', error);
            });
        },
    },
});

// Export the actions and reducer
export const { 
    addToCart, 
    removeFromCart, 
    incrementQuantity, 
    decrementQuantity,
    checkout 
} = cartSlice.actions;
export default cartSlice.reducer;
