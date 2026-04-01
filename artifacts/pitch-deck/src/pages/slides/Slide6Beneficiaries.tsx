export default function Slide6Beneficiaries() {
  return (
    <div className="relative w-screen h-screen overflow-hidden" dir="rtl" style={{ background: "linear-gradient(155deg, #0f1a30 0%, #1a2744 80%, #0f1a30 100%)" }}>
      <div className="absolute" style={{ top: 0, right: 0, width: "50vw", height: "50vh", background: "radial-gradient(ellipse at top right, rgba(201,146,42,0.06), transparent 60%)" }} />

      <div className="absolute inset-0 flex" style={{ padding: "6vh 8vw", gap: "6vw", alignItems: "center" }}>

        <div style={{ flex: "0 0 32vw" }}>
          <div style={{ marginBottom: "2vh" }}>
            <span className="font-body" style={{ fontSize: "1.5vw", color: "#c9922a", fontWeight: 700, letterSpacing: "0.15em" }}>الفئات المستفيدة</span>
          </div>
          <h2 className="font-display font-black" style={{ fontSize: "4vw", color: "#f5f0e8", lineHeight: 1.15, letterSpacing: "-0.01em" }}>
            من يستفيد من
            <br />
            <span style={{ color: "#c9922a" }}>المنصة؟</span>
          </h2>
          <p className="font-body" style={{ fontSize: "1.55vw", color: "#9ca3b0", lineHeight: 1.7, marginTop: "2.5vh" }}>
            كل منشأة تضم موردين متعددين هي عميل مثالي لـ GSS
          </p>
          <div style={{ marginTop: "3vh", width: "4vw", height: "3px", background: "#c9922a" }} />
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "1.8vh" }}>
          <div style={{ background: "linear-gradient(135deg, rgba(201,146,42,0.11), rgba(201,146,42,0.04))", border: "1px solid rgba(201,146,42,0.3)", borderRadius: "0.6vw", padding: "2vh 2vw", display: "flex", alignItems: "center", gap: "1.5vw" }}>
            <div style={{ minWidth: "2.5vw", height: "2.5vw", borderRadius: "50%", background: "#c9922a", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "1.2vw", fontWeight: 900, color: "#0f1a30", fontFamily: "var(--font-display-family)" }}>1</span>
            </div>
            <div style={{ fontSize: "1.75vw", color: "#f5f0e8", fontWeight: 700 }}>الشركات متعددة الفروع</div>
          </div>
          <div style={{ background: "rgba(26,39,68,0.7)", border: "1px solid rgba(201,146,42,0.2)", borderRadius: "0.6vw", padding: "2vh 2vw", display: "flex", alignItems: "center", gap: "1.5vw" }}>
            <div style={{ minWidth: "2.5vw", height: "2.5vw", borderRadius: "50%", background: "rgba(201,146,42,0.15)", border: "1px solid #c9922a", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "1.2vw", fontWeight: 900, color: "#c9922a", fontFamily: "var(--font-display-family)" }}>2</span>
            </div>
            <div style={{ fontSize: "1.75vw", color: "#f5f0e8", fontWeight: 700 }}>سلاسل المطاعم</div>
          </div>
          <div style={{ background: "rgba(26,39,68,0.7)", border: "1px solid rgba(201,146,42,0.2)", borderRadius: "0.6vw", padding: "2vh 2vw", display: "flex", alignItems: "center", gap: "1.5vw" }}>
            <div style={{ minWidth: "2.5vw", height: "2.5vw", borderRadius: "50%", background: "rgba(201,146,42,0.15)", border: "1px solid #c9922a", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "1.2vw", fontWeight: 900, color: "#c9922a", fontFamily: "var(--font-display-family)" }}>3</span>
            </div>
            <div style={{ fontSize: "1.75vw", color: "#f5f0e8", fontWeight: 700 }}>العيادات الطبية</div>
          </div>
          <div style={{ background: "rgba(26,39,68,0.7)", border: "1px solid rgba(201,146,42,0.2)", borderRadius: "0.6vw", padding: "2vh 2vw", display: "flex", alignItems: "center", gap: "1.5vw" }}>
            <div style={{ minWidth: "2.5vw", height: "2.5vw", borderRadius: "50%", background: "rgba(201,146,42,0.15)", border: "1px solid #c9922a", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "1.2vw", fontWeight: 900, color: "#c9922a", fontFamily: "var(--font-display-family)" }}>4</span>
            </div>
            <div style={{ fontSize: "1.75vw", color: "#f5f0e8", fontWeight: 700 }}>شركات الخدمات اللوجستية</div>
          </div>
          <div style={{ background: "rgba(26,39,68,0.7)", border: "1px solid rgba(201,146,42,0.2)", borderRadius: "0.6vw", padding: "2vh 2vw", display: "flex", alignItems: "center", gap: "1.5vw" }}>
            <div style={{ minWidth: "2.5vw", height: "2.5vw", borderRadius: "50%", background: "rgba(201,146,42,0.15)", border: "1px solid #c9922a", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "1.2vw", fontWeight: 900, color: "#c9922a", fontFamily: "var(--font-display-family)" }}>5</span>
            </div>
            <div style={{ fontSize: "1.75vw", color: "#f5f0e8", fontWeight: 700 }}>شركات إدارة العقارات</div>
          </div>
          <div style={{ background: "rgba(26,39,68,0.7)", border: "1px solid rgba(201,146,42,0.2)", borderRadius: "0.6vw", padding: "2vh 2vw", display: "flex", alignItems: "center", gap: "1.5vw" }}>
            <div style={{ minWidth: "2.5vw", height: "2.5vw", borderRadius: "50%", background: "rgba(201,146,42,0.15)", border: "1px solid #c9922a", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "1.2vw", fontWeight: 900, color: "#c9922a", fontFamily: "var(--font-display-family)" }}>6</span>
            </div>
            <div style={{ fontSize: "1.75vw", color: "#f5f0e8", fontWeight: 700 }}>المستودعات</div>
          </div>
          <div style={{ background: "rgba(26,39,68,0.7)", border: "1px solid rgba(201,146,42,0.2)", borderRadius: "0.6vw", padding: "2vh 2vw", display: "flex", alignItems: "center", gap: "1.5vw" }}>
            <div style={{ minWidth: "2.5vw", height: "2.5vw", borderRadius: "50%", background: "rgba(201,146,42,0.15)", border: "1px solid #c9922a", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "1.2vw", fontWeight: 900, color: "#c9922a", fontFamily: "var(--font-display-family)" }}>7</span>
            </div>
            <div style={{ fontSize: "1.75vw", color: "#f5f0e8", fontWeight: 700 }}>إسكان الموظفين</div>
          </div>
        </div>

      </div>
    </div>
  );
}
