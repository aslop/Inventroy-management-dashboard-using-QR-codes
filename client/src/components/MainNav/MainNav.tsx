import { useAuth } from '../../hooks';
import { Home, User, Archive, Camera } from 'react-feather';
import { NavItem } from './NavItem';

export const MainNav = () => {
  const { logout, currentUser } = useAuth();

  return (
    <div className="flex flex-row shadow-lg text-gray-600 p-3 color-white justify-between bg-white w-full">
      <div className="flex flex-row">
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

        {currentUser ? (
          <NavItem to="/scan">
            <Camera size={18} className="mr-2 text-blue-400" />
            <span>Scan</span>
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
    </div>
  );
};
