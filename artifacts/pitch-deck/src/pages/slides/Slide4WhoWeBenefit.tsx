export default function Slide4WhoWeBenefit() {
  return (
    <div className="relative w-screen h-screen overflow-hidden" dir="rtl" style={{ background: "linear-gradient(155deg, #0f1a30 0%, #1a2744 80%, #0f1a30 100%)" }}>
      <div className="absolute" style={{ top: 0, right: 0, width: "50vw", height: "50vh", background: "radial-gradient(ellipse at top right, rgba(201,146,42,0.06), transparent 60%)" }} />
      <div className="absolute" style={{ bottom: 0, left: 0, width: "40vw", height: "40vh", background: "radial-gradient(ellipse at bottom left, rgba(201,146,42,0.05), transparent 60%)" }} />

      <div className="absolute inset-0 flex flex-col" style={{ padding: "5vh 7vw" }}>
        <div style={{ marginBottom: "1vh" }}>
          <span className="font-body" style={{ fontSize: "1.5vw", color: "#c9922a", fontWeight: 700, letterSpacing: "0.15em" }}>العملاء المستهدفون</span>
        </div>
        <h2 className="font-display font-black" style={{ fontSize: "3.8vw", color: "#f5f0e8", lineHeight: 1.15, marginBottom: "3.5vh", letterSpacing: "-0.01em" }}>
          من يستفيد من<br />
          <span style={{ color: "#c9922a" }}>منصة GSS؟</span>
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5vh 4vw", flex: 1 }}>
          <div style={{ background: "rgba(26,39,68,0.7)", border: "1px solid rgba(201,146,42,0.2)", borderRadius: "0.8vw", padding: "2.5vh 2vw", display: "flex", gap: "1.5vw", alignItems: "flex-start" }}>
            <div style={{ minWidth: "4vw", height: "4vw", borderRadius: "50%", background: "rgba(201,146,42,0.15)", border: "1px solid rgba(201,146,42,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "1.8vw", fontWeight: 900, color: "#c9922a", fontFamily: "var(--font-display-family)" }}>1</span>
            </div>
            <div>
              <div style={{ fontSize: "1.9vw", color: "#f5f0e8", fontWeight: 800, marginBottom: "0.5vh" }}>المجمعات السكنية والتجارية</div>
              <div style={{ fontSize: "1.4vw", color: "#9ca3b0", lineHeight: 1.5 }}>مجمعات الشقق، المكاتب، والمراكز التجارية التي تدير خدمات متعددة</div>
            </div>
          </div>
          <div style={{ background: "rgba(26,39,68,0.7)", border: "1px solid rgba(201,146,42,0.2)", borderRadius: "0.8vw", padding: "2.5vh 2vw", display: "flex", gap: "1.5vw", alignItems: "flex-start" }}>
            <div style={{ minWidth: "4vw", height: "4vw", borderRadius: "50%", background: "rgba(201,146,42,0.15)", border: "1px solid rgba(201,146,42,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "1.8vw", fontWeight: 900, color: "#c9922a", fontFamily: "var(--font-display-family)" }}>2</span>
            </div>
            <div>
              <div style={{ fontSize: "1.9vw", color: "#f5f0e8", fontWeight: 800, marginBottom: "0.5vh" }}>المستشفيات والعيادات</div>
              <div style={{ fontSize: "1.4vw", color: "#9ca3b0", lineHeight: 1.5 }}>منشآت الرعاية الصحية التي تحتاج لمعايير تشغيلية عالية الدقة</div>
            </div>
          </div>
          <div style={{ background: "rgba(26,39,68,0.7)", border: "1px solid rgba(201,146,42,0.2)", borderRadius: "0.8vw", padding: "2.5vh 2vw", display: "flex", gap: "1.5vw", alignItems: "flex-start" }}>
            <div style={{ minWidth: "4vw", height: "4vw", borderRadius: "50%", background: "rgba(201,146,42,0.15)", border: "1px solid rgba(201,146,42,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "1.8vw", fontWeight: 900, color: "#c9922a", fontFamily: "var(--font-display-family)" }}>3</span>
            </div>
            <div>
              <div style={{ fontSize: "1.9vw", color: "#f5f0e8", fontWeight: 800, marginBottom: "0.5vh" }}>المدارس والجامعات</div>
              <div style={{ fontSize: "1.4vw", color: "#9ca3b0", lineHeight: 1.5 }}>المؤسسات التعليمية ذات المساحات الواسعة والاحتياجات التشغيلية المتنوعة</div>
            </div>
          </div>
          <div style={{ background: "rgba(201,146,42,0.08)", border: "1px solid rgba(201,146,42,0.3)", borderRadius: "0.8vw", padding: "2.5vh 2vw", display: "flex", gap: "1.5vw", alignItems: "flex-start" }}>
            <div style={{ minWidth: "4vw", height: "4vw", borderRadius: "50%", background: "rgba(201,146,42,0.2)", border: "1px solid #c9922a", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "1.8vw", fontWeight: 900, color: "#c9922a", fontFamily: "var(--font-display-family)" }}>4</span>
            </div>
            <div>
              <div style={{ fontSize: "1.9vw", color: "#f5f0e8", fontWeight: 800, marginBottom: "0.5vh" }}>الفنادق والمنشآت السياحية</div>
              <div style={{ fontSize: "1.4vw", color: "#9ca3b0", lineHeight: 1.5 }}>قطاع الضيافة حيث جودة الخدمة تنعكس مباشرة على تجربة الضيف</div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: "2.5vh", display: "flex", alignItems: "center", gap: "2vw", borderTop: "1px solid rgba(201,146,42,0.2)", paddingTop: "2vh" }}>
          <div style={{ width: "4vw", height: "2px", background: "#c9922a" }} />
          <p className="font-body" style={{ fontSize: "1.6vw", color: "#d4c9b0", fontWeight: 600 }}>
            كل منشأة تضم موردين متعددين هي عميل مثالي لمنصة GSS
          </p>
        </div>
      </div>
    </div>
  );
}
