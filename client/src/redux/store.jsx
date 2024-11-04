import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import darkModeSlice from './darkModeSlice';
import authSlice from './authSlice';

// Config for redux-persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'darkMode'], 
};

// Combine reducers
const rootReducer = combineReducers({
  darkMode: darkModeSlice,
  auth: authSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});

export const persistor = persistStore(store);
