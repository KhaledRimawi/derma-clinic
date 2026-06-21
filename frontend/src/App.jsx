import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BookingPage from "./pages/BookingPage";
import AdminAppointmentsPage from "./pages/AdminAppointmentsPage";
import AppointmentDetailsPage from "./pages/AppointmentDetailsPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/book/:serviceId" element={<BookingPage />} />
        <Route element={<ProtectedAdminRoute />}>
          <Route
            path="/admin/appointments"
            element={<AdminAppointmentsPage />}
          />
          <Route
            path="/admin/appointments/:appointmentId"
            element={<AppointmentDetailsPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
