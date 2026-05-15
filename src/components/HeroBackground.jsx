export default function HeroBackground() {
  return (
    <>
      <style>{`
        @keyframes blob1 {
          0%,100% { transform: translate(-50%, 0px) scale(1); }
          25%      { transform: translate(-52%, -28px) scale(1.04); }
          50%      { transform: translate(-48%, 18px) scale(0.97); }
          75%      { transform: translate(-51%, -12px) scale(1.06); }
        }
        @keyframes blob2 {
          0%,100% { transform: translate(0,0) scale(1); }
          33%     { transform: translate(-30px, 40px) scale(1.08); }
          66%     { transform: translate(20px, -30px) scale(0.94); }
        }
        @keyframes blob3 {
          0%,100% { transform: translate(0,0) scale(1); }
          40%     { transform: translate(40px, 20px) scale(1.07); }
          80%     { transform: translate(-20px, -35px) scale(0.95); }
        }
        @keyframes blob4 {
          0%,100% { transform: translate(0,0) scale(1); opacity:.55; }
          50%     { transform: translate(-25px, 45px) scale(1.12); opacity:.85; }
        }
        @keyframes blob5 {
          0%,100% { transform: translate(0,0) scale(1); opacity:.4; }
          60%     { transform: translate(30px,-20px) scale(1.1); opacity:.7; }
        }
        @keyframes leakPulse {
          0%,100% { opacity:.18; }
          50%     { opacity:.32; }
        }
        @keyframes grain {
          0%         { transform:translate(0,0); }
          10%        { transform:translate(-2%,-1%); }
          20%        { transform:translate(1%,2%); }
          30%        { transform:translate(-1%,-2%); }
          40%        { transform:translate(2%,1%); }
          50%        { transform:translate(-1%,2%); }
          60%        { transform:translate(1%,-1%); }
          70%        { transform:translate(-2%,2%); }
          80%        { transform:translate(2%,-2%); }
          90%        { transform:translate(-1%,1%); }
          100%       { transform:translate(0,0); }
        }
      `}</style>

      {/* ── 1. BASE COLOUR ── */}
      <div style={{
        position: 'absolute', inset: 0,
        background: '#050816',
      }} />

      {/* ── 2. DEEP GREEN GRADIENT BASE ── radial from bottom */}
      <div style={{
        position: 'absolute', inset: 0,
        background:
          'radial-gradient(ellipse 130% 65% at 50% 115%, #071A0E 0%, #060F09 35%, transparent 65%),' +
          'radial-gradient(ellipse 80% 50% at 50% 0%, #050F08 0%, transparent 55%)',
      }} />

      {/* ── 3. MAIN BLOB — large green, centered-lower ── */}
      <div style={{
        position: 'absolute',
        bottom: '-8%',
        left: '50%',
        width: '110vw',
        height: '85vh',
        background:
          'radial-gradient(ellipse at center, rgba(199,247,81,0.28) 0%, rgba(168,216,48,0.12) 28%, rgba(0,128,70,0.04) 58%, transparent 72%)',
        filter: 'blur(90px)',
        willChange: 'transform',
        animation: 'blob1 30s ease-in-out infinite',
      }} />

      {/* ── 4. LEFT BLOB — emerald, upper-left ── */}
      <div style={{
        position: 'absolute',
        top: '0%',
        left: '-28%',
        width: '70vw',
        height: '90vh',
        background:
          'radial-gradient(ellipse at center, rgba(16,185,129,0.22) 0%, rgba(0,128,70,0.09) 42%, transparent 68%)',
        filter: 'blur(110px)',
        willChange: 'transform',
        animation: 'blob2 36s ease-in-out infinite',
      }} />

      {/* ── 5. RIGHT BLOB — bright green, upper-right ── */}
      <div style={{
        position: 'absolute',
        top: '-8%',
        right: '-22%',
        width: '65vw',
        height: '80vh',
        background:
          'radial-gradient(ellipse at center, rgba(199,247,81,0.18) 0%, rgba(168,216,48,0.07) 42%, transparent 68%)',
        filter: 'blur(120px)',
        willChange: 'transform',
        animation: 'blob3 42s ease-in-out infinite',
      }} />

      {/* ── 6. MID ACCENT — green, center-right ── */}
      <div style={{
        position: 'absolute',
        top: '22%',
        left: '52%',
        width: '45vw',
        height: '45vh',
        background:
          'radial-gradient(ellipse at center, rgba(199,247,81,0.15) 0%, transparent 62%)',
        filter: 'blur(80px)',
        willChange: 'transform',
        animation: 'blob4 24s ease-in-out infinite',
      }} />

      {/* ── 7. LOWER-LEFT SECONDARY — deep green vein ── */}
      <div style={{
        position: 'absolute',
        bottom: '18%',
        left: '4%',
        width: '42vw',
        height: '42vh',
        background:
          'radial-gradient(ellipse at center, rgba(0,80,40,0.45) 0%, transparent 62%)',
        filter: 'blur(70px)',
        willChange: 'transform',
        animation: 'blob5 28s ease-in-out infinite 4s',
      }} />

      {/* ── 8. LIGHT LEAK — upper-left corner ── */}
      <div style={{
        position: 'absolute',
        top: '-12%',
        left: '-8%',
        width: '42vw',
        height: '42vh',
        background:
          'radial-gradient(ellipse at center, rgba(199,247,81,0.08) 0%, transparent 58%)',
        filter: 'blur(60px)',
        animation: 'leakPulse 18s ease-in-out infinite',
        pointerEvents: 'none',
      }} />

      {/* ── 9. LIGHT LEAK — lower-right corner ── */}
      <div style={{
        position: 'absolute',
        bottom: '-10%',
        right: '-8%',
        width: '38vw',
        height: '38vh',
        background:
          'radial-gradient(ellipse at center, rgba(16,185,129,0.12) 0%, transparent 60%)',
        filter: 'blur(70px)',
        animation: 'leakPulse 22s ease-in-out infinite 3s',
        pointerEvents: 'none',
      }} />

      {/* ── 10. GRAIN TEXTURE OVERLAY ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-50%', left: '-50%',
          width: '200%',
          height: '200%',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.80' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='250' height='250' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '160px 160px',
          opacity: 0.048,
          mixBlendMode: 'overlay',
          animation: 'grain 0.45s steps(2) infinite',
          willChange: 'transform',
          pointerEvents: 'none',
        }}
      />

      {/* ── 11. VIGNETTE — dark radial edges ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0,
          background:
            'radial-gradient(ellipse 95% 90% at 50% 50%, transparent 32%, rgba(5,8,22,0.55) 65%, rgba(5,8,22,0.92) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* ── 12. TOP EDGE FADE — keeps navbar area solid-dark ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '18%',
          background: 'linear-gradient(to bottom, #050816 0%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* ── 13. BOTTOM EDGE FADE — subtle blend into next section ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          height: '14%',
          background: 'linear-gradient(to top, #050816 0%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />
    </>
  )
}
