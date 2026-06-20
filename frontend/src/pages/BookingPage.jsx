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
  age: "",
  gender: "",
  problemDuration: "",
  currentMedications: "",
  allergies: "",
  pregnancyOrBreastfeeding: "not_applicable",
  additionalNotes: "",
  preferredDate: "",
  preferredTime: "",
};

function BookingPage() {
  const { serviceId } = useParams();
  const [service, setService] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [serviceError, setServiceError] = useState("");
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/services")
      .then((response) => {
        const selectedService = response.data.find(
          (item) => item._id === serviceId
        );

        if (!selectedService) {
          setServiceError("الخدمة المطلوبة غير موجودة.");
          return;
        }

        setService(selectedService);
      })
      .catch((requestError) => {
        console.error("Failed to fetch service", requestError);
        setServiceError("تعذر تحميل بيانات الخدمة.");
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage("");
    setSubmitError("");

    try {
      await axios.post("http://localhost:5000/api/appointments", {
        service: serviceId,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        city: formData.city,
        mainComplaint: formData.mainComplaint,
        age: Number(formData.age),
        gender: formData.gender,
        problemDuration: formData.problemDuration,
        currentMedications: formData.currentMedications,
        allergies: formData.allergies,
        pregnancyOrBreastfeeding: formData.pregnancyOrBreastfeeding,
        additionalNotes: formData.additionalNotes,
        preferredDate: formData.preferredDate,
        preferredTime: formData.preferredTime,
      });

      setSuccessMessage(
        "تم إرسال طلب الحجز بنجاح. سيتم مراجعته من قبل الطبيبة قبل تأكيد الموعد."
      );
      setFormData(initialFormData);
    } catch (requestError) {
      console.error("Failed to create appointment", requestError);
      setSubmitError(
        "حدث خطأ أثناء إرسال طلب الحجز. يرجى المحاولة مرة أخرى."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <p style={{ padding: "40px", direction: "rtl" }}>جارٍ التحميل...</p>;
  }

  if (serviceError) {
    return (
      <div style={{ padding: "40px", direction: "rtl" }}>
        <p>{serviceError}</p>
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

      <form
        onSubmit={handleSubmit}
        style={{ display: "grid", gap: "16px" }}
      >
        <label>
          الاسم الكامل
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
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
            required
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
            required
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
            required
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
            required
            style={inputStyle}
          />
        </label>

        <label>
          العمر
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            min="1"
            required
            style={inputStyle}
          />
        </label>

        <label>
          الجنس
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            style={inputStyle}
          >
            <option value="">اختر الجنس</option>
            <option value="male">ذكر</option>
            <option value="female">أنثى</option>
            <option value="other">آخر</option>
          </select>
        </label>

        <label>
          الشكوى الرئيسية
          <textarea
            name="mainComplaint"
            value={formData.mainComplaint}
            onChange={handleChange}
            rows="4"
            required
            style={inputStyle}
          />
        </label>

        <label>
          مدة المشكلة
          <input
            type="text"
            name="problemDuration"
            value={formData.problemDuration}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </label>

        <label>
          الأدوية الحالية
          <textarea
            name="currentMedications"
            value={formData.currentMedications}
            onChange={handleChange}
            rows="3"
            style={inputStyle}
          />
        </label>

        <label>
          الحساسية
          <textarea
            name="allergies"
            value={formData.allergies}
            onChange={handleChange}
            rows="3"
            style={inputStyle}
          />
        </label>

        <label>
          هل يوجد حمل أو رضاعة؟
          <select
            name="pregnancyOrBreastfeeding"
            value={formData.pregnancyOrBreastfeeding}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="not_applicable">لا ينطبق</option>
            <option value="yes">نعم</option>
            <option value="no">لا</option>
          </select>
        </label>

        <label>
          ملاحظات إضافية
          <textarea
            name="additionalNotes"
            value={formData.additionalNotes}
            onChange={handleChange}
            rows="3"
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
            required
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
            required
            style={inputStyle}
          />
        </label>

        {successMessage && (
          <p style={{ color: "green", margin: 0 }}>{successMessage}</p>
        )}

        {submitError && (
          <p style={{ color: "red", margin: 0 }}>{submitError}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          style={{ padding: "12px", cursor: "pointer" }}
        >
          {isSubmitting ? "جاري إرسال الطلب..." : "إرسال طلب الحجز"}
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
