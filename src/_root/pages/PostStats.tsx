import Loader from "@/components/shared/Loader";
import {
  useDeleteSavedPost,
  useGetCurrentUser,
  useLikePost,
  useSavePost,
} from "@/lib/react-query/queriesAndMutations";
import { checkIsLiked } from "@/lib/utils";
import { Models } from "appwrite";
import { useEffect, useState } from "react";

import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";

type PostStatsProps = {
  post?: Models.Document;
  userId: string;
};

const PostStats = ({ post, userId }: PostStatsProps) => {
  const likeList = post?.likes.map((user: Models.Document) => user.$id);

  const [likes, setLikes] = useState(likeList);
  const [isSaved, setIsSaved] = useState(false);

  const { mutate: likePost } = useLikePost();
  const { mutate: savePost, isPending: isSavingPost } = useSavePost();
  const { mutate: deleteSavedPost, isPending: isDeletingSaved } =
    useDeleteSavedPost();

  const { data: currentUser } = useGetCurrentUser();

  const savedPostRecord = currentUser?.save.find(
    (record: Models.Document) => record.post?.$id === post?.$id,
  );

  useEffect(() => {
    setIsSaved(!!savedPostRecord);
  }, [currentUser]);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();

    let newLikes = [...likes];
    newLikes.includes(userId)
      ? (newLikes = newLikes.filter((id) => id !== userId))
      : newLikes.push(userId);

    setLikes(newLikes);
    likePost({ postId: post?.$id || "", likesArray: newLikes });
  };
  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (savedPostRecord) {
      setIsSaved(false);
      deleteSavedPost({ savedRecordId: savedPostRecord.$id });
    } else {
      savePost({ postId: post?.$id || "", userId });
      setIsSaved(true);
    }
  };

  return (
    <div className="flex justify-between items-center z-20">
      <div className="flex gap-2 mr-5">
        <div className="cursor-pointer" onClick={handleLike}>
          {checkIsLiked(likes, userId) ? (
            <FaHeart size={20} color="red" />
          ) : (
            <FaRegHeart size={20} />
          )}
        </div>
        <p className="small-medium lg:base-medium">{likes.length}</p>
      </div>
      <div className="flex gap-2">
        <div className="cursor-pointer" onClick={handleSave}>
          {isSavingPost || isDeletingSaved ? (
            <Loader />
          ) : isSaved ? (
            <FaBookmark size={20} color="red" />
          ) : (
            <FaRegBookmark size={20} />
          )}
        </div>
      </div>
    </div>
  );
};

export default PostStats;
