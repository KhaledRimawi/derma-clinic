import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BookingPage from "./pages/BookingPage";
import AdminAppointmentsPage from "./pages/AdminAppointmentsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/book/:serviceId" element={<BookingPage />} />
        <Route
          path="/admin/appointments"
          element={<AdminAppointmentsPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
