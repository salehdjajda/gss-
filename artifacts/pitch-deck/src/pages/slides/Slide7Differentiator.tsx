export default function Slide7Differentiator() {
  return (
    <div className="relative w-screen h-screen overflow-hidden" dir="rtl" style={{ background: "#0f1a30" }}>
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(201,146,42,0.04) 0%, transparent 70%)" }} />

      <div className="absolute inset-0 flex flex-col justify-center" style={{ padding: "6vh 8vw" }}>
        <div style={{ marginBottom: "2vh" }}>
          <span className="font-body" style={{ fontSize: "1.5vw", color: "#c9922a", fontWeight: 700, letterSpacing: "0.15em" }}>ما يميز GSS</span>
        </div>
        <h2 className="font-display font-black" style={{ fontSize: "3.8vw", color: "#f5f0e8", lineHeight: 1.1, marginBottom: "5vh", letterSpacing: "-0.01em" }}>
          GSS مقابل شركات التشغيل
          <span style={{ color: "#c9922a" }}> التقليدية</span>
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: "3vw", alignItems: "center" }}>

          <div style={{ background: "rgba(26,39,68,0.6)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "1vw", padding: "4vh 3vw", textAlign: "center" }}>
            <div className="font-display font-black" style={{ fontSize: "2.5vw", color: "#9ca3b0", marginBottom: "2vh" }}>شركات التشغيل التقليدية</div>
            <div style={{ fontSize: "1.8vw", color: "#9ca3b0", lineHeight: 1.6 }}>تنفذ الخدمة فقط</div>
            <div style={{ marginTop: "2vh", fontSize: "1.5vw", color: "#6b7280" }}>بدون تنسيق — بدون تقارير — بدون رؤية شاملة</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1vh" }}>
            <div style={{ width: "3vw", height: "3px", background: "#c9922a" }} />
            <div style={{ fontSize: "2vw", color: "#c9922a", fontWeight: 900 }}>VS</div>
            <div style={{ width: "3vw", height: "3px", background: "#c9922a" }} />
          </div>

          <div style={{ background: "linear-gradient(135deg, rgba(201,146,42,0.12), rgba(201,146,42,0.05))", border: "1px solid rgba(201,146,42,0.4)", borderRadius: "1vw", padding: "4vh 3vw", textAlign: "center" }}>
            <div className="font-display font-black" style={{ fontSize: "2.5vw", color: "#c9922a", marginBottom: "2vh" }}>GSS</div>
            <div style={{ fontSize: "1.8vw", color: "#f5f0e8", fontWeight: 700, lineHeight: 1.6 }}>تنظم التشغيل بالكامل</div>
            <div style={{ marginTop: "2vh", fontSize: "1.5vw", color: "#d4c9b0" }}>تنسيق — متابعة — تقارير — تحليل مصروفات</div>
          </div>

        </div>

        <div style={{ marginTop: "6vh", textAlign: "center" }}>
          <div style={{ display: "inline-block", background: "rgba(201,146,42,0.1)", border: "1px solid rgba(201,146,42,0.35)", borderRadius: "2vw", padding: "1.5vh 4vw" }}>
            <span className="font-display font-black" style={{ fontSize: "2.2vw", color: "#c9922a" }}>
              GSS — طبقة تشغيل مركزية فوق شبكة الموردين
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
