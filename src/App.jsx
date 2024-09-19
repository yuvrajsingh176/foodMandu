import { Routes, Route, BrowserRouter } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import RestaurantDetail from "./components/RestaurantDetail";
import Cart from "./components/Cart";
import Restaurants from "./components/Restaurants";
import RestaurantsLayout from "./components/RestaurantsLayout";
import Home from "./components/Home";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    if (
      localStorage.getItem("latitude") &&
      localStorage.getItem("longitude") &&
      localStorage.getItem("location") &&
      localStorage.getItem("zoneid")
    ) {
      localStorage.setItem("latitude", localStorage.getItem("latitude"));
      localStorage.setItem("longitude", localStorage.getItem("longitude"));
      localStorage.setItem("location", localStorage.getItem("location"));
      localStorage.setItem("zoneid", localStorage.getItem("zoneid"));
    } else {
      localStorage.setItem("latitude", "27.68357032351903");
      localStorage.setItem("longitude", "85.28050959430927");
      localStorage.setItem("location", "Kathmandu");
      localStorage.setItem("zoneid", "1");
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="restaurants" element={<RestaurantsLayout />}>
            <Route index element={<Restaurants />} />
            <Route path="cafe" element={<Cafe />} />
            <Route path="food" element={<Food />} />
            <Route path="details/:id" element={<RestaurantDetail />} />
          </Route>
          <Route path="/cart" element={<Cart />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
