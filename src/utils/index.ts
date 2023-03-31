import { addUser } from '@/features/user/userSlice';
import { useAppDispatch } from '@/hooks';
import axios from 'axios';

export const createOrGetUser = async (response: any) => {
  
  const user = {
    _id: response.uid,
    _type: 'user',
    userName: response.displayName,
    image: response.photoURL,
  };

  await axios.post(`http://localhost:3000/api/auth`, user);

  return user;
};