import { useAuth } from '../hooks';
import { Link } from 'react-router-dom';
import { Home, User } from 'react-feather';

export const SideNav = () => {
  const { logout, currentUser } = useAuth();

  return (
    <div className="w-64 h-screen flex flex-col shadow-lg text-gray-600 p-3 color-white justify-between bg-white">
      <ul className="text-sm">
        {currentUser ? (
          <li className="mb-4">
            <Link to={'/'} className="flex items-center p-2 hover:bg-gray-100 hover:text-blue-600">
              <Home size={18} className="mr-2 text-blue-400" />
              <span>Home</span>
            </Link>
          </li>
        ) : null}

        {currentUser ? null : (
          <li className="mb-4">
            <Link
              to={'/login'}
              className="flex items-center p-2 hover:bg-gray-100 hover:text-blue-600"
            >
              <User size={18} className="mr-2 text-blue-400" />
              <span>Login</span>
            </Link>
          </li>
        )}

        <li>
          <Link
            to={'/register'}
            className="flex items-center p-2 hover:bg-gray-100 hover:text-blue-600"
          >
            <User size={18} className="mr-2 text-blue-400" />
            <span>Register</span>
          </Link>
        </li>
      </ul>

      <button
        onClick={async () => {
          await logout();
        }}
        className="border border-red-300 text-red-300 hover:bg-red-300 hover:text-white text-sm px-4 py-2 rounded-md"
      >
        Logout
      </button>
    </div>
  );
};
