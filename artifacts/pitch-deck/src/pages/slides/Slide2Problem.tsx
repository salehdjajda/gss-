export default function Slide2Problem() {
  return (
    <div className="relative w-screen h-screen overflow-hidden" dir="rtl" style={{ background: "linear-gradient(145deg, #0f1a30 0%, #1a2744 60%, #0f1a30 100%)" }}>
      <div className="absolute" style={{ top: 0, left: 0, width: "35vw", height: "100vh", background: "linear-gradient(90deg, rgba(201,146,42,0.08), transparent)" }} />
      <div className="absolute" style={{ bottom: 0, right: 0, width: "40vw", height: "40vh", background: "radial-gradient(ellipse, rgba(201,146,42,0.06), transparent)" }} />

      <div className="absolute inset-0 flex flex-col" style={{ padding: "6vh 7vw" }}>
        <div style={{ marginBottom: "1.5vh" }}>
          <span className="font-body" style={{ fontSize: "1.5vw", color: "#c9922a", fontWeight: 700, letterSpacing: "0.15em" }}>التحدي</span>
        </div>
        <h2 className="font-display font-black" style={{ fontSize: "4.5vw", color: "#f5f0e8", lineHeight: 1.1, marginBottom: "4vh", letterSpacing: "-0.01em" }}>
          إدارة الموردين<br />
          <span style={{ color: "#c9922a" }}>مشكلة معقدة وغير محلولة</span>
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5vh 4vw", flex: 1 }}>
          <div style={{ borderRight: "2px solid rgba(201,146,42,0.3)", paddingRight: "2vw" }}>
            <div style={{ fontSize: "3.5vw", fontWeight: 900, color: "#c9922a", fontFamily: "var(--font-display-family)", lineHeight: 1 }}>70%</div>
            <div style={{ fontSize: "1.6vw", color: "#d4c9b0", fontWeight: 500, marginTop: "0.8vh", lineHeight: 1.4 }}>من المنشآت تفتقر لنظام موحد لإدارة الخدمات</div>
          </div>
          <div style={{ borderRight: "2px solid rgba(201,146,42,0.3)", paddingRight: "2vw" }}>
            <div style={{ fontSize: "3.5vw", fontWeight: 900, color: "#c9922a", fontFamily: "var(--font-display-family)", lineHeight: 1 }}>3x</div>
            <div style={{ fontSize: "1.6vw", color: "#d4c9b0", fontWeight: 500, marginTop: "0.8vh", lineHeight: 1.4 }}>ضعف التكلفة عند الاعتماد على قنوات تقليدية غير منظمة</div>
          </div>
          <div style={{ borderRight: "2px solid rgba(201,146,42,0.3)", paddingRight: "2vw" }}>
            <div style={{ fontSize: "1.7vw", color: "#f5f0e8", fontWeight: 700, marginBottom: "0.5vh" }}>تشتت المعلومات</div>
            <div style={{ fontSize: "1.5vw", color: "#9ca3b0", lineHeight: 1.5 }}>عقود ورقية، اتصالات هاتفية، وبيانات مبعثرة بلا توثيق</div>
          </div>
          <div style={{ borderRight: "2px solid rgba(201,146,42,0.3)", paddingRight: "2vw" }}>
            <div style={{ fontSize: "1.7vw", color: "#f5f0e8", fontWeight: 700, marginBottom: "0.5vh" }}>غياب المساءلة</div>
            <div style={{ fontSize: "1.5vw", color: "#9ca3b0", lineHeight: 1.5 }}>لا تقييم فعلي للأداء ولا معايير لجودة الخدمة المقدمة</div>
          </div>
        </div>

        <div style={{ marginTop: "3vh", borderTop: "1px solid rgba(201,146,42,0.2)", paddingTop: "2vh" }}>
          <p className="font-body" style={{ fontSize: "1.7vw", color: "#d4c9b0", fontWeight: 600, fontStyle: "italic" }}>
            "الشركات تخسر الوقت والمال بسبب غياب منصة تشغيلية موحدة"
          </p>
        </div>
      </div>
    </div>
  );
}
