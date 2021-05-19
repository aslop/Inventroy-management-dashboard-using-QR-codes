import { FC } from 'react';

// Table Components
import { Row } from './Row';

interface IProps {
  items: any[];
}

export const Table: FC<IProps> = ({ items }) => {
  return (
    <div className="overflow-x-auto">
      <div className="font-sans overflow-hidden">
        <div className="w-full">
          <div className="rounded-md overflow-hidden">
            <table className="min-w-max w-full table-auto">
              {/* Head */}
              <thead>
                <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-left">Properties</th>
                  <th className="py-3 px-6 text-left">Amount</th>
                  <th className="py-3 px-6 text-right">Actions</th>
                </tr>
              </thead>
              {/* /Head */}

              {/* Body */}
              <tbody className="text-gray-600 text-sm font-light">
                {items.map((item, i) => {
                  return <Row key={i} item={item} />;
                })}
              </tbody>
              {/* /BODY */}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
