import { useSelector } from "react-redux";
import CartCard from "./CartCard";
import { useEffect, useState } from "react";

const Cart = () => {
  const cartData = useSelector((store) => store.cart.items);
  const price = useSelector((store) => store.cart.totalPrice);
  return (
    <div className="max-w-[800px] mx-auto flex flex-col  items-center">
      <p className="text-3xl">Cart</p>
      {cartData.length === 0 && (
        <p className="text-2xl">No items added to cart</p>
      )}
      {cartData.map((item, index) => (
        <CartCard key={index} data={item} />
      ))}
      <div className="bg-yellow-400 bg-opacity-50 my-2 w-[400px]  flex items-center justify-center gap-2  ">
        <p className="text-xl">Total </p>
        <p className="text-xl font-bold">{price}</p>
      </div>
    </div>
  );
};

export default Cart;
