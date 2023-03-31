import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/types';

const initialState = {
  _id: '',
  _type: '',
  userName: '',
  image: ''
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      const { _id, _type, userName, image } = action.payload;
      state._id = _id;
      state._type = _type;
      state.userName = userName;
      state.image = image;
    },
    removeUser: (state) => {
      const { _id, _type, userName, image } = initialState;
      state._id = _id;
      state._type = _type;
      state.userName = userName;
      state.image = image;
    }
  }
});

export const { addUser, removeUser } = userSlice.actions;
const userReducer = userSlice.reducer;
export default userReducer;