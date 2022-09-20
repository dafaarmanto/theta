import { MdOutlineVideocamOff } from 'react-icons/md'
import { BiCommentX } from 'react-icons/bi'

interface IProps {
  text: string
}

const NoResults = ({ text }: IProps) => {
  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      <p className="text-6xl">
        { text === "Be the first to comment on this video." 
          ? <BiCommentX />
          : <MdOutlineVideocamOff />
        }
      </p>
      <p className="text-md mt-4 text-center">{text}</p>
    </div>
  )
}

export default NoResults