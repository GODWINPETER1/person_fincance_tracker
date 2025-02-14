import { Route , Routes } from "react-router-dom";
import RegisterPage from "@/pages/registrationPage/registerPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}
