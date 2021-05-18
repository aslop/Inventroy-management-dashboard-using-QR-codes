import { FC } from 'react';

interface IProps {
  items: any[];
}

export const ItemsList: FC<IProps> = ({ items }) => {
  if (!items) {
    return null;
  }

  return (
    <div className="flex flex-row flex-wrap">
      {items.map((item: any) => {
        return (
          <div className="text-sm p-2 w-3/12 break-words" key={item.id}>
            <div className="border border-blue-300 rounded bg-blue-100 p-4">
              <div>Id: {item.id}</div>
              <div>Name: {item.name}</div>
              <div>{JSON.stringify(item.properties)}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
