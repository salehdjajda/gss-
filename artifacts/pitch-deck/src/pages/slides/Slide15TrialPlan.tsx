export default function Slide15TrialPlan() {
  return (
    <div className="relative w-screen h-screen overflow-hidden" dir="rtl" style={{ background: "#0f1a30" }}>
      <div className="absolute" style={{ top: 0, right: 0, width: "55vw", height: "55vh", background: "radial-gradient(ellipse at top right, rgba(201,146,42,0.06), transparent 65%)" }} />
      <div className="absolute" style={{ top: "5vh", left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent 10%, rgba(201,146,42,0.25) 50%, transparent 90%)" }} />

      <div className="absolute inset-0 flex flex-col" style={{ padding: "5vh 8vw" }}>
        <div style={{ marginBottom: "1vh" }}>
          <span className="font-body" style={{ fontSize: "1.5vw", color: "#c9922a", fontWeight: 700, letterSpacing: "0.15em" }}>المرحلة التجريبية</span>
        </div>
        <h2 className="font-display font-black" style={{ fontSize: "3.6vw", color: "#f5f0e8", lineHeight: 1.1, marginBottom: "3.5vh", letterSpacing: "-0.01em" }}>
          خطة التشغيل خلال
          <span style={{ color: "#c9922a" }}> المرحلة التجريبية</span>
        </h2>

        <div style={{ display: "flex", flex: 1, flexDirection: "column", gap: "1.8vh" }}>
          <div style={{ background: "linear-gradient(135deg, rgba(201,146,42,0.11), rgba(201,146,42,0.04))", border: "1px solid rgba(201,146,42,0.3)", borderRadius: "0.7vw", padding: "2.5vh 2.5vw", display: "flex", alignItems: "center", gap: "2vw" }}>
            <div style={{ minWidth: "3.5vw", height: "3.5vw", borderRadius: "50%", background: "#c9922a", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "1.6vw", fontWeight: 900, color: "#0f1a30", fontFamily: "var(--font-display-family)" }}>1</span>
            </div>
            <div style={{ fontSize: "1.8vw", color: "#f5f0e8", fontWeight: 700 }}>إطلاق المنصة رسميًا</div>
          </div>
          <div style={{ background: "rgba(26,39,68,0.7)", border: "1px solid rgba(201,146,42,0.2)", borderRadius: "0.7vw", padding: "2.5vh 2.5vw", display: "flex", alignItems: "center", gap: "2vw" }}>
            <div style={{ minWidth: "3.5vw", height: "3.5vw", borderRadius: "50%", background: "rgba(201,146,42,0.15)", border: "2px solid #c9922a", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "1.6vw", fontWeight: 900, color: "#c9922a", fontFamily: "var(--font-display-family)" }}>2</span>
            </div>
            <div style={{ fontSize: "1.8vw", color: "#f5f0e8", fontWeight: 700 }}>تسجيل الموردين الأساسيين</div>
          </div>
          <div style={{ background: "rgba(26,39,68,0.7)", border: "1px solid rgba(201,146,42,0.2)", borderRadius: "0.7vw", padding: "2.5vh 2.5vw", display: "flex", alignItems: "center", gap: "2vw" }}>
            <div style={{ minWidth: "3.5vw", height: "3.5vw", borderRadius: "50%", background: "rgba(201,146,42,0.15)", border: "2px solid #c9922a", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "1.6vw", fontWeight: 900, color: "#c9922a", fontFamily: "var(--font-display-family)" }}>3</span>
            </div>
            <div style={{ fontSize: "1.8vw", color: "#f5f0e8", fontWeight: 700 }}>استقطاب أول العملاء</div>
          </div>
          <div style={{ background: "rgba(26,39,68,0.7)", border: "1px solid rgba(201,146,42,0.2)", borderRadius: "0.7vw", padding: "2.5vh 2.5vw", display: "flex", alignItems: "center", gap: "2vw" }}>
            <div style={{ minWidth: "3.5vw", height: "3.5vw", borderRadius: "50%", background: "rgba(201,146,42,0.15)", border: "2px solid #c9922a", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "1.6vw", fontWeight: 900, color: "#c9922a", fontFamily: "var(--font-display-family)" }}>4</span>
            </div>
            <div style={{ fontSize: "1.8vw", color: "#f5f0e8", fontWeight: 700 }}>تنفيذ الطلبات التشغيلية الأولى</div>
          </div>
          <div style={{ background: "rgba(26,39,68,0.7)", border: "1px solid rgba(201,146,42,0.2)", borderRadius: "0.7vw", padding: "2.5vh 2.5vw", display: "flex", alignItems: "center", gap: "2vw" }}>
            <div style={{ minWidth: "3.5vw", height: "3.5vw", borderRadius: "50%", background: "rgba(201,146,42,0.15)", border: "2px solid #c9922a", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "1.6vw", fontWeight: 900, color: "#c9922a", fontFamily: "var(--font-display-family)" }}>5</span>
            </div>
            <div style={{ fontSize: "1.8vw", color: "#f5f0e8", fontWeight: 700 }}>إصدار التقارير التشغيلية</div>
          </div>
        </div>

        <div style={{ marginTop: "2.5vh", background: "rgba(201,146,42,0.08)", border: "1px solid rgba(201,146,42,0.25)", borderRadius: "0.6vw", padding: "1.8vh 2.5vw", display: "flex", alignItems: "center", gap: "1.5vw" }}>
          <div style={{ width: "3vw", height: "2px", background: "#c9922a" }} />
          <span className="font-body" style={{ fontSize: "1.6vw", color: "#d4c9b0", fontWeight: 600 }}>ثم تقييم نتائج المرحلة التجريبية وتطوير الشراكة للمرحلة التالية</span>
        </div>
      </div>
    </div>
  );
}
