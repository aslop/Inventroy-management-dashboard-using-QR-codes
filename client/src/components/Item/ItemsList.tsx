import { FC } from 'react';
import { Table } from '../Table/Table';

interface IProps {
  items: any[];
}

export const ItemsList: FC<IProps> = ({ items }) => {
  if (!items) {
    return null;
  }

  return <Table items={items} />;
};
