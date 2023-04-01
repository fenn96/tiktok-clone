import { configureStore } from '@reduxjs/toolkit';
import userReducer from '@/features/user/userSlice';
import allUsersReducer from '@/features/user/allUsersSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    allUsers: allUsersReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;