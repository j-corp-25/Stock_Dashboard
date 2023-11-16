import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import csrfFetch from './csrf';

const initialState = {
  user: JSON.parse(sessionStorage.getItem('currentUser')),
};

// Async thunk for login
export const login = createAsyncThunk('session/login', async ({ credential, password }) => {
  const response = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({ credential, password }),
  });
  const data = await response.json();
  return data.user;
});

// Async thunk for logout
export const logout = createAsyncThunk('session/logout', async () => {
  await csrfFetch('/api/session', { method: 'DELETE' });
  return null;
});

// Async thunk for signup
export const signup = createAsyncThunk('session/signup', async (user) => {
  const { username, email, password } = user;
  const response = await csrfFetch('/api/users', {
    method: 'POST',
    body: JSON.stringify({ username, email, password}),
  });
  const data = await response.json();
  return data.user;
});

// Async thunk for restoring session
export const restoreSession = createAsyncThunk('session/restore', async () => {
  const response = await csrfFetch('/api/session');
  const data = await response.json();
  return data.user;
});

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        sessionStorage.setItem('currentUser', JSON.stringify(action.payload));
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        sessionStorage.removeItem('currentUser');
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload;
        sessionStorage.setItem('currentUser', JSON.stringify(action.payload));
      })
      .addCase(restoreSession.fulfilled, (state, action) => {
        state.user = action.payload;
        sessionStorage.setItem('currentUser', JSON.stringify(action.payload));
      });
  },
});

export default sessionSlice.reducer;
