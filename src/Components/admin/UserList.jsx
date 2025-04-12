// src/components/UserList.jsx
import { useState, useEffect } from 'react';
import { adminInstance } from '../../config/axiosConfig';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await adminInstance.get('/admin/users');

        if (response.status !== 200) {
          throw new Error('Failed to fetch users');
        }

        setUsers(response.data.users);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Handle block/unblock user
  const handleBlockUnblock = async (userId, action) => {
    const isBlock = action === 'block';
    const confirmMessage = isBlock
      ? 'Are you sure you want to block this user?'
      : 'Are you sure you want to unblock this user?';

    if (!window.confirm(confirmMessage)) {
      return;
    }

    try {
      setLoading(true);
      const endpoint = isBlock ? `/admin/block/${userId}` : `/admin/unblock/${userId}`;
      const response = await adminInstance.put(endpoint);

      if (response.status !== 200) {
        throw new Error(`Failed to ${action} user`);
      }

      // Update the user list with the new isActive status
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, isActive: !isBlock } : user
        )
      );

      setError(null);
    } catch (err) {
      setError(err.message || `Failed to ${action} user`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          User Management
        </h1>

        {loading && (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md mb-6">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && users.length === 0 && (
          <div className="text-center text-gray-600">
            <p>No users found.</p>
          </div>
        )}

        {!loading && !error && users.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">
                    Name
                  </th>
                  <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">
                    Email
                  </th>
                  <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">
                    Role
                  </th>
                  <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">
                    Created At
                  </th>
                  <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">
                    Status
                  </th>
                  <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 text-gray-900">{user.name}</td>
                    <td className="py-4 px-6 text-gray-600">{user.email}</td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${
                          user.role === 'author'
                            ? 'bg-green-100 text-green-800'
                            : user.role === 'admin'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-600">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${
                          user.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {user.isActive ? 'Active' : 'Blocked'}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      {user.role !== 'admin' && (
                        <button
                          onClick={() =>
                            handleBlockUnblock(user._id, user.isActive ? 'block' : 'unblock')
                          }
                          className={`px-4 py-2 text-sm font-medium rounded-md text-white ${
                            user.isActive
                              ? 'bg-red-600 hover:bg-red-700'
                              : 'bg-green-600 hover:bg-green-700'
                          } transition-colors`}
                          disabled={loading}
                        >
                          {user.isActive ? 'Block' : 'Unblock'}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;