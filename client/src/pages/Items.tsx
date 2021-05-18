import { useState, useEffect } from 'react';
import axios from 'axios';
import { PlusCircle, MinusCircle } from 'react-feather';
// Hooks
import { useToggle } from '../hooks';

// Components
import { ItemForm } from '../components/Item/ItemForm';
import { ItemsList } from '../components/Item/ItemsList';

export const Items = () => {
  const [items, setItems] = useState([]);
  const [showForm, toggleForm] = useToggle(false);

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

      {items.length > 0 ? (
        <button
          className="border border-indigo-500 hover:bg-indigo-400 hover:text-white text-indigo-500 mb-4 rounded-md w-full py-3"
          onClick={toggleForm}
        >
          {showForm ? (
            <div className="flex flex-row items-center justify-center">
              <MinusCircle size={16} className="mr-2" />
              Hide form
            </div>
          ) : (
            <div className="flex flex-row items-center justify-center">
              <PlusCircle size={16} className="mr-2" />
              Add new item
            </div>
          )}
        </button>
      ) : null}

      {showForm || items.length <= 0 ? (
        <ItemForm items={items} setItems={setItems} toggleForm={toggleForm} />
      ) : null}

      <ItemsList items={items} />
    </div>
  );
};
