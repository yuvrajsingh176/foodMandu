import { ArrowRightIcon } from "@heroicons/react/16/solid";
import { HomeBgImage } from "../utils/constants";
import SearchBar from "./SearchBar";
import Card from "./Card";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [featuredRestaurants, setFeaturedRestaurants] = useState([]);

  const getFeaturedRestaurants = async () => {
    const data = await fetch(
      "https://foodmandu.com/webapi/api/Vendor/GetVendors1?Cuisine=&DeliveryZoneId=1&IsFavorite=false&IsRecent=false&Keyword=&LocationLat=27.7026754&LocationLng=85.3191018&PageNo=1&PageSize=8&SortBy=4&VendorName=&VendorTags=%7B%22FEATURED%22:true%7D&VendorTagsCSV=FEATURED,&filtertags=FEATURED&search_by=restaurant"
    );
    const jsonData = await data.json();
    setFeaturedRestaurants(jsonData);
  };

  useEffect(() => {
    getFeaturedRestaurants();
  }, []);
  
  return (
    <div>
      <div className="relative">
        <img className=" w-full h-[800px]" src={HomeBgImage} />
        <div className="absolute top-0 right-0 bottom-0 left-0 flex text-xl gap-4 flex-col items-center justify-center w-full">
          <div>
          <p className="flex items-center justify-center mx-4">
            Order food from the widest range of
          </p>
          <p className="flex items-center justify-center"> restaurants.</p>
          </div>
          
          <SearchBar />
        </div>
      </div>
      <div className="max-w-[1190px] mx-auto p-4">
        <div className="flex justify-between">
          <p className="font-bold">FEATURED RESTAURANTS</p>
          <Link to="restaurants" className="flex items-center">
            View all <ArrowRightIcon className="h-4 w-4 ml-2" />
          </Link>
        </div>
        <div className="grid md:grid-cols-4 md:grid-rows-2 sm:grid-cols-1 sm:grid-rows-8 gap-2 py-4">
          {featuredRestaurants?.map((item, index) => (
            <Card key={index} data={item} home={true} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
