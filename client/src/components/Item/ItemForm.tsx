import { useState, SyntheticEvent, FC } from 'react';
import axios from 'axios';
import { PlusCircle, MinusCircle } from 'react-feather';

interface IProps {
  items: any[];
  setItems: (e: any) => void;
}

export const ItemForm: FC<IProps> = ({ items, setItems }) => {
  const [itemName, setItemName] = useState('');
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
      } = await axios.post('/api/items', {
        name: itemName,
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
      });

      setItems([...items, item]);
    } else {
      const {
        data: { item },
      } = await axios.post('/api/items', {
        name: itemName,
      });

      setItems([...items, item]);
    }
  };

  return (
    <form
      className="border rounded-md my-4 p-6"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <h1 className="text-xl font-bold ">New item:</h1>
      <hr className="my-4" />

      <div className="flex flex-col">
        <span className="mb-2">Name: </span>

        <input
          name="name"
          placeholder="My awesome item"
          className="bg-gray-200 rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-200"
          onChange={(e) => {
            setItemName(e.target.value);
          }}
        />
      </div>

      {inputList.map((x: any, i: number) => {
        return (
          <div className="my-4 flex flex-col" key={i}>
            <span className="mb-2 text-gray-500 text-sm">Custom property name:</span>
            <input
              name="name"
              placeholder="Color"
              value={x.name}
              className="bg-gray-200 rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-200 mb-4"
              onChange={(e) => handleInputChange(e, i)}
            />

            <span className="mb-2 text-gray-500 text-sm">Custom property value:</span>
            <input
              name="value"
              value={x.value}
              placeholder="Red"
              className="bg-gray-200 rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-200"
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

      <hr className="my-4" />
      <button
        onClick={handleSubmit}
        className="bg-green-400 text-white rounded-md py-2 px-4 w-full mt-6"
      >
        Submit
      </button>
    </form>
  );
};
