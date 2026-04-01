export default function Slide5Revenue() {
  return (
    <div className="relative w-screen h-screen overflow-hidden" dir="rtl" style={{ background: "#0f1a30" }}>
      <div className="absolute" style={{ top: "15vh", left: "5vw", width: "1px", height: "70vh", background: "linear-gradient(180deg, transparent, rgba(201,146,42,0.4), transparent)" }} />
      <div className="absolute" style={{ top: 0, right: 0, width: "50vw", height: "50vh", background: "radial-gradient(ellipse at top right, rgba(201,146,42,0.05), transparent 60%)" }} />

      <div className="absolute inset-0 flex" style={{ padding: "5vh 7vw", gap: "5vw" }}>
        <div style={{ flex: "0 0 36vw", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ marginBottom: "1.5vh" }}>
            <span className="font-body" style={{ fontSize: "1.5vw", color: "#c9922a", fontWeight: 700, letterSpacing: "0.15em" }}>نموذج العوائد</span>
          </div>
          <h2 className="font-display font-black" style={{ fontSize: "3.8vw", color: "#f5f0e8", lineHeight: 1.15, marginBottom: "2.5vh", letterSpacing: "-0.01em" }}>
            خمسة مصادر<br />
            <span style={{ color: "#c9922a" }}>للإيرادات المتنوعة</span>
          </h2>
          <p className="font-body" style={{ fontSize: "1.55vw", color: "#9ca3b0", lineHeight: 1.6, maxWidth: "30vw" }}>
            نموذج عمل مرن يضمن تدفق إيرادات متعدد المصادر وقابلية توسع عالية مع النمو
          </p>
          <div style={{ marginTop: "3.5vh", display: "flex", gap: "2vw" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "3.5vw", fontWeight: 900, color: "#c9922a", fontFamily: "var(--font-display-family)" }}>100+</div>
              <div style={{ fontSize: "1.35vw", color: "#9ca3b0", marginTop: "0.3vh" }}>منشأة مستهدفة</div>
            </div>
            <div style={{ width: "1px", background: "rgba(201,146,42,0.3)" }} />
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "3.5vw", fontWeight: 900, color: "#c9922a", fontFamily: "var(--font-display-family)" }}>80+</div>
              <div style={{ fontSize: "1.35vw", color: "#9ca3b0", marginTop: "0.3vh" }}>مورد معتمد</div>
            </div>
          </div>
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "1.5vh", justifyContent: "center" }}>
          <div style={{ background: "linear-gradient(135deg, rgba(201,146,42,0.12), rgba(201,146,42,0.05))", border: "1px solid rgba(201,146,42,0.3)", borderRadius: "0.8vw", padding: "2vh 1.8vw", display: "flex", alignItems: "center", gap: "1.5vw" }}>
            <div style={{ fontSize: "2.5vw", fontWeight: 900, color: "#c9922a", fontFamily: "var(--font-display-family)", minWidth: "2.8vw" }}>01</div>
            <div>
              <div style={{ fontSize: "1.7vw", color: "#f5f0e8", fontWeight: 700 }}>اشتراك المنشآت</div>
              <div style={{ fontSize: "1.3vw", color: "#9ca3b0", marginTop: "0.2vh" }}>اشتراك شهري/سنوي للوصول للمنصة وإدارة الخدمات</div>
            </div>
          </div>

          <div style={{ background: "rgba(26,39,68,0.6)", border: "1px solid rgba(201,146,42,0.15)", borderRadius: "0.8vw", padding: "2vh 1.8vw", display: "flex", alignItems: "center", gap: "1.5vw" }}>
            <div style={{ fontSize: "2.5vw", fontWeight: 900, color: "#c9922a", fontFamily: "var(--font-display-family)", minWidth: "2.8vw" }}>02</div>
            <div>
              <div style={{ fontSize: "1.7vw", color: "#f5f0e8", fontWeight: 700 }}>رسوم خدمة لكل طلب</div>
              <div style={{ fontSize: "1.3vw", color: "#9ca3b0", marginTop: "0.2vh" }}>نسبة من قيمة كل خدمة تُنفذ عبر المنصة</div>
            </div>
          </div>

          <div style={{ background: "linear-gradient(135deg, rgba(201,146,42,0.09), rgba(201,146,42,0.03))", border: "1px solid rgba(201,146,42,0.28)", borderRadius: "0.8vw", padding: "2vh 1.8vw", display: "flex", alignItems: "center", gap: "1.5vw" }}>
            <div style={{ fontSize: "2.5vw", fontWeight: 900, color: "#c9922a", fontFamily: "var(--font-display-family)", minWidth: "2.8vw" }}>03</div>
            <div>
              <div style={{ fontSize: "1.7vw", color: "#f5f0e8", fontWeight: 700 }}>نسبة إدارة المشاريع الكبيرة</div>
              <div style={{ fontSize: "1.3vw", color: "#9ca3b0", marginTop: "0.2vh" }}>نسبة مئوية من قيمة المشاريع التشغيلية الكبيرة والعقود الموسّعة</div>
            </div>
          </div>

          <div style={{ background: "rgba(26,39,68,0.6)", border: "1px solid rgba(201,146,42,0.15)", borderRadius: "0.8vw", padding: "2vh 1.8vw", display: "flex", alignItems: "center", gap: "1.5vw" }}>
            <div style={{ fontSize: "2.5vw", fontWeight: 900, color: "#c9922a", fontFamily: "var(--font-display-family)", minWidth: "2.8vw" }}>04</div>
            <div>
              <div style={{ fontSize: "1.7vw", color: "#f5f0e8", fontWeight: 700 }}>تسجيل الموردين</div>
              <div style={{ fontSize: "1.3vw", color: "#9ca3b0", marginTop: "0.2vh" }}>رسوم انضمام وتجديد سنوي لمزودي الخدمات</div>
            </div>
          </div>

          <div style={{ background: "rgba(26,39,68,0.6)", border: "1px solid rgba(201,146,42,0.15)", borderRadius: "0.8vw", padding: "2vh 1.8vw", display: "flex", alignItems: "center", gap: "1.5vw" }}>
            <div style={{ fontSize: "2.5vw", fontWeight: 900, color: "#c9922a", fontFamily: "var(--font-display-family)", minWidth: "2.8vw" }}>05</div>
            <div>
              <div style={{ fontSize: "1.7vw", color: "#f5f0e8", fontWeight: 700 }}>نسبة توصيات المستشارين</div>
              <div style={{ fontSize: "1.3vw", color: "#9ca3b0", marginTop: "0.2vh" }}>نسبة من توصيات الاستشارات التشغيلية للمنشآت</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
