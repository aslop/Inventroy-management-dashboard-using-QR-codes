import { useState } from 'react';

export const useIncrement = (
  initial: number,
  step = 1,
  lowerLimit = 0
): [
  number,
  { inc: () => void; deinc: () => void; set: (v: number) => void; reset: () => void }
] => {
  const [value, setValue] = useState(initial);
  const inc = () => setValue((prev) => prev + step);
  const deinc = () => setValue((prev) => (prev === lowerLimit ? lowerLimit : prev - step));
  const set = (v: number) => setValue(() => v);
  const reset = () => setValue(() => initial);

  return [
    value,
    {
      inc,
      deinc,
      set,
      reset,
    },
  ];
};
