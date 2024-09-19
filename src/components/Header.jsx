import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
} from "@heroicons/react/16/solid";
import { useState } from "react";
import SearchBar from "./SearchBar";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const firstbar = "md:block hidden";
  const secondbar = "md:hidden w-full flex justify-center border-b p-2";
  const location = useLocation();
  const cart = useSelector((store) => store.cart.items);
  return (
    <div>
      <div className="border shadow-sm">
        <div className="max-w-[1190px] mx-auto flex justify-between items-center">
          <Link to="/">
            <img
              src="https://marketplace.canva.com/EAFaFUz4aKo/2/0/1600w/canva-yellow-abstract-cooking-fire-free-logo-JmYWTjUsE-Q.jpg"
              className="h-20 w-20"
            />
          </Link>

          {location.pathname !== "/" && <SearchBar barClass={firstbar} />}
          <div className="flex items-center gap-4">
            <MagnifyingGlassIcon
              onClick={() => {
                setShowSearchBar(!showSearchBar);
              }}
              className="h-8 w-8 md:hidden block cursor-pointer"
            />
            <Link to="/cart">
              <ShoppingCartIcon className="h-8 w-8" />
            </Link>
            {cart.length}
          </div>
        </div>
      </div>
      <div className="absolute w-full bg-white">
        {showSearchBar && <SearchBar barClass={secondbar} />}
      </div>
    </div>
  );
};

export default Header;
