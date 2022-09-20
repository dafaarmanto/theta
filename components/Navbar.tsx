import { useState, useEffect } from 'react';
import Image from 'next/image'
import Link from 'next/link'

import { useRouter } from 'next/router'
import { GoogleLogin, googleLogout } from '@react-oauth/google'

import { AiOutlineLogout } from 'react-icons/ai'
import { IoMdAdd } from 'react-icons/io'

import { createOrGetUser } from '../utils'
import useAuthStore from '../store/authStore'
import { BiSearch } from 'react-icons/bi'

function Navbar() {
  const [searchValue, setSearchValue] = useState('');

  const { userProfile, addUser, removeUser }: any = useAuthStore()
  const router = useRouter()

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (searchValue) {
      router.push(`/search/${searchValue}`)
    }
  }

  return (
    <div className='w-full flex justify-between items-center xl:m-0 border-b-2 border-gray-200 py-4'>
      <Link href="/">
        <div className="w-[100px] md:w-[130px]">
          <Link href="/">
            <a className='text-3xl mx-4 xl:mx-28 font-inter font-bold'>Theta</a>
          </Link>
        </div>
      </Link>
      <div className="relative hidden md:block">
        <form
          onSubmit={handleSearch}
          className="absolute md:static top-10 -left-20 bg-white"
        >
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search accounts and videos"
            className='bg-primary p-3 md:text-md font-medium border-2 border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 w-[300px] md:w-[350px] rounded-full md:top-0'
          />
          <button
            onClick={handleSearch}
            className="absolute md:right-5 right-6 top-4 border-l-2 border-gray-300 pl-4 text-2xl text-gray-100"
          >
            <BiSearch className="text-gray-300" />
          </button>
        </form>
      </div>
      <div className="mr-4 xl:mr-32">
        {userProfile ? (
          <div className="flex gap-5 md:gap-10">
            <Link href="/upload">
              <button className='border-2 px-2 md:py-2 md:px-4 text-md font-semibold flex items-center gap-2'>
                <IoMdAdd className='text-xl' /> {` `}
                <span className="hidden md:block">Upload</span>
              </button>
            </Link>
            {userProfile.image && (
              <Link href="/">
                <>
                  <Image 
                    width={44} 
                    height={44} 
                    className="rounded-full" 
                    src={userProfile.image} 
                    alt="Profile Photo"
                  />
                </>
              </Link>
            )}
            <button
              type='button' 
              className='px-2' 
              onClick={() => {
                googleLogout(); removeUser();
              }}
            >
              <AiOutlineLogout color='black' fontSize={21} />
            </button>
          </div>
        ) : (
          <GoogleLogin 
            onSuccess={(res) => createOrGetUser(res, addUser)}
            onError={() => console.log('Error')}
          />
        )}
      </div>
    </div>
  )
}

export default Navbar