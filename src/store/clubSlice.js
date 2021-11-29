import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import clubApi from '../api/clubApi';
import userApi from '../api/userApi';

const initialState = {
  clubs: [],
  club: {},
  loading: false,
  error: null,
  createSucess: false,
  originClubs: [],
  joinSucess: false,
  joinedClubId: null,
  leaveSuccess: false,
  deleteSuccess: false,
  removeMemberSuccess: false,
  updateClubSuccess: false,
};

export const getClubs = createAsyncThunk(
  'club/getClubs',
  async (data, thunkApi) => {
    try {
      const response = await clubApi.getAllClubs();
      return response.data;
    } catch (error) {
      if (error.response) {
        return thunkApi.rejectWithValue(error.response.data);
      }

      return thunkApi.rejectWithValue(error);
    }
  },
);

export const createClub = createAsyncThunk(
  'club/createClub',
  async (data, thunkApi) => {
    try {
      const response = await clubApi.createClub({
        name: data.name,
        description: data.description,
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        return thunkApi.rejectWithValue(error.response.data);
      }

      return thunkApi.rejectWithValue(error);
    }
  },
);

export const joinClub = createAsyncThunk(
  'club/joinClub',
  async (data, thunkApi) => {
    try {
      const response = await clubApi.joinClub(data.inviteCode);
      return response.data;
    } catch (error) {
      if (error.response) {
        return thunkApi.rejectWithValue(error.response.data);
      }

      return thunkApi.rejectWithValue(error);
    }
  },
);

export const getUserClubs = createAsyncThunk(
  'club/getUserClubs',
  async (data, thunkApi) => {
    try {
      const response = await userApi.getUserClubs();
      return response.data;
    } catch (error) {
      if (error.response) {
        return thunkApi.rejectWithValue(error.response.data);
      }

      return thunkApi.rejectWithValue(error);
    }
  },
);

export const getClub = createAsyncThunk(
  'club/getClub',
  async (data, thunkApi) => {
    try {
      const response = await clubApi.getClub(data.clubId);
      return response.data;
    } catch (error) {
      if (error.response) {
        return thunkApi.rejectWithValue(error.response.data);
      }

      return thunkApi.rejectWithValue(error);
    }
  },
);

export const addComment = createAsyncThunk(
  'club/addComment',
  async (data, thunkApi) => {
    try {
      const response = await clubApi.addComment(data.clubId, data.comment);
      return response.data;
    } catch (error) {
      if (error.response) {
        return thunkApi.rejectWithValue(error.response.data);
      }

      return thunkApi.rejectWithValue(error);
    }
  },
);

export const leaveClub = createAsyncThunk(
  'club/leaveClub',
  async (data, thunkApi) => {
    try {
      const response = await clubApi.leaveClub(data.clubId);
      return response.data;
    } catch (error) {
      if (error.response) {
        return thunkApi.rejectWithValue(error.response.data);
      }

      return thunkApi.rejectWithValue(error);
    }
  },
);

export const deleteClub = createAsyncThunk(
  'club/deleteClub',
  async (data, thunkApi) => {
    try {
      const response = await clubApi.deleteClub(data.clubId);
      return response.data;
    } catch (error) {
      if (error.response) {
        return thunkApi.rejectWithValue(error.response.data);
      }

      return thunkApi.rejectWithValue(error);
    }
  },
);

export const removeMember = createAsyncThunk(
  'club/removeMember',
  async (data, thunkApi) => {
    try {
      const response = await clubApi.removeMember(data.clubId, data.memberId);
      return response.data;
    } catch (error) {
      if (error.response) {
        return thunkApi.rejectWithValue(error.response.data);
      }

      return thunkApi.rejectWithValue(error);
    }
  },
);

export const updateClub = createAsyncThunk(
  'club/updateClub',
  async (data, thunkApi) => {
    try {
      const response = await clubApi.updateClub(data.clubId, data.club);
      return response.data;
    } catch (error) {
      if (error.response) {
        return thunkApi.rejectWithValue(error.response.data);
      }

      return thunkApi.rejectWithValue(error);
    }
  },
);

const clubSlice = createSlice({
  name: 'club',
  initialState,
  reducers: {
    resetClubError: (state) => {
      state.error = null;
      state.createSucess = false;
      state.joinSucess = false;
      state.leaveSuccess = false;
      state.deleteSuccess = false;
      state.removeMemberSuccess = false;
      state.updateClubSuccess = false;
    },
    resetClub: (state) => {
      state.club = {};
    },
    searchClub: (state, action) => {
      const { keyword } = action.payload;
      state.clubs = state.clubs.filter((club) =>
        club.name.toLowerCase().includes(keyword.toLowerCase()),
      );

      if (keyword === '') {
        state.clubs = state.originClubs;
      }
    },
  },
  extraReducers: {
    [getClubs.pending]: (state, action) => {
      state.loading = true;
    },
    [getClubs.fulfilled]: (state, action) => {
      state.clubs = action.payload.data;
      state.originClubs = action.payload.data;
      state.loading = false;
      state.error = null;
    },
    [getClubs.rejected]: (state, action) => {
      state.error = action.payload.message;
      state.loading = false;
    },
    [createClub.pending]: (state, action) => {
      state.loading = true;
    },
    [createClub.fulfilled]: (state, action) => {
      state.club = action.payload.data;
      state.createSucess = true;
      state.loading = false;
      state.error = null;
    },
    [createClub.rejected]: (state, action) => {
      state.error = action.payload.message;
      state.loading = false;
    },
    [joinClub.pending]: (state, action) => {
      state.loading = true;
    },
    [joinClub.fulfilled]: (state, action) => {
      state.joinedClubId = action.payload.data.id;
      state.joinSucess = true;
      state.loading = false;
      state.error = null;
    },
    [joinClub.rejected]: (state, action) => {
      state.error = action.payload.message;
      state.loading = false;
    },
    [getClub.pending]: (state, action) => {
      state.loading = true;
    },
    [getClub.fulfilled]: (state, action) => {
      state.club = action.payload.data;
      state.loading = false;
      state.error = null;
    },
    [getClub.rejected]: (state, action) => {
      state.error = action.payload.message;
      state.loading = false;
    },
    [addComment.pending]: (state, action) => {
      state.loading = true;
    },
    [addComment.fulfilled]: (state, action) => {
      state.club = action.payload.data;
      state.loading = false;
      state.error = null;
    },
    [addComment.rejected]: (state, action) => {
      state.error = action.payload.message;
      state.loading = false;
    },
    [getUserClubs.fulfilled]: (state, action) => {
      state.loading = false;
      state.clubs = action.payload.data;
      state.error = null;
    },
    [getUserClubs.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getUserClubs.pending]: (state, action) => {
      state.loading = true;
    },
    [leaveClub.fulfilled]: (state, action) => {
      state.leaveSuccess = true;
      state.loading = false;
      state.error = null;
    },
    [leaveClub.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [leaveClub.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteClub.fulfilled]: (state, action) => {
      state.deleteSuccess = true;
      state.loading = false;
      state.error = null;
    },
    [deleteClub.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deleteClub.pending]: (state, action) => {
      state.loading = true;
    },
    [removeMember.pending]: (state, action) => {
      state.loading = true;
    },
    [removeMember.fulfilled]: (state, action) => {
      state.removeMemberSuccess = true;
      state.loading = false;
      state.error = null;
    },
    [removeMember.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateClub.pending]: (state, action) => {
      state.loading = true;
    },
    [updateClub.fulfilled]: (state, action) => {
      state.club = action.payload.data;
      state.loading = false;
      state.error = null;
      state.updateClubSuccess = true;
    },
    [updateClub.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export const { resetClubError, searchClub, resetClub } = clubSlice.actions;
export default clubSlice.reducer;
