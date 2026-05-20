import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/admin/Dashboard/Dashboard";

import ProtectedRoute from "./ProtectedRoute";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AdminRoutes;