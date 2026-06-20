import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const initialFormData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  gender: "",
  age: "",
  phone: "",
};

function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("كلمة المرور وتأكيد كلمة المرور غير متطابقتين.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          gender: formData.gender || undefined,
          age: formData.age ? Number(formData.age) : undefined,
          phone: formData.phone || undefined,
        }
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setSuccessMessage("تم إنشاء الحساب بنجاح.");

      setTimeout(() => {
        navigate("/");
      }, 800);
    } catch (requestError) {
      console.error("Failed to register", requestError);
      setErrorMessage(
        requestError.response?.status === 409
          ? "البريد الإلكتروني مسجل بالفعل."
          : "حدث خطأ أثناء إنشاء الحساب. يرجى المحاولة مرة أخرى."
      );
      setIsSubmitting(false);
    }
  };

  return (
    <main style={pageStyle}>
      <Link to="/">العودة إلى الصفحة الرئيسية</Link>

      <h1>إنشاء حساب جديد</h1>

      <form onSubmit={handleSubmit} style={formStyle}>
        <label>
          الاسم الأول
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </label>

        <label>
          اسم العائلة
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
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
          كلمة المرور
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </label>

        <label>
          تأكيد كلمة المرور
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
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
            style={inputStyle}
          >
            <option value="">اختر الجنس</option>
            <option value="male">ذكر</option>
            <option value="female">أنثى</option>
            <option value="other">آخر</option>
          </select>
        </label>

        <label>
          العمر
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            min="1"
            style={inputStyle}
          />
        </label>

        <label>
          رقم الجوال
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            style={inputStyle}
          />
        </label>

        {successMessage && (
          <p style={{ color: "green" }}>{successMessage}</p>
        )}

        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

        <button type="submit" disabled={isSubmitting} style={buttonStyle}>
          {isSubmitting ? "جاري إنشاء الحساب..." : "إنشاء الحساب"}
        </button>
      </form>

      <Link to="/login">لديك حساب بالفعل؟ تسجيل الدخول</Link>
    </main>
  );
}

const pageStyle = {
  maxWidth: "600px",
  margin: "0 auto",
  padding: "40px",
  direction: "rtl",
  fontFamily: "Arial",
  textAlign: "right",
};

const formStyle = {
  display: "grid",
  gap: "16px",
  marginBottom: "20px",
};

const inputStyle = {
  display: "block",
  width: "100%",
  boxSizing: "border-box",
  padding: "10px",
  marginTop: "6px",
};

const buttonStyle = {
  padding: "12px",
  cursor: "pointer",
};

export default RegisterPage;
