import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import usersData from '../users/users.json'; 


export const fetchUsers = createAsyncThunk('auth/fetchUsers', async () => {
  return usersData; 
});

const authSlice = createSlice({
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
        state.error = null; 
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
        state.error = action.error.message || 'Failed to fetch users';
      });
  }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
