export default function Slide14PartnerModels() {
  return (
    <div className="relative w-screen h-screen overflow-hidden" dir="rtl" style={{ background: "linear-gradient(150deg, #0f1a30 0%, #1a2744 100%)" }}>
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(201,146,42,0.04) 0%, transparent 70%)" }} />

      <div className="absolute inset-0 flex flex-col" style={{ padding: "5vh 8vw" }}>
        <div style={{ marginBottom: "1vh" }}>
          <span className="font-body" style={{ fontSize: "1.5vw", color: "#c9922a", fontWeight: 700, letterSpacing: "0.15em" }}>نماذج الشراكة</span>
        </div>
        <h2 className="font-display font-black" style={{ fontSize: "3.8vw", color: "#f5f0e8", lineHeight: 1.1, marginBottom: "4vh", letterSpacing: "-0.01em" }}>
          نموذج الشراكة
          <span style={{ color: "#c9922a" }}> المقترح</span>
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5vh 4vw", flex: 1 }}>
          <div style={{ background: "linear-gradient(135deg, rgba(201,146,42,0.13), rgba(201,146,42,0.05))", border: "1px solid rgba(201,146,42,0.4)", borderRadius: "0.8vw", padding: "4vh 3vw", display: "flex", flexDirection: "column", gap: "1.5vh" }}>
            <div style={{ fontSize: "2.2vw", fontWeight: 900, color: "#c9922a", fontFamily: "var(--font-display-family)" }}>01</div>
            <div style={{ fontSize: "1.9vw", color: "#f5f0e8", fontWeight: 800 }}>تشغيل مشترك للمرحلة التجريبية</div>
            <div style={{ fontSize: "1.4vw", color: "#9ca3b0", lineHeight: 1.5 }}>شراكة تشغيلية خلال المرحلة الأولى لإثبات النموذج</div>
          </div>
          <div style={{ background: "rgba(26,39,68,0.7)", border: "1px solid rgba(201,146,42,0.2)", borderRadius: "0.8vw", padding: "4vh 3vw", display: "flex", flexDirection: "column", gap: "1.5vh" }}>
            <div style={{ fontSize: "2.2vw", fontWeight: 900, color: "#c9922a", fontFamily: "var(--font-display-family)" }}>02</div>
            <div style={{ fontSize: "1.9vw", color: "#f5f0e8", fontWeight: 800 }}>احتضان المشروع داخل الشركة</div>
            <div style={{ fontSize: "1.4vw", color: "#9ca3b0", lineHeight: 1.5 }}>تشغيل المنصة تحت مظلة الشركة مع حصة في الإيرادات</div>
          </div>
          <div style={{ background: "rgba(26,39,68,0.7)", border: "1px solid rgba(201,146,42,0.2)", borderRadius: "0.8vw", padding: "4vh 3vw", display: "flex", flexDirection: "column", gap: "1.5vh" }}>
            <div style={{ fontSize: "2.2vw", fontWeight: 900, color: "#c9922a", fontFamily: "var(--font-display-family)" }}>03</div>
            <div style={{ fontSize: "1.9vw", color: "#f5f0e8", fontWeight: 800 }}>دعم تشغيلي مقابل نسبة</div>
            <div style={{ fontSize: "1.4vw", color: "#9ca3b0", lineHeight: 1.5 }}>الشريك يقدم دعماً تشغيلياً مقابل نسبة متفق عليها</div>
          </div>
          <div style={{ background: "rgba(26,39,68,0.7)", border: "1px solid rgba(201,146,42,0.2)", borderRadius: "0.8vw", padding: "4vh 3vw", display: "flex", flexDirection: "column", gap: "1.5vh" }}>
            <div style={{ fontSize: "2.2vw", fontWeight: 900, color: "#c9922a", fontFamily: "var(--font-display-family)" }}>04</div>
            <div style={{ fontSize: "1.9vw", color: "#f5f0e8", fontWeight: 800 }}>دعم مقابل راتب ونسبة تشغيل</div>
            <div style={{ fontSize: "1.4vw", color: "#9ca3b0", lineHeight: 1.5 }}>راتب تشغيلي للمرحلة الأولى مع نسبة من الإيرادات</div>
          </div>
        </div>

        <div style={{ marginTop: "2.5vh", textAlign: "center", padding: "1.8vh", background: "rgba(201,146,42,0.07)", border: "1px solid rgba(201,146,42,0.2)", borderRadius: "0.6vw" }}>
          <span className="font-body" style={{ fontSize: "1.6vw", color: "#d4c9b0", fontWeight: 600 }}>
            نرحب بمناقشة النموذج الأنسب للطرفين
          </span>
        </div>
      </div>
    </div>
  );
}
