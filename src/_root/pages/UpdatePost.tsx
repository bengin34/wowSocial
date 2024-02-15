import PostForm from "@/components/forms/PostForm";
import Loader from "@/components/shared/Loader";
import { useGetPostById } from "@/lib/react-query/queriesAndMutations";
import { IoAddCircleOutline } from "react-icons/io5";
import { useParams } from "react-router-dom";

const UpdatePost = () => {
  const { id } = useParams();
  const { data: post, isPending } = useGetPostById(id || "");

  if (isPending)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );

  return (
    <div className="flex flex-1 ">
      <div className="common-container">
        <div className="max-w-5xl flex-start gap-3 justify-start w-full">
          <IoAddCircleOutline size={48} />
          <h2 className="h3-bold md:h2-bold text-left w-full">Edit Post</h2>
        </div>

        {isPending ? (
          <div className="flex-center w-full h-full">
            <Loader />
          </div>
        ) : (
          <PostForm action="Update" post={post} />
        )}
      </div>
    </div>
  );
};

export default UpdatePost;
