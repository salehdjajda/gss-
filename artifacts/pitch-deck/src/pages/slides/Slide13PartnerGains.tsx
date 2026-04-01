export default function Slide13PartnerGains() {
  return (
    <div className="relative w-screen h-screen overflow-hidden" dir="rtl" style={{ background: "#0f1a30" }}>
      <div className="absolute" style={{ top: 0, right: 0, width: "55vw", height: "55vh", background: "radial-gradient(ellipse at top right, rgba(201,146,42,0.07), transparent 65%)" }} />
      <div className="absolute" style={{ bottom: 0, left: 0, width: "40vw", height: "40vh", background: "radial-gradient(ellipse at bottom left, rgba(201,146,42,0.04), transparent 65%)" }} />

      <div className="absolute inset-0 flex flex-col" style={{ padding: "5vh 8vw" }}>
        <div style={{ marginBottom: "1vh" }}>
          <span className="font-body" style={{ fontSize: "1.5vw", color: "#c9922a", fontWeight: 700, letterSpacing: "0.15em" }}>مكاسب الشريك</span>
        </div>
        <h2 className="font-display font-black" style={{ fontSize: "3.8vw", color: "#f5f0e8", lineHeight: 1.1, marginBottom: "4vh", letterSpacing: "-0.01em" }}>
          ماذا سيكسب
          <span style={{ color: "#c9922a" }}> الشريك؟</span>
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5vh 4vw", flex: 1 }}>
          <div style={{ background: "linear-gradient(135deg, rgba(201,146,42,0.11), rgba(201,146,42,0.04))", border: "1px solid rgba(201,146,42,0.3)", borderRadius: "0.8vw", padding: "3vh 2.5vw", display: "flex", gap: "1.5vw", alignItems: "flex-start" }}>
            <div style={{ minWidth: "3vw", height: "3vw", borderRadius: "50%", background: "#c9922a", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "1.4vw", fontWeight: 900, color: "#0f1a30", fontFamily: "var(--font-display-family)" }}>1</span>
            </div>
            <div>
              <div style={{ fontSize: "1.75vw", color: "#f5f0e8", fontWeight: 800, marginBottom: "0.5vh" }}>استقبال طلبات تشغيل جديدة</div>
              <div style={{ fontSize: "1.35vw", color: "#9ca3b0", lineHeight: 1.5 }}>مصدر طلبات تشغيل مستمر من المنشآت</div>
            </div>
          </div>
          <div style={{ background: "rgba(26,39,68,0.7)", border: "1px solid rgba(201,146,42,0.2)", borderRadius: "0.8vw", padding: "3vh 2.5vw", display: "flex", gap: "1.5vw", alignItems: "flex-start" }}>
            <div style={{ minWidth: "3vw", height: "3vw", borderRadius: "50%", background: "rgba(201,146,42,0.15)", border: "1px solid #c9922a", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "1.4vw", fontWeight: 900, color: "#c9922a", fontFamily: "var(--font-display-family)" }}>2</span>
            </div>
            <div>
              <div style={{ fontSize: "1.75vw", color: "#f5f0e8", fontWeight: 800, marginBottom: "0.5vh" }}>توسيع قاعدة العملاء</div>
              <div style={{ fontSize: "1.35vw", color: "#9ca3b0", lineHeight: 1.5 }}>الوصول لعملاء جدد بدون تكلفة تسويقية إضافية</div>
            </div>
          </div>
          <div style={{ background: "rgba(26,39,68,0.7)", border: "1px solid rgba(201,146,42,0.2)", borderRadius: "0.8vw", padding: "3vh 2.5vw", display: "flex", gap: "1.5vw", alignItems: "flex-start" }}>
            <div style={{ minWidth: "3vw", height: "3vw", borderRadius: "50%", background: "rgba(201,146,42,0.15)", border: "1px solid #c9922a", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "1.4vw", fontWeight: 900, color: "#c9922a", fontFamily: "var(--font-display-family)" }}>3</span>
            </div>
            <div>
              <div style={{ fontSize: "1.75vw", color: "#f5f0e8", fontWeight: 800, marginBottom: "0.5vh" }}>زيادة فرص المشاريع التشغيلية</div>
              <div style={{ fontSize: "1.35vw", color: "#9ca3b0", lineHeight: 1.5 }}>زيادة فعلية في حجم العقود التشغيلية</div>
            </div>
          </div>
          <div style={{ background: "rgba(26,39,68,0.7)", border: "1px solid rgba(201,146,42,0.2)", borderRadius: "0.8vw", padding: "3vh 2.5vw", display: "flex", gap: "1.5vw", alignItems: "flex-start" }}>
            <div style={{ minWidth: "3vw", height: "3vw", borderRadius: "50%", background: "rgba(201,146,42,0.15)", border: "1px solid #c9922a", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "1.4vw", fontWeight: 900, color: "#c9922a", fontFamily: "var(--font-display-family)" }}>4</span>
            </div>
            <div>
              <div style={{ fontSize: "1.75vw", color: "#f5f0e8", fontWeight: 800, marginBottom: "0.5vh" }}>الدخول كشريك مبكر في منصة رقمية</div>
              <div style={{ fontSize: "1.35vw", color: "#9ca3b0", lineHeight: 1.5 }}>موقع ريادي في سوق رقمي قابل للتوسع</div>
            </div>
          </div>
          <div style={{ background: "linear-gradient(135deg, rgba(201,146,42,0.11), rgba(201,146,42,0.04))", border: "1px solid rgba(201,146,42,0.3)", borderRadius: "0.8vw", padding: "3vh 2.5vw", display: "flex", gap: "1.5vw", alignItems: "flex-start", gridColumn: "span 2" }}>
            <div style={{ minWidth: "3vw", height: "3vw", borderRadius: "50%", background: "#c9922a", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "1.4vw", fontWeight: 900, color: "#0f1a30", fontFamily: "var(--font-display-family)" }}>5</span>
            </div>
            <div>
              <div style={{ fontSize: "1.75vw", color: "#f5f0e8", fontWeight: 800, marginBottom: "0.5vh" }}>تعزيز الحضور في قطاع إدارة الخدمات التشغيلية</div>
              <div style={{ fontSize: "1.35vw", color: "#9ca3b0", lineHeight: 1.5 }}>بناء سمعة قوية وحضور مبكر في قطاع يتنامى بسرعة بالسوق السعودي</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
