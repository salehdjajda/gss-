export default function Slide11Launch() {
  return (
    <div className="relative w-screen h-screen overflow-hidden" dir="rtl" style={{ background: "#0f1a30" }}>
      <div className="absolute" style={{ top: "5vh", left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent 10%, rgba(201,146,42,0.3) 50%, transparent 90%)" }} />

      <div className="absolute inset-0 flex flex-col" style={{ padding: "5vh 8vw" }}>
        <div style={{ marginBottom: "1vh" }}>
          <span className="font-body" style={{ fontSize: "1.5vw", color: "#c9922a", fontWeight: 700, letterSpacing: "0.15em" }}>خطة الإطلاق</span>
        </div>
        <h2 className="font-display font-black" style={{ fontSize: "3.8vw", color: "#f5f0e8", lineHeight: 1.1, marginBottom: "4vh", letterSpacing: "-0.01em" }}>
          خطة الإطلاق خلال
          <span style={{ color: "#c9922a" }}> أول 90 يوم</span>
        </h2>

        <div style={{ display: "flex", flex: 1, gap: "2.5vw", alignItems: "stretch" }}>

          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "2vh" }}>
            <div style={{ background: "linear-gradient(135deg, rgba(201,146,42,0.11), rgba(201,146,42,0.04))", border: "1px solid rgba(201,146,42,0.3)", borderRadius: "0.8vw", padding: "3vh 2vw", flex: 1, display: "flex", gap: "1.5vw", alignItems: "center" }}>
              <div style={{ minWidth: "3.5vw", height: "3.5vw", borderRadius: "50%", background: "#c9922a", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: "1.6vw", fontWeight: 900, color: "#0f1a30", fontFamily: "var(--font-display-family)" }}>1</span>
              </div>
              <div>
                <div style={{ fontSize: "1.8vw", color: "#f5f0e8", fontWeight: 800 }}>تسجيل 50 منشأة</div>
                <div style={{ fontSize: "1.4vw", color: "#9ca3b0", marginTop: "0.4vh" }}>استقطاب وتفعيل أولى المنشآت على المنصة</div>
              </div>
            </div>

            <div style={{ background: "rgba(26,39,68,0.7)", border: "1px solid rgba(201,146,42,0.2)", borderRadius: "0.8vw", padding: "3vh 2vw", flex: 1, display: "flex", gap: "1.5vw", alignItems: "center" }}>
              <div style={{ minWidth: "3.5vw", height: "3.5vw", borderRadius: "50%", background: "rgba(201,146,42,0.15)", border: "2px solid #c9922a", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: "1.6vw", fontWeight: 900, color: "#c9922a", fontFamily: "var(--font-display-family)" }}>2</span>
              </div>
              <div>
                <div style={{ fontSize: "1.8vw", color: "#f5f0e8", fontWeight: 800 }}>تسجيل 60 مورد</div>
                <div style={{ fontSize: "1.4vw", color: "#9ca3b0", marginTop: "0.4vh" }}>بناء شبكة موردين معتمدين ومتنوعين</div>
              </div>
            </div>
          </div>

          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "2vh" }}>
            <div style={{ background: "rgba(26,39,68,0.7)", border: "1px solid rgba(201,146,42,0.2)", borderRadius: "0.8vw", padding: "3vh 2vw", flex: 1, display: "flex", gap: "1.5vw", alignItems: "center" }}>
              <div style={{ minWidth: "3.5vw", height: "3.5vw", borderRadius: "50%", background: "rgba(201,146,42,0.15)", border: "2px solid #c9922a", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: "1.6vw", fontWeight: 900, color: "#c9922a", fontFamily: "var(--font-display-family)" }}>3</span>
              </div>
              <div>
                <div style={{ fontSize: "1.8vw", color: "#f5f0e8", fontWeight: 800 }}>تسجيل مستشارين تشغيل</div>
                <div style={{ fontSize: "1.4vw", color: "#9ca3b0", marginTop: "0.4vh" }}>ضم مستشارين تشغيليين متخصصين للمنصة</div>
              </div>
            </div>

            <div style={{ background: "rgba(26,39,68,0.7)", border: "1px solid rgba(201,146,42,0.2)", borderRadius: "0.8vw", padding: "3vh 2vw", flex: 1, display: "flex", gap: "1.5vw", alignItems: "center" }}>
              <div style={{ minWidth: "3.5vw", height: "3.5vw", borderRadius: "50%", background: "rgba(201,146,42,0.15)", border: "2px solid #c9922a", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: "1.6vw", fontWeight: 900, color: "#c9922a", fontFamily: "var(--font-display-family)" }}>4</span>
              </div>
              <div>
                <div style={{ fontSize: "1.8vw", color: "#f5f0e8", fontWeight: 800 }}>تنفيذ أول الطلبات التشغيلية</div>
                <div style={{ fontSize: "1.4vw", color: "#9ca3b0", marginTop: "0.4vh" }}>تنفيذ الطلبات الأولى وإثبات الكفاءة</div>
              </div>
            </div>
          </div>

          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ background: "linear-gradient(135deg, rgba(201,146,42,0.13), rgba(201,146,42,0.05))", border: "1px solid rgba(201,146,42,0.35)", borderRadius: "0.8vw", padding: "4vh 2.5vw", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ minWidth: "3.5vw", height: "3.5vw", borderRadius: "50%", background: "#c9922a", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "2vh" }}>
                <span style={{ fontSize: "1.6vw", fontWeight: 900, color: "#0f1a30", fontFamily: "var(--font-display-family)" }}>5</span>
              </div>
              <div style={{ fontSize: "1.8vw", color: "#f5f0e8", fontWeight: 800, marginBottom: "1vh" }}>بناء شبكة تشغيل أولية فعالة</div>
              <div style={{ fontSize: "1.4vw", color: "#9ca3b0", lineHeight: 1.6 }}>الخروج من 90 يوماً بشبكة تشغيل حقيقية تخدم المنشآت</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
