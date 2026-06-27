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
    <div
      style={{
        /* ocupa a altura total da viewport */
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
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

      {/* Conteúdo centralizado */}
      <div
        style={{
          /* ocupa o espaço restante e centraliza */
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          /* espaço ao redor do card */
          padding: "40px 16px",
        }}
      >
        <div
          style={{
            width: "100%",
            /* largura máxima do card de API key */
            maxWidth: "420px",
          }}
        >
          {/* Card principal */}
          <div
            style={{
              /* fundo branco do card */
              background: "#ffffff",
              /* borda ao redor do card */
              border: "1px solid #1b1b2524",
              borderRadius: "8px",
              overflow: "hidden",
              /* sombra suave abaixo do card */
              boxShadow: "0 18px 42px #1b1b2514",
            }}
          >
            {/* Cabeçalho do card */}
            <div
              style={{
                /* fundo cinza claro do cabeçalho */
                background: "#f0f1ea",
                /* borda inferior separando do corpo */
                borderBottom: "1px solid #1b1b2524",
                /* espaço interno do cabeçalho */
                padding: "14px 18px",
              }}
            >
              <p
                style={{
                  margin: 0,
                  /* tamanho da fonte do título do cabeçalho */
                  fontSize: "12px",
                  fontWeight: 900,
                  /* cor do título */
                  color: "#3f3744",
                  textTransform: "uppercase",
                  /* espaçamento entre letras */
                  letterSpacing: "0.08em",
                }}
              >
                configure sua chave api
              </p>
            </div>

            {/* Corpo do card */}
            <div style={{ padding: "18px" }}>
              <p
                style={{
                  /* margem abaixo do texto explicativo */
                  margin: "0 0 16px",
                  /* cor do texto */
                  color: "#3f3744",
                  fontSize: "13px",
                  lineHeight: 1.55,
                }}
              >
                A IA que gera o PRD roda na Groq — gratuita e rápida. Sua chave fica salva só no seu navegador e nunca passa pelo nosso servidor.
              </p>

              {/* Campo da API Key */}
              <div style={{ marginBottom: "12px" }}>
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
                    style={{
                      /* espaço à direita para o botão ver/ocultar */
                      paddingRight: "56px",
                    }}
                  />
                  {/* botão ver/ocultar a chave */}
                  <button
                    type="button"
                    onClick={() => setMostrar(!mostrar)}
                    style={{
                      /* posicionado no centro vertical do input */
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      padding: 0,
                      /* tamanho da fonte do botão ver/ocultar */
                      fontSize: "11px",
                      /* cor do botão */
                      color: "#3f3744",
                      cursor: "pointer",
                    }}
                  >
                    {mostrar ? "ocultar" : "ver"}
                  </button>
                </div>
                {/* mensagem de erro */}
                {erro && (
                  <p
                    style={{
                      margin: "6px 0 0",
                      /* cor do texto de erro — rosa */
                      color: "#b44b7a",
                      fontSize: "11px",
                    }}
                  >
                    {erro}
                  </p>
                )}
              </div>

              {/* Botão continuar */}
              <button
                onClick={confirmar}
                className="btn primary full"
                style={{ minHeight: "40px" }}
              >
                continuar
              </button>
            </div>
          </div>

          {/* Card de instruções */}
          <div
            style={{
              /* margem acima do card de instruções */
              marginTop: "14px",
              background: "#ffffff",
              border: "1px solid #1b1b2524",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            {/* Cabeçalho do card de instruções */}
            <div
              style={{
                background: "#f0f1ea",
                borderBottom: "1px solid #1b1b2524",
                padding: "10px 14px",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "11px",
                  fontWeight: 900,
                  /* cor do label — verde escuro */
                  color: "#6f7b18",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                como obter sua chave grátis
              </p>
            </div>

            {/* Passos de instrução */}
            <div
              style={{
                padding: "12px 14px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              {[
                { n: "1", texto: <>Acesse <strong style={{ color: "#1b1b25" }}>console.groq.com</strong> e crie uma conta gratuita</> },
                { n: "2", texto: <>No menu lateral, clique em <strong style={{ color: "#1b1b25" }}>API Keys</strong></> },
                { n: "3", texto: <>Clique em <strong style={{ color: "#1b1b25" }}>Create API Key</strong>, copie e cole aqui</> },
              ].map(({ n, texto }) => (
                <div
                  key={n}
                  style={{
                    display: "grid",
                    /* grid: número 20px + texto flexível */
                    gridTemplateColumns: "20px 1fr",
                    gap: "8px",
                    alignItems: "start",
                  }}
                >
                  {/* número do passo */}
                  <span
                    style={{
                      /* tamanho do número do passo */
                      width: "20px",
                      height: "20px",
                      borderRadius: "4px",
                      /* fundo escuro do número */
                      background: "#1b1b25",
                      /* número em verde-limão */
                      color: "#b7c939",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      /* tamanho da fonte do número */
                      fontSize: "10px",
                      fontWeight: 900,
                      flexShrink: 0,
                    }}
                  >
                    {n}
                  </span>
                  {/* texto do passo */}
                  <span
                    style={{
                      fontSize: "13px",
                      /* cor do texto do passo */
                      color: "#3f3744",
                      lineHeight: 1.55,
                    }}
                  >
                    {texto}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Nota sobre privacidade */}
          <p
            style={{
              textAlign: "center",
              /* tamanho da fonte da nota */
              fontSize: "11px",
              /* cor da nota — muito translúcida */
              color: "#1b1b2559",
              /* margem acima da nota */
              marginTop: "14px",
            }}
          >
            Sua chave fica apenas no localStorage do seu navegador.
          </p>
        </div>
      </div>
    </div>
  );
}
