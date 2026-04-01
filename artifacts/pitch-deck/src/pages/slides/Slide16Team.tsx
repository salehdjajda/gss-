export default function Slide16Team() {
  return (
    <div className="relative w-screen h-screen overflow-hidden" dir="rtl" style={{ background: "linear-gradient(150deg, #0f1a30 0%, #1a2744 100%)" }}>
      <div className="absolute" style={{ top: 0, right: 0, width: "50vw", height: "50vh", background: "radial-gradient(ellipse at top right, rgba(201,146,42,0.06), transparent 65%)" }} />

      <div className="absolute inset-0 flex" style={{ padding: "6vh 8vw", gap: "6vw", alignItems: "center" }}>

        <div style={{ flex: "0 0 36vw" }}>
          <div style={{ marginBottom: "2vh" }}>
            <span className="font-body" style={{ fontSize: "1.5vw", color: "#c9922a", fontWeight: 700, letterSpacing: "0.15em" }}>الفريق</span>
          </div>
          <h2 className="font-display font-black" style={{ fontSize: "4vw", color: "#f5f0e8", lineHeight: 1.15, letterSpacing: "-0.01em" }}>
            الفريق المطلوب
            <br />
            <span style={{ color: "#c9922a" }}>في المرحلة الأولى</span>
          </h2>
          <p className="font-body" style={{ fontSize: "1.55vw", color: "#9ca3b0", lineHeight: 1.7, marginTop: "2.5vh", maxWidth: "28vw" }}>
            نموذج تشغيل Lean — فريق صغير وكفء بدون تكاليف تشغيلية مرتفعة
          </p>
          <div style={{ marginTop: "3vh", display: "inline-block", background: "rgba(201,146,42,0.1)", border: "1px solid rgba(201,146,42,0.3)", borderRadius: "1.5vw", padding: "1vh 2vw" }}>
            <span style={{ fontSize: "1.5vw", color: "#c9922a", fontWeight: 700 }}>تشغيل Lean بدون تكلفة عالية</span>
          </div>
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "2.5vh" }}>
          <div style={{ background: "linear-gradient(135deg, rgba(201,146,42,0.12), rgba(201,146,42,0.04))", border: "1px solid rgba(201,146,42,0.35)", borderRadius: "0.8vw", padding: "3.5vh 2.5vw", display: "flex", alignItems: "center", gap: "2vw" }}>
            <div style={{ minWidth: "3.5vw", height: "3.5vw", borderRadius: "50%", background: "#c9922a", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "1.6vw", fontWeight: 900, color: "#0f1a30", fontFamily: "var(--font-display-family)" }}>1</span>
            </div>
            <div>
              <div style={{ fontSize: "1.9vw", color: "#f5f0e8", fontWeight: 800 }}>مدير تشغيل المنصة</div>
              <div style={{ fontSize: "1.4vw", color: "#9ca3b0", marginTop: "0.3vh" }}>يقود العمليات التشغيلية اليومية للمنصة</div>
            </div>
          </div>
          <div style={{ background: "rgba(26,39,68,0.7)", border: "1px solid rgba(201,146,42,0.2)", borderRadius: "0.8vw", padding: "3.5vh 2.5vw", display: "flex", alignItems: "center", gap: "2vw" }}>
            <div style={{ minWidth: "3.5vw", height: "3.5vw", borderRadius: "50%", background: "rgba(201,146,42,0.15)", border: "2px solid #c9922a", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "1.6vw", fontWeight: 900, color: "#c9922a", fontFamily: "var(--font-display-family)" }}>2</span>
            </div>
            <div>
              <div style={{ fontSize: "1.9vw", color: "#f5f0e8", fontWeight: 800 }}>منسق عمليات</div>
              <div style={{ fontSize: "1.4vw", color: "#9ca3b0", marginTop: "0.3vh" }}>ينسق الطلبات بين المنشآت والموردين</div>
            </div>
          </div>
          <div style={{ background: "rgba(26,39,68,0.7)", border: "1px solid rgba(201,146,42,0.2)", borderRadius: "0.8vw", padding: "3.5vh 2.5vw", display: "flex", alignItems: "center", gap: "2vw" }}>
            <div style={{ minWidth: "3.5vw", height: "3.5vw", borderRadius: "50%", background: "rgba(201,146,42,0.15)", border: "2px solid #c9922a", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "1.6vw", fontWeight: 900, color: "#c9922a", fontFamily: "var(--font-display-family)" }}>3</span>
            </div>
            <div>
              <div style={{ fontSize: "1.9vw", color: "#f5f0e8", fontWeight: 800 }}>دعم إداري</div>
              <div style={{ fontSize: "1.4vw", color: "#9ca3b0", marginTop: "0.3vh" }}>دعم إداري خفيف للعقود والمتابعة</div>
            </div>
          </div>
          <div style={{ background: "rgba(26,39,68,0.7)", border: "1px solid rgba(201,146,42,0.2)", borderRadius: "0.8vw", padding: "3.5vh 2.5vw", display: "flex", alignItems: "center", gap: "2vw" }}>
            <div style={{ minWidth: "3.5vw", height: "3.5vw", borderRadius: "50%", background: "rgba(201,146,42,0.15)", border: "2px solid #c9922a", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "1.6vw", fontWeight: 900, color: "#c9922a", fontFamily: "var(--font-display-family)" }}>4</span>
            </div>
            <div>
              <div style={{ fontSize: "1.9vw", color: "#f5f0e8", fontWeight: 800 }}>دعم تسويق رقمي</div>
              <div style={{ fontSize: "1.4vw", color: "#9ca3b0", marginTop: "0.3vh" }}>تسويق رقمي لاستقطاب المنشآت والموردين</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
