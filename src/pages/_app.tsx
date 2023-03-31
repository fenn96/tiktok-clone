import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useState, useEffect } from 'react'

import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import store from '@/store';
import { Provider } from 'react-redux';
import { auth } from '@/utils/firebase';
import { addUser } from '@/features/user/userSlice';


export default function App({ Component, pageProps }: AppProps) {
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
    auth.onAuthStateChanged(user => {
      if (user) {
        addUser({
          _id: user.uid,
          _type: 'user',
          userName: user.displayName,
          image: user.photoURL
        });
      } else {

      }
    });
  }, [])

  
  if(isSSR) return null;

  return (
    <Provider store={store}>
      <Navbar />
      <div className="flex gap-6 md:gap-20">
        <div className='h-[92vh] overflow-hidden xl:hover:overflow-auto'>
          <Sidebar />
        </div>
        <div className='mt-4 flex flex-col gap-10 overflow-auto h-[88vh] videos flex-1'>
          <Component {...pageProps} />
        </div>
      </div>
    </Provider>
  )
}
