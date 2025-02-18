import { Route , Routes } from "react-router-dom";
import RegisterPage from "@/pages/registrationPage/registerPage";
import LoginPage from "@/pages/loginPage/loginPage";
import DashboardLayout from "@/layouts/dashboard/dashboardLayout";
import Dashboard from "@/pages/dashboard/dashboard";
import Reports from "@/pages/reports/reports";
import Transaction from "@/pages/transaction/transaction";
import Budget from "@/pages/budget/budget";
import Settings from "@/pages/settings/settings";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage/>} />
      <Route  element={<DashboardLayout/>}>
          <Route path="/" element={<Dashboard/>}/>
          <Route path="/transactions" element={<Transaction/>}/>
          <Route path="/budget" element={<Budget/>}/>
          <Route path="/reports" element={<Reports/>}/>
          <Route path="/settings" element={<Settings/>}/>
      </Route>
    </Routes>
  );
}
