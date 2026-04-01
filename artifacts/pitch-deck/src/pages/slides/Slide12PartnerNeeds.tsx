export default function Slide12PartnerNeeds() {
  return (
    <div className="relative w-screen h-screen overflow-hidden" dir="rtl" style={{ background: "linear-gradient(150deg, #0f1a30 0%, #1a2744 100%)" }}>
      <div className="absolute" style={{ top: 0, right: 0, width: "55vw", height: "55vh", background: "radial-gradient(ellipse at top right, rgba(201,146,42,0.06), transparent 65%)" }} />

      <div className="absolute inset-0 flex" style={{ padding: "6vh 8vw", gap: "6vw", alignItems: "center" }}>

        <div style={{ flex: "0 0 35vw" }}>
          <div style={{ marginBottom: "2vh" }}>
            <span className="font-body" style={{ fontSize: "1.5vw", color: "#c9922a", fontWeight: 700, letterSpacing: "0.15em" }}>ما نحتاجه</span>
          </div>
          <h2 className="font-display font-black" style={{ fontSize: "4vw", color: "#f5f0e8", lineHeight: 1.15, letterSpacing: "-0.01em" }}>
            ما نحتاجه
            <br />
            <span style={{ color: "#c9922a" }}>من الشريك</span>
          </h2>
          <p className="font-body" style={{ fontSize: "1.55vw", color: "#9ca3b0", lineHeight: 1.7, marginTop: "2.5vh", maxWidth: "28vw" }}>
            نسعى لشريك تشغيل يمتلك خبرة في خدمات الصيانة والتشغيل لدعم الإطلاق
          </p>
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "2.5vh" }}>
          <div style={{ background: "linear-gradient(135deg, rgba(201,146,42,0.12), rgba(201,146,42,0.04))", border: "1px solid rgba(201,146,42,0.35)", borderRadius: "0.8vw", padding: "3.5vh 2.5vw", display: "flex", gap: "2vw", alignItems: "center" }}>
            <div style={{ minWidth: "3.5vw", height: "3.5vw", borderRadius: "50%", background: "#c9922a", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "1.6vw", fontWeight: 900, color: "#0f1a30", fontFamily: "var(--font-display-family)" }}>1</span>
            </div>
            <div style={{ fontSize: "1.8vw", color: "#f5f0e8", fontWeight: 700 }}>الدعم النظامي للعقود والفواتير</div>
          </div>
          <div style={{ background: "rgba(26,39,68,0.7)", border: "1px solid rgba(201,146,42,0.2)", borderRadius: "0.8vw", padding: "3.5vh 2.5vw", display: "flex", gap: "2vw", alignItems: "center" }}>
            <div style={{ minWidth: "3.5vw", height: "3.5vw", borderRadius: "50%", background: "rgba(201,146,42,0.15)", border: "2px solid #c9922a", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "1.6vw", fontWeight: 900, color: "#c9922a", fontFamily: "var(--font-display-family)" }}>2</span>
            </div>
            <div style={{ fontSize: "1.8vw", color: "#f5f0e8", fontWeight: 700 }}>المشاركة في تنفيذ الطلبات التشغيلية</div>
          </div>
          <div style={{ background: "rgba(26,39,68,0.7)", border: "1px solid rgba(201,146,42,0.2)", borderRadius: "0.8vw", padding: "3.5vh 2.5vw", display: "flex", gap: "2vw", alignItems: "center" }}>
            <div style={{ minWidth: "3.5vw", height: "3.5vw", borderRadius: "50%", background: "rgba(201,146,42,0.15)", border: "2px solid #c9922a", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "1.6vw", fontWeight: 900, color: "#c9922a", fontFamily: "var(--font-display-family)" }}>3</span>
            </div>
            <div style={{ fontSize: "1.8vw", color: "#f5f0e8", fontWeight: 700 }}>دعم إطلاق المنصة في السوق</div>
          </div>
          <div style={{ background: "rgba(26,39,68,0.7)", border: "1px solid rgba(201,146,42,0.2)", borderRadius: "0.8vw", padding: "3.5vh 2.5vw", display: "flex", gap: "2vw", alignItems: "center" }}>
            <div style={{ minWidth: "3.5vw", height: "3.5vw", borderRadius: "50%", background: "rgba(201,146,42,0.15)", border: "2px solid #c9922a", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "1.6vw", fontWeight: 900, color: "#c9922a", fontFamily: "var(--font-display-family)" }}>4</span>
            </div>
            <div style={{ fontSize: "1.8vw", color: "#f5f0e8", fontWeight: 700 }}>توفير غطاء تشغيلي للمرحلة الأولى</div>
          </div>
        </div>

      </div>
    </div>
  );
}
