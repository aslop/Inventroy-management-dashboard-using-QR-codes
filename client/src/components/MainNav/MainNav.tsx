import { useRef } from 'react';
import { Menu, X } from 'react-feather';
import { NavLink } from 'react-router-dom';
import { useToggle, useClickOutside, useAuth } from '../../hooks';

const navLinks = [
  { name: 'Home', href: '/', shouldBeAuthed: true },
  { name: 'Items', href: '/items', shouldBeAuthed: true },
  { name: 'Scan', href: '/scan', shouldBeAuthed: true },
  { name: 'Register', href: '/register', shouldBeAuthed: false },
];

export const MainNav = () => {
  const { logout, currentUser } = useAuth();
  const [showMenu, toggleMenu] = useToggle();
  const expandedMenuRef = useRef<HTMLDivElement>(null);
  useClickOutside(expandedMenuRef, () => {
    toggleMenu();
  });

  return (
    <>
      <div className="w-full bg-indigo-500 hidden md:flex items-center p-3 text-md text-sm text-white">
        <div className="font-bold pr-4 border-r border-white">Logo</div>

        {navLinks.map(({ href, name, shouldBeAuthed }) => {
          if (shouldBeAuthed && !currentUser) {
            return null;
          }

          return (
            <NavLink
              exact={true}
              to={href}
              key={name}
              activeClassName="bg-indigo-400 rounded-md"
              className="mx-3 px-2 py-1"
            >
              {name}
            </NavLink>
          );
        })}

        <button
          onClick={async () => {
            await logout();
          }}
          className="ml-auto bg-red-400 rounded-md px-2 py-1 focus:outline-none hover:bg-red-500 cursor-pointer"
        >
          logout
        </button>
      </div>

      <div className="w-full flex flex-col justify-center md:hidden ">
        <div className="bg-indigo-500 text-white p-3 flex">
          <div>Logo</div>
          {showMenu ? (
            <X onClick={toggleMenu} size={24} className="ml-auto" />
          ) : (
            <Menu onClick={toggleMenu} size={24} className="ml-auto" />
          )}
        </div>

        {/* Expanding menu */}
        {showMenu ? (
          <div
            ref={expandedMenuRef}
            className="bg-white shadow-md pb-6 pt-3 absolute z-10 w-full top-12 left-0 flex flex-col"
          >
            {navLinks.map(({ href, name, shouldBeAuthed }) => {
              if (shouldBeAuthed && !currentUser) {
                return null;
              }

              return (
                <NavLink
                  onClick={toggleMenu}
                  exact={true}
                  to={href}
                  key={name}
                  activeClassName="text-indigo-400 font-bold underline rounded-md"
                  className="mx-3 px-2 py-1 my-2 "
                >
                  {name}
                </NavLink>
              );
            })}
          </div>
        ) : null}
        {/* Expanding menu */}
      </div>
    </>
  );
};
