import axios from 'axios'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import VideoCard from '../../components/VideoCard'
import NoResults from '../../components/NoResults'

import { GoVerified } from 'react-icons/go'

import { BASE_URL } from '../../utils'
import useAuthStore from '../../store/authStore'
import { IUser, Video } from '../../types'
import Link from 'next/link'
import Image from 'next/image'

const Search = ({ videos }: { videos: Video[] }) => {
  const [isAccounts, setIsAccounts] = useState(false)

  const router = useRouter()
  const { searchTerm }: any = router.query
  const { allUsers } = useAuthStore();

  const accounts = isAccounts ? 'border-b-2 border-black' : 'text-gray-400'
  const isVideos = !isAccounts ? 'border-b-2 border-black' : 'text-gray-400'

  const searchedAccounts = allUsers.filter(
    (user: IUser) => user.userName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="w-full">
      <div className="flex gap-10 mb-6 mt-4 border-b-2 border-gray-2 bg-white w-full">
          <p 
            className={`text-md font-semibold cursor-pointer mt-2 ${accounts}`}
            onClick={() => setIsAccounts(true)}
          >
            Accounts
          </p>
          <p 
            className={`text-md font-semibold cursor-pointer mt-2 ${isVideos}`}
            onClick={() => setIsAccounts(false)}
          >
            Videos
          </p>
        </div>
        {isAccounts ? (
          <div>
            { searchedAccounts.length > 0 ? (
              searchedAccounts.map((user: IUser, idx: number) => (
                <Link href={`/profile/${user._id}`} key={idx}>
                  <div className="flex rounded border-b-2 mb-3 border-gray-200 cursor-pointer p-2 font-semibold gap-3">
                    <div>
                    <Image
                      src={user.image}
                      width={50}
                      height={50}
                      className="rounded-full"
                      alt="User Profile"
                    />
                    </div>
                    <div className="hidden xl:block">
                      <p className='flex items-center gap-1 text-xs xl:text-md font-bold text-primary lowercase'>
                        {user.userName.replaceAll(' ', '')}
                        <GoVerified className="text-blue-400" />
                      </p>
                      <p className='capitalize text-gray-400 text-xs'>
                        {user.userName}
                      </p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <NoResults text={`No video results for ${searchTerm}`} />
            )}
          </div>
        ) : (
          <div className="flex flex-wrap gap-6 md:justify-start">
            {videos?.length ? (
              videos.map((video: Video, idx: number) => (
                <VideoCard post={video} key={idx} />
              ))
            ) : <NoResults text={`No video results for ${searchTerm}`} /> }
          </div>
        )}
    </div>
  )
}

export const getServerSideProps = async (
  { params: { searchTerm }
}: {
  params: { searchTerm: string }
}) => {
  const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`)

  return {
    props: {
      videos: res.data
    }
  }
}

export default Search