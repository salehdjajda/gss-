export default function Slide5HowItWorks() {
  return (
    <div className="relative w-screen h-screen overflow-hidden" dir="rtl" style={{ background: "#0f1a30" }}>
      <div className="absolute" style={{ top: 0, right: 0, width: "50vw", height: "50vh", background: "radial-gradient(ellipse at top right, rgba(201,146,42,0.05), transparent 65%)" }} />
      <div className="absolute" style={{ top: "5vh", left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent 10%, rgba(201,146,42,0.25) 50%, transparent 90%)" }} />

      <div className="absolute inset-0 flex flex-col" style={{ padding: "5vh 7vw" }}>
        <div style={{ marginBottom: "1vh" }}>
          <span className="font-body" style={{ fontSize: "1.5vw", color: "#c9922a", fontWeight: 700, letterSpacing: "0.15em" }}>آلية العمل</span>
        </div>
        <h2 className="font-display font-black" style={{ fontSize: "3.8vw", color: "#f5f0e8", lineHeight: 1.1, marginBottom: "4vh", letterSpacing: "-0.01em" }}>
          كيف تعمل
          <span style={{ color: "#c9922a" }}> المنصة؟</span>
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "2vh 2.5vw", flex: 1 }}>

          <div style={{ background: "linear-gradient(135deg, rgba(201,146,42,0.12), rgba(201,146,42,0.04))", border: "1px solid rgba(201,146,42,0.35)", borderRadius: "0.8vw", padding: "3vh 2vw", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
            <div style={{ fontSize: "4vw", fontWeight: 900, color: "#c9922a", fontFamily: "var(--font-display-family)", marginBottom: "1.5vh" }}>1</div>
            <div style={{ fontSize: "1.7vw", color: "#f5f0e8", fontWeight: 800 }}>المنشأة تسجل في المنصة</div>
          </div>

          <div style={{ background: "rgba(26,39,68,0.7)", border: "1px solid rgba(201,146,42,0.2)", borderRadius: "0.8vw", padding: "3vh 2vw", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
            <div style={{ fontSize: "4vw", fontWeight: 900, color: "#c9922a", fontFamily: "var(--font-display-family)", marginBottom: "1.5vh" }}>2</div>
            <div style={{ fontSize: "1.7vw", color: "#f5f0e8", fontWeight: 800 }}>ترفع طلب الخدمة</div>
          </div>

          <div style={{ background: "rgba(26,39,68,0.7)", border: "1px solid rgba(201,146,42,0.2)", borderRadius: "0.8vw", padding: "3vh 2vw", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
            <div style={{ fontSize: "4vw", fontWeight: 900, color: "#c9922a", fontFamily: "var(--font-display-family)", marginBottom: "1.5vh" }}>3</div>
            <div style={{ fontSize: "1.7vw", color: "#f5f0e8", fontWeight: 800 }}>GSS تحلل الاحتياج</div>
          </div>

          <div style={{ background: "rgba(26,39,68,0.7)", border: "1px solid rgba(201,146,42,0.2)", borderRadius: "0.8vw", padding: "3vh 2vw", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
            <div style={{ fontSize: "4vw", fontWeight: 900, color: "#c9922a", fontFamily: "var(--font-display-family)", marginBottom: "1.5vh" }}>4</div>
            <div style={{ fontSize: "1.7vw", color: "#f5f0e8", fontWeight: 800 }}>اختيار المورد الأنسب</div>
          </div>

          <div style={{ background: "rgba(26,39,68,0.7)", border: "1px solid rgba(201,146,42,0.2)", borderRadius: "0.8vw", padding: "3vh 2vw", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
            <div style={{ fontSize: "4vw", fontWeight: 900, color: "#c9922a", fontFamily: "var(--font-display-family)", marginBottom: "1.5vh" }}>5</div>
            <div style={{ fontSize: "1.7vw", color: "#f5f0e8", fontWeight: 800 }}>متابعة التنفيذ</div>
          </div>

          <div style={{ background: "linear-gradient(135deg, rgba(201,146,42,0.12), rgba(201,146,42,0.04))", border: "1px solid rgba(201,146,42,0.35)", borderRadius: "0.8vw", padding: "3vh 2vw", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
            <div style={{ fontSize: "4vw", fontWeight: 900, color: "#c9922a", fontFamily: "var(--font-display-family)", marginBottom: "1.5vh" }}>6</div>
            <div style={{ fontSize: "1.7vw", color: "#f5f0e8", fontWeight: 800 }}>إغلاق الطلب مع تقرير تشغيل</div>
          </div>

        </div>
      </div>
    </div>
  );
}
