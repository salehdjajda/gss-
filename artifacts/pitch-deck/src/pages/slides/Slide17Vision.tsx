export default function Slide17Vision() {
  return (
    <div className="relative w-screen h-screen overflow-hidden" dir="rtl" style={{ background: "#0f1a30" }}>
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(201,146,42,0.05) 0%, transparent 70%)" }} />
      <div className="absolute" style={{ top: "5vh", left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent 10%, rgba(201,146,42,0.3) 50%, transparent 90%)" }} />

      <div className="absolute inset-0 flex flex-col" style={{ padding: "5vh 8vw" }}>
        <div style={{ marginBottom: "1vh" }}>
          <span className="font-body" style={{ fontSize: "1.5vw", color: "#c9922a", fontWeight: 700, letterSpacing: "0.15em" }}>الرؤية المستقبلية</span>
        </div>
        <h2 className="font-display font-black" style={{ fontSize: "3.8vw", color: "#f5f0e8", lineHeight: 1.1, marginBottom: "5vh", letterSpacing: "-0.01em" }}>
          إلى أين تتجه
          <span style={{ color: "#c9922a" }}> GSS؟</span>
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3vh 4vw", flex: 1 }}>
          <div style={{ background: "linear-gradient(135deg, rgba(201,146,42,0.12), rgba(201,146,42,0.04))", border: "1px solid rgba(201,146,42,0.35)", borderRadius: "0.8vw", padding: "4vh 3vw", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ fontSize: "3vw", fontWeight: 900, color: "#c9922a", fontFamily: "var(--font-display-family)", marginBottom: "1.5vh" }}>01</div>
            <div style={{ fontSize: "1.9vw", color: "#f5f0e8", fontWeight: 800, marginBottom: "1vh" }}>منصة إدارة تشغيل للشركات متعددة الفروع</div>
            <div style={{ fontSize: "1.4vw", color: "#9ca3b0", lineHeight: 1.5 }}>الرؤية الأساسية — تحويل GSS لمرجع تشغيل للشركات</div>
          </div>
          <div style={{ background: "rgba(26,39,68,0.7)", border: "1px solid rgba(201,146,42,0.2)", borderRadius: "0.8vw", padding: "4vh 3vw", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ fontSize: "3vw", fontWeight: 900, color: "#c9922a", fontFamily: "var(--font-display-family)", marginBottom: "1.5vh" }}>02</div>
            <div style={{ fontSize: "1.9vw", color: "#f5f0e8", fontWeight: 800, marginBottom: "1vh" }}>بناء شبكة موردين مركزية</div>
            <div style={{ fontSize: "1.4vw", color: "#9ca3b0", lineHeight: 1.5 }}>شبكة موردين معتمدين ومصنفين في كل تخصص تشغيلي</div>
          </div>
          <div style={{ background: "rgba(26,39,68,0.7)", border: "1px solid rgba(201,146,42,0.2)", borderRadius: "0.8vw", padding: "4vh 3vw", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ fontSize: "3vw", fontWeight: 900, color: "#c9922a", fontFamily: "var(--font-display-family)", marginBottom: "1.5vh" }}>03</div>
            <div style={{ fontSize: "1.9vw", color: "#f5f0e8", fontWeight: 800, marginBottom: "1vh" }}>التوسع إلى مدن أخرى داخل المملكة</div>
            <div style={{ fontSize: "1.4vw", color: "#9ca3b0", lineHeight: 1.5 }}>الرياض — الدمام — المدينة — مكة بعد إثبات النموذج في جدة</div>
          </div>
          <div style={{ background: "linear-gradient(135deg, rgba(201,146,42,0.12), rgba(201,146,42,0.04))", border: "1px solid rgba(201,146,42,0.35)", borderRadius: "0.8vw", padding: "4vh 3vw", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ fontSize: "3vw", fontWeight: 900, color: "#c9922a", fontFamily: "var(--font-display-family)", marginBottom: "1.5vh" }}>04</div>
            <div style={{ fontSize: "1.9vw", color: "#f5f0e8", fontWeight: 800, marginBottom: "1vh" }}>إطلاق نموذج تشغيل إقليمي مستقبلاً</div>
            <div style={{ fontSize: "1.4vw", color: "#9ca3b0", lineHeight: 1.5 }}>التوسع الإقليمي نحو دول الخليج في المراحل المتقدمة</div>
          </div>
        </div>
      </div>
    </div>
  );
}
