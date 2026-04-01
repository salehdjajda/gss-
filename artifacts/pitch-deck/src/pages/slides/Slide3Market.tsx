export default function Slide3Market() {
  return (
    <div className="relative w-screen h-screen overflow-hidden" dir="rtl" style={{ background: "#0f1a30" }}>
      <div className="absolute" style={{ top: 0, right: 0, width: "50vw", height: "60vh", background: "radial-gradient(ellipse at top right, rgba(201,146,42,0.06), transparent 65%)" }} />

      <div className="absolute inset-0 flex" style={{ padding: "6vh 8vw", gap: "6vw", alignItems: "center" }}>

        <div style={{ flex: "0 0 36vw" }}>
          <div style={{ marginBottom: "2vh" }}>
            <span className="font-body" style={{ fontSize: "1.5vw", color: "#c9922a", fontWeight: 700, letterSpacing: "0.15em" }}>المشكلة في السوق</span>
          </div>
          <h2 className="font-display font-black" style={{ fontSize: "4vw", color: "#f5f0e8", lineHeight: 1.15, letterSpacing: "-0.01em" }}>
            معظم المنشآت
            <br />
            <span style={{ color: "#c9922a" }}>تواجه يومياً:</span>
          </h2>
          <div style={{ marginTop: "4vh", width: "4vw", height: "3px", background: "#c9922a" }} />
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "2vh" }}>
          <div style={{ background: "rgba(26,39,68,0.7)", border: "1px solid rgba(201,146,42,0.2)", borderRadius: "0.6vw", padding: "2.2vh 2vw", display: "flex", alignItems: "center", gap: "1.5vw" }}>
            <div style={{ fontSize: "2.2vw", fontWeight: 900, color: "#c9922a", fontFamily: "var(--font-display-family)", minWidth: "2.5vw" }}>01</div>
            <div style={{ fontSize: "1.7vw", color: "#f5f0e8", fontWeight: 700 }}>تعدد الموردين واختلاف جودة التنفيذ</div>
          </div>
          <div style={{ background: "rgba(26,39,68,0.7)", border: "1px solid rgba(201,146,42,0.2)", borderRadius: "0.6vw", padding: "2.2vh 2vw", display: "flex", alignItems: "center", gap: "1.5vw" }}>
            <div style={{ fontSize: "2.2vw", fontWeight: 900, color: "#c9922a", fontFamily: "var(--font-display-family)", minWidth: "2.5vw" }}>02</div>
            <div style={{ fontSize: "1.7vw", color: "#f5f0e8", fontWeight: 700 }}>غياب التنسيق المركزي للخدمات التشغيلية</div>
          </div>
          <div style={{ background: "linear-gradient(135deg, rgba(201,146,42,0.1), rgba(201,146,42,0.04))", border: "1px solid rgba(201,146,42,0.3)", borderRadius: "0.6vw", padding: "2.2vh 2vw", display: "flex", alignItems: "center", gap: "1.5vw" }}>
            <div style={{ fontSize: "2.2vw", fontWeight: 900, color: "#c9922a", fontFamily: "var(--font-display-family)", minWidth: "2.5vw" }}>03</div>
            <div style={{ fontSize: "1.7vw", color: "#f5f0e8", fontWeight: 700 }}>هدر وقت الإدارات في المتابعة اليومية</div>
          </div>
          <div style={{ background: "rgba(26,39,68,0.7)", border: "1px solid rgba(201,146,42,0.2)", borderRadius: "0.6vw", padding: "2.2vh 2vw", display: "flex", alignItems: "center", gap: "1.5vw" }}>
            <div style={{ fontSize: "2.2vw", fontWeight: 900, color: "#c9922a", fontFamily: "var(--font-display-family)", minWidth: "2.5vw" }}>04</div>
            <div style={{ fontSize: "1.7vw", color: "#f5f0e8", fontWeight: 700 }}>عدم وضوح المصروفات التشغيلية</div>
          </div>
          <div style={{ background: "rgba(26,39,68,0.7)", border: "1px solid rgba(201,146,42,0.2)", borderRadius: "0.6vw", padding: "2.2vh 2vw", display: "flex", alignItems: "center", gap: "1.5vw" }}>
            <div style={{ fontSize: "2.2vw", fontWeight: 900, color: "#c9922a", fontFamily: "var(--font-display-family)", minWidth: "2.5vw" }}>05</div>
            <div style={{ fontSize: "1.7vw", color: "#f5f0e8", fontWeight: 700 }}>غياب التقارير التشغيلية الدقيقة</div>
          </div>
        </div>

      </div>
    </div>
  );
}
