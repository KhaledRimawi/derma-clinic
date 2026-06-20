import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function AppointmentDetailsPage() {
  const { appointmentId } = useParams();
  const [appointment, setAppointment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/appointments/${appointmentId}`)
      .then((response) => {
        setAppointment(response.data);
      })
      .catch((requestError) => {
        console.error("Failed to fetch appointment", requestError);
        setError("تعذر تحميل تفاصيل طلب الحجز.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [appointmentId]);

  const showValue = (value, fallback = "غير مذكور") => {
    if (value === undefined || value === null || value === "") {
      return fallback;
    }

    return value;
  };

  const formatDate = (date, includeTime = false) => {
    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "غير مذكور";
    }

    if (includeTime) {
      return parsedDate.toLocaleString("ar-EG", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    return parsedDate.toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const genderLabels = {
    male: "ذكر",
    female: "أنثى",
    other: "آخر",
  };

  const pregnancyLabels = {
    yes: "نعم",
    no: "لا",
    not_applicable: "لا ينطبق",
  };

  if (isLoading) {
    return <p style={{ padding: "40px", direction: "rtl" }}>جارٍ التحميل...</p>;
  }

  if (error) {
    return (
      <main style={pageStyle}>
        <p style={{ color: "red" }}>{error}</p>
        <div style={linksStyle}>
          <Link to="/admin/appointments">العودة إلى طلبات الحجز</Link>
          <Link to="/">العودة إلى الصفحة الرئيسية</Link>
        </div>
      </main>
    );
  }

  const service = appointment.service;

  return (
    <main style={pageStyle}>
      <div style={linksStyle}>
        <Link to="/admin/appointments">العودة إلى طلبات الحجز</Link>
        <Link to="/">العودة إلى الصفحة الرئيسية</Link>
      </div>

      <h1>تفاصيل طلب الحجز</h1>

      <DetailsSection title="بيانات الخدمة">
        <Detail label="اسم الخدمة" value={service?.name || "غير متوفر"} />
        <Detail label="الوصف" value={service?.description || "غير متوفر"} />
        <Detail
          label="المدة"
          value={
            service
              ? `${service.durationMinutes} دقيقة`
              : "غير متوفر"
          }
        />
        <Detail
          label="السعر"
          value={
            service ? `${service.price} ${service.currency}` : "غير متوفر"
          }
        />
      </DetailsSection>

      <DetailsSection title="بيانات المريض">
        <Detail label="الاسم الكامل" value={showValue(appointment.fullName)} />
        <Detail label="البريد الإلكتروني" value={showValue(appointment.email)} />
        <Detail label="رقم الهاتف" value={showValue(appointment.phone)} />
        <Detail label="الدولة" value={showValue(appointment.country)} />
        <Detail label="المدينة" value={showValue(appointment.city)} />
      </DetailsSection>

      <DetailsSection title="المعلومات الطبية">
        <Detail
          label="الشكوى الرئيسية"
          value={showValue(appointment.mainComplaint)}
        />
        <Detail label="العمر" value={showValue(appointment.age)} />
        <Detail
          label="الجنس"
          value={genderLabels[appointment.gender] || showValue(appointment.gender)}
        />
        <Detail
          label="مدة المشكلة"
          value={showValue(appointment.problemDuration)}
        />
        <Detail
          label="الأدوية الحالية"
          value={showValue(appointment.currentMedications)}
        />
        <Detail
          label="الحساسية"
          value={showValue(appointment.allergies)}
        />
        <Detail
          label="هل يوجد حمل أو رضاعة؟"
          value={
            pregnancyLabels[appointment.pregnancyOrBreastfeeding] ||
            showValue(appointment.pregnancyOrBreastfeeding)
          }
        />
        <Detail
          label="ملاحظات إضافية"
          value={showValue(appointment.additionalNotes)}
        />
      </DetailsSection>

      <DetailsSection title="بيانات الموعد">
        <Detail
          label="التاريخ المفضل"
          value={formatDate(appointment.preferredDate)}
        />
        <Detail
          label="الوقت المفضل"
          value={showValue(appointment.preferredTime)}
        />
        <Detail label="الحالة" value={showValue(appointment.status)} />
        <Detail
          label="حالة الدفع"
          value={showValue(appointment.paymentStatus)}
        />
        <Detail
          label="تاريخ إرسال الطلب"
          value={formatDate(appointment.createdAt, true)}
        />
      </DetailsSection>
    </main>
  );
}

function DetailsSection({ title, children }) {
  return (
    <section style={sectionStyle}>
      <h2>{title}</h2>
      <div style={{ display: "grid", gap: "12px" }}>{children}</div>
    </section>
  );
}

function Detail({ label, value }) {
  return (
    <div>
      <strong>{label}:</strong> <span>{value}</span>
    </div>
  );
}

const pageStyle = {
  padding: "40px",
  direction: "rtl",
  fontFamily: "Arial",
  textAlign: "right",
  maxWidth: "850px",
  margin: "0 auto",
};

const linksStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: "16px",
};

const sectionStyle = {
  border: "1px solid #ddd",
  borderRadius: "12px",
  padding: "20px",
  marginBottom: "20px",
};

export default AppointmentDetailsPage;
