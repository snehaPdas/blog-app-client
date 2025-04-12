import { useState, useEffect } from "react";
import { axiosInstance } from "../../config/axiosConfig";

const PostDetailModal = ({ isOpen, onClose, title, content, postId }) => {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch comments when modal opens
  useEffect(() => {
    if (!isOpen || !postId) return;

    const fetchComments = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axiosInstance.get(`/comment/${postId}`);
        setComments(response.data.data || []);
      } catch (err) {
        setError("Error fetching comments");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [isOpen, postId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {/* Post Content */}
          <div className="mb-6">
            <p className="text-gray-700 leading-relaxed">{content}</p>
          </div>

          {/* Comments Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Comments</h3>
            {loading && (
              <p className="text-gray-600">Loading comments...</p>
            )}
            {error && (
              <p className="text-red-600 mb-4">{error}</p>
            )}
            {!loading && comments.length === 0 && (
              <p className="text-gray-600">No comments yet.</p>
            )}
            {comments.map((comment) => (
              <div
                key={comment._id}
                className="bg-gray-100 rounded-md p-4 mb-3"
              >
                <p className="text-gray-700">{comment.content}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Posted by {comment.userid.name} on{" "}
                  {new Date(comment.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostDetailModal;