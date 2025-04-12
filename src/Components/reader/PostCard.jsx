import { useState } from "react";
import { axiosInstance } from "../../config/axiosConfig";
import PostDetailModal from "./PostDetailModal";

const PostCard = ({ post }) => {
  const [commentText, setCommentText] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddComment = async () => {
    setIsSubmitting(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const userId = JSON.parse(localStorage.getItem("user_id"));
      await axiosInstance.post("/comment/create", {
        userid: userId,
        postid: post._id,
        content: commentText,
      });
      setCommentText("");
      setIsCommenting(false);
      setSuccessMessage("Comment added successfully");
    } catch (err) {
      setErrorMessage("Error adding comment");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <article className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px]">
        <div className="h-3 bg-gradient-to-r from-purple-500 to-pink-500"></div>
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-semibold text-gray-800 line-clamp-2">{post.title}</h3>
            <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {post.category?.name}
            </span>
          </div>
          <p className="text-gray-600 mb-4 line-clamp-3">{post.content}</p>
          <div className="flex justify-between items-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-indigo-600 font-medium hover:text-indigo-800 transition duration-200 flex items-center"
            >
              Read More
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
            <button
              onClick={() => setIsCommenting(true)}
              className="text-indigo-600 font-medium hover:text-indigo-800 transition duration-200"
            >
              Add Comment
            </button>
          </div>
          {isCommenting && (
            <div className="mt-4">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write your comment..."
                className="w-full p-2 border rounded-md"
                rows="3"
              />
              <div className="flex justify-end space-x-2 mt-2">
                <button
                  onClick={() => setIsCommenting(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddComment}
                  disabled={!commentText.trim() || isSubmitting}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-gray-400"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </div>
          )}
          {successMessage && (
            <div className="mt-2 text-green-600">{successMessage}</div>
          )}
          {errorMessage && (
            <div className="mt-2 text-red-600">{errorMessage}</div>
          )}
        </div>
      </article>
      <PostDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={post.title}
        content={post.content}
        postId={post._id}
      />
    </>
  );
};

export default PostCard;