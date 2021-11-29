import { combineReducers } from 'redux';
import authSlice from './authSlice';
import chatSlice from './chatSlice';
import clubSlice from './clubSlice';
import userSlice from './userSlice';
import workSlice from './workSlice';

const rootReducer = combineReducers({
  auth: authSlice,
  user: userSlice,
  club: clubSlice,
  chat: chatSlice,
  work: workSlice,
});

export default rootReducer;
