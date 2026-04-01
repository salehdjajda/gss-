export default function Slide6Plan90() {
  return (
    <div className="relative w-screen h-screen overflow-hidden" dir="rtl" style={{ background: "linear-gradient(150deg, #0f1a30 0%, #1a2744 100%)" }}>
      <div className="absolute" style={{ top: "5vh", left: "0", right: "0", height: "1px", background: "linear-gradient(90deg, transparent 10%, rgba(201,146,42,0.3) 50%, transparent 90%)" }} />

      <div className="absolute inset-0 flex flex-col" style={{ padding: "5vh 7vw" }}>
        <div style={{ marginBottom: "1vh" }}>
          <span className="font-body" style={{ fontSize: "1.5vw", color: "#c9922a", fontWeight: 700, letterSpacing: "0.15em" }}>خارطة الانطلاق</span>
        </div>
        <h2 className="font-display font-black" style={{ fontSize: "3.8vw", color: "#f5f0e8", lineHeight: 1.15, marginBottom: "3.5vh", letterSpacing: "-0.01em" }}>
          خطة التسعين يوماً
          <span style={{ color: "#c9922a" }}> الأولى</span>
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "2vh 2.5vw", flex: 1 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5vh" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1vw", marginBottom: "0.5vh" }}>
              <div style={{ width: "3vw", height: "3vw", borderRadius: "50%", background: "#c9922a", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: "1.4vw", fontWeight: 900, color: "#0f1a30", fontFamily: "var(--font-display-family)" }}>1</span>
              </div>
              <div style={{ fontSize: "1.6vw", color: "#c9922a", fontWeight: 800 }}>اليوم 1 — 30</div>
            </div>
            <div style={{ fontSize: "1.8vw", color: "#f5f0e8", fontWeight: 700 }}>الإطلاق والبناء</div>
            <div style={{ fontSize: "1.4vw", color: "#9ca3b0", lineHeight: 1.5 }}>تجنيد أولى المنشآت وتوقيع 15 عقد شراكة مع الموردين المعتمدين</div>
            <div style={{ background: "rgba(201,146,42,0.1)", border: "1px solid rgba(201,146,42,0.2)", borderRadius: "0.4vw", padding: "1vh 1.2vw", marginTop: "auto" }}>
              <div style={{ fontSize: "2.5vw", fontWeight: 900, color: "#c9922a", fontFamily: "var(--font-display-family)" }}>15</div>
              <div style={{ fontSize: "1.3vw", color: "#9ca3b0" }}>منشأة مفعّلة</div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5vh", borderRight: "1px solid rgba(201,146,42,0.2)", borderLeft: "1px solid rgba(201,146,42,0.2)", paddingRight: "2vw", paddingLeft: "2vw" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1vw", marginBottom: "0.5vh" }}>
              <div style={{ width: "3vw", height: "3vw", borderRadius: "50%", background: "rgba(201,146,42,0.2)", border: "2px solid #c9922a", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: "1.4vw", fontWeight: 900, color: "#c9922a", fontFamily: "var(--font-display-family)" }}>2</span>
              </div>
              <div style={{ fontSize: "1.6vw", color: "#c9922a", fontWeight: 800 }}>اليوم 31 — 60</div>
            </div>
            <div style={{ fontSize: "1.8vw", color: "#f5f0e8", fontWeight: 700 }}>النمو والتوسع</div>
            <div style={{ fontSize: "1.4vw", color: "#9ca3b0", lineHeight: 1.5 }}>توسيع الشبكة وتنفيذ أول 30 طلب خدمة عبر المنصة بنجاح</div>
            <div style={{ background: "rgba(201,146,42,0.1)", border: "1px solid rgba(201,146,42,0.2)", borderRadius: "0.4vw", padding: "1vh 1.2vw", marginTop: "auto" }}>
              <div style={{ fontSize: "2.5vw", fontWeight: 900, color: "#c9922a", fontFamily: "var(--font-display-family)" }}>30</div>
              <div style={{ fontSize: "1.3vw", color: "#9ca3b0" }}>طلب خدمة منجز</div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5vh" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1vw", marginBottom: "0.5vh" }}>
              <div style={{ width: "3vw", height: "3vw", borderRadius: "50%", background: "rgba(201,146,42,0.2)", border: "2px solid #c9922a", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: "1.4vw", fontWeight: 900, color: "#c9922a", fontFamily: "var(--font-display-family)" }}>3</span>
              </div>
              <div style={{ fontSize: "1.6vw", color: "#c9922a", fontWeight: 800 }}>اليوم 61 — 90</div>
            </div>
            <div style={{ fontSize: "1.8vw", color: "#f5f0e8", fontWeight: 700 }}>الاستقرار والتحسين</div>
            <div style={{ fontSize: "1.4vw", color: "#9ca3b0", lineHeight: 1.5 }}>تحقيق أهداف 50 منشأة و60 مورداً وتحسين العمليات استناداً للبيانات</div>
            <div style={{ background: "rgba(201,146,42,0.1)", border: "1px solid rgba(201,146,42,0.2)", borderRadius: "0.4vw", padding: "1vh 1.2vw", marginTop: "auto" }}>
              <div style={{ fontSize: "2.5vw", fontWeight: 900, color: "#c9922a", fontFamily: "var(--font-display-family)" }}>50+</div>
              <div style={{ fontSize: "1.3vw", color: "#9ca3b0" }}>منشأة نشطة</div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: "3vh", display: "flex", justifyContent: "center", gap: "6vw", borderTop: "1px solid rgba(201,146,42,0.2)", paddingTop: "2vh" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "2.5vw", fontWeight: 900, color: "#e8b84b", fontFamily: "var(--font-display-family)" }}>50</div>
            <div style={{ fontSize: "1.4vw", color: "#9ca3b0" }}>منشأة مستهدفة</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "2.5vw", fontWeight: 900, color: "#e8b84b", fontFamily: "var(--font-display-family)" }}>60</div>
            <div style={{ fontSize: "1.4vw", color: "#9ca3b0" }}>مورد معتمد</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "2.5vw", fontWeight: 900, color: "#e8b84b", fontFamily: "var(--font-display-family)" }}>30-50</div>
            <div style={{ fontSize: "1.4vw", color: "#9ca3b0" }}>طلب خدمة شهري</div>
          </div>
        </div>
      </div>
    </div>
  );
}
