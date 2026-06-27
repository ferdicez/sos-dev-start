"use client";

import { useState, useEffect } from "react";

interface Props {
  onConfirmar: (chave: string) => void;
}

export function StepApiKey({ onConfirmar }: Props) {
  const [chave, setChave] = useState("");
  const [mostrar, setMostrar] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const salva = localStorage.getItem("groq_api_key");
    if (salva) setChave(salva);
  }, []);

  function confirmar() {
    const limpa = chave.trim();
    if (!limpa) { setErro("Cole sua chave API antes de continuar."); return; }
    if (!limpa.startsWith("gsk_")) { setErro("Chave inválida. Chaves Groq começam com gsk_"); return; }
    localStorage.setItem("groq_api_key", limpa);
    onConfirmar(limpa);
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Topbar */}
      <header className="topbar">
        <div className="topbar-inner">
          <div className="brand">
            <span className="mark">
              <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15.033 9.44a.647.647 0 0 1 0 1.12l-4.065 2.352a.645.645 0 0 1-.968-.56V7.648a.645.645 0 0 1 .967-.56z"/>
                <path d="M12 17v4"/><path d="M8 21h8"/>
                <rect x="2" y="3" width="20" height="14" rx="2"/>
              </svg>
            </span>
            <span>sos dev start</span>
          </div>
        </div>
      </header>

      {/* Body */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 16px" }}>
        <div style={{ width: "100%", maxWidth: 420 }}>

          {/* Card principal */}
          <div style={{ background: "#fff", border: "1px solid rgba(27,27,37,.14)", borderRadius: 8, overflow: "hidden", boxShadow: "0 18px 42px rgba(27,27,37,.08)" }}>
            <div style={{ background: "#f0f1ea", borderBottom: "1px solid rgba(27,27,37,.14)", padding: "14px 18px" }}>
              <p style={{ margin: 0, fontSize: 12, fontWeight: 900, color: "#3f3744", textTransform: "uppercase", letterSpacing: ".08em" }}>
                configure sua chave api
              </p>
            </div>
            <div style={{ padding: 18 }}>
              <p style={{ margin: "0 0 16px", color: "#3f3744", fontSize: 13, lineHeight: 1.55 }}>
                A IA que gera o PRD roda na Groq — gratuita e rápida. Sua chave fica salva só no seu navegador e nunca passa pelo nosso servidor.
              </p>

              <div className="field">
                <label className="label" htmlFor="apikey">Groq API Key</label>
                <div style={{ position: "relative" }}>
                  <input
                    id="apikey"
                    className="input"
                    type={mostrar ? "text" : "password"}
                    value={chave}
                    onChange={(e) => { setChave(e.target.value); setErro(""); }}
                    onKeyDown={(e) => e.key === "Enter" && confirmar()}
                    placeholder="gsk_..."
                    style={{ paddingRight: 56 }}
                  />
                  <button
                    type="button"
                    onClick={() => setMostrar(!mostrar)}
                    style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", padding: 0, fontSize: 11, color: "#3f3744", cursor: "pointer" }}
                  >
                    {mostrar ? "ocultar" : "ver"}
                  </button>
                </div>
                {erro && <p style={{ margin: "6px 0 0", color: "#b44b7a", fontSize: 11 }}>{erro}</p>}
              </div>

              <button onClick={confirmar} className="btn primary full" style={{ marginTop: 4 }}>
                continuar
              </button>
            </div>
          </div>

          {/* Instruções */}
          <div style={{ marginTop: 14, background: "#fff", border: "1px solid rgba(27,27,37,.14)", borderRadius: 8, overflow: "hidden" }}>
            <div style={{ background: "#f0f1ea", borderBottom: "1px solid rgba(27,27,37,.14)", padding: "10px 14px" }}>
              <p style={{ margin: 0, fontSize: 11, fontWeight: 900, color: "#6f7b18", textTransform: "uppercase", letterSpacing: ".1em" }}>
                como obter sua chave grátis
              </p>
            </div>
            <div style={{ padding: "12px 14px", display: "grid", gap: 10 }}>
              {[
                { n: "1", texto: <>Acesse <strong style={{ color: "#1b1b25" }}>console.groq.com</strong> e crie uma conta gratuita</> },
                { n: "2", texto: <>No menu lateral, clique em <strong style={{ color: "#1b1b25" }}>API Keys</strong></> },
                { n: "3", texto: <>Clique em <strong style={{ color: "#1b1b25" }}>Create API Key</strong>, copie e cole aqui</> },
              ].map(({ n, texto }) => (
                <div key={n} style={{ display: "grid", gridTemplateColumns: "20px 1fr", gap: 8, alignItems: "start" }}>
                  <span style={{ width: 20, height: 20, borderRadius: 4, background: "#1b1b25", color: "#b7c939", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 900, flexShrink: 0 }}>{n}</span>
                  <span style={{ fontSize: 12, color: "#3f3744", lineHeight: 1.5 }}>{texto}</span>
                </div>
              ))}
            </div>
          </div>

          <p style={{ textAlign: "center", fontSize: 11, color: "rgba(27,27,37,.35)", marginTop: 14 }}>
            Sua chave fica apenas no localStorage do seu navegador.
          </p>
        </div>
      </div>
    </div>
  );
}
