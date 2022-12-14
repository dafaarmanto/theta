import { useState } from 'react'
import { NextPage } from "next"
import { useRouter } from "next/router"
import Link from 'next/link'
import GoogleLogin from 'react-google-login'
import { AiFillHome, AiOutlineMenu } from 'react-icons/ai'
import { ImCancelCircle } from 'react-icons/im'
import { RiLiveLine } from 'react-icons/ri'
import { HiOutlineUsers } from 'react-icons/hi'
import Discover from './Discover'
import SuggestedAccounts from './SuggestedAccounts'
import Footer from './Footer'
import useAuthStore from '../store/authStore'

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(true)
  const { userProfile } = useAuthStore()

  const activeNormalLink = 'flex rounded items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-[#fe2c55]';
  const normalLink = 'flex rounded items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-black';

  return (
    <div className="xl:mt-4">
      <div className="block xl:hidden m-2 ml-4 mt-3 text-xl" onClick={() => setShowSidebar((prev) => !prev)}>
        { showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
      </div>
      {showSidebar && (
        <div className='xl:w-400 w-20 flex flex-col justify-start mb-10 border-r-2 border-gray-100 xl:border-0 p-3'>
          <div className='xl:border-b-2 border-gray-200 xl:pb-4'>
            <Link href="/">
              <div className={activeNormalLink}>
                <p className='text-2xl'>
                  <AiFillHome />
                </p>
                <span className='text-xl font-bold hidden xl:block'>For You</span>
              </div>
            </Link>
            <Link href="/">
              <div className={normalLink}>
                <p className='text-2xl'>
                  <HiOutlineUsers />
                </p>
                <span className='text-xl font-bold hidden xl:block'>Following</span>
              </div>
            </Link>
            <Link href="/">
              <div className={normalLink}>
                <p className='text-2xl'>
                  <RiLiveLine />
                </p>
                <span className='text-xl font-bold hidden xl:block'>LIVE</span>
              </div>
            </Link>
          </div>
          <SuggestedAccounts />
          <Discover />
          <Footer />
        </div>
      )}
    </div>
  )
}

export default Sidebar