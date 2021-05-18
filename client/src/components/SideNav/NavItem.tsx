import { FC } from 'react';
import { Link } from 'react-router-dom';

interface IProps {
  to: string;
}

export const NavItem: FC<IProps> = ({ children, to }) => {
  return (
    <li>
      <Link to={to} className="flex items-center p-2 hover:bg-gray-100 hover:text-blue-600">
        {children}
      </Link>
    </li>
  );
};
