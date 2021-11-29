import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  rooms: [],
  unfilteredRooms: [],
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setRooms: (state, action) => {
      state.rooms = action.payload;
    },
    setUnfilteredRooms: (state, action) => {
      state.unfilteredRooms = action.payload;
    },
  },
});

export const { setRooms, setUnfilteredRooms } = chatSlice.actions;
export default chatSlice.reducer;
