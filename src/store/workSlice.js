import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import workApi from '../api/workApi';

const initialState = {
  works: [],
  work: {},
  workAnswer: {},
  loading: false,
  error: null,
  createSuccess: false,
  createAnswerSuccess: false,
  updateAnswerSuccess: false,
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

export const getWorkAnswer = createAsyncThunk(
  'works/getWorkAnswer',
  async ({ workId }, thunkApi) => {
    try {
      const response = await workApi.getWorkAnswer(workId);
      return response.data;
    } catch (error) {
      if (error.response) {
        return thunkApi.rejectWithValue(error.response.data);
      }

      throw error;
    }
  },
);

export const createWorkAnswer = createAsyncThunk(
  'works/createWorkAnswer',
  async ({ workId, answer }, thunkApi) => {
    try {
      const response = await workApi.createWorkAnswer(workId, answer);
      return response.data;
    } catch (error) {
      if (error.response) {
        return thunkApi.rejectWithValue(error.response.data);
      }

      throw error;
    }
  },
);

export const updateWorkAnswer = createAsyncThunk(
  'works/updateWorkAnswer',
  async ({ workId, answerId, answer }, thunkApi) => {
    try {
      const response = await workApi.updateWorkAnswer(workId, answerId, answer);
      return response.data;
    } catch (error) {
      if (error.response) {
        return thunkApi.rejectWithValue(error.response.data);
      }

      throw error;
    }
  },
);

export const getWorkAnswerByUser = createAsyncThunk(
  'works/getWorkAnswerByUser',
  async ({ workId, userId }, thunkApi) => {
    try {
      const response = await workApi.getWorkAnswerByUser(workId, userId);
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
      state.createAnswerSuccess = false;
      state.updateAnswerSuccess = false;
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
    builder.addCase(getWorkAnswer.pending, (state, action) => {
      state.workAnswer = {};
      state.loading = true;
    });
    builder.addCase(getWorkAnswer.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.workAnswer = action.payload.data;
    });
    builder.addCase(getWorkAnswer.rejected, (state, action) => {
      state.error = action.payload.message;
      state.loading = false;
    });
    builder.addCase(createWorkAnswer.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createWorkAnswer.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.createAnswerSuccess = true;
    });
    builder.addCase(createWorkAnswer.rejected, (state, action) => {
      state.error = action.payload.message;
      state.loading = false;
    });
    builder.addCase(updateWorkAnswer.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateWorkAnswer.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.updateAnswerSuccess = true;
    });
    builder.addCase(updateWorkAnswer.rejected, (state, action) => {
      state.error = action.payload.message;
      state.loading = false;
    });
    builder.addCase(getWorkAnswerByUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getWorkAnswerByUser.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.workAnswer = action.payload.data;
    });
    builder.addCase(getWorkAnswerByUser.rejected, (state, action) => {
      state.error = action.payload.message;
      state.loading = false;
    });
  },
});

export const { resetWorkError } = workSlice.actions;
export default workSlice.reducer;
