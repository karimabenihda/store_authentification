import React from 'react'
import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUsers = createAsyncThunk(
    'auth/fetchUsers',
    async (_, thunkAPI) => {
      try {
        const response = await axios.get('http://localhost:8000/users');
        return response.data; 
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );

const authSlice=createSlice ({
    name: 'auth',
    initialState: {
    user: null,
    role: null,
    users: [],
    loading: false,
    error: null,
},
reducers: {
    login: (state, action) => {
      const { username, password } = action.payload;
      const foundUser = state.users.find(
        (user) => user.username === username && user.password === password
      );

      if (foundUser) {
        state.user = foundUser;
        state.role = foundUser.role; 
      } else {
        state.error = 'Invalid username or password';
      }
    },
    logout: (state) => {
      state.user = null;
      state.role = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch users';
      });
  }
});





export const { login, logout } = authSlice.actions;
export default authSlice.reducer;