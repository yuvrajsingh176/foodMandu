import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import Card from "./Card";
import { debounce } from "lodash";
import { useParams, useSearchParams } from "react-router-dom";
const Restaurants = () => {
  const [open, setOpen] = useState(false);
  const [featuredRestaurants, setFeaturedRestaurants] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const latitude = localStorage.getItem("latitude") || "27.7026754";
  const longitude = localStorage.getItem("longitude") || "85.3191018";
  const location = localStorage.getItem("location") || "Kathmandu";
  const zoneid = localStorage.getItem("zoneid") || "1";

  const [stateLocation, setstateLocation] = useState(location);
  const [previousLocation, setPreviousLocation] = useState(location);
  const [statezoneId, setZoneId] = useState(zoneid);

  useEffect(() => {
    setPreviousLocation(stateLocation);
    setstateLocation(location);
    setZoneId(zoneid);
  }, [location]);

  const getFeaturedRestaurants = async () => {
    setLoading(true);
    try {
      const data = await fetch(
        `https://foodmandu.com/webapi/api/Vendor/GetVendors1?Cuisine=&DeliveryZoneId=${statezoneId}&IsFavorite=false&IsRecent=false&Keyword=${query}&LocationLat=${latitude}&LocationLng=${longitude}&PageNo=${page}&PageSize=6&SortBy=4&VendorName=&VendorTags=%7B%22FEATURED%22:true%7D&search_by=restaurant`
      );
      const jsonData = await data.json();
      if (previousLocation === stateLocation) {
        setFeaturedRestaurants((prevRestaurants) => [
          ...prevRestaurants,
          ...jsonData,
        ]);
      } else {
        setFeaturedRestaurants(jsonData);
      }

      setHasMore(jsonData.length > 0);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  useEffect(() => {
    getFeaturedRestaurants();
  }, [page, stateLocation]);

  const handleScroll = debounce(() => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  }, 500);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore]);

  return (
    <div className=" mx-auto h-dvh">
      <div className="py-8 bg-[#FAFAFA]">
        <div className=" max-w-[1190px] mx-auto flex justify-between ">
          <p className="text-3xl text-[#4a4a4a]">Restaurants and stores</p>
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="border p-2 flex justify-between items-center gap-8"
            >
              <p>{stateLocation}</p>
              <ChevronDownIcon className="h-4 w-4" />
            </button>
            {open && (
              <ul className="absolute border flex flex-col w-full bg-white">
                <li
                  onClick={() => {
                    localStorage.setItem("latitude", "27.68357032351903");
                    localStorage.setItem("longitude", "85.28050959430927");
                    localStorage.setItem("location", "Kathmandu");
                    localStorage.setItem("zoneid", "1");

                    setOpen(!open);
                  }}
                  className="border-b px-2 py-1 cursor-pointer"
                >
                  Kathmandu
                </li>
                <li
                  onClick={() => {
                    localStorage.setItem("latitude", "27.6773968");
                    localStorage.setItem("longitude", "85.406957");
                    localStorage.setItem("location", "Bhaktapur");
                    localStorage.setItem("zoneid", "2");

                    setOpen(!open);
                  }}
                  className="border-b px-2 py-1  cursor-pointer"
                >
                  Bhaktapur
                </li>
                <li
                  onClick={() => {
                    localStorage.setItem("latitude", "28.208417");
                    localStorage.setItem("longitude", "83.9554362");
                    localStorage.setItem("location", "Pokhara");
                    localStorage.setItem("zoneid", "3");
                    setOpen(!open);
                  }}
                  className="border-b px-2 py-1  cursor-pointer"
                >
                  Pokhara
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
      <div className="max-w-[1190px] mx-auto">
        <div className="grid md:grid-cols-3  sm:grid-cols-1  gap-2 py-4">
          {featuredRestaurants?.map((item, index) => (
            <Card key={index} data={item} home={false} />
          ))}
        </div>
      </div>
      {loading && (
        <div className="text-black text-3xl flex items-center text-center w-full">
          loading...
        </div>
      )}
    </div>
  );
};

export default Restaurants;
