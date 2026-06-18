import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const initialFormData = {
  fullName: "",
  email: "",
  phone: "",
  country: "",
  city: "",
  mainComplaint: "",
  preferredDate: "",
  preferredTime: "",
};

function BookingPage() {
  const { serviceId } = useParams();
  const [service, setService] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/services")
      .then((response) => {
        const selectedService = response.data.find(
          (item) => item._id === serviceId
        );

        if (!selectedService) {
          setError("الخدمة المطلوبة غير موجودة.");
          return;
        }

        setService(selectedService);
      })
      .catch((requestError) => {
        console.error("Failed to fetch service", requestError);
        setError("تعذر تحميل بيانات الخدمة.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [serviceId]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  if (isLoading) {
    return <p style={{ padding: "40px", direction: "rtl" }}>جارٍ التحميل...</p>;
  }

  if (error) {
    return (
      <div style={{ padding: "40px", direction: "rtl" }}>
        <p>{error}</p>
        <Link to="/">العودة إلى الخدمات</Link>
      </div>
    );
  }

  return (
    <div
      style={{
        fontFamily: "Arial",
        padding: "40px",
        direction: "rtl",
        maxWidth: "700px",
        margin: "0 auto",
      }}
    >
      <Link to="/">العودة إلى الخدمات</Link>

      <h1>حجز استشارة</h1>

      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "12px",
          padding: "20px",
          marginBottom: "24px",
        }}
      >
        <h2>{service.name}</h2>
        <p>{service.description}</p>
        <p>المدة: {service.durationMinutes} دقيقة</p>
        <p>
          السعر: {service.price} {service.currency}
        </p>
      </div>

      <form style={{ display: "grid", gap: "16px" }}>
        <label>
          الاسم الكامل
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            style={inputStyle}
          />
        </label>

        <label>
          البريد الإلكتروني
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={inputStyle}
          />
        </label>

        <label>
          رقم الهاتف
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            style={inputStyle}
          />
        </label>

        <label>
          الدولة
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            style={inputStyle}
          />
        </label>

        <label>
          المدينة
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            style={inputStyle}
          />
        </label>

        <label>
          الشكوى الرئيسية
          <textarea
            name="mainComplaint"
            value={formData.mainComplaint}
            onChange={handleChange}
            rows="4"
            style={inputStyle}
          />
        </label>

        <label>
          التاريخ المفضل
          <input
            type="date"
            name="preferredDate"
            value={formData.preferredDate}
            onChange={handleChange}
            style={inputStyle}
          />
        </label>

        <label>
          الوقت المفضل
          <input
            type="time"
            name="preferredTime"
            value={formData.preferredTime}
            onChange={handleChange}
            style={inputStyle}
          />
        </label>

        <button type="button" style={{ padding: "12px", cursor: "pointer" }}>
          تأكيد الحجز
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  display: "block",
  width: "100%",
  boxSizing: "border-box",
  padding: "10px",
  marginTop: "6px",
};

export default BookingPage;
