// src/components/Header.jsx
const Header = () => {
    // Placeholder for admin name; replace with actual auth data
    const adminName = 'Admin User'; // You can fetch this from your auth context or API
  
    return (
      <header className="bg-white shadow-md fixed top-0 left-0 right-0 h-16 z-20 lg:pl-64">
        <div className="flex items-center justify-between h-full px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold text-gray-800 hidden lg:block">
            Dashboard
          </h2>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">{adminName}</span>
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-600 font-semibold">
                {adminName.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </header>
    );
  };
  
  export default Header;