import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import uiReducer from '../features/UI/uiSlice';
import userReducer from '../features/UI/userSlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    user: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
