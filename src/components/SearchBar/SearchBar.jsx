import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

function SearchBar({ value, onChange, handleSearch, onClearSearch }) {
  return (
    <div className="w-80 flex items-center px-4 bg-slate-200 rounded-3xl">
      <input
        type="text"
        placeholder="Pesquisar notas"
        className="w-full text-xs bg-transparent py-[11px] outline-none"
        value={value}
        onChange={onChange}
      />

      {value && (
        <IoMdClose
          className="text-xl text-slate-500 cursor-pointer hover:text-red-400 mr-3"
          onClick={onClearSearch}
        />
      )}

      <FaMagnifyingGlass
        className="text-slate-500 cursor-pointer hover:text-black"
        onClick={handleSearch}
      />
    </div>
  );
}

export default SearchBar;
