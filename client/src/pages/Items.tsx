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
      <div className="flex flex-row items-center justify-between mb-4 sticky top-0 bg-white py-6">
        <h1 className="font-bold text-3xl text-gray-700">Items</h1>
        <button
          onClick={toggleForm}
          className={`flex flex-row items-center justify-center focus:outline-none text-white p-2 rounded-md text-sm transition-all ${
            showForm ? 'bg-red-400' : 'bg-indigo-400'
          }`}
        >
          {showForm ? (
            <MinusCircle size={16} className="mr-2" />
          ) : (
            <PlusCircle size={16} className="mr-2" />
          )}
          {showForm ? 'Hide' : 'New'}
        </button>
      </div>

      {showForm ? <ItemForm items={items} setItems={setItems} toggleForm={toggleForm} /> : null}

      <ItemsList items={items} />
    </div>
  );
};
