import { FC } from 'react';

export const CustomPropertiesBlock: FC<any> = ({ properties }) => {
  if (!properties) {
    return null;
  }

  return (
    <div>
      {Object.keys(properties).map((key: any, i: number) => {
        return (
          <div key={i} className="flex flex-row justify-between text-sm my-1">
            <div className="text-gray-400">{key}: </div>
            <div className="text-gray-600">{properties[key]}</div>
          </div>
        );
      })}
    </div>
  );
};
