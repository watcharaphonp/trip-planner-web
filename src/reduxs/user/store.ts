import { configureStore } from "@reduxjs/toolkit";
import createStore from "redux"
import userReducer from "./slice"
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'user',
    storage,
  };
const persistedReducer = persistReducer(persistConfig, userReducer);
export const userStore = configureStore({
    reducer: {
      user: persistedReducer,
    },
  });
export const userPersistor = persistStore(userStore);