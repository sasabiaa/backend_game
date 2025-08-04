import { Routes, Route } from "react-router-dom";

// pages
import Home from "../pages/Home";
import Map from "../pages/Map";
import Challanges from "../pages/Challanges";

//routes
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/map" element={<Map />}/>
      <Route path="/challanges" element={<Challanges />} />
    </Routes>
  );
};

export default AppRoutes;
