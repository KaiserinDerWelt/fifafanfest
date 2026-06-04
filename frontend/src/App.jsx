import { useState, useEffect, useRef } from "react";

const TIMER_SECONDS = 5 * 60;

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@400;600;700&family=Barlow:wght@400;500&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body { font-family: 'Barlow', sans-serif; background: #0a1f0e; }

  /* HERO */
  .hero {
    min-height: 100vh;
    background: #0a1f0e;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    position: relative; overflow: hidden;
    padding: 2rem 1rem; text-align: center;
  }
  .hero-grass {
    position: absolute; bottom: 0; left: 0; right: 0; height: 160px;
    background: repeating-linear-gradient(90deg,#0d3318 0px,#0d3318 40px,#0f3d1c 40px,#0f3d1c 80px);
    opacity: 0.4;
  }
  .hero-dots { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
  .dot {
    position: absolute; border-radius: 50%; opacity: 0;
    animation: floatDot linear infinite;
  }
  .fifa-top {
    position: absolute; top: 20px; left: 50%; transform: translateX(-50%);
    font-family: 'Barlow Condensed', sans-serif; font-size: 12px;
    letter-spacing: 4px; color: rgba(255,255,255,0.3); text-transform: uppercase; z-index: 3;
  }
  .badge {
    background: #C9A84C; color: #0a1f0e;
    font-family: 'Barlow Condensed', sans-serif; font-weight: 700;
    font-size: 11px; letter-spacing: 2px; text-transform: uppercase;
    padding: 5px 16px; border-radius: 2px; margin-bottom: 1.2rem;
    animation: fadeDown 0.5s ease 0.2s both; position: relative; z-index: 2;
  }
  .hero-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(52px, 12vw, 100px); line-height: 0.95;
    color: #fff; margin-bottom: 0.4rem;
    animation: fadeUp 0.6s ease 0.4s both; position: relative; z-index: 2;
    text-shadow: 0 4px 24px rgba(0,0,0,0.6);
  }
  .hero-title .mx { color: #006847; }
  .hero-title .vs { color: #C9A84C; font-size: 0.5em; vertical-align: middle; margin: 0 0.2em; }
  .hero-title .sa { color: #FFB612; }
  .hero-sub {
    font-family: 'Barlow Condensed', sans-serif; font-size: clamp(16px,4vw,26px);
    font-weight: 600; letter-spacing: 3px; color: rgba(255,255,255,0.65);
    text-transform: uppercase; margin-bottom: 2rem;
    animation: fadeUp 0.6s ease 0.6s both; position: relative; z-index: 2;
  }
  .flags {
    display: flex; align-items: center; gap: 2rem; margin-bottom: 2.5rem;
    animation: scaleIn 0.7s cubic-bezier(0.34,1.56,0.64,1) 0.9s both;
    position: relative; z-index: 2;
  }
  .flag { display: flex; flex-direction: column; align-items: center; gap: 8px; }
  .flag-img {
    width: 68px; height: 44px; border-radius: 4px; overflow: hidden;
    display: flex; flex-direction: column;
    box-shadow: 0 4px 16px rgba(0,0,0,0.5);
  }
  .flag span {
    font-family: 'Barlow Condensed', sans-serif; font-weight: 700;
    font-size: 12px; letter-spacing: 1.5px; color: rgba(255,255,255,0.6);
    text-transform: uppercase;
  }
  .vs-circle {
    width: 46px; height: 46px; border-radius: 50%; background: #C9A84C;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Bebas Neue', sans-serif; font-size: 20px; color: #0a1f0e;
    animation: pulse 2s ease infinite 2s;
  }
  .date-row {
    display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center;
    margin-bottom: 2.5rem;
    animation: fadeUp 0.6s ease 0.8s both; position: relative; z-index: 2;
  }
  .chip {
    display: flex; align-items: center; gap: 8px;
    background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.13);
    border-radius: 4px; padding: 8px 16px; color: #fff; font-size: 14px;
  }
  .chip-icon { color: #C9A84C; font-size: 16px; }
  .cta {
    display: inline-flex; align-items: center; gap: 10px;
    background: #006847; color: #fff;
    font-family: 'Barlow Condensed', sans-serif; font-weight: 700;
    font-size: 17px; letter-spacing: 1.5px; text-transform: uppercase;
    padding: 14px 36px; border-radius: 4px; cursor: pointer; border: none;
    animation: fadeUp 0.5s ease 1.2s both; position: relative; z-index: 2;
    transition: background 0.2s, transform 0.15s; text-decoration: none;
  }
  .cta:hover { background: #00854f; transform: translateY(-2px); }

  /* INFO */
  .info-section { background: #0d2410; padding: 5rem 1.5rem; }
  .sec-inner { max-width: 720px; margin: 0 auto; }
  .sec-label {
    font-family: 'Barlow Condensed', sans-serif; font-weight: 700;
    font-size: 11px; letter-spacing: 3px; text-transform: uppercase;
    color: #C9A84C; margin-bottom: 0.5rem;
  }
  .sec-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(36px,7vw,60px); line-height: 1;
    margin-bottom: 2rem; color: #fff;
  }
  .cards { display: grid; grid-template-columns: repeat(auto-fit,minmax(150px,1fr)); gap: 1rem; margin-bottom: 2rem; }
  .card {
    background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.09);
    border-radius: 6px; padding: 1.2rem;
    display: flex; flex-direction: column; gap: 6px;
    transition: border-color 0.2s;
  }
  .card:hover { border-color: rgba(201,168,76,0.4); }
  .card-icon { font-size: 22px; color: #C9A84C; }
  .card-val { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 18px; color: #fff; }
  .card-lbl { font-size: 12px; color: rgba(255,255,255,0.45); }
  .info-note {
    font-size: 13px; color: rgba(255,255,255,0.4);
    border-left: 3px solid #006847; padding-left: 14px; line-height: 1.7;
  }

  /* GALLERY */
  .gallery-section { background: #f2f0ea; padding: 5rem 1.5rem; }
  .gallery-section .sec-title { color: #0a1f0e; }
  .gallery-section .sec-label { color: #006847; }
  .gallery { display: grid; grid-template-columns: repeat(3,1fr); gap: 8px; margin-top: 1.5rem; }
  .gitem { border-radius: 6px; overflow: hidden; aspect-ratio: 4/3; position: relative; }
  .gitem.big { grid-column: span 2; aspect-ratio: 16/9; }
  .gitem iframe { width: 100%; height: 100%; border: none; display: block; }
  .gph {
    width: 100%; height: 100%; display: flex;
    align-items: center; justify-content: center;
    font-size: 36px; color: rgba(255,255,255,0.35);
    transition: transform 0.3s;
  }
  .gitem:hover .gph { transform: scale(1.08); }

  /* FORM */
  .form-section { background: #fff; padding: 5rem 1.5rem; border-top: 5px solid #006847; }
  .form-section .sec-title { color: #0a1f0e; }
  .form-section .sec-label { color: #CE1126; }
  .timer-txt {
    font-family: 'Barlow Condensed', sans-serif; font-size: 14px;
    font-weight: 600; letter-spacing: 1px; margin-bottom: 0.6rem;
  }
  .timer-bg { background: #eee; border-radius: 4px; height: 6px; margin-bottom: 1.8rem; overflow: hidden; }
  .timer-fill { height: 100%; border-radius: 4px; transition: width 1s linear, background 0.5s; }
  .fields { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1.2rem; }
  .fields input, .fields textarea {
    width: 100%; padding: 12px 14px;
    border: 1.5px solid #ddd; border-radius: 6px;
    font-family: 'Barlow', sans-serif; font-size: 15px; outline: none;
    transition: border-color 0.2s;
  }
  .fields input:focus, .fields textarea:focus { border-color: #006847; }
  .fields textarea { resize: vertical; min-height: 90px; }
  .btn-submit {
    background: #006847; color: #fff;
    font-family: 'Barlow Condensed', sans-serif; font-weight: 700;
    font-size: 17px; letter-spacing: 1.5px; text-transform: uppercase;
    padding: 14px; border: none; border-radius: 6px;
    cursor: pointer; width: 100%; transition: background 0.2s;
  }
  .btn-submit:hover { background: #00854f; }
  .btn-submit:disabled { background: #aaa; cursor: not-allowed; }
  .expired {
    text-align: center; padding: 2.5rem;
    background: #fff5f5; border-radius: 8px;
    border: 1.5px dashed #CE1126;
  }
  .expired h3 { font-family: 'Bebas Neue', sans-serif; font-size: 28px; color: #CE1126; margin-bottom: 0.4rem; }
  .expired p { font-size: 13px; color: #888; }
  .success {
    text-align: center; padding: 2.5rem;
    background: #f0faf4; border-radius: 8px;
  }
  .success h3 { font-family: 'Bebas Neue', sans-serif; font-size: 32px; color: #006847; margin-bottom: 0.4rem; }
  .success p { font-size: 13px; color: #555; }
  .error-msg { font-size: 13px; color: #CE1126; margin-top: 0.5rem; }

  /* FOOTER */
  .footer {
    background: #060f07; padding: 2rem 1.5rem; text-align: center;
    font-family: 'Barlow Condensed', sans-serif; font-size: 13px;
    letter-spacing: 1px; color: rgba(255,255,255,0.25);
  }

  /* SCROLL REVEAL */
  .reveal { opacity: 0; transform: translateY(30px); transition: opacity 0.7s ease, transform 0.7s ease; }
  .reveal.visible { opacity: 1; transform: translateY(0); }

  /* ANIMATIONS */
  @keyframes fadeDown {
    from { opacity: 0; transform: translateY(-12px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.8); }
    to { opacity: 1; transform: scale(1); }
  }
  @keyframes floatDot {
    0% { opacity: 0; transform: translateY(0) rotate(0deg); }
    10% { opacity: 0.6; }
    90% { opacity: 0.4; }
    100% { opacity: 0; transform: translateY(-600px) rotate(360deg); }
  }
  @keyframes pulse {
    0%, 100% { box-shadow: 0 0 0 3px rgba(201,168,76,0.3); }
    50% { box-shadow: 0 0 0 8px rgba(201,168,76,0.08); }
  }
`;

export default function App() {
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const [expired, setExpired] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ nombre: "", telefono: "", mensaje: "" });
  const dotsRef = useRef(null);

  // Timer
  useEffect(() => {
    if (expired || submitted) return;
    const t = setInterval(() => {
      setTimeLeft(p => {
        if (p <= 1) { clearInterval(t); setExpired(true); return 0; }
        return p - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [expired, submitted]);

  // Dots
  useEffect(() => {
    if (!dotsRef.current) return;
    const colors = ["#006847","#CE1126","#C9A84C","#fff","#FFB612"];
    for (let i = 0; i < 30; i++) {
      const d = document.createElement("div");
      d.className = "dot";
      const size = Math.random() * 7 + 3;
      d.style.cssText = `width:${size}px;height:${size}px;background:${colors[Math.floor(Math.random()*colors.length)]};left:${Math.random()*100}%;bottom:-20px;animation-duration:${Math.random()*6+5}s;animation-delay:${Math.random()*5}s;border-radius:${Math.random()>0.5?"50%":"2px"}`;
      dotsRef.current.appendChild(d);
    }
  }, []);

  // Scroll reveal
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
    }, { threshold: 0.15 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const fmt = s => `${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;
  const pct = (timeLeft / TIMER_SECONDS) * 100;
  const barColor = timeLeft <= 60 ? "#CE1126" : timeLeft <= 120 ? "#C9A84C" : "#006847";

  const handleSubmit = async () => {
    setError("");
    if (!form.nombre.trim() || !form.telefono.trim()) {
      setError("Por favor completa nombre y teléfono."); return;
    }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3001/api/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.errors?.[0]?.msg || "Error al registrar");
      setSubmitted(true);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>

      {/* HERO */}
      <section className="hero">
        <div className="hero-grass" />
        <div className="hero-dots" ref={dotsRef} />
        <div className="fifa-top">FIFA World Cup 2026™ Fan Fest</div>
        <div className="badge">⭐ Entrada gratuita · Registro requerido</div>
        <h1 className="hero-title">
          <span className="mx">México</span>
          <span className="vs">VS</span>
          <span className="sa">Sudáfrica</span>
        </h1>
        <p className="hero-sub">Fan Fest Oficial · Mundial 2026</p>
        <div className="flags">
          <div className="flag">
            <div className="flag-img">
              <div style={{flex:1,background:"#006847"}}/>
              <div style={{flex:1,background:"#fff"}}/>
              <div style={{flex:1,background:"#CE1126"}}/>
            </div>
            <span>México</span>
          </div>
          <div className="vs-circle">VS</div>
          <div className="flag">
            <div className="flag-img" style={{flexDirection:"column"}}>
              <div style={{flex:1,background:"#007A4D"}}/>
              <div style={{flex:"0 0 2px",background:"#000"}}/>
              <div style={{flex:1,background:"#FFB612"}}/>
              <div style={{flex:"0 0 2px",background:"#000"}}/>
              <div style={{flex:1,background:"#DE3831"}}/>
              <div style={{flex:"0 0 2px",background:"#000"}}/>
              <div style={{flex:1,background:"#002395"}}/>
              <div style={{flex:"0 0 2px",background:"#000"}}/>
              <div style={{flex:1,background:"#007A4D"}}/>
            </div>
            <span>Sudáfrica</span>
          </div>
        </div>
        <div className="date-row">
          <div className="chip"><span className="chip-icon">📅</span> Miércoles 11 de Junio, 2026</div>
          <div className="chip"><span className="chip-icon">🕐</span> 13:00 hrs CDMX</div>
          <div className="chip"><span className="chip-icon">📍</span> Foro Sol · CDMX</div>
        </div>
        <a className="cta" href="#registro">🎟 Registrarme ahora</a>
      </section>

      {/* INFO */}
      <section className="info-section">
        <div className="sec-inner">
          <div className="sec-label reveal">El Evento</div>
          <h2 className="sec-title reveal">Todo lo que<br/>necesitas saber</h2>
          <div className="cards reveal">
            {[
              {icon:"📅", val:"11 Jun 2026", lbl:"Fecha del partido"},
              {icon:"🕐", val:"13:00 hrs", lbl:"Hora CDMX · Puertas 11:00"},
              {icon:"📍", val:"Foro Sol", lbl:"CDMX · Cap. 5,000 personas"},
              {icon:"🎟", val:"Gratis", lbl:"Registro obligatorio"},
            ].map((c,i) => (
              <div className="card" key={i}>
                <span className="card-icon">{c.icon}</span>
                <div className="card-val">{c.val}</div>
                <div className="card-lbl">{c.lbl}</div>
              </div>
            ))}
          </div>
          <p className="info-note reveal">
            Pantalla gigante · Zona de comida · Activaciones FIFA · Música en vivo<br/>
            Prohibido el acceso sin registro previo.
          </p>
        </div>
      </section>

      {/* GALLERY */}
      <section className="gallery-section">
        <div className="sec-inner">
          <div className="sec-label reveal">Galería</div>
          <h2 className="sec-title reveal">La experiencia<br/>Fan Fest</h2>
          <div className="gallery reveal">
            <div className="gitem big">
              <iframe src="https://www.youtube.com/embed/6D3OqD3MnEI?rel=0&modestbranding=1" allowFullScreen title="FIFA Fan Fest" />
            </div>
            {[
              {bg:"#006847",icon:"🏆"},
              {bg:"#CE1126",icon:"⚽"},
              {bg:"#1a1a2e",icon:"👥"},
              {bg:"#C9A84C",icon:"🎤"},
            ].map((g,i) => (
              <div className="gitem" key={i} style={{background:g.bg}}>
                <div className="gph">{g.icon}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORM */}
      <section className="form-section" id="registro">
        <div className="sec-inner">
          <div className="sec-label reveal">Registro</div>
          <h2 className="sec-title reveal">Asegura tu lugar</h2>
          {!submitted && !expired && (
            <div className="reveal">
              <div className="timer-txt" style={{color: timeLeft <= 60 ? "#CE1126" : "#333"}}>
                ⏱ Tiempo para registrarte: {fmt(timeLeft)}
              </div>
              <div className="timer-bg">
                <div className="timer-fill" style={{width:`${pct}%`, background: barColor}} />
              </div>
              <div className="fields">
                <input type="text" placeholder="Nombre completo" value={form.nombre}
                  onChange={e => setForm({...form, nombre: e.target.value})} />
                <input type="tel" placeholder="Teléfono" value={form.telefono}
                  onChange={e => setForm({...form, telefono: e.target.value})} />
                <textarea placeholder="¿Algo que quieras decirnos?" value={form.mensaje}
                  onChange={e => setForm({...form, mensaje: e.target.value})} />
              </div>
              {error && <p className="error-msg">{error}</p>}
              <button className="btn-submit" onClick={handleSubmit} disabled={loading}>
                {loading ? "Enviando..." : "🎟 Registrarme"}
              </button>
            </div>
          )}
          {expired && !submitted && (
            <div className="expired reveal">
              <h3>⏰ Tiempo agotado</h3>
              <p>El periodo de registro ha cerrado. Síguenos en redes para más info.</p>
            </div>
          )}
          {submitted && (
            <div className="success reveal">
              <h3>¡Nos vemos el 11! 🇲🇽</h3>
              <p>Tu registro fue recibido. Te contactaremos pronto.</p>
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        FIFA Fan Fest · México vs Sudáfrica · 11 de Junio 2026 · Foro Sol CDMX
      </footer>
    </>
  );
}
