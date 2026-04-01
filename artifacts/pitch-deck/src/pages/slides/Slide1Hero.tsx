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
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(15,26,48,0.92) 0%, rgba(15,26,48,0.75) 50%, rgba(15,26,48,0.55) 100%)" }} />
      <div className="absolute inset-0 flex flex-col justify-between" style={{ padding: "6vh 7vw" }}>
        <div className="flex items-center justify-between">
          <div style={{ borderBottom: "2px solid #c9922a", paddingBottom: "0.5vh" }}>
            <span className="font-display font-black tracking-widest" style={{ fontSize: "2vw", color: "#c9922a", letterSpacing: "0.3em" }}>GSS</span>
          </div>
          <div style={{ color: "#9ca3b0", fontSize: "1.5vw", fontFamily: "var(--font-body-family)", fontWeight: 500 }}>
            2026
          </div>
        </div>
        <div>
          <div style={{ marginBottom: "2vh" }}>
            <span className="font-display font-black" style={{ fontSize: "5.5vw", color: "#f5f0e8", lineHeight: 1.1, letterSpacing: "-0.01em", display: "block" }}>
              مستقبل إدارة
            </span>
            <span className="font-display font-black" style={{ fontSize: "5.5vw", color: "#c9922a", lineHeight: 1.1, letterSpacing: "-0.01em", display: "block" }}>
              العمليات التشغيلية
            </span>
          </div>
          <p className="font-body" style={{ fontSize: "2vw", color: "#d4c9b0", fontWeight: 500, maxWidth: "55vw", lineHeight: 1.6 }}>
            منصة رقمية متكاملة تربط المنشآت بمزودي الخدمات لتحقيق كفاءة تشغيلية استثنائية
          </p>
          <div style={{ marginTop: "4vh", display: "flex", gap: "3vw", alignItems: "center" }}>
            <div style={{ width: "5vw", height: "2px", background: "#c9922a" }} />
            <span className="font-body" style={{ fontSize: "1.6vw", color: "#9ca3b0", fontWeight: 500 }}>عرض للشراكة الاستراتيجية</span>
          </div>
        </div>
      </div>
      <div className="absolute" style={{ bottom: "5vh", left: "7vw", display: "flex", gap: "2vw" }}>
        <div style={{ width: "0.4vw", height: "8vh", background: "linear-gradient(180deg, #c9922a, transparent)" }} />
        <div style={{ width: "0.4vw", height: "6vh", background: "linear-gradient(180deg, #c9922a, transparent)", opacity: 0.5 }} />
      </div>
    </div>
  );
}
