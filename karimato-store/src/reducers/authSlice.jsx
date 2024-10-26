import { createSlice } from '@reduxjs/toolkit';
import usersData from '../users/users.json';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    role: null,
    users: usersData.users,
    loading: false,
    error: null,
  },
  reducers: {
    authenticateUser: (state, action) => {
      const { username, password } = action.payload;
      const foundUser = state.users.find(
        (user) => user.username === username && user.password === password
      );

      if (foundUser) {
        state.user = foundUser;
        state.role = foundUser.role;
        state.error = null;
        localStorage.setItem('username', foundUser.username);
      } else {
        state.error = 'Invalid username or password';
      }
    },
    logout: (state) => {
      console.log('Logging out...'); 
      state.user = null;
      state.role = null;
      localStorage.removeItem('username'); 
    }
  }
});

export const { authenticateUser, logout } = authSlice.actions;
export default authSlice.reducer;
