import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosConfig";
import PostCard from "./PostCard";

const ReaderHomePage = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    console.log("Fetching posts...");
    const fetchPosts = async () => {
      try {
        const [posts, categories] = await Promise.all([
          axiosInstance.get("/author/posts"),
          axiosInstance.get("/author/categories"),
        ]);
        setPosts(posts.data.posts);
        setCategories(categories.data.categories);
      } catch (err) {
        setError("Error fetching posts");
        console.error(err);
      }
    };
    fetchPosts();
  }, []);

  function handleLogout() {
    localStorage.removeItem("user_access_token");
    localStorage.removeItem("user_id");
    navigate("/login");
  }

  const filteredPosts =
    activeCategory === "All" ? posts : posts.filter((post) => post.category.name === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-gray-900 to-indigo-900 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              BlogVerse
            </div>
            <button
              className="md:hidden text-white focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-white hover:text-purple-300 transition duration-200">
                Home
              </a>
              <a href="#" className="text-white hover:text-purple-300 transition duration-200">
                About
              </a>
              <a href="#" className="text-white hover:text-purple-300 transition duration-200">
                Categories
              </a>
              <a href="#" className="text-white hover:text-purple-300 transition duration-200">
                Contact
              </a>
              <button
                className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-5 py-2 rounded-lg transition duration-300 hover:from-red-600 hover:to-pink-600 transform hover:-translate-y-0.5 shadow-md"
                onClick={handleLogout}
              >
                Logout
              </button>
            </nav>
          </div>
          {isMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 space-y-3">
              <a href="#" className="block text-white hover:text-purple-300 transition duration-200 py-2">
                Home
              </a>
              <a href="#" className="block text-white hover:text-purple-300 transition duration-200 py-2">
                About
              </a>
              <a href="#" className="block text-white hover:text-purple-300 transition duration-200 py-2">
                Categories
              </a>
              <a href="#" className="block text-white hover:text-purple-300 transition duration-200 py-2">
                Contact
              </a>
              <button
                className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white px-5 py-2 rounded-lg transition duration-300 hover:from-red-600 hover:to-pink-600"
                onClick={handleLogout}
              >
                Logout
              </button>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-12 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Welcome to BlogVerse</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
            Discover amazing stories, insights, and knowledge from our community of writers.
          </p>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-1/4 order-1 lg:order-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Categories</h3>
              <ul className="space-y-2">
                {categories &&
                  categories.length > 0 &&
                  categories.map((category, index) => (
                    <li key={index}>
                      <button
                        onClick={() => setActiveCategory(category)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition duration-200 ${
                          activeCategory === category
                            ? "bg-indigo-100 text-indigo-700 font-medium"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {category.name}
                      </button>
                    </li>
                  ))}
              </ul>
            </div>
          </aside>

          <main className="w-full lg:w-3/4 order-2 lg:order-2">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              {activeCategory === "All" ? "Latest Posts" : activeCategory + " Posts"}
            </h2>

            {error && <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">{error}</div>}

            {filteredPosts.length === 0 ? (
              <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <p className="text-xl text-gray-600">No posts available in this category.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredPosts.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                BlogVerse
              </div>
              <p className="text-gray-400 mt-2">Discover amazing stories and insights</p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-200">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-200">
                Contact
              </a>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} BlogVerse. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ReaderHomePage;