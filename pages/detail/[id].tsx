import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'

import { GoVerified } from 'react-icons/go'
import { MdOutlineCancel } from 'react-icons/md'
import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs'
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi'

import { BASE_URL } from '../../utils'
import { GetUserDetailsByIDTypes } from '../../types'
import useAuthStore from '../../store/authStore'
import LikeButton from '../../components/LikeButton'
import Comments from '../../components/Comments'

const Detail = ({ postDetails }: GetUserDetailsByIDTypes) => {
  const [post, setPost] = useState(postDetails);
  const [playing, setPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [comment, setComment] = useState("");
  const [isPostingComment, setIsPostingComment] = useState(false);
  
  const { userProfile }: any = useAuthStore();
  const videoRef = useRef<HTMLVideoElement>(null)
  const router = useRouter()

  const onVideoClick = () => {
    if (playing) {
      videoRef?.current?.pause()
      setPlaying(false)
    } else {
      videoRef?.current?.play()
      setPlaying(true)
    }
  }

  useEffect(() => {
    if (post && videoRef?.current) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [post, isVideoMuted])

  const handleLike = async (like: boolean) => {
    if (userProfile) {
      const { data } = await axios.put(`${BASE_URL}/api/like`, {
        userId: userProfile._id,
        postId: post._id,
        like
      })

      setPost({ ...post, likes: data.likes })
    }
  }

  const addComment = async (e: any) => {
    e.preventDefault();

    if (userProfile && comment) {
      setIsPostingComment(true);

      const { data } = await axios.put(`${BASE_URL}/api/post/${post._id}`, {
        userId: userProfile._id,
        comment
      });

      setPost({ ...post, comments: data.comments })
      setComment('');
      setIsPostingComment(false)
    }
  }

  if (!post) return null

  return (
    <div className='flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap h-full'>
      <div className="relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-black">
        <div className='absolute top-6 left-2 lg:left-6 flex gap-6 z-50'>
          <p className="cursor-pointer" onClick={() => router.back()}>
            <MdOutlineCancel className="text-white text-[35px]" />
          </p>
        </div>
        <div className="relative" onClick={() => setIsHover(true)}>
          <div className="lg:h-[100vh] h-[60vh]">
            <video
              ref={videoRef}
              loop
              autoPlay
              onClick={onVideoClick}
              src={post.video.asset.url}
              className="h-full cursor-pointer"
            ></video>
          </div>
            { isHover && (
              <div className="absolute top-[45%] left-[45%] cursor-pointer">
                {!playing && (
                  <button
                    onClick={onVideoClick}
                  >
                    <BsFillPlayFill 
                      className='text-white hover:opacity-100 text-6xl lg:text-8xl'
                    />
                  </button>
                )}
              </div>
            )}
        </div>
        <div className="absolute bottom-5 lg:bottom-10 right-5 lg:right-10 cursor-pointer">
        {isVideoMuted ? (
          <button onClick={() => setIsVideoMuted(false)}><HiVolumeOff className="text-white text-2xl lg:text-4xl" /></button>
        ) : (
          <button onClick={() => setIsVideoMuted(true)}><HiVolumeUp className="text-white text-2xl lg:text-4xl" /></button>
        )}
        </div>
      </div>
      <div className="relative w-[1000px] md:w-[900px] lg:w-[700px]">
        <div className="lg:mt-15 mt-10">
          <div className="flex flex-row gap-3 p-2 cursor-pointer font-semibold rounded">
            <div className="ml-4 mt-4 md:w-10 md:h-10 w-16 h-16">
              <Link href={`/profile/${post.postedBy._id}`}>
                <>
                  <Image 
                    width={48} 
                    height={48} 
                    className="rounded-full" 
                    src={post.postedBy.image} 
                    alt="Profile Photo" 
                    layout="responsive" 
                  />
                </>
              </Link>
            </div>
            <div>
            <Link href={`/profile/${post.postedBy._id}`}>
              <div className="mt-3 flex flex-col gap-2">
                <p className="flex gap-2 items-center md:text-md font-bold text-primary">
                  {post.postedBy.userName} {' '} <GoVerified className="text-blue-400 text-md" />
                </p>
                <p className="capitalize font-medium text-xs text-gray-500 hidden md:block">{post.postedBy.userName}</p>
              </div>
            </Link>
            </div>
          </div>
          <p className="px-6 text-md mt-3 text-gray-600">{post.caption}</p>
          <div className="mt-10 px-6 mb-10">
            {userProfile && (
              <LikeButton likes={post.likes} handleLike={() => handleLike(true)} handleDislike={() => handleLike(false)} />
            )}
          </div>
          <Comments
            comment={comment}
            setComment={setComment}
            addComment={addComment}
            comments={post.comments}
            isPostingComment={isPostingComment}
          />
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async ({ params: { id } }: { params: { id: string } }) => {
  const { data } = await axios.get(`${BASE_URL}/api/post/${id}`)

  return {
    props: { postDetails: data }
  }
}

export default Detail