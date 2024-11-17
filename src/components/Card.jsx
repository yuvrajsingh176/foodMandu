import { MapPinIcon } from "@heroicons/react/16/solid";
import { mototrcycle } from "../utils/constants";
import { IoFastFoodSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const Card = ({ data, home }) => {
  return (
    <Link
      to={"/restaurants/details/" + data?.Id}
      className="p-2 flex flex-col items-center rounded-md"
    >
      <img
        className="h-52 w-96 rounded-md  "
        src={data?.VendorListingWebImageName}
      />
      <div className="flex flex-col items-start w-full">
        <p className="flex sm:items-center sm:w-full sm:justify-center md:justify-start text-xl py-2">
          {data?.Name}
        </p>
        <div className={`flex gap-2 ${home === true && "hidden"} `}>
          <div className="flex items-center text-center gap-1 ">
            <MapPinIcon className="h-4 w-4" />
            <p className="line-clamp-1">{data?.Address1}</p>
          </div>
          <div className="flex items-center text-center gap-1">
            <img src={mototrcycle} className="h-4 w-4 flex-grow" />
            <p className="line-clamp-1">{data?.DeliveryDistanceStr}</p>
          </div>
        </div>
        <div
          className={`flex items-center text-center gap-1 ${
            home === true && "hidden"
          } `}
        >
          <IoFastFoodSharp className="flex-grow" />
          <p className="line-clamp-1">{data?.CuisineTags}</p>
        </div>
      </div>
    </Link>
  );
};
export default Card;
