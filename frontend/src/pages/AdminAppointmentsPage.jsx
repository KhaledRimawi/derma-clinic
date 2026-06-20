import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/appointments")
      .then((response) => {
        setAppointments(response.data);
      })
      .catch((requestError) => {
        console.error("Failed to fetch appointments", requestError);
        setError("حدث خطأ أثناء تحميل طلبات الحجز.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const formatDate = (date) => {
    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "غير متوفر";
    }

    return parsedDate.toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <main
      style={{
        padding: "40px",
        direction: "rtl",
        fontFamily: "Arial",
        textAlign: "right",
      }}
    >
      <Link to="/">العودة إلى الصفحة الرئيسية</Link>

      <h1>طلبات الحجز</h1>
      <p>هذه الصفحة تعرض طلبات الحجز القادمة من المرضى.</p>

      {isLoading && <p style={{ marginTop: "24px" }}>جارٍ تحميل الطلبات...</p>}

      {error && <p style={{ color: "red", marginTop: "24px" }}>{error}</p>}

      {!isLoading && !error && appointments.length === 0 && (
        <p style={{ marginTop: "24px" }}>لا توجد طلبات حجز حالياً.</p>
      )}

      {!isLoading && !error && appointments.length > 0 && (
        <div style={{ overflowX: "auto", marginTop: "24px" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              minWidth: "900px",
            }}
          >
            <thead>
              <tr>
                <th style={cellStyle}>اسم المريض</th>
                <th style={cellStyle}>البريد الإلكتروني</th>
                <th style={cellStyle}>الهاتف</th>
                <th style={cellStyle}>الخدمة</th>
                <th style={cellStyle}>التاريخ المفضل</th>
                <th style={cellStyle}>الوقت المفضل</th>
                <th style={cellStyle}>الحالة</th>
                <th style={cellStyle}>حالة الدفع</th>
              </tr>
            </thead>

            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment._id}>
                  <td style={cellStyle}>{appointment.fullName}</td>
                  <td style={cellStyle}>{appointment.email}</td>
                  <td style={cellStyle}>{appointment.phone}</td>
                  <td style={cellStyle}>
                    {appointment.service?.name || "غير متوفر"}
                  </td>
                  <td style={cellStyle}>
                    {formatDate(appointment.preferredDate)}
                  </td>
                  <td style={cellStyle}>{appointment.preferredTime}</td>
                  <td style={cellStyle}>{appointment.status}</td>
                  <td style={cellStyle}>{appointment.paymentStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}

const cellStyle = {
  border: "1px solid #ddd",
  padding: "12px",
  textAlign: "right",
};

export default AdminAppointmentsPage;
