import { useAuth } from '../hooks';
import { Link } from 'react-router-dom';

export const MainNav = () => {
  const { logout, currentUser } = useAuth();

  return (
    <div className="w-full shadow-lg text-gray-600 p-3 color-white flex flex-row justify-between items-center bg-white">
      <div>
        {currentUser ? (
          <Link to={'/'}>
            <span className="mx-2 rounded-md">Home</span>
          </Link>
        ) : null}
        {currentUser ? null : (
          <Link to={'/login'}>
            <span className="mx-4 rounded-md">Login</span>
          </Link>
        )}
        <Link to={'/register'}>
          <span className="mx-2 rounded-md">Register</span>
        </Link>
      </div>

      <button
        onClick={async () => {
          await logout();
        }}
        className="bg-red-400 text-sm text-white px-4 py-2 rounded-md"
      >
        Logout
      </button>
    </div>
  );
};
