import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import {
//   FLUSH,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
//   REHYDRATE,
//   persistReducer,
//   persistStore,
// } from "redux-persist";
// import storage from "redux-persist/lib/storage";
import signinReducer from './setSigninSlice';
import signupReducer from './setSignupSlice';

// const persistConfig = {
//   key: "root",
//   version: 1,
//   storage,
// };

const rootReducer = combineReducers({signin: signinReducer, signup: signupReducer});

export const store = configureStore({
  reducer: rootReducer,
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: {
  //       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  //     },
  //   }),
});
