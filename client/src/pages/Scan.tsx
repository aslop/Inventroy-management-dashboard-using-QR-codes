import { useState } from 'react';
import QrReader from 'react-qr-reader';

const FACING_MODE_USER = 'user';
const FACING_MODE_ENVIRONMENT = 'environment';

export const Scan = () => {
  const [hasScanned, setHasScanned] = useState(false);
  const [qrResult, SetQrResult] = useState();
  const [facing, setFacing] = useState('environment');

  const handleError = (e: any) => {
    console.log(e);
  };

  const handleScan = (scan: any) => {
    if (scan && !hasScanned) {
      setHasScanned(true);
      console.log(scan);
    }
  };

  return (
    <div>
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

      {hasScanned ? (
        <div className="w-full flex justify-center mt-4">
          <button
            className="bg-blue-400 px-2 py-2 rounded text-white w-full md:w-auto"
            onClick={() => {
              setHasScanned(false);
            }}
          >
            Reset Camera
          </button>
        </div>
      ) : null}
    </div>
  );
};
