import axios from 'axios';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { User, Video } from '@/types';
import VideoCard from '@/components/VideoCard';
import NoResults from '@/components/NoResults';
import { useAppSelector } from '@/hooks';
import { RootState } from '@/store';
import { GoVerified } from 'react-icons/go';
import Image from 'next/image';

interface IProps {
  videos: Video[]
}

const Search = ({ videos }: IProps) => {
  const [isAccounts, setIsAccounts] = useState(false);
  const router = useRouter();
  const { searchTerm }: any = router.query;
  const allUsers = useAppSelector((state: RootState) => state.allUsers.allUsers);

  const accounts = isAccounts ? 'border-b-2 border-black' : 'text-gray-400';
  const isVideos = !isAccounts ? 'border-b-2 border-black' : 'text-gray-400';
  const searchedAccounts = allUsers
    .filter((user: User) => user.userName
    .toLowerCase()
    .includes(searchTerm.toLowerCase()));

  return (
    <div className='w-full'>
      <div className='flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full'>
        <p className={`text-xl font-semibold cursor-pointer ${accounts} mt-2`} onClick={() => setIsAccounts(true)}>
          Accounts
        </p>
        <p className={`text-xl font-semibold cursor-pointer ${isVideos} mt-2`} onClick={() => setIsAccounts(false)}>
          Videos
        </p>
      </div>
      {isAccounts ? (
        <div>
          {searchedAccounts.length > 0 ? (
            searchedAccounts.map((user: User, index: number) => (
              <Link href={`/profile/${user._id}`} key={index}>
                <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded
                border-b-2 border-gray-200'>
                  <div className='w-12 h-12'>
                      <Image
                        width={50}
                        height={50}
                        className='rounded-full cursor-pointer'
                        src={user.image}
                        alt='user-profile'
                      />
                  </div>

                  <p className='flex cursor-pointer gap-1 items-center text-[18px] 
                  lowercase font-bold leading-6 text-primary'>
                    {user.userName.replace(/\s+/g, '')}{' '}
                    <GoVerified className='text-blue-400' />
                  </p>
                </div>
              </Link>
            ))
          ) : <NoResults text={`No video results for ${searchTerm}`} />}
        </div>
      ) : (
        <div className='flex flex-wrap gap-6 md:justify-start'>
          {videos.length ? (
            videos.map((video: Video, index) => (
              <VideoCard post={video} key={index} />
            ))
          ) : (
            <NoResults text={`No video results for ${searchTerm}`} />
          )}
        </div>
      )}
    </div>
  )
}

export const getServerSideProps = async ({
    params: { searchTerm },
  }: {
    params: { searchTerm: string },
  }) => {
    const { data } = await axios.get(`http://localhost:3000/api/search/${searchTerm}`);
  
  return {
    props: { videos: data },
  };
};

export default Search