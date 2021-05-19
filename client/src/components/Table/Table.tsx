import { FC } from 'react';

// Table Components
import { Row } from './Row';

interface IProps {
  items: any[];
  tableHeads: string[];
}

export const Table: FC<IProps> = ({ items, tableHeads }) => {
  if (items.length > 0) {
    return (
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {tableHeads.map((item, i) => {
                      return (
                        <th
                          key={i}
                          scope="col"
                          className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-left last:text-right"
                        >
                          {item}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {items.map((item) => (
                    <Row key={item.id} item={item} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="border border-dotted border-3 border-gray-400 rounded-md p-6 text-center font-bold text-sm text-gray-500">
        No items
      </div>
    );
  }
};
