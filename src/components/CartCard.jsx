import { useDispatch } from "react-redux";
import { mototrcycle } from "../utils/constants";
import {  addItem, removeItem } from "../utils/cartSlice";

const CartCard = ({ data }) => {
  const dispatch = useDispatch();
  return (
    <div className="p-2 flex flex-col items-center rounded-md border shadow-md w-[400px] py-2">
      {data?.ProductImage && (
        <img className="h-52 w-96 rounded-md  " src={data?.item.ProductImage} />
      )}
      <div className="flex flex-col items-start w-full gap-2">
        <div className="flex justify-between w-full">
          <p className="flex sm:items-center sm:w-full sm:justify-center md:justify-start text-xl py-2">
            {data?.item.name}
          </p>
          <div className=" flex text-center items-center mr-4 gap-2">
            <span
              onClick={() => {
                dispatch(addItem(data.item));
              }}
              className="text-3xl bg-slate-600 bg-opacity-30 rounded-full p-1 cursor-pointer"
            >
              +
            </span>
            <span className="text-2xl">{data.cnt}</span>
            <span
              onClick={() => {
                dispatch(removeItem(data.item));
              }}
              className="text-3xl bg-slate-600 bg-opacity-30 rounded-full p-1 cursor-pointer"
            >
              -
            </span>
          </div>
        </div>

        <div className={`flex gap-2  `}>
          <div className="flex items-center text-center gap-1 ">
            रु
            <p className="line-clamp-1">{data?.item.price}</p>
          </div>
          <div className="flex items-center text-center gap-1">
            <p className="line-clamp-1">{data?.item.Keyword}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
