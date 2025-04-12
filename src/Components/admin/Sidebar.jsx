// src/components/Sidebar.jsx
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaUsers, FaBook, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    // Remove tokens from localStorage
    localStorage.removeItem('admin_access_token');
    localStorage.removeItem('user_id');
    // Navigate to login page
    navigate('/admin/login');
    // Close sidebar on mobile
    setIsOpen(false);
  };

  const navItems = [
    { name: 'Users', path: '/admin/users', icon: <FaUsers /> },
    { name: 'Content', path: '/admin/content', icon: <FaBook /> },
    {
      name: 'Logout',
      path: null, // No path since it's handled programmatically
      icon: <FaSignOutAlt />,
      action: handleLogout, // Custom action for logout
    },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 text-gray-800"
        onClick={toggleSidebar}
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-gray-800 text-white transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition-transform duration-300 ease-in-out z-40`}
      >
        <div className="flex items-center justify-center h-16 border-b border-gray-700">
          <h2 className="text-xl font-bold">Admin Panel</h2>
        </div>
        <nav className="mt-6">
          {navItems.map((item) => (
            item.action ? (
              <button
                key={item.name}
                onClick={item.action}
                className="flex items-center w-full px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors text-left"
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </button>
            ) : (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors ${
                    isActive ? 'bg-gray-700 text-white' : ''
                  }`
                }
                onClick={() => setIsOpen(false)} // Close sidebar on mobile click
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </NavLink>
            )
          ))}
        </nav>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-30"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;