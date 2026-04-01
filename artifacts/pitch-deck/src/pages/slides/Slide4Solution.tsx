export default function Slide4Solution() {
  return (
    <div className="relative w-screen h-screen overflow-hidden" dir="rtl" style={{ background: "linear-gradient(150deg, #0f1a30 0%, #1a2744 100%)" }}>
      <div className="absolute" style={{ top: "10vh", right: "-4vw", width: "45vw", height: "45vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(201,146,42,0.06), transparent 70%)" }} />

      <div className="absolute inset-0 flex" style={{ padding: "6vh 8vw", gap: "6vw", alignItems: "center" }}>

        <div style={{ flex: "0 0 34vw" }}>
          <div style={{ marginBottom: "2vh" }}>
            <span className="font-body" style={{ fontSize: "1.5vw", color: "#c9922a", fontWeight: 700, letterSpacing: "0.15em" }}>الحل</span>
          </div>
          <h2 className="font-display font-black" style={{ fontSize: "4vw", color: "#f5f0e8", lineHeight: 1.15, letterSpacing: "-0.01em" }}>
            ما الذي تقدمه
            <br />
            <span style={{ color: "#c9922a" }}>GSS فعلياً؟</span>
          </h2>
          <p className="font-body" style={{ fontSize: "1.55vw", color: "#9ca3b0", lineHeight: 1.7, marginTop: "2.5vh", maxWidth: "28vw" }}>
            خمسة محاور تشغيلية تحول الفوضى إلى نظام واضح وقابل للقياس
          </p>
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "2vh" }}>
          <div style={{ background: "linear-gradient(135deg, rgba(201,146,42,0.12), rgba(201,146,42,0.04))", border: "1px solid rgba(201,146,42,0.35)", borderRadius: "0.6vw", padding: "2.2vh 2vw", display: "flex", alignItems: "center", gap: "1.5vw" }}>
            <div style={{ fontSize: "2.2vw", fontWeight: 900, color: "#c9922a", fontFamily: "var(--font-display-family)", minWidth: "2.5vw" }}>01</div>
            <div style={{ fontSize: "1.7vw", color: "#f5f0e8", fontWeight: 700 }}>تنظيم الطلبات التشغيلية عبر نقطة اتصال واحدة</div>
          </div>
          <div style={{ background: "rgba(26,39,68,0.7)", border: "1px solid rgba(201,146,42,0.2)", borderRadius: "0.6vw", padding: "2.2vh 2vw", display: "flex", alignItems: "center", gap: "1.5vw" }}>
            <div style={{ fontSize: "2.2vw", fontWeight: 900, color: "#c9922a", fontFamily: "var(--font-display-family)", minWidth: "2.5vw" }}>02</div>
            <div style={{ fontSize: "1.7vw", color: "#f5f0e8", fontWeight: 700 }}>اختيار المورد الأنسب لكل خدمة</div>
          </div>
          <div style={{ background: "rgba(26,39,68,0.7)", border: "1px solid rgba(201,146,42,0.2)", borderRadius: "0.6vw", padding: "2.2vh 2vw", display: "flex", alignItems: "center", gap: "1.5vw" }}>
            <div style={{ fontSize: "2.2vw", fontWeight: 900, color: "#c9922a", fontFamily: "var(--font-display-family)", minWidth: "2.5vw" }}>03</div>
            <div style={{ fontSize: "1.7vw", color: "#f5f0e8", fontWeight: 700 }}>متابعة التنفيذ حتى الإغلاق</div>
          </div>
          <div style={{ background: "rgba(26,39,68,0.7)", border: "1px solid rgba(201,146,42,0.2)", borderRadius: "0.6vw", padding: "2.2vh 2vw", display: "flex", alignItems: "center", gap: "1.5vw" }}>
            <div style={{ fontSize: "2.2vw", fontWeight: 900, color: "#c9922a", fontFamily: "var(--font-display-family)", minWidth: "2.5vw" }}>04</div>
            <div style={{ fontSize: "1.7vw", color: "#f5f0e8", fontWeight: 700 }}>تحليل المصروفات التشغيلية</div>
          </div>
          <div style={{ background: "rgba(26,39,68,0.7)", border: "1px solid rgba(201,146,42,0.2)", borderRadius: "0.6vw", padding: "2.2vh 2vw", display: "flex", alignItems: "center", gap: "1.5vw" }}>
            <div style={{ fontSize: "2.2vw", fontWeight: 900, color: "#c9922a", fontFamily: "var(--font-display-family)", minWidth: "2.5vw" }}>05</div>
            <div style={{ fontSize: "1.7vw", color: "#f5f0e8", fontWeight: 700 }}>إصدار تقارير تدعم اتخاذ القرار</div>
          </div>
        </div>

      </div>
    </div>
  );
}
