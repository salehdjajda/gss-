export default function Slide4WhoWeBenefit() {
  return (
    <div className="relative w-screen h-screen overflow-hidden" dir="rtl" style={{ background: "linear-gradient(155deg, #0f1a30 0%, #1a2744 80%, #0f1a30 100%)" }}>
      <div className="absolute" style={{ top: 0, right: 0, width: "50vw", height: "50vh", background: "radial-gradient(ellipse at top right, rgba(201,146,42,0.06), transparent 60%)" }} />

      <div className="absolute inset-0 flex flex-col" style={{ padding: "4vh 6vw" }}>
        <div style={{ marginBottom: "0.5vh" }}>
          <span className="font-body" style={{ fontSize: "1.4vw", color: "#c9922a", fontWeight: 700, letterSpacing: "0.15em" }}>العملاء المستهدفون</span>
        </div>
        <h2 className="font-display font-black" style={{ fontSize: "3.2vw", color: "#f5f0e8", lineHeight: 1.1, marginBottom: "2.5vh", letterSpacing: "-0.01em" }}>
          من يستفيد من
          <span style={{ color: "#c9922a" }}> منصة GSS؟</span>
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1.2vh 1.5vw", flex: 1 }}>

          <div style={{ background: "rgba(26,39,68,0.7)", border: "1px solid rgba(201,146,42,0.2)", borderRadius: "0.5vw", padding: "1.4vh 1.2vw", display: "flex", alignItems: "center", gap: "0.8vw" }}>
            <div style={{ minWidth: "2.2vw", height: "2.2vw", borderRadius: "50%", background: "rgba(201,146,42,0.15)", border: "1px solid rgba(201,146,42,0.35)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "1.1vw", fontWeight: 900, color: "#c9922a" }}>1</span>
            </div>
            <span style={{ fontSize: "1.35vw", color: "#f5f0e8", fontWeight: 700 }}>سلاسل المطاعم والمقاهي</span>
          </div>

          <div style={{ background: "rgba(26,39,68,0.7)", border: "1px solid rgba(201,146,42,0.2)", borderRadius: "0.5vw", padding: "1.4vh 1.2vw", display: "flex", alignItems: "center", gap: "0.8vw" }}>
            <div style={{ minWidth: "2.2vw", height: "2.2vw", borderRadius: "50%", background: "rgba(201,146,42,0.15)", border: "1px solid rgba(201,146,42,0.35)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "1.1vw", fontWeight: 900, color: "#c9922a" }}>2</span>
            </div>
            <span style={{ fontSize: "1.35vw", color: "#f5f0e8", fontWeight: 700 }}>متاجر التجزئة والسوبرماركت</span>
          </div>

          <div style={{ background: "rgba(201,146,42,0.09)", border: "1px solid rgba(201,146,42,0.3)", borderRadius: "0.5vw", padding: "1.4vh 1.2vw", display: "flex", alignItems: "center", gap: "0.8vw" }}>
            <div style={{ minWidth: "2.2vw", height: "2.2vw", borderRadius: "50%", background: "rgba(201,146,42,0.2)", border: "1px solid #c9922a", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "1.1vw", fontWeight: 900, color: "#c9922a" }}>3</span>
            </div>
            <span style={{ fontSize: "1.35vw", color: "#f5f0e8", fontWeight: 700 }}>المستشفيات والعيادات الطبية</span>
          </div>

          <div style={{ background: "rgba(26,39,68,0.7)", border: "1px solid rgba(201,146,42,0.2)", borderRadius: "0.5vw", padding: "1.4vh 1.2vw", display: "flex", alignItems: "center", gap: "0.8vw" }}>
            <div style={{ minWidth: "2.2vw", height: "2.2vw", borderRadius: "50%", background: "rgba(201,146,42,0.15)", border: "1px solid rgba(201,146,42,0.35)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "1.1vw", fontWeight: 900, color: "#c9922a" }}>4</span>
            </div>
            <span style={{ fontSize: "1.35vw", color: "#f5f0e8", fontWeight: 700 }}>الشركات متعددة الفروع</span>
          </div>

          <div style={{ background: "rgba(26,39,68,0.7)", border: "1px solid rgba(201,146,42,0.2)", borderRadius: "0.5vw", padding: "1.4vh 1.2vw", display: "flex", alignItems: "center", gap: "0.8vw" }}>
            <div style={{ minWidth: "2.2vw", height: "2.2vw", borderRadius: "50%", background: "rgba(201,146,42,0.15)", border: "1px solid rgba(201,146,42,0.35)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "1.1vw", fontWeight: 900, color: "#c9922a" }}>5</span>
            </div>
            <span style={{ fontSize: "1.35vw", color: "#f5f0e8", fontWeight: 700 }}>شركات المقاولات والتطوير العقاري</span>
          </div>

          <div style={{ background: "rgba(26,39,68,0.7)", border: "1px solid rgba(201,146,42,0.2)", borderRadius: "0.5vw", padding: "1.4vh 1.2vw", display: "flex", alignItems: "center", gap: "0.8vw" }}>
            <div style={{ minWidth: "2.2vw", height: "2.2vw", borderRadius: "50%", background: "rgba(201,146,42,0.15)", border: "1px solid rgba(201,146,42,0.35)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "1.1vw", fontWeight: 900, color: "#c9922a" }}>6</span>
            </div>
            <span style={{ fontSize: "1.35vw", color: "#f5f0e8", fontWeight: 700 }}>المدارس والمراكز التعليمية</span>
          </div>

          <div style={{ background: "rgba(201,146,42,0.09)", border: "1px solid rgba(201,146,42,0.3)", borderRadius: "0.5vw", padding: "1.4vh 1.2vw", display: "flex", alignItems: "center", gap: "0.8vw" }}>
            <div style={{ minWidth: "2.2vw", height: "2.2vw", borderRadius: "50%", background: "rgba(201,146,42,0.2)", border: "1px solid #c9922a", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "1.1vw", fontWeight: 900, color: "#c9922a" }}>7</span>
            </div>
            <span style={{ fontSize: "1.35vw", color: "#f5f0e8", fontWeight: 700 }}>الفنادق والشقق المفروشة</span>
          </div>

          <div style={{ background: "rgba(26,39,68,0.7)", border: "1px solid rgba(201,146,42,0.2)", borderRadius: "0.5vw", padding: "1.4vh 1.2vw", display: "flex", alignItems: "center", gap: "0.8vw" }}>
            <div style={{ minWidth: "2.2vw", height: "2.2vw", borderRadius: "50%", background: "rgba(201,146,42,0.15)", border: "1px solid rgba(201,146,42,0.35)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "1.1vw", fontWeight: 900, color: "#c9922a" }}>8</span>
            </div>
            <span style={{ fontSize: "1.35vw", color: "#f5f0e8", fontWeight: 700 }}>المولات والمراكز التجارية</span>
          </div>

          <div style={{ background: "rgba(26,39,68,0.7)", border: "1px solid rgba(201,146,42,0.2)", borderRadius: "0.5vw", padding: "1.4vh 1.2vw", display: "flex", alignItems: "center", gap: "0.8vw" }}>
            <div style={{ minWidth: "2.2vw", height: "2.2vw", borderRadius: "50%", background: "rgba(201,146,42,0.15)", border: "1px solid rgba(201,146,42,0.35)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "1.1vw", fontWeight: 900, color: "#c9922a" }}>9</span>
            </div>
            <span style={{ fontSize: "1.35vw", color: "#f5f0e8", fontWeight: 700 }}>شركات النقل والخدمات اللوجستية</span>
          </div>

          <div style={{ background: "rgba(26,39,68,0.7)", border: "1px solid rgba(201,146,42,0.2)", borderRadius: "0.5vw", padding: "1.4vh 1.2vw", display: "flex", alignItems: "center", gap: "0.8vw" }}>
            <div style={{ minWidth: "2.2vw", height: "2.2vw", borderRadius: "50%", background: "rgba(201,146,42,0.15)", border: "1px solid rgba(201,146,42,0.35)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "1.1vw", fontWeight: 900, color: "#c9922a" }}>10</span>
            </div>
            <span style={{ fontSize: "1.35vw", color: "#f5f0e8", fontWeight: 700 }}>المصانع والمنشآت الصناعية</span>
          </div>

          <div style={{ background: "rgba(26,39,68,0.7)", border: "1px solid rgba(201,146,42,0.2)", borderRadius: "0.5vw", padding: "1.4vh 1.2vw", display: "flex", alignItems: "center", gap: "0.8vw" }}>
            <div style={{ minWidth: "2.2vw", height: "2.2vw", borderRadius: "50%", background: "rgba(201,146,42,0.15)", border: "1px solid rgba(201,146,42,0.35)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "1.1vw", fontWeight: 900, color: "#c9922a" }}>11</span>
            </div>
            <span style={{ fontSize: "1.35vw", color: "#f5f0e8", fontWeight: 700 }}>شركات التوزيع والمستودعات</span>
          </div>

          <div style={{ background: "rgba(26,39,68,0.7)", border: "1px solid rgba(201,146,42,0.2)", borderRadius: "0.5vw", padding: "1.4vh 1.2vw", display: "flex", alignItems: "center", gap: "0.8vw" }}>
            <div style={{ minWidth: "2.2vw", height: "2.2vw", borderRadius: "50%", background: "rgba(201,146,42,0.15)", border: "1px solid rgba(201,146,42,0.35)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "1.1vw", fontWeight: 900, color: "#c9922a" }}>12</span>
            </div>
            <span style={{ fontSize: "1.35vw", color: "#f5f0e8", fontWeight: 700 }}>الجهات الحكومية وشبه الحكومية</span>
          </div>

          <div style={{ background: "rgba(201,146,42,0.09)", border: "1px solid rgba(201,146,42,0.3)", borderRadius: "0.5vw", padding: "1.4vh 1.2vw", display: "flex", alignItems: "center", gap: "0.8vw" }}>
            <div style={{ minWidth: "2.2vw", height: "2.2vw", borderRadius: "50%", background: "rgba(201,146,42,0.2)", border: "1px solid #c9922a", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "1.1vw", fontWeight: 900, color: "#c9922a" }}>13</span>
            </div>
            <span style={{ fontSize: "1.35vw", color: "#f5f0e8", fontWeight: 700 }}>الشركات الناشئة سريعة النمو</span>
          </div>

        </div>

        <div style={{ marginTop: "1.5vh", display: "flex", alignItems: "center", gap: "1.5vw", borderTop: "1px solid rgba(201,146,42,0.2)", paddingTop: "1.5vh" }}>
          <div style={{ width: "3vw", height: "2px", background: "#c9922a" }} />
          <p className="font-body" style={{ fontSize: "1.45vw", color: "#d4c9b0", fontWeight: 600 }}>
            كل منشأة تضم موردين متعددين هي عميل مثالي لمنصة GSS
          </p>
        </div>
      </div>
    </div>
  );
}
