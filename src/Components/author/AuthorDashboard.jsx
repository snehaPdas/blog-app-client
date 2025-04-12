import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthorDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostCategory, setNewPostCategory] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [error, setError] = useState(null);
  const [editPostTitle, setEditPostTitle] = useState("");
  const [editPostContent, setEditPostContent] = useState("");
  const [editPostCategory, setEditPostCategory] = useState("");
  const [editingPostId, setEditingPostId] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    // Fetch posts and categories on load

    const token = localStorage.getItem("user_access_token");
    if (!token) {
      navigate("/login");
     }

    const fetchData = async () => {
      try {
        const postResponse = await axios.get("http://localhost:4000/author/posts");
        const categoryResponse = await axios.get("http://localhost:4000/author/categories");
        setPosts(postResponse.data.posts);
        setCategories(categoryResponse.data.categories);
      } catch (err) {
        setError("Error fetching data", err);
      }
    };
    fetchData();
  }, [navigate]);

  // Create a new post
  const handleCreatePost = async () => {
    try {
      const newPost = {
        title: newPostTitle,
        content: newPostContent,
        category: newPostCategory,
      };
      await axios.post("http://localhost:4000/author/posts", newPost);
      setPosts([...posts, newPost]);
      setNewPostTitle("");
      setNewPostContent("");
      setNewPostCategory("");
    } catch (err) {
      setError("Error creating post", err);
    }
  };

  // Delete a post
  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(`http://localhost:4000/author/posts/${postId}`);
      setPosts(posts.filter(post => post._id !== postId));
    } catch (err) {
      setError("Error deleting post", err);
    }
  };

  // Edit Post - Open edit form with post details
  const handleEditPost = (post) => {
    setEditingPostId(post._id);
    setEditPostTitle(post.title);
    setEditPostContent(post.content);
    setEditPostCategory(post.category._id); // assuming category is populated
  };

  // Update a post
  const handleUpdatePost = async () => {
    try {
      const updatedPost = {
        title: editPostTitle,
        content: editPostContent,
        category: editPostCategory,
      };
      await axios.put(`http://localhost:4000/author/posts/${editingPostId}`, updatedPost);
      
      setPosts(posts.map((post) => 
        post._id === editingPostId ? { ...post, ...updatedPost } : post
      ));
      
      // Clear edit form and reset state
      setEditingPostId(null);
      setEditPostTitle("");
      setEditPostContent("");
      setEditPostCategory("");
    } catch (err) {
      setError("Error updating post", err);
    }
  };

  // Create a new category
  const handleCreateCategory = async () => {
    try {
      const newCategory = { name: newCategoryName };
      await axios.post("http://localhost:4000/author/categories", newCategory);
      const categoryResponse = await axios.get("http://localhost:4000/author/categories");
      setCategories(categoryResponse.data.categories);
      setNewCategoryName("");
    } catch (err) {
      setError("Error creating category", err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold text-center mb-6">Author Dashboard</h1>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {/* Create Post Form */}
      <div className="mb-8">
        <h2 className="text-2xl font-medium mb-4">Create New Post</h2>
        <input
          type="text"
          value={newPostTitle}
          onChange={(e) => setNewPostTitle(e.target.value)}
          placeholder="Post Title"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <textarea
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
          placeholder="Post Content"
          className="w-full p-2 mb-4 border border-gray-300 rounded h-32"
        />
        <select
          value={newPostCategory}
          onChange={(e) => setNewPostCategory(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
        <button
          onClick={handleCreatePost}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
        >
          Create Post
        </button>
      </div>

      {/* List of Posts */}
      <div className="mb-8">
        <h2 className="text-2xl font-medium mb-4">Manage Posts</h2>
        {posts.length === 0 ? (
          <p>No posts available.</p>
        ) : (
          posts.map((post) => (
            <div key={post._id} className="border-b border-gray-300 pb-4 mb-4">
              <h3 className="text-xl font-semibold">{post.title}</h3>
              <p className="text-gray-700 mb-2">{post.content}</p>
              <p className="text-gray-500 mb-2">Category: {post.category?.name}</p>
              <button
                onClick={() => handleDeletePost(post._id)}
                className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
              <button
                onClick={() => handleEditPost(post)}
                className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600 transition ml-2"
              >
                Edit
              </button>
            </div>
          ))
        )}
      </div>

      {/* Edit Post Form */}
      {editingPostId && (
        <div className="mb-8">
          <h2 className="text-2xl font-medium mb-4">Edit Post</h2>
          <input
            type="text"
            value={editPostTitle}
            onChange={(e) => setEditPostTitle(e.target.value)}
            placeholder="Post Title"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <textarea
            value={editPostContent}
            onChange={(e) => setEditPostContent(e.target.value)}
            placeholder="Post Content"
            className="w-full p-2 mb-4 border border-gray-300 rounded h-32"
          />
          <select
            value={editPostCategory}
            onChange={(e) => setEditPostCategory(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
          <button
            onClick={handleUpdatePost}
            className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition"
          >
            Update Post
          </button>
        </div>
      )}

      {/* Create Category Form */}
      <div className="mb-8">
        <h2 className="text-2xl font-medium mb-4">Create New Category</h2>
        <input
          type="text"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          placeholder="Category Name"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <button
          onClick={handleCreateCategory}
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition"
        >
          Create Category
        </button>
      </div>

      {/* List of Categories */}
      <div>
        <h2 className="text-2xl font-medium mb-4">Categories</h2>
        {categories.length === 0 ? (
          <p>No categories available.</p>
        ) : (
          categories.map((category) => (
            <div key={category._id} className="border-b border-gray-300 py-2">
              <span className="text-lg">{category.name}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AuthorDashboard;
