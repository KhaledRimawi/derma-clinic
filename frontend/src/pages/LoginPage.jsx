import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      if (user.role === "admin") {
        navigate("/admin/appointments");
      } else {
        navigate("/");
      }
    } catch (requestError) {
      console.error("Failed to log in", requestError);
      setErrorMessage("البريد الإلكتروني أو كلمة المرور غير صحيحة.");
      setIsSubmitting(false);
    }
  };

  return (
    <main style={pageStyle}>
      <Link to="/">العودة إلى الصفحة الرئيسية</Link>

      <h1>تسجيل الدخول</h1>

      <form onSubmit={handleSubmit} style={formStyle}>
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

        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

        <button type="submit" disabled={isSubmitting} style={buttonStyle}>
          {isSubmitting ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
        </button>
      </form>

      <Link to="/register">ليس لديك حساب؟ إنشاء حساب جديد</Link>
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

export default LoginPage;
