import { MagnifyingGlassIcon, MapPinIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import { IoFastFoodSharp } from "react-icons/io5";
import {
  Link,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import Category from "./Category";

const RestaurantDetail = () => {
  //  const location=useLocation();
  const val = useParams();
  const { id } = val;
  const [restaurantData, setRestaurantData] = useState([]);
  const [restaurantCategory, setCategoryData] = useState([]);
  const getRestaurantDetail = async (vendorId) => {
    const data = await fetch(
      "https://foodmandu.com/webapi/api/vendor/GetVendorDetail?VendorId=" +
        vendorId
    );
    const jsonData = await data.json();
    setRestaurantData(jsonData[0]);
  };

  const getRestaurantCategoryDetail = async (vendorId) => {
    const data = await fetch(
      "https://foodmandu.com/webapi/api/v2/Product/GetVendorProductsBySubCategoryV2?VendorId=" +
        vendorId
    );
    const jsonData = await data.json();
    setCategoryData(jsonData);
  };

  useEffect(() => {
    getRestaurantDetail(id);
    getRestaurantCategoryDetail(id);
  }, []);

  return (
    <div>
      {/* top part */}
      <div className="relative">
        <img
          src={restaurantData?.VendorCoverImageName}
          className="h-[512px] w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
        <div className="container absolute bottom-6  right-0 text-white">
          <div className="flex-col ">
            <div className="flex gap-4">
              <img
                src={restaurantData?.VendorLogoImageName}
                className="h-24 w-32"
              />
              <div>
                <p className="text-white text-3xl">{restaurantData?.Name}</p>
                <div className="flex gap-1 text-white">
                  <IoFastFoodSharp />
                  {restaurantData?.Cuisine}
                </div>
                <div className="flex gap-1 text-white">
                  <MapPinIcon className="h-4 w-4" />
                  {restaurantData?.Address1}
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex flex-col gap-2">
                <p>Minimum order</p>
                <p>Rs.{restaurantData?.MinimumOrderAmount}.00</p>
              </div>
              <div className="flex gap-4 text-white">
                <div className="flex flex-col gap-2">
                  <p>Additional Service Charge</p>
                  <p>Rs.{restaurantData?.ServiceCharge}.00</p>
                </div>
                <div className="flex flex-col gap-2">
                  <p>Additional Vat</p>
                  <p>Rs.{restaurantData?.VAT}.00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Menu */}
      <div>
      
        <div className="max-w-[900px] mx-auto p-4 flex flex-col gap-12">
          {restaurantCategory?.map((category, index) => (
            <div key={index}>
              <p className="p-2 bg-[#fbf9f9] border-b text-xl">
                {category?.category}
              </p>
              {category?.items.map((item, index) => (
                <Category key={index} item={item} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;
