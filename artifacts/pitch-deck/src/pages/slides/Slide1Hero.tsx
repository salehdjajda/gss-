const base = import.meta.env.BASE_URL;

export default function Slide1Hero() {
  return (
    <div className="relative w-screen h-screen overflow-hidden" dir="rtl">
      <img
        src={`${base}hero-facility.png`}
        crossOrigin="anonymous"
        className="absolute inset-0 w-full h-full object-cover"
        alt="GSS facility background"
      />
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(15,26,48,0.95) 0%, rgba(15,26,48,0.80) 55%, rgba(15,26,48,0.60) 100%)" }} />

      <div className="absolute inset-0 flex flex-col justify-between" style={{ padding: "6vh 7vw" }}>
        <div className="flex items-center justify-between">
          <div style={{ borderBottom: "2px solid #c9922a", paddingBottom: "0.5vh" }}>
            <span className="font-display font-black tracking-widest" style={{ fontSize: "2vw", color: "#c9922a", letterSpacing: "0.3em" }}>GSS</span>
          </div>
          <div style={{ color: "#9ca3b0", fontSize: "1.4vw", fontFamily: "var(--font-body-family)", fontWeight: 500 }}>جدة — 2026</div>
        </div>

        <div>
          <div style={{ marginBottom: "2.5vh" }}>
            <span className="font-display font-black" style={{ fontSize: "5.8vw", color: "#f5f0e8", lineHeight: 1.05, letterSpacing: "-0.01em", display: "block" }}>GSS</span>
            <span className="font-display font-black" style={{ fontSize: "3.2vw", color: "#c9922a", lineHeight: 1.2, letterSpacing: "-0.01em", display: "block", marginTop: "0.5vh" }}>منصة إدارة الخدمات التشغيلية للمنشآت</span>
          </div>
          <p className="font-body" style={{ fontSize: "1.8vw", color: "#d4c9b0", fontWeight: 500, maxWidth: "60vw", lineHeight: 1.7 }}>
            مقترح شراكة تشغيل لإطلاق المنصة في السوق السعودي
          </p>
          <div style={{ marginTop: "4vh", display: "flex", gap: "2vw", alignItems: "center" }}>
            <div style={{ width: "5vw", height: "2px", background: "#c9922a" }} />
            <span className="font-body" style={{ fontSize: "1.5vw", color: "#9ca3b0", fontWeight: 600 }}>مدينة جدة</span>
          </div>
        </div>
      </div>

      <div className="absolute" style={{ bottom: "5vh", left: "7vw", display: "flex", gap: "1.5vw" }}>
        <div style={{ width: "0.4vw", height: "8vh", background: "linear-gradient(180deg, #c9922a, transparent)" }} />
        <div style={{ width: "0.4vw", height: "6vh", background: "linear-gradient(180deg, #c9922a, transparent)", opacity: 0.5 }} />
      </div>
    </div>
  );
}
