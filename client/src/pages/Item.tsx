import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import QRCode from 'qrcode.react';
import saveSvgAsPng from 'save-svg-as-png';
import { Save } from 'react-feather';
interface ParamTypes {
  id: string;
}

interface IItem {
  id: string;
  name: string;
  properties?: {} | [];
  amount: number;
}

export const Item = () => {
  const { id } = useParams<ParamTypes>();
  const [item, setItem] = useState<IItem>();

  const downloadQrAsPng = () => {
    const imageOptions = {
      scale: 5,
      encoderOptions: 1,
      backgroundColor: 'white',
    };

    if (!item) {
      return null;
    }

    saveSvgAsPng.saveSvgAsPng(document.getElementById('svg-qr'), `${item.name}.png`, imageOptions);
  };

  useEffect(() => {
    async function fetchMyAPI() {
      try {
        const { data } = await axios.get(
          `/api/items/${id}`,

          {
            withCredentials: true,
          }
        );

        setItem(data);
      } catch (e) {
        if (e.response.status === 401) {
          console.log('Not Authorized');
        }
      }
    }

    fetchMyAPI();
  }, [id]);

  if (!item) {
    return null;
  }

  return (
    <div className="p-6 w-full flex-initial">
      <div className="flex flex-row items-center justify-between mb-4">
        <h1 className="font-bold text-3xl text-gray-700">{item.name}</h1>
      </div>

      <div className="flex flex-row items-center">
        <div>
          <QRCode id="svg-qr" value={id} renderAs="svg" size={240} />
        </div>

        <div className="ml-4">
          <div className="flex flex-col">
            <span>Id: {item.id}</span>
            <span>Name: {item.name}</span>
            <span>Amount: {item.amount}</span>
            <span>{JSON.stringify(item.properties)}</span>
          </div>

          <button
            onClick={downloadQrAsPng}
            className="bg-indigo-500 flex items-center text-white px-4 py-2 rounded-md mt-4"
          >
            <Save size={18} className="mr-2" />
            Download this QR
          </button>
        </div>
      </div>
    </div>
  );
};
