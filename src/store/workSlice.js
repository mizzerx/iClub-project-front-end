import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import workApi from '../api/workApi';

const initialState = {
  works: [],
  work: {},
  loading: false,
  error: null,
  createSuccess: false,
};

export const getWorks = createAsyncThunk(
  'works/getWorks',
  async (data, thunkApi) => {
    try {
      const response = await workApi.getWorks(data);
      return response.data;
    } catch (error) {
      if (error.response) {
        return thunkApi.rejectWithValue(error.response.data);
      }

      throw error;
    }
  },
);

export const createWork = createAsyncThunk(
  'works/createWork',
  async ({ work, clubId }, thunkApi) => {
    try {
      const response = await workApi.createWork(work, clubId);
      return response.data;
    } catch (error) {
      if (error.response) {
        return thunkApi.rejectWithValue(error.response.data);
      }

      throw error;
    }
  },
);

export const getWork = createAsyncThunk(
  'works/getWork',
  async ({ workId }, thunkApi) => {
    try {
      const response = await workApi.getWork(workId);
      return response.data;
    } catch (error) {
      if (error.response) {
        return thunkApi.rejectWithValue(error.response.data);
      }

      throw error;
    }
  },
);

const workSlice = createSlice({
  name: 'work',
  initialState,
  reducers: {
    resetWorkError: (state) => {
      state.error = null;
      state.createSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getWorks.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getWorks.fulfilled, (state, action) => {
      state.works = action.payload.data;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getWorks.rejected, (state, action) => {
      state.error = action.payload.message;
      state.loading = false;
    });
    builder.addCase(createWork.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createWork.fulfilled, (state, action) => {
      state.createSuccess = true;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(createWork.rejected, (state, action) => {
      state.error = action.payload.message;
      state.loading = false;
    });
    builder.addCase(getWork.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getWork.fulfilled, (state, action) => {
      state.work = action.payload.data;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getWork.rejected, (state, action) => {
      state.error = action.payload.message;
      state.loading = false;
    });
  },
});

export const { resetWorkError } = workSlice.actions;
export default workSlice.reducer;
