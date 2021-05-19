import { FC, SyntheticEvent, useState } from 'react';
import { Edit, Trash, Archive } from 'react-feather';
import { Link } from 'react-router-dom';
import { CustomPropertiesBlock } from './CustomPropertiesBlock';
import { useToggle } from '../../hooks';

import axios from 'axios';

interface IProps {
  item: {
    id: string;
    name: string;
    amount: number;
    properties: any;
  };
}

export const Row: FC<IProps> = ({ item: { id, name, properties, amount } }) => {
  const [shouldHide, setShouldHide] = useState(false);
  const [showModal, toggleModal] = useToggle();

  const handleDelete = async () => {
    await axios.delete(`/api/items/${id}`, {
      withCredentials: true,
    });
    setShouldHide(true);
  };

  if (!id || shouldHide) {
    return null;
  }

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-8 w-8 bg-indigo-100 rounded-full flex items-center justify-center">
            <Archive size={16} className="text-indigo-400" />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900 hover:text-indigo-500 text-md">
              <Link to={`/items/${id}`}>{name} </Link>
            </div>
            <div className="text-sm text-gray-500">{id}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap border-r border-l">
        <CustomPropertiesBlock properties={properties} />
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm border-r font-bold text-indigo-500">
        {amount}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        {showModal ? (
          <div className="flex flex-row items-center justify-end">
            <button
              onClick={async () => {
                handleDelete();
              }}
              className="p-2 rounded mx-2 focus:outline-none hover:text-red-400 border hover:border-red-400"
            >
              Confirm deletion
            </button>
            <button
              onClick={toggleModal}
              className="bg-gray-400 text-white p-2 rounded mx-2 focus:outline-none"
            >
              Cancel
            </button>
          </div>
        ) : (
          <span className="flex items-center">
            <Trash
              size={18}
              className="ml-auto text-gray-500 hover:text-red-400 cursor-pointer"
              onClick={toggleModal}
            />
          </span>
        )}
      </td>
    </tr>
  );
};
