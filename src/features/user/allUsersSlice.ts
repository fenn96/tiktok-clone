import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/types';

interface AllUsersState {
  allUsers: User[];
}

const initialState: AllUsersState = {
  allUsers: [],
};

const allUsersSlice = createSlice({
  name: 'allUsers',
  initialState,
  reducers: {
    addAllUsers: (state, action: PayloadAction<User[]>) => {
      state.allUsers = action.payload;
    },
  }
});

export const { addAllUsers } = allUsersSlice.actions;
const allUsersReducer = allUsersSlice.reducer;
export default allUsersReducer;