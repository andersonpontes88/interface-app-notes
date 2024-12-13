/* eslint-disable react/prop-types */
import { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";

function TagInput({ tags, setTags }) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addNewTag = () => {
    if (inputValue.trim() !== "") {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addNewTag();
    }
  };

  const handleRemoveTag = (tagRemove) => {
    setTags(tags.filter((tag) => tag !== tagRemove));
  };

  return (
    <div>
      {tags?.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap mt-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="flex items-center gap-2 text-sm text-slate-900 bg-slate-100 px-3 py-1 rounded"
            >
              # {tag}
              <button
                onClick={() => {
                  handleRemoveTag(tag);
                }}
                className="hover:text-red-500"
              >
                <MdClose />
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-1 sm:gap-4 mt-3">
        <input
          type="text"
          value={inputValue}
          className="text-xs sm:text-sm bg-transparent border px-2 py-1 sm:px-3 sm:py-2 rounded w-16 sm:w-32 outline-none"
          placeholder="Add tags"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />

        <button
          className="w-5 h-5 sm:w-8 sm:h-8 flex rounded-[50%] items-center justify-center border border-blue-700 hover:bg-blue-700 hover:border-green-500 hover:border-[2px]"
          onClick={() => {
            addNewTag();
          }}
        >
          <MdAdd className="text-sm sm:text-2xl text-blue-700 hover:text-slate-300" />
        </button>
      </div>
    </div>
  );
}

export default TagInput;
