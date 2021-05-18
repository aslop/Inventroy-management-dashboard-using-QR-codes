import { useState, useEffect } from 'react';
import axios from 'axios';

import { ItemForm } from '../components/Item/ItemForm';

export const Items = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchMyAPI() {
      try {
        const { data } = await axios.get(
          '/api/items',

          {
            withCredentials: true,
          }
        );

        setItems(data);
      } catch (e) {
        if (e.response.status === 401) {
          console.log('Not Authorized');
        }
      }
    }

    fetchMyAPI();
  }, []);

  return (
    <div className="p-6 w-full">
      <h1 className="font-bold text-xl text-gray-800 mb-4">Items - Test page</h1>

      <ItemForm items={items} setItems={setItems} />

      {items ? (
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
      ) : null}
    </div>
  );
};
