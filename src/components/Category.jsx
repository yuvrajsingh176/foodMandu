import { PlusCircleIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";
const Category = ({ item }) => {
  const dispatch = useDispatch();
  const handleAddtoCart = () => {
    dispatch(addItem(item));
  };
  return (
    <div
      onClick={handleAddtoCart}
      className="border-b-[1px] p-2 flex justify-between gap-4 hover:shadow-md cursor-pointer  "
    >
      <div>
        <p className="text-xl hover:text-red-400">{item?.name}</p>
        <p className="text-gray-500">{item?.productDesc}</p>
      </div>
      <div className="flex gap-1 items-center ">
        {item?.price}
        <PlusCircleIcon className="h-6 w-6 text-[#00A145]" />
      </div>
    </div>
  );
};

export default Category;
