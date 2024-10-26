import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import ProductList from './components/ProductList';
import CartList from './components/CartList';
import Auth from './components/Auth';
import productSlice from './reducers/productSlice';
import cartSlice from './reducers/cartSlice';
import authSlice from './reducers/authSlice';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
const store = configureStore({
  reducer: { // Change "reducers" to "reducer"
    products: productSlice,
    cart: cartSlice,
    auth: authSlice,
  },
});

function App() {
  return (
    <Provider store={store}>
      <Router>
    <div className='bg bg-light'>
     <Navbar/>
        <Routes>
          <Route path='/home' element={<ProductList />} />
          <Route path='/cart' element={<CartList />} />
          <Route path='/auth' element={<Auth />} />
        </Routes>
      </div>
      </Router>
    </Provider>
  );
}

export default App;
