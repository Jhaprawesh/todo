import { useState, useEffect } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

const getLocalStorageData = () => {
  let list = localStorage.getItem("lists");
  if (list) {
    return localStorage.getItem("lists");
  }
};

function App() {
  const [count, setCount] = useState("");
  const [value, setValue] = useState([]);
  // GET DATA

  const handleClick = () => {
    console.log("clicked");
    !count
      ? alert("Please enter a value")
      : setValue(
          [
            ...value,
            { title: count, added: new Date().toLocaleTimeString() },
          ].reverse()
        );

    setCount("");
  };

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(value));
  }, [value]);

  // remove
  const handleRemove = (index) => {
    console.log("Removed");
    const newValue = value.filter((_, i) => i !== index);
    setValue(newValue);
  };

  return (
    <div>
      <>
        <div>
          <h3 className=" text-center py-4 text-white bg-indigo-600 font-medium text-2xl">
            Add Your Todo List
          </h3>
        </div>
        <div>
          <div className=" flex justify-center mt-5">
            <input
              className=" p-3 rounded border-red-500 "
              type="text"
              value={count}
              onChange={(e) => {
                setCount(e.target.value);
              }}
            />

            <button
              onClick={handleClick}
              className=" bg-indigo-600 text-white  rounded p-3 mx-5 "
            >
              Add Note
            </button>
          </div>
        </div>
        <div className=" relative">
          <ul className="space-y-3  pl-4 mt-5  absolute top-1/2 left-1/2 transform -translate-x-1/2 w-1/2">
            {value.length == 0 ? (
              <p className=" capitalize "> no todo</p>
            ) : (
              value.map((v, index) => (
                <li
                  key={index}
                  className=" bg-white p-3 list-disc flex justify-between items-center rounded  overscroll-contain"
                >
                  {v.title} <span>{v.added} </span>
                  <button
                    className=" capitalize bg-indigo-500 text-white  rounded p-1 mx-5"
                    onClick={() => handleRemove(index)}
                  >
                    <FaRegTrashAlt />
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      </>
    </div>
  );
}

export default App;
