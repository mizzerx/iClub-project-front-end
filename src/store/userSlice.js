import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from '../api/userApi';

const initialState = {
  user: {},
  users: [],
  loading: false,
  error: null,
  updateSuccess: false,
};

export const getUserProfile = createAsyncThunk(
  'user/getUserProfile',
  async (data, thunkApi) => {
    try {
      const response = await userApi.getUser();
      return response.data;
    } catch (error) {
      if (error.response) {
        return thunkApi.rejectWithValue(error.response.data);
      }

      return thunkApi.rejectWithValue(error);
    }
  },
);

export const getUsers = createAsyncThunk(
  'user/getUsers',
  async (data, thunkApi) => {
    try {
      const response = await userApi.getUsers();
      return response.data;
    } catch (error) {
      if (error.response) {
        return thunkApi.rejectWithValue(error.response.data);
      }

      return thunkApi.rejectWithValue(error);
    }
  },
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (data, thunkApi) => {
    try {
      const response = await userApi.updateUser(data);
      return response.data;
    } catch (error) {
      if (error.response) {
        return thunkApi.rejectWithValue(error.response.data);
      }

      return thunkApi.rejectWithValue(error);
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
      state.updateSuccess = false;
    },
  },
  extraReducers: {
    [getUserProfile.pending]: (state, action) => {
      state.loading = true;
    },
    [getUserProfile.fulfilled]: (state, action) => {
      state.user = action.payload.data;
      state.loading = false;

      global.id = state.user._id;
    },
    [getUserProfile.rejected]: (state, action) => {
      state.error = action.payload.message;
      state.loading = false;
    },
    [getUsers.pending]: (state, action) => {
      state.loading = true;
    },
    [getUsers.fulfilled]: (state, action) => {
      state.users = action.payload.data;
      state.loading = false;
    },
    [getUsers.rejected]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    [updateUser.pending]: (state, action) => {
      state.loading = true;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.user = action.payload.data;
      state.loading = false;
      state.updateSuccess = true;
    },
    [updateUser.rejected]: (state, action) => {
      state.error = action.payload.message;
      state.loading = false;
    },
  },
});

export const { resetError } = userSlice.actions;
export default userSlice.reducer;
