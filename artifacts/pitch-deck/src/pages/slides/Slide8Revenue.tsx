export default function Slide8Revenue() {
  return (
    <div className="relative w-screen h-screen overflow-hidden" dir="rtl" style={{ background: "linear-gradient(150deg, #0f1a30 0%, #1a2744 100%)" }}>
      <div className="absolute" style={{ top: "15vh", left: "5vw", width: "1px", height: "70vh", background: "linear-gradient(180deg, transparent, rgba(201,146,42,0.4), transparent)" }} />
      <div className="absolute" style={{ top: 0, right: 0, width: "50vw", height: "50vh", background: "radial-gradient(ellipse at top right, rgba(201,146,42,0.05), transparent 60%)" }} />

      <div className="absolute inset-0 flex" style={{ padding: "6vh 8vw", gap: "5vw" }}>

        <div style={{ flex: "0 0 34vw", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ marginBottom: "1.5vh" }}>
            <span className="font-body" style={{ fontSize: "1.5vw", color: "#c9922a", fontWeight: 700, letterSpacing: "0.15em" }}>نموذج الإيرادات</span>
          </div>
          <h2 className="font-display font-black" style={{ fontSize: "4vw", color: "#f5f0e8", lineHeight: 1.15, marginBottom: "3vh", letterSpacing: "-0.01em" }}>
            أربعة مصادر
            <br />
            <span style={{ color: "#c9922a" }}>للإيرادات</span>
          </h2>
          <p className="font-body" style={{ fontSize: "1.55vw", color: "#9ca3b0", lineHeight: 1.7, maxWidth: "28vw" }}>
            نموذج عمل مرن يضمن تدفق إيرادات متعدد المصادر وقابلية توسع عالية
          </p>
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "2.2vh", justifyContent: "center" }}>
          <div style={{ background: "linear-gradient(135deg, rgba(201,146,42,0.12), rgba(201,146,42,0.05))", border: "1px solid rgba(201,146,42,0.35)", borderRadius: "0.8vw", padding: "2.8vh 2.2vw", display: "flex", alignItems: "center", gap: "2vw" }}>
            <div style={{ fontSize: "2.8vw", fontWeight: 900, color: "#c9922a", fontFamily: "var(--font-display-family)", minWidth: "3.2vw" }}>01</div>
            <div>
              <div style={{ fontSize: "1.8vw", color: "#f5f0e8", fontWeight: 700 }}>رسوم خدمة لكل طلب يتم تنفيذه</div>
              <div style={{ fontSize: "1.4vw", color: "#9ca3b0", marginTop: "0.3vh" }}>نسبة من قيمة كل خدمة تُنفذ عبر المنصة</div>
            </div>
          </div>
          <div style={{ background: "rgba(26,39,68,0.6)", border: "1px solid rgba(201,146,42,0.15)", borderRadius: "0.8vw", padding: "2.8vh 2.2vw", display: "flex", alignItems: "center", gap: "2vw" }}>
            <div style={{ fontSize: "2.8vw", fontWeight: 900, color: "#c9922a", fontFamily: "var(--font-display-family)", minWidth: "3.2vw" }}>02</div>
            <div>
              <div style={{ fontSize: "1.8vw", color: "#f5f0e8", fontWeight: 700 }}>نسبة من المشاريع التشغيلية الكبيرة</div>
              <div style={{ fontSize: "1.4vw", color: "#9ca3b0", marginTop: "0.3vh" }}>نسبة مئوية من قيمة العقود الكبيرة والمشاريع الموسّعة</div>
            </div>
          </div>
          <div style={{ background: "rgba(26,39,68,0.6)", border: "1px solid rgba(201,146,42,0.15)", borderRadius: "0.8vw", padding: "2.8vh 2.2vw", display: "flex", alignItems: "center", gap: "2vw" }}>
            <div style={{ fontSize: "2.8vw", fontWeight: 900, color: "#c9922a", fontFamily: "var(--font-display-family)", minWidth: "3.2vw" }}>03</div>
            <div>
              <div style={{ fontSize: "1.8vw", color: "#f5f0e8", fontWeight: 700 }}>باقات تشغيل للشركات الكبيرة</div>
              <div style={{ fontSize: "1.4vw", color: "#9ca3b0", marginTop: "0.3vh" }}>باقات اشتراك اختيارية للوصول الكامل للمنصة</div>
            </div>
          </div>
          <div style={{ background: "rgba(26,39,68,0.6)", border: "1px solid rgba(201,146,42,0.15)", borderRadius: "0.8vw", padding: "2.8vh 2.2vw", display: "flex", alignItems: "center", gap: "2vw" }}>
            <div style={{ fontSize: "2.8vw", fontWeight: 900, color: "#c9922a", fontFamily: "var(--font-display-family)", minWidth: "3.2vw" }}>04</div>
            <div>
              <div style={{ fontSize: "1.8vw", color: "#f5f0e8", fontWeight: 700 }}>نسبة من التوصيات التشغيلية للمستشارين</div>
              <div style={{ fontSize: "1.4vw", color: "#9ca3b0", marginTop: "0.3vh" }}>نسبة من عائد توصيات المستشارين التشغيليين</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
