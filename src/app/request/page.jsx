import Link from 'next/link';
import React from 'react';

const page = () => {
  return (
    <>
      <div className='flex items-center justify-center w-full my-[80px]'>
        <div className='flex items-start justify-start w-4/5'>
        <Link href="/">
          <button className="text-transform[capitalize] text-white text-sm font-bold bg-[#5D24FF] rounded-[13px] min-w-[130px] min-h-[40px] shadow-none">
            Back
          </button>
        </Link>
        </div>
      </div>

      <form action="subbmit">
        
      </form>
    </>
  );
};

export default page;
