import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AiOutlineLogout } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';
import { IoMdAdd } from 'react-icons/io';

import Logo from '../utils/tiktik-logo.png';
import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, provider } from '@/utils/firebase';
import { createOrGetUser } from '@/utils';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { addUser, removeUser } from '@/features/user/userSlice';
import { RootState } from '@/store';
import { BsGoogle } from 'react-icons/bs';

type Props = {}

const Navbar = (props: Props) => {
  const user = useAppSelector((state: RootState) => state.user);

  const dispatch = useAppDispatch()


  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        dispatch(addUser({
          _id: user.uid,
          _type: 'user',
          userName: user.displayName || '',
          image: user.photoURL || ''
        }));
      } 
    });
  }, [])

  const handleLogin = () => {
    signInWithPopup(auth, provider).then((data) => {
        let user = data.user
        createOrGetUser(user)
          .then((user) => {
            dispatch(addUser(user))
            console.log(user)
          })
    })
    .catch((error) => {
        console.log(error)
    })
  }

  const handleLogout = () => {
    signOut(auth).then(() => {
      dispatch(removeUser());
    }).catch((error) => {
      console.log(error)
    })
  
    console.log(user)
  };

  return (
    <div className='w-full flex justify-between items-center border-b-2 border-gray-200
    py-2 px-4'>
      <Link href="/">
        <div className='w-[100px] md:w-[130px]'>
            <Image
              className='cursor-pointer'
              alt='logo'
              src={Logo}
            />
        </div>
      </Link>

      <div>SEARCH</div>

      <div>
        {user._id ? (
          <div className='flex items-center gap-5 md:gap-10'>
            <Link href="/upload">
              <button className='border-2 px-6 py-1 hover:bg-gray-100 md:px-4 text-md font-semibold flex items-center gap-2'>
                <IoMdAdd className='text-xl' /> {` `}
                <span className='hidden md:block'>Upload</span>
              </button>
            </Link>
            {user.image && (
              <Link href="/">
                <>
                  <Image
                    width={40}
                    height={40}
                    className="rounded-full cursor-pointer"
                    src={user.image}
                    alt="profile-picture"
                  />
                </>
            </Link>
            )}
            <button
              type="button"
              className='border-2 p-2 rounded-full cursor-pointer outline-none shadow-md'
              onClick={() => handleLogout()}
            >
              <AiOutlineLogout color="red" fontSize={21} />
            </button>
          </div>
        ) : (
          <button
            className='cursor-pointer bg-white text-md text-[#F51997] border-[1px] 
            border-[#F51997] font-semibold px-6 py-2 rounded-md outline-none
               mt-3 hover:text-white hover:bg-[#F51997]
               flex items-center gap-2'
               onClick={() => handleLogin()}
          >
            <BsGoogle /> {` `}
            <span className='hidden md:block'>Login</span>
          </button>
        )}
      </div>
    </div>
  )
}

export default Navbar