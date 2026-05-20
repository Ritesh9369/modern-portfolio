import { Routes, Route } from "react-router-dom";

import MainLayout from "../layout/public_layout/MainLayout";

import Home from "../pages/Home/Home";

const PublicRoutes = () => {
  return (
    <Routes>

      <Route path="/" element={<MainLayout />}>

        <Route index element={<Home />} />

      </Route>

    </Routes>
  );
};

export default PublicRoutes;