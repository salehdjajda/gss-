export default function Slide7Partnership() {
  return (
    <div className="relative w-screen h-screen overflow-hidden" dir="rtl" style={{ background: "#0f1a30" }}>
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(201,146,42,0.06) 0%, transparent 50%, rgba(201,146,42,0.04) 100%)" }} />
      <div className="absolute" style={{ top: "20vh", right: "0", width: "2px", height: "60vh", background: "linear-gradient(180deg, transparent, rgba(201,146,42,0.4), transparent)" }} />

      <div className="absolute inset-0 flex" style={{ padding: "5vh 7vw", gap: "4vw" }}>
        <div style={{ flex: "0 0 40vw", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ marginBottom: "1.5vh" }}>
            <span className="font-body" style={{ fontSize: "1.5vw", color: "#c9922a", fontWeight: 700, letterSpacing: "0.15em" }}>دعوة للشراكة</span>
          </div>
          <h2 className="font-display font-black" style={{ fontSize: "4vw", color: "#f5f0e8", lineHeight: 1.15, marginBottom: "3vh", letterSpacing: "-0.01em" }}>
            ماذا يكسب<br />
            <span style={{ color: "#c9922a" }}>شريكنا الاستراتيجي؟</span>
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.8vh" }}>
            <div style={{ display: "flex", gap: "1.5vw", alignItems: "flex-start" }}>
              <div style={{ minWidth: "0.5vw", height: "0.5vw", borderRadius: "50%", background: "#c9922a", marginTop: "0.8vh" }} />
              <div style={{ fontSize: "1.6vw", color: "#d4c9b0", lineHeight: 1.4 }}>حصة من إيرادات المنصة في نطاقك الجغرافي</div>
            </div>
            <div style={{ display: "flex", gap: "1.5vw", alignItems: "flex-start" }}>
              <div style={{ minWidth: "0.5vw", height: "0.5vw", borderRadius: "50%", background: "#c9922a", marginTop: "0.8vh" }} />
              <div style={{ fontSize: "1.6vw", color: "#d4c9b0", lineHeight: 1.4 }}>وصول حصري لشبكة الموردين والمنشآت المعتمدة</div>
            </div>
            <div style={{ display: "flex", gap: "1.5vw", alignItems: "flex-start" }}>
              <div style={{ minWidth: "0.5vw", height: "0.5vw", borderRadius: "50%", background: "#c9922a", marginTop: "0.8vh" }} />
              <div style={{ fontSize: "1.6vw", color: "#d4c9b0", lineHeight: 1.4 }}>دعم تشغيلي كامل ولوحة تحكم خاصة</div>
            </div>
            <div style={{ display: "flex", gap: "1.5vw", alignItems: "flex-start" }}>
              <div style={{ minWidth: "0.5vw", height: "0.5vw", borderRadius: "50%", background: "#c9922a", marginTop: "0.8vh" }} />
              <div style={{ fontSize: "1.6vw", color: "#d4c9b0", lineHeight: 1.4 }}>بناء أصل رقمي بقيمة متنامية في سوق متوسع</div>
            </div>
          </div>
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "2.5vh", justifyContent: "center" }}>
          <div style={{ fontSize: "1.6vw", color: "#c9922a", fontWeight: 700, marginBottom: "0.5vh" }}>نماذج الشراكة المقترحة</div>
          <div style={{ background: "linear-gradient(135deg, rgba(201,146,42,0.12), rgba(201,146,42,0.04))", border: "1px solid rgba(201,146,42,0.35)", borderRadius: "0.8vw", padding: "2.5vh 2vw" }}>
            <div style={{ fontSize: "1.9vw", color: "#f5f0e8", fontWeight: 800, marginBottom: "0.8vh" }}>الشراكة الإقليمية</div>
            <div style={{ fontSize: "1.4vw", color: "#9ca3b0", lineHeight: 1.5 }}>تمثيل حصري للمنصة في منطقة جغرافية محددة مع صلاحيات توسع كاملة</div>
          </div>
          <div style={{ background: "rgba(26,39,68,0.7)", border: "1px solid rgba(201,146,42,0.2)", borderRadius: "0.8vw", padding: "2.5vh 2vw" }}>
            <div style={{ fontSize: "1.9vw", color: "#f5f0e8", fontWeight: 800, marginBottom: "0.8vh" }}>شراكة القطاع</div>
            <div style={{ fontSize: "1.4vw", color: "#9ca3b0", lineHeight: 1.5 }}>التخصص في قطاع بعينه (صحة، تعليم، ضيافة) مع حق الاستئثار الكامل</div>
          </div>
          <div style={{ background: "rgba(26,39,68,0.7)", border: "1px solid rgba(201,146,42,0.2)", borderRadius: "0.8vw", padding: "2.5vh 2vw" }}>
            <div style={{ fontSize: "1.9vw", color: "#f5f0e8", fontWeight: 800, marginBottom: "0.8vh" }}>الشراكة التشغيلية</div>
            <div style={{ fontSize: "1.4vw", color: "#9ca3b0", lineHeight: 1.5 }}>إدارة مشتركة لعمليات المنصة مع حصة في ملكية الحصة السوقية</div>
          </div>
          <div style={{ marginTop: "1vh", textAlign: "center" }}>
            <div style={{ fontSize: "1.6vw", color: "#c9922a", fontWeight: 700 }}>نرحب بكم لمناقشة الشراكة الأنسب لكم</div>
          </div>
        </div>
      </div>

      <div className="absolute" style={{ bottom: "4vh", left: "50%", transform: "translateX(-50%)" }}>
        <div style={{ display: "flex", gap: "1.5vw", alignItems: "center" }}>
          <div style={{ width: "5vw", height: "1px", background: "rgba(201,146,42,0.4)" }} />
          <span className="font-display font-black" style={{ fontSize: "2vw", color: "#c9922a", letterSpacing: "0.2em" }}>GSS</span>
          <div style={{ width: "5vw", height: "1px", background: "rgba(201,146,42,0.4)" }} />
        </div>
      </div>
    </div>
  );
}
