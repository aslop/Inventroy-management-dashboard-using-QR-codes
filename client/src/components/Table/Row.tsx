import { FC } from 'react';
import { Edit, Trash } from 'react-feather';
import QRCode from 'qrcode.react';

interface IProps {
  item: {
    id: string;
    name: string;
    properties: any;
  };
}

export const Row: FC<IProps> = ({ item: { id, name, properties } }) => {
  if (!id) {
    return null;
  }

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-100 cursor-pointer">
      <td className="py-3 px-6 text-left whitespace-nowrap">
        <div className="flex items-center">
          <span className="font-medium">{id}</span>
        </div>
      </td>
      <td className="py-3 px-6 text-left">
        <div className="flex items-center">
          <span>{name}</span>
        </div>
      </td>
      <td className="py-3 px-6 text-center">
        <div className="flex items-center">{JSON.stringify(properties)}</div>
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
