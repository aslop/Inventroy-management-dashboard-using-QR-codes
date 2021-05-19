import { useState, SyntheticEvent, FC } from 'react';
import axios from 'axios';
import { PlusCircle, MinusCircle } from 'react-feather';
import { CustomPropertiesBlock } from '../Table/CustomPropertiesBlock';

interface IProps {
  items: any[];
  setItems: (e: any) => void;
  toggleForm: () => void;
}

export const ItemForm: FC<IProps> = ({ items, setItems, toggleForm }) => {
  const [itemName, setItemName] = useState('');
  const [itemAmount, setItemAmount] = useState(0);
  const [inputList, setInputList] = useState<any>([]);

  const handleInputChange = (e: any, index: any) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  const handleRemoveClick = (index: number) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const handleAddClick = () => {
    setInputList([...inputList, { name: '', value: '' }]);
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    if (inputList.length > 0) {
      const {
        data: { item },
      } = await axios.post(
        '/api/items',
        {
          name: itemName,
          amount: itemAmount,
          properties: inputList.reduce((map: any, obj: any) => {
            map[
              obj.name
                .toLowerCase()
                .replace(/ /g, '-')
                .replace(/[-]+/g, '-')
                .replace(/[^\w-]+/g, '')
            ] = obj.value;
            return map;
          }, {}),
        },
        { withCredentials: true }
      );

      toggleForm();
      setItems([...items, { ...item, amount: itemAmount }]);
    } else {
      const {
        data: { item },
      } = await axios.post(
        '/api/items',
        {
          name: itemName,
          amount: itemAmount,
        },
        { withCredentials: true }
      );

      toggleForm();
      setItems([...items, { ...item, amount: itemAmount }]);
    }
  };

  return (
    <form
      className="border-none md:border rounded-md my-4 p-0 md:p-6 bg-gray-100 flex flex-col md:flex-row"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div className="border border-gray-300 rounded-md p-2 md:p-6 w-full md:w-8/12">
        <div className="flex flex-col mb-4">
          <span className="mb-2">Name: </span>

          <input
            name="name"
            placeholder="My awesome item"
            className="border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-200"
            onChange={(e) => {
              setItemName(e.target.value);
            }}
          />
        </div>

        <div className="flex flex-col mb-4">
          <span className="mb-2">Amount: </span>

          <input
            name="amount"
            type="number"
            placeholder="My awesome item"
            className="border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-200"
            onChange={(e) => {
              setItemAmount(parseInt(e.target.value));
            }}
          />
        </div>

        {inputList.map((x: any, i: number) => {
          return (
            <div className="my-4 flex flex-col border bg-white p-6 border-gray-200" key={i}>
              <span className="mb-2 text-gray-500 text-sm">Custom property name:</span>
              <input
                name="name"
                placeholder="Color"
                value={x.name}
                className="bg-gray-100 rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-200 mb-4"
                onChange={(e) => handleInputChange(e, i)}
              />

              <span className="mb-2 text-gray-500 text-sm">Custom property value:</span>
              <input
                name="value"
                value={x.value}
                placeholder="Red"
                className="bg-gray-100 rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-200"
                onChange={(e) => handleInputChange(e, i)}
              />

              <div className="flex flex-row my-2">
                {inputList.length && (
                  <button
                    className="text-sm border border-red-400 text-red-400  hover:bg-red-400 hover:text-white flex flex-row items-center rounded-md py-1 px-2 mt-4 ml-auto"
                    onClick={() => handleRemoveClick(i)}
                  >
                    <MinusCircle className="mr-2" size={16} />
                    <span>Remove custom property</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
        <button
          className="text-sm border border-indigo-400 text-indigo-400 hover:bg-indigo-400 hover:text-white flex flex-row items-center rounded-md py-1 px-2 mt-4 mb-6 ml-auto"
          onClick={handleAddClick}
        >
          <PlusCircle className="mr-2" size={16} />
          <span>Add custom property</span>
        </button>
      </div>

      <div className="w-full md:w-4/12 p-2 md:p-6">
        <div className="static md:sticky top-0 md:top-32">
          <span className="text-xl font-bold">New item:</span>
          <div className="font-medium text-md text-gray-700 mt-8 mb-4">{itemName}</div>

          <div className="font-medium text-md text-gray-700 mt-8 mb-4">Amount</div>
          <div className="font-medium text-md text-gray-700 mt-8 mb-4">{itemAmount}</div>

          <CustomPropertiesBlock
            properties={inputList.reduce((map: any, obj: any) => {
              map[
                obj.name
                  .toLowerCase()
                  .replace(/ /g, '-')
                  .replace(/[-]+/g, '-')
                  .replace(/[^\w-]+/g, '')
              ] = obj.value;
              return map;
            }, {})}
          />

          <hr className="my-4" />
          <button
            onClick={handleSubmit}
            className="bg-green-400 text-white rounded-md py-2 px-4 w-full mt-6"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};
