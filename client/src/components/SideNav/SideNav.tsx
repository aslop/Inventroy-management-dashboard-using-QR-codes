import { useAuth } from '../../hooks';
import { Home, User, Archive } from 'react-feather';
import { NavItem } from './NavItem';

export const SideNav = () => {
  const { logout, currentUser } = useAuth();

  return (
    <div className="w-64 h-screen flex flex-col shadow-lg text-gray-600 p-3 color-white justify-between bg-white sticky top-0 left-0">
      <ul className="text-sm">
        {currentUser ? (
          <NavItem to="/">
            <Home size={18} className="mr-2 text-blue-400" />
            <span>Home</span>
          </NavItem>
        ) : null}

        {currentUser ? (
          <NavItem to="/items">
            <Archive size={18} className="mr-2 text-blue-400" />
            <span>Items</span>
          </NavItem>
        ) : null}

        {currentUser ? null : (
          <NavItem to="/login">
            <User size={18} className="mr-2 text-blue-400" />
            <span>Login</span>
          </NavItem>
        )}

        <NavItem to="/register">
          <User size={18} className="mr-2 text-blue-400" />
          <span>Register</span>
        </NavItem>
      </ul>

      {currentUser ? (
        <button
          onClick={async () => {
            await logout();
          }}
          className="border border-red-300 text-red-300 hover:bg-red-300 hover:text-white text-sm px-4 py-2 rounded-md"
        >
          Logout
        </button>
      ) : null}
    </div>
  );
};
