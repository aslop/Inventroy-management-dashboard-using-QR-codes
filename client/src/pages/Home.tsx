import { useEffect, useState } from 'react';
import axios from 'axios';

export const Home = () => {
  const [authedData, setAuthedData] = useState(null);

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

  return (
    <div className="p-6">
      <h1 className="font-bold text-xl text-gray-800 mb-4">
        Home, should be accesible only if you are logged in
      </h1>

      <div className="border rounded-md p-6 flex flex-col">
        <span className="text-gray-500 mb-2">Data from server: </span>
        <span className="font-bold text-gray-800 break-words">{JSON.stringify(authedData)}</span>
      </div>
    </div>
  );
};
