export default function Slide2Idea() {
  return (
    <div className="relative w-screen h-screen overflow-hidden" dir="rtl" style={{ background: "linear-gradient(150deg, #0f1a30 0%, #1a2744 100%)" }}>
      <div className="absolute" style={{ top: 0, right: 0, width: "55vw", height: "55vh", background: "radial-gradient(ellipse at top right, rgba(201,146,42,0.07), transparent 65%)" }} />
      <div className="absolute" style={{ bottom: 0, left: 0, width: "40vw", height: "40vh", background: "radial-gradient(ellipse at bottom left, rgba(201,146,42,0.05), transparent 65%)" }} />

      <div className="absolute inset-0 flex flex-col justify-center" style={{ padding: "6vh 8vw" }}>
        <div style={{ marginBottom: "2vh" }}>
          <span className="font-body" style={{ fontSize: "1.5vw", color: "#c9922a", fontWeight: 700, letterSpacing: "0.15em" }}>فكرة المشروع</span>
        </div>

        <div style={{ background: "rgba(26,39,68,0.6)", border: "1px solid rgba(201,146,42,0.25)", borderRadius: "1vw", padding: "4vh 3.5vw", marginBottom: "4vh" }}>
          <div style={{ fontSize: "1.6vw", color: "#c9922a", fontWeight: 700, marginBottom: "1.5vh" }}>ما هي GSS؟</div>
          <p className="font-body" style={{ fontSize: "2vw", color: "#f5f0e8", fontWeight: 600, lineHeight: 1.7 }}>
            منصة تنظم وتدير الطلبات التشغيلية اليومية للمنشآت عبر
            <span style={{ color: "#c9922a" }}> نقطة تشغيل واحدة </span>
            تربط الشركات بشبكة موردين وفنيين ومستشارين مع متابعة التنفيذ وإصدار التقارير التشغيلية.
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "3vw" }}>
          <div style={{ flex: 1, height: "1px", background: "rgba(201,146,42,0.3)" }} />
          <div style={{ textAlign: "center" }}>
            <div className="font-display font-black" style={{ fontSize: "2.8vw", color: "#9ca3b0", marginBottom: "0.8vh" }}>
              المشكلة ليست نقص الموردين…
            </div>
            <div className="font-display font-black" style={{ fontSize: "3.5vw", color: "#c9922a" }}>
              المشكلة هي إدارة الموردين.
            </div>
          </div>
          <div style={{ flex: 1, height: "1px", background: "rgba(201,146,42,0.3)" }} />
        </div>
      </div>
    </div>
  );
}
