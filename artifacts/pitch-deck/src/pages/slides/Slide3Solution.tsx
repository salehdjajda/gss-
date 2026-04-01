export default function Slide3Solution() {
  return (
    <div className="relative w-screen h-screen overflow-hidden" dir="rtl" style={{ background: "#0f1a30" }}>
      <div className="absolute" style={{ top: "10vh", right: "-5vw", width: "45vw", height: "45vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(201,146,42,0.07), transparent 70%)" }} />

      <div className="absolute inset-0 flex flex-col" style={{ padding: "5vh 7vw" }}>
        <div style={{ marginBottom: "1vh" }}>
          <span className="font-body" style={{ fontSize: "1.5vw", color: "#c9922a", fontWeight: 700, letterSpacing: "0.15em" }}>الحل</span>
        </div>
        <h2 className="font-display font-black" style={{ fontSize: "3.8vw", color: "#f5f0e8", lineHeight: 1.15, marginBottom: "3.5vh", letterSpacing: "-0.01em" }}>
          GSS — ستة خدمات جوهرية<br />
          <span style={{ color: "#c9922a" }}>منظومة متكاملة لكل منشأة</span>
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1.8vh 2vw", flex: 1 }}>
          <div style={{ background: "rgba(201,146,42,0.08)", border: "1px solid rgba(201,146,42,0.25)", borderRadius: "0.5vw", padding: "2vh 1.5vw" }}>
            <div style={{ fontSize: "2.2vw", fontWeight: 900, color: "#c9922a", fontFamily: "var(--font-display-family)", marginBottom: "0.8vh" }}>01</div>
            <div style={{ fontSize: "1.7vw", color: "#f5f0e8", fontWeight: 700, marginBottom: "0.5vh" }}>الصيانة والإصلاح</div>
            <div style={{ fontSize: "1.4vw", color: "#9ca3b0", lineHeight: 1.4 }}>إدارة طلبات الصيانة الدورية والطارئة بكفاءة عالية</div>
          </div>
          <div style={{ background: "rgba(26,39,68,0.8)", border: "1px solid rgba(201,146,42,0.15)", borderRadius: "0.5vw", padding: "2vh 1.5vw" }}>
            <div style={{ fontSize: "2.2vw", fontWeight: 900, color: "#c9922a", fontFamily: "var(--font-display-family)", marginBottom: "0.8vh" }}>02</div>
            <div style={{ fontSize: "1.7vw", color: "#f5f0e8", fontWeight: 700, marginBottom: "0.5vh" }}>النظافة والتعقيم</div>
            <div style={{ fontSize: "1.4vw", color: "#9ca3b0", lineHeight: 1.4 }}>خدمات تنظيف احترافية وفق جداول منتظمة وموثقة</div>
          </div>
          <div style={{ background: "rgba(26,39,68,0.8)", border: "1px solid rgba(201,146,42,0.15)", borderRadius: "0.5vw", padding: "2vh 1.5vw" }}>
            <div style={{ fontSize: "2.2vw", fontWeight: 900, color: "#c9922a", fontFamily: "var(--font-display-family)", marginBottom: "0.8vh" }}>03</div>
            <div style={{ fontSize: "1.7vw", color: "#f5f0e8", fontWeight: 700, marginBottom: "0.5vh" }}>الأمن والحراسة</div>
            <div style={{ fontSize: "1.4vw", color: "#9ca3b0", lineHeight: 1.4 }}>إدارة خدمات الحماية والأمن للمنشآت والمواقع</div>
          </div>
          <div style={{ background: "rgba(26,39,68,0.8)", border: "1px solid rgba(201,146,42,0.15)", borderRadius: "0.5vw", padding: "2vh 1.5vw" }}>
            <div style={{ fontSize: "2.2vw", fontWeight: 900, color: "#c9922a", fontFamily: "var(--font-display-family)", marginBottom: "0.8vh" }}>04</div>
            <div style={{ fontSize: "1.7vw", color: "#f5f0e8", fontWeight: 700, marginBottom: "0.5vh" }}>المناولة والنقل</div>
            <div style={{ fontSize: "1.4vw", color: "#9ca3b0", lineHeight: 1.4 }}>تنسيق خدمات النقل الداخلي وإدارة الخدمات اللوجستية</div>
          </div>
          <div style={{ background: "rgba(201,146,42,0.08)", border: "1px solid rgba(201,146,42,0.25)", borderRadius: "0.5vw", padding: "2vh 1.5vw" }}>
            <div style={{ fontSize: "2.2vw", fontWeight: 900, color: "#c9922a", fontFamily: "var(--font-display-family)", marginBottom: "0.8vh" }}>05</div>
            <div style={{ fontSize: "1.7vw", color: "#f5f0e8", fontWeight: 700, marginBottom: "0.5vh" }}>خدمات التشغيل</div>
            <div style={{ fontSize: "1.4vw", color: "#9ca3b0", lineHeight: 1.4 }}>إدارة العمليات اليومية للمرافق والأنظمة التقنية</div>
          </div>
          <div style={{ background: "rgba(26,39,68,0.8)", border: "1px solid rgba(201,146,42,0.15)", borderRadius: "0.5vw", padding: "2vh 1.5vw" }}>
            <div style={{ fontSize: "2.2vw", fontWeight: 900, color: "#c9922a", fontFamily: "var(--font-display-family)", marginBottom: "0.8vh" }}>06</div>
            <div style={{ fontSize: "1.7vw", color: "#f5f0e8", fontWeight: 700, marginBottom: "0.5vh" }}>التقارير والامتثال</div>
            <div style={{ fontSize: "1.4vw", color: "#9ca3b0", lineHeight: 1.4 }}>لوحات تحكم حية، تقارير أداء، ووثائق امتثال رقمية</div>
          </div>
        </div>
      </div>
    </div>
  );
}
