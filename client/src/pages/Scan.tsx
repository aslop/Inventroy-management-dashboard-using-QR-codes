import { useState } from 'react';
import QrReader from 'react-qr-reader';
import { useIncrement } from '../hooks';
import axios from 'axios';

const FACING_MODE_USER = 'user';
const FACING_MODE_ENVIRONMENT = 'environment';

export const Scan = () => {
  const [hasScanned, setHasScanned] = useState(false);
  const [amount, { inc, deinc, set, reset }] = useIncrement(1, 1, 0);
  const [action, setAction] = useState('add');

  const handleError = (e: any) => {
    console.log(e);
  };

  const handleScan = async (scan: any) => {
    if (scan && !hasScanned) {
      const { data } = await axios.post(
        `/api/items/scan/${scan}`,
        {
          action,
          amount,
        },
        {
          withCredentials: true,
        }
      );
      console.log('---[ Will post: ]---');
      console.log(data);
      setHasScanned(true);
      console.log('---[ Will post: ]---');
      // console.log('id', scan);
      // console.log('action', action);
      // console.log('amount', amount);
    }
  };

  return (
    <div className="p-6">
      <div className="h-auto w-full md:w-4/12 mx-auto rounded-md overflow-hidden">
        {hasScanned ? null : (
          <QrReader
            className="bg-blue-300"
            facingMode={FACING_MODE_ENVIRONMENT}
            delay={500}
            resolution={1200}
            style={{ width: '100%', height: '100%' }}
            onError={handleError}
            onScan={handleScan}
            showViewFinder={true}
          />
        )}
      </div>

      <div className="w-full md:w-4/12 mx-auto mt-2">
        <div className="flex flex-col items-center justify-center">
          <span className="my-2 font-bold">How many to {action}?</span>
          <div className="flex flex-row items-center justify-between w-full">
            <button className="bg-gray-200 py-2 px-4 rounded-md focus:outline-none" onClick={deinc}>
              -
            </button>
            <input
              type="text"
              pattern="[0-9]*"
              value={amount}
              className="bg-gray-100 p-2 text-center rounded-md"
              onChange={(e) => {
                var value = parseInt(e.target.value);
                var newValue = isNaN(value) ? 0 : value;
                set(newValue);
              }}
            />
            <button className="bg-gray-200 py-2 px-4 rounded-md focus:outline-none" onClick={inc}>
              +
            </button>
          </div>
          <span
            className="cursor-pointer rounded-md focus:outline-none mx-2 my-6 text-sm text-indigo-400"
            onClick={reset}
          >
            Reset
          </span>
        </div>

        <div className="flex justify-between w-full items-center">
          <button
            onClick={() => {
              setAction('add');
            }}
            className={`p-4 rounded-md focus:outline-none text-white text-sm ${
              action === 'add' ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Add to stock
          </button>
          <button
            onClick={() => {
              setAction('remove');
            }}
            className={`p-4 rounded-md focus:outline-none  text-sm ${
              action === 'remove' ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Remove from stock
          </button>
        </div>

        {hasScanned ? (
          <div className="w-full flex justify-center mt-4">
            <button
              className="border border-indigo-500 px-2 py-2 rounded text-indigo-500 w-full mt-6 hover:bg-indigo-500 hover:text-white"
              onClick={() => {
                setHasScanned(false);
              }}
            >
              Scan again
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};
