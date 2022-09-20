import { useState, useEffect } from 'react'
import axios from 'axios'

import { GoVerified } from 'react-icons/go'

import VideoCard from '../../components/VideoCard'
import NoResults from '../../components/NoResults'

import { ProfileTypes, Video } from '../../types'
import { BASE_URL } from '../../utils'
import Image from 'next/image'

const Profile = ({ data }: ProfileTypes) => {
  const [showUserVideos, setShowUserVideos] = useState(true)
  const [videosList, setVideosList] = useState<Video[]>([]);

  const { user, userVideos, userLikedVideos } = data

  const videos = showUserVideos ? 'border-b-2 border-black' : 'text-gray-400'
  const liked = !showUserVideos ? 'border-b-2 border-black' : 'text-gray-400'

  useEffect(() => {
    if (showUserVideos) {
      setVideosList(userVideos)
    } else {
      setVideosList(userLikedVideos)
    }
  }, [showUserVideos, userLikedVideos, userVideos])
  
  return (
    <div className="w-full mt-4">
      <div className="flex gap-4 md:gap-6 mb-4 bg-white w-full">
        <div className="w-16 h-16 md:w-18 md:h-18">
          <Image
            src={user.image}
            width={120}
            height={120}
            className="rounded-full"
            alt="User Profile"
            layout="responsive"
          />
        </div>
        <div className="flex flex-col justify-center">
          <p className='md:text-xl tracking-wider flex items-center gap-1 text-md font-bold text-primary lowercase'>
            {user.userName.replaceAll(' ', '')}
            <GoVerified className="text-blue-400" />
          </p>
          <p className='md:text-md capitalize text-gray-400 text-xs'>
            {user.userName}
          </p>
        </div>
      </div>
      <div>
        <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-2 bg-white w-full">
          <p 
            className={`text-md font-semibold cursor-pointer mt-2 ${videos}`}
            onClick={() => setShowUserVideos(true)}
          >
            Videos
          </p>
          <p 
            className={`text-md font-semibold cursor-pointer mt-2 ${liked}`}
            onClick={() => setShowUserVideos(false)}
          >
            Liked
          </p>
        </div>
        <div className="flex gap-6 flex-wrap md:justify-start">
          {videosList.length > 0 ? (
            videosList.map((post: Video, idx: number) => (
              <VideoCard post={post} key={idx} />
            ))
          ) : <NoResults text={`No ${showUserVideos ? '' : 'Liked'} Videos Yet`} /> }
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async (
  { params: { id }
}: {
  params: { id: string }
}) => {
  const res = await axios.get(`${BASE_URL}/api/profile/${id}`)

  return {
    props: {
      data: res.data
    }
  }
}

export default Profile