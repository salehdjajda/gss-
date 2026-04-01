const base = import.meta.env.BASE_URL;

export default function Slide18Closing() {
  return (
    <div className="relative w-screen h-screen overflow-hidden" dir="rtl">
      <img
        src={`${base}hero-facility.png`}
        crossOrigin="anonymous"
        className="absolute inset-0 w-full h-full object-cover"
        alt="GSS background"
      />
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(15,26,48,0.97) 0%, rgba(15,26,48,0.88) 60%, rgba(15,26,48,0.75) 100%)" }} />

      <div className="absolute inset-0 flex flex-col justify-center" style={{ padding: "6vh 8vw" }}>
        <div style={{ marginBottom: "3vh" }}>
          <span className="font-body" style={{ fontSize: "1.5vw", color: "#c9922a", fontWeight: 700, letterSpacing: "0.15em" }}>دعوة الشراكة</span>
        </div>

        <div style={{ maxWidth: "70vw" }}>
          <p className="font-display font-black" style={{ fontSize: "3.2vw", color: "#f5f0e8", lineHeight: 1.5, letterSpacing: "-0.01em", marginBottom: "5vh" }}>
            نسعى إلى شريك تشغيل استراتيجي لدعم إطلاق المنصة في المرحلة الأولى وتحويلها إلى
            <span style={{ color: "#c9922a" }}> نموذج تشغيل فعلي </span>
            يخدم المنشآت في السوق السعودي.
          </p>
        </div>

        <div style={{ display: "flex", gap: "4vw", alignItems: "center" }}>
          <div style={{ display: "flex", gap: "1.5vw", alignItems: "center" }}>
            <div style={{ width: "5vw", height: "2px", background: "#c9922a" }} />
            <span className="font-display font-black" style={{ fontSize: "3vw", color: "#c9922a", letterSpacing: "0.2em" }}>GSS</span>
            <div style={{ width: "5vw", height: "2px", background: "#c9922a" }} />
          </div>
        </div>

        <div style={{ marginTop: "5vh" }}>
          <div style={{ fontSize: "1.6vw", color: "#9ca3b0", fontWeight: 500 }}>منصة إدارة الخدمات التشغيلية للمنشآت</div>
          <div style={{ fontSize: "1.5vw", color: "#6b7280", marginTop: "0.5vh" }}>مدينة جدة — المملكة العربية السعودية</div>
        </div>
      </div>

      <div className="absolute" style={{ bottom: "5vh", left: "8vw", display: "flex", gap: "1.5vw" }}>
        <div style={{ width: "0.4vw", height: "8vh", background: "linear-gradient(180deg, #c9922a, transparent)" }} />
        <div style={{ width: "0.4vw", height: "6vh", background: "linear-gradient(180deg, #c9922a, transparent)", opacity: 0.5 }} />
      </div>
    </div>
  );
}
