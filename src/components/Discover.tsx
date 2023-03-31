import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { topics } from '@/utils/constants';

type Props = {}

const Discover = (props: Props) => {
  const router = useRouter();
  const { topic } = router.query;

  const topicStyle = `xl:border-2 hover:bg-primary px-3 py-2 rounded
  xl:rounded-full flex items-center gap-2 justify-center cursor-pointer`

  return (
    <div className='xl:border-b-2 xl:border-gray-200 pb-6'>
      <p className='text-gray-500 font-semibold m-3 mt-4 hidden xl:block'>
        Popular Topics
      </p>
      <div className='flex gap-3 flex-wrap'>
        {topics.map((item) => (
          <Link 
            href={`/?topic=${item.name}`}
            key={item.name}
          >
            <div className={topic === item.name ? 
            (`${topicStyle} xl:border-[#F51997] text-[#F51997]`) :
            (`${topicStyle} xl:border-gray-300 text-black`)}>
              <span className='font-bold text-2xl xl:text-md'>
                {item.icon}
              </span>
              <span className='font-medium text-md hidden xl:block capitalize'>
                {item.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Discover