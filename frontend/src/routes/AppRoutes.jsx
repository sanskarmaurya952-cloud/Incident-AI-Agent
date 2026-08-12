import { Routes, Route } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Incidents from "../pages/Incidents";
import CreateIncident from "../pages/CreateIncident";
import Lessons from "../pages/Lessons";
import Profile from "../pages/Profile";

function AppRoutes() {
  return (
    <Routes>

      {/* ========================= */}
      {/* Public Routes */}
      {/* ========================= */}

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ========================= */}
      {/* Dashboard Layout */}
      {/* ========================= */}

      <Route element={<DashboardLayout />}>

        <Route path="/" element={<Dashboard />} />

        <Route path="/incidents" element={<Incidents />} />

        <Route
          path="/create-incident"
          element={<CreateIncident />}
        />

        <Route
          path="/lessons"
          element={<Lessons />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

      </Route>

    </Routes>
  );
}

export default AppRoutes;