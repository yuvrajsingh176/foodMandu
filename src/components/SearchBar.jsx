import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = (props) => {
  const { barClass } = props;
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  return (
    <div className={barClass + " flex flex-col md:flex-row gap-4 justify-center items-center"}>
      <input
        type="search"
        value={searchText}
        className="border w-80 mr-2 p-2"
        placeholder="Restaurants or cuisine"
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.code === "Enter") {
            navigate("/restaurants?query=" + searchText);
          }
        }}
      />
      <button
        onClick={() => {
          navigate("/restaurants?query=" + searchText);
        }}
        className=" p-2 bg-[#ffdd00]"
      >
        Find Restaurants
      </button>
    </div>
  );
};
export default SearchBar;
