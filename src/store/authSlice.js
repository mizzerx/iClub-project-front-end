import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authApi from '../api/authApi';

const initialState = {
  user: {},
  token: null,
  error: null,
  loading: false,
  registerSuccess: false,
};

export const login = createAsyncThunk('auth/login', async (data, thunkAPI) => {
  try {
    const response = await authApi.login(data.email, data.password);
    return response.data;
  } catch (error) {
    if (error.response) {
      return thunkAPI.rejectWithValue(error.response.data);
    }

    return thunkAPI.rejectWithValue(error);
  }
});

export const register = createAsyncThunk(
  'auth/register',
  async (data, thunkAPI) => {
    try {
      const response = await authApi.register(
        data.name,
        data.email,
        data.password,
        data.passwordConfirmation,
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data);
      }

      return thunkAPI.rejectWithValue(error);
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.user = {};
      state.token = null;
    },
  },
  extraReducers: {
    [login.pending]: (state, action) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.token = action.payload.data.token;
      state.loading = false;

      if (state.token) {
        global.token = state.token;
      }
    },
    [login.rejected]: (state, action) => {
      state.error = action.payload.message;
      state.loading = false;
    },
    [register.pending]: (state, action) => {
      state.loading = true;
    },
    [register.fulfilled]: (state, action) => {
      state.token = action.payload.data.token;
      state.loading = false;
      state.registerSuccess = true;
      state.error = null;

      if (state.token) {
        global.token = state.token;
      }
    },
    [register.rejected]: (state, action) => {
      state.error = action.payload.message;
      state.loading = false;
    },
  },
});

export const { resetError, logout } = authSlice.actions;
export default authSlice.reducer;
