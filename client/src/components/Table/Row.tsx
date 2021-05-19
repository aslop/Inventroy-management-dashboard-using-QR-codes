import { FC, SyntheticEvent } from 'react';
import { Edit, Trash } from 'react-feather';
import { useHistory } from 'react-router-dom';

interface IProps {
  item: {
    id: string;
    name: string;
    amount: number;
    properties: any;
  };
}

export const Row: FC<IProps> = ({ item: { id, name, properties, amount } }) => {
  const history = useHistory();

  if (!id) {
    return null;
  }

  const redirectToItem = (ev: SyntheticEvent) => {
    ev.stopPropagation();

    history.push(`/items/${id}`);
  };

  return (
    <tr
      className="border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
      onClick={redirectToItem}
    >
      <td className="py-3 px-6 text-left">
        <div className="flex items-center">
          <span>{name}</span>
        </div>
      </td>
      <td className="py-3 px-6 text-center">
        <div className="flex items-center">{JSON.stringify(properties)}</div>
      </td>
      <td className="py-3 px-6 text-left">
        <div className="flex items-center">
          <span>{amount}</span>
        </div>
      </td>

      <td className="py-3 px-6 text-center">
        <div className="flex item-center justify-end">
          <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110 cursor-pointer">
            <Edit size={16} />
          </div>
          <div className="w-4 transform hover:text-red-400 hover:scale-110 cursor-pointer">
            <Trash size={16} />
          </div>
        </div>
      </td>
    </tr>
  );
};
