import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BookingPage from "./pages/BookingPage";
import AdminAppointmentsPage from "./pages/AdminAppointmentsPage";
import AppointmentDetailsPage from "./pages/AppointmentDetailsPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/book/:serviceId" element={<BookingPage />} />
        <Route
          path="/admin/appointments"
          element={<AdminAppointmentsPage />}
        />
        <Route
          path="/admin/appointments/:appointmentId"
          element={<AppointmentDetailsPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
