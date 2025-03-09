import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './userReducer';

const userPersistConfig = {
  key: 'user',
  storage,
};

const rootReducer = combineReducers({
  auth: persistReducer(userPersistConfig, userReducer),
});

export default rootReducer;
