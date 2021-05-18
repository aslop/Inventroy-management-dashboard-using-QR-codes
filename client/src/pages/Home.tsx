import { useEffect, useState } from 'react';
import axios from 'axios';

export const Home = () => {
  const [authedData, setAuthedData] = useState(null);
  const [itemData, setItemData] = useState('');

  useEffect(() => {
    async function fetchMyAPI() {
      try {
        const {
          data: { user },
        } = await axios.get(
          '/shouldBeAuthed',

          {
            withCredentials: true,
          }
        );

        setAuthedData(user);
      } catch (e) {
        if (e.response.status === 401) {
          console.log('Not Authorized');
        }
      }
    }

    fetchMyAPI();
  }, []);

  if (!authedData) {
    return null;
  }

  const handleTestFormSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const { data } = await axios.post('/api/items', {
        name: itemData,
        properties: {
          propA: 'propA',
          propB: 'propB',
          propC: {
            name: 'propC',
            body: 'this is prop C',
            isDynamic: true,
            number: 12321,
          },
        },
      });

      console.log(data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div className="p-6">
      <h1 className="font-bold text-xl text-gray-800 mb-4">
        Home, should be accesible only if you are logged in
      </h1>

      <div className="border rounded-md p-6 flex flex-col">
        <span className="text-gray-500 mb-2">Data from server: </span>
        <span className="font-bold text-gray-800">{JSON.stringify(authedData)}</span>
      </div>

      <form onSubmit={handleTestFormSubmit} className="border p-6 my-6 rounded-md">
        <h2 className="mb-4 font-bold">Test Form</h2>
        <div>
          <span>Name: </span>
          <input
            className="bg-gray-100 rounded p-2"
            onChange={(e) => {
              setItemData(e.target.value);
            }}
          />
        </div>

        <button className="bg-blue-400 text-white rounded px-6 py-2 mt-6" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};
