import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function HomePage() {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/services")
      .then((response) => {
        setServices(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch services", error);
      });
  }, []);

  return (
    <div style={{ fontFamily: "Arial", padding: "40px", direction: "rtl" }}>
      <h1>عيادة جلدية أونلاين</h1>

      <p>
        منصة لحجز الاستشارات الجلدية أونلاين والتسجيل في المحاضرات التعليمية.
      </p>

      <h2>الخدمات</h2>

      {services.length === 0 ? (
        <p>لا توجد خدمات حالياً</p>
      ) : (
        <div style={{ display: "grid", gap: "16px", marginTop: "20px" }}>
          {services.map((service) => (
            <div
              key={service._id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "12px",
                padding: "20px",
              }}
            >
              <h3>{service.name}</h3>
              <p>{service.description}</p>
              <p>
                المدة: {service.durationMinutes} دقيقة | السعر: {service.price}{" "}
                {service.currency}
              </p>
              <button
                type="button"
                onClick={() => navigate(`/book/${service._id}`)}
                style={{ padding: "10px 20px", cursor: "pointer" }}
              >
                حجز هذه الخدمة
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;
