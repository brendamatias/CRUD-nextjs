import { configureStore } from '@reduxjs/toolkit';
import listenerMiddleware from './listener';
import userReducer from './slices/user.slice';

export const store = configureStore({
  reducer: {
    app: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
