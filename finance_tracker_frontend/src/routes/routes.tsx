import { Route , Routes } from "react-router-dom";
import RegisterPage from "@/pages/registrationPage/registerPage";
import LoginPage from "@/pages/loginPage/loginPage";
import DashboardLayout from "@/layouts/dashboard/dashboardLayout";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/dashboard" element={<DashboardLayout/>} />
    </Routes>
  );
}
