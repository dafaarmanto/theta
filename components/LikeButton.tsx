import { useState, useEffect } from 'react'
import { MdFavorite } from 'react-icons/md'

import useAuthStore from '../store/authStore'
import { LikeTypes } from '../types'

const LikeButton = ({ handleLike, handleDislike, likes }: LikeTypes) => {
  const [alreadyLiked, setAlreadyLiked] = useState(false)
  const { userProfile }: any = useAuthStore();
  const filterLikes = likes?.filter((item) => item._ref === userProfile?._id)

  useEffect(() => {
    if (filterLikes?.length > 0) {
      setAlreadyLiked(true)
    } else {
      setAlreadyLiked(false);
    }
  }, [filterLikes, likes])
  
  return (
    <div className="flex gap-6">
      <div className="mt-2 flex flex-row gap-3 justify-center items-center cursor-pointer">
        { alreadyLiked ? (
          <div className="bg-primary rounded-full p-2 md:p-2 text-[#F51997]" onClick={handleDislike}>
            <MdFavorite className="text-sm md:text-lg" />
          </div>
        ) : (
          <div className="bg-primary rounded-full p-2 md:p-2" onClick={handleLike}>
            <MdFavorite className="text-sm md:text-lg" />
          </div>
        )}
        <p className="text-sm font-semibold">{likes?.length || 0}</p>
      </div>      
    </div>
  )
}

export default LikeButton