export default function Slide3Solution() {
  return (
    <div className="relative w-screen h-screen overflow-hidden" dir="rtl" style={{ background: "#0f1a30" }}>
      <div className="absolute" style={{ top: "8vh", right: "-4vw", width: "40vw", height: "40vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(201,146,42,0.06), transparent 70%)" }} />
      <div className="absolute inset-0 flex flex-col" style={{ padding: "4vh 6vw" }}>

        <div style={{ marginBottom: "0.5vh" }}>
          <span className="font-body" style={{ fontSize: "1.4vw", color: "#c9922a", fontWeight: 700, letterSpacing: "0.15em" }}>خدمات GSS</span>
        </div>
        <h2 className="font-display font-black" style={{ fontSize: "3.2vw", color: "#f5f0e8", lineHeight: 1.1, marginBottom: "2.5vh", letterSpacing: "-0.01em" }}>
          خدمات تشغيلية وإدارية
          <span style={{ color: "#c9922a" }}> متكاملة</span>
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2vw", flex: 1 }}>

          <div style={{ background: "rgba(26,39,68,0.7)", border: "1px solid rgba(201,146,42,0.25)", borderRadius: "0.6vw", padding: "2vh 1.8vw", display: "flex", flexDirection: "column", gap: "1.1vh" }}>
            <div style={{ fontSize: "1.5vw", color: "#c9922a", fontWeight: 800, marginBottom: "0.8vh", borderBottom: "1px solid rgba(201,146,42,0.2)", paddingBottom: "0.8vh" }}>
              خدمات تشغيلية
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.8vw" }}>
              <div style={{ width: "0.4vw", height: "0.4vw", borderRadius: "50%", background: "#c9922a", flexShrink: 0 }} />
              <span style={{ fontSize: "1.35vw", color: "#f5f0e8", fontWeight: 600 }}>الصيانة والتشغيل</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.8vw" }}>
              <div style={{ width: "0.4vw", height: "0.4vw", borderRadius: "50%", background: "#c9922a", flexShrink: 0 }} />
              <span style={{ fontSize: "1.35vw", color: "#f5f0e8", fontWeight: 600 }}>الكهرباء والمياه</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.8vw" }}>
              <div style={{ width: "0.4vw", height: "0.4vw", borderRadius: "50%", background: "#c9922a", flexShrink: 0 }} />
              <span style={{ fontSize: "1.35vw", color: "#f5f0e8", fontWeight: 600 }}>الأمن والسلامة</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.8vw" }}>
              <div style={{ width: "0.4vw", height: "0.4vw", borderRadius: "50%", background: "#c9922a", flexShrink: 0 }} />
              <span style={{ fontSize: "1.35vw", color: "#f5f0e8", fontWeight: 600 }}>النقل والخدمات اللوجستية</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.8vw" }}>
              <div style={{ width: "0.4vw", height: "0.4vw", borderRadius: "50%", background: "#c9922a", flexShrink: 0 }} />
              <span style={{ fontSize: "1.35vw", color: "#f5f0e8", fontWeight: 600 }}>الأسطول والمركبات</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.8vw" }}>
              <div style={{ width: "0.4vw", height: "0.4vw", borderRadius: "50%", background: "#c9922a", flexShrink: 0 }} />
              <span style={{ fontSize: "1.35vw", color: "#f5f0e8", fontWeight: 600 }}>تجهيز الفروع والمواقع</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.8vw" }}>
              <div style={{ width: "0.4vw", height: "0.4vw", borderRadius: "50%", background: "#c9922a", flexShrink: 0 }} />
              <span style={{ fontSize: "1.35vw", color: "#f5f0e8", fontWeight: 600 }}>خدمات الاتصالات</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.8vw" }}>
              <div style={{ width: "0.4vw", height: "0.4vw", borderRadius: "50%", background: "#c9922a", flexShrink: 0 }} />
              <span style={{ fontSize: "1.35vw", color: "#f5f0e8", fontWeight: 600 }}>الاستجابة للحالات الطارئة</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.8vw" }}>
              <div style={{ width: "0.4vw", height: "0.4vw", borderRadius: "50%", background: "#c9922a", flexShrink: 0 }} />
              <span style={{ fontSize: "1.35vw", color: "#f5f0e8", fontWeight: 600 }}>الأصول التشغيلية</span>
            </div>
            <div style={{ marginTop: "auto", paddingTop: "1vh", borderTop: "1px solid rgba(201,146,42,0.15)" }}>
              <span style={{ fontSize: "1.2vw", color: "#9ca3b0" }}>تكييف — سباكة — كهرباء — دهانات — نجارة — نظافة — تعقيم — مكافحة حشرات — أرضيات — جبس — باركيه — غرف تبريد — عشب صناعي — مضلات — أحواض سباحة</span>
            </div>
          </div>

          <div style={{ background: "linear-gradient(135deg, rgba(201,146,42,0.09), rgba(201,146,42,0.03))", border: "1px solid rgba(201,146,42,0.3)", borderRadius: "0.6vw", padding: "2vh 1.8vw", display: "flex", flexDirection: "column", gap: "1.1vh" }}>
            <div style={{ fontSize: "1.5vw", color: "#c9922a", fontWeight: 800, marginBottom: "0.8vh", borderBottom: "1px solid rgba(201,146,42,0.2)", paddingBottom: "0.8vh" }}>
              خدمات إدارية
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.8vw" }}>
              <div style={{ width: "0.4vw", height: "0.4vw", borderRadius: "50%", background: "#c9922a", flexShrink: 0 }} />
              <span style={{ fontSize: "1.35vw", color: "#f5f0e8", fontWeight: 600 }}>الاستشارات التشغيلية</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.8vw" }}>
              <div style={{ width: "0.4vw", height: "0.4vw", borderRadius: "50%", background: "#c9922a", flexShrink: 0 }} />
              <span style={{ fontSize: "1.35vw", color: "#f5f0e8", fontWeight: 600 }}>عقود الموردين</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.8vw" }}>
              <div style={{ width: "0.4vw", height: "0.4vw", borderRadius: "50%", background: "#c9922a", flexShrink: 0 }} />
              <span style={{ fontSize: "1.35vw", color: "#f5f0e8", fontWeight: 600 }}>الميزانية التشغيلية</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.8vw" }}>
              <div style={{ width: "0.4vw", height: "0.4vw", borderRadius: "50%", background: "#c9922a", flexShrink: 0 }} />
              <span style={{ fontSize: "1.35vw", color: "#f5f0e8", fontWeight: 600 }}>الامتثال التشغيلي</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.8vw" }}>
              <div style={{ width: "0.4vw", height: "0.4vw", borderRadius: "50%", background: "#c9922a", flexShrink: 0 }} />
              <span style={{ fontSize: "1.35vw", color: "#f5f0e8", fontWeight: 600 }}>بيئة العمل والخدمات الإدارية</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.8vw" }}>
              <div style={{ width: "0.4vw", height: "0.4vw", borderRadius: "50%", background: "#c9922a", flexShrink: 0 }} />
              <span style={{ fontSize: "1.35vw", color: "#f5f0e8", fontWeight: 600 }}>إسكان الموظفين</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.8vw" }}>
              <div style={{ width: "0.4vw", height: "0.4vw", borderRadius: "50%", background: "#c9922a", flexShrink: 0 }} />
              <span style={{ fontSize: "1.35vw", color: "#f5f0e8", fontWeight: 600 }}>الفعاليات والمناسبات</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.8vw" }}>
              <div style={{ width: "0.4vw", height: "0.4vw", borderRadius: "50%", background: "#c9922a", flexShrink: 0 }} />
              <span style={{ fontSize: "1.35vw", color: "#f5f0e8", fontWeight: 600 }}>تحليل المصروفات التشغيلية</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.8vw" }}>
              <div style={{ width: "0.4vw", height: "0.4vw", borderRadius: "50%", background: "#c9922a", flexShrink: 0 }} />
              <span style={{ fontSize: "1.35vw", color: "#f5f0e8", fontWeight: 600 }}>التقارير والامتثال التنظيمي</span>
            </div>
            <div style={{ marginTop: "auto", paddingTop: "1vh", borderTop: "1px solid rgba(201,146,42,0.15)" }}>
              <span style={{ fontSize: "1.25vw", color: "#d4c9b0", fontWeight: 600 }}>منصة GSS — نقطة إدارة تشغيل واحدة لكل منشأتك</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
