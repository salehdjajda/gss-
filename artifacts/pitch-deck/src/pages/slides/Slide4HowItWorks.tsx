export default function Slide4HowItWorks() {
  return (
    <div className="relative w-screen h-screen overflow-hidden" dir="rtl" style={{ background: "linear-gradient(160deg, #1a2744 0%, #0f1a30 100%)" }}>
      <div className="absolute" style={{ top: 0, right: 0, width: "30vw", height: "2px", background: "linear-gradient(90deg, transparent, #c9922a)" }} />
      <div className="absolute" style={{ bottom: 0, left: 0, width: "30vw", height: "2px", background: "linear-gradient(90deg, #c9922a, transparent)" }} />

      <div className="absolute inset-0 flex flex-col" style={{ padding: "5vh 7vw" }}>
        <div style={{ marginBottom: "1vh" }}>
          <span className="font-body" style={{ fontSize: "1.5vw", color: "#c9922a", fontWeight: 700, letterSpacing: "0.15em" }}>آلية العمل</span>
        </div>
        <h2 className="font-display font-black" style={{ fontSize: "3.8vw", color: "#f5f0e8", lineHeight: 1.15, marginBottom: "4vh", letterSpacing: "-0.01em" }}>
          خمس خطوات من الطلب<br />
          <span style={{ color: "#c9922a" }}>حتى الإنجاز الكامل</span>
        </h2>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-around", gap: "1.5vh" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "3vw" }}>
            <div style={{ minWidth: "5vw", height: "5vw", borderRadius: "50%", background: "#c9922a", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "2vw", fontWeight: 900, color: "#0f1a30", fontFamily: "var(--font-display-family)" }}>1</span>
            </div>
            <div style={{ flex: 1, borderBottom: "1px solid rgba(201,146,42,0.2)", paddingBottom: "1.5vh" }}>
              <div style={{ fontSize: "2vw", color: "#f5f0e8", fontWeight: 700 }}>رفع الطلب</div>
              <div style={{ fontSize: "1.5vw", color: "#9ca3b0", marginTop: "0.3vh" }}>تقوم المنشأة بتسجيل طلب الخدمة عبر المنصة في دقائق</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "3vw" }}>
            <div style={{ minWidth: "5vw", height: "5vw", borderRadius: "50%", background: "rgba(201,146,42,0.15)", border: "2px solid #c9922a", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "2vw", fontWeight: 900, color: "#c9922a", fontFamily: "var(--font-display-family)" }}>2</span>
            </div>
            <div style={{ flex: 1, borderBottom: "1px solid rgba(201,146,42,0.2)", paddingBottom: "1.5vh" }}>
              <div style={{ fontSize: "2vw", color: "#f5f0e8", fontWeight: 700 }}>المطابقة الذكية</div>
              <div style={{ fontSize: "1.5vw", color: "#9ca3b0", marginTop: "0.3vh" }}>تطابق المنصة الطلب مع أنسب مزود خدمة معتمد</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "3vw" }}>
            <div style={{ minWidth: "5vw", height: "5vw", borderRadius: "50%", background: "rgba(201,146,42,0.15)", border: "2px solid #c9922a", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "2vw", fontWeight: 900, color: "#c9922a", fontFamily: "var(--font-display-family)" }}>3</span>
            </div>
            <div style={{ flex: 1, borderBottom: "1px solid rgba(201,146,42,0.2)", paddingBottom: "1.5vh" }}>
              <div style={{ fontSize: "2vw", color: "#f5f0e8", fontWeight: 700 }}>التنفيذ والمتابعة</div>
              <div style={{ fontSize: "1.5vw", color: "#9ca3b0", marginTop: "0.3vh" }}>تنفيذ الخدمة مع تتبع فوري للحالة والموقع</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "3vw" }}>
            <div style={{ minWidth: "5vw", height: "5vw", borderRadius: "50%", background: "rgba(201,146,42,0.15)", border: "2px solid #c9922a", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "2vw", fontWeight: 900, color: "#c9922a", fontFamily: "var(--font-display-family)" }}>4</span>
            </div>
            <div style={{ flex: 1, borderBottom: "1px solid rgba(201,146,42,0.2)", paddingBottom: "1.5vh" }}>
              <div style={{ fontSize: "2vw", color: "#f5f0e8", fontWeight: 700 }}>التسليم والتوثيق</div>
              <div style={{ fontSize: "1.5vw", color: "#9ca3b0", marginTop: "0.3vh" }}>تأكيد إتمام الخدمة برقميا مع حفظ السجلات</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "3vw" }}>
            <div style={{ minWidth: "5vw", height: "5vw", borderRadius: "50%", background: "#c9922a", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "2vw", fontWeight: 900, color: "#0f1a30", fontFamily: "var(--font-display-family)" }}>5</span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "2vw", color: "#f5f0e8", fontWeight: 700 }}>التقييم والتحسين</div>
              <div style={{ fontSize: "1.5vw", color: "#9ca3b0", marginTop: "0.3vh" }}>تقييم الأداء وتحليل البيانات لتحسين مستمر</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
