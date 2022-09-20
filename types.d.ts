import { Dispatch, SetStateAction } from 'react';

export interface Video {
  caption: string;
  video: {
    asset: {
      _id: string;
      url: string;
    };
  };
  _id: string;
  postedBy: {
    _id: string;
    userName: string;
    image: string;
  };
  likes: {
    postedBy: {
      _id: string;
      userName: string;
      image: string;
    };
  }[];
  comments: {
    comment: string;
    _key: string;
    postedBy: {
      _ref: string;
      _id: string;
    };
  }[];
  userId: string;
}

export interface IUser {
  _id: string;
  _type: string;
  userName: string;
  image: string;
}

export interface CreateOrGetUserTypes {
  name: string,
  picture: string,
  sub: string
}

export interface GetUserDetailsByIDTypes {
  postDetails: Video
}

export interface LikeTypes {
  handleLike: () => void,
  handleDislike: () => void,
  likes: any[]
}

export interface CommentTypes {
  isPostingComment: boolean,
  comment: string,
  setComment: Dispatch<SetStateAction<string>>,
  addComment: (e: React.FormEvent) => void,
  comments: CommentsTypes[]
}

export interface CommentsTypes {
  comment: string,
  length?: number,
  _key: string,
  postedBy: {
    _ref: string,
    _id: string
  }
}

export interface ProfileTypes {
  data: {
    user: IUser,
    userVideos: Video[],
    userLikedVideos: Video[]
  }
}