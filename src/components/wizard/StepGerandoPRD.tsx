"use client";

import { useEffect, useState } from "react";
import { FormData, PRDData } from "@/lib/types";

const ETAPAS = [
  { texto: "Analisando o contexto do projeto...", duracao: 1500 },
  { texto: "Definindo personas e user stories...", duracao: 2000 },
  { texto: "Escolhendo a stack ideal...", duracao: 1800 },
  { texto: "Estruturando as fases de desenvolvimento...", duracao: 2000 },
  { texto: "Criando regras de segurança para o agente...", duracao: 1500 },
  { texto: "Finalizando o PRD...", duracao: 1000 },
];

interface Props {
  formData: FormData;
  apiKey: string;
  onPRDGerado: (prd: PRDData) => void;
  onErro: (msg: string) => void;
}

export function StepGerandoPRD({ formData, apiKey, onPRDGerado, onErro }: Props) {
  const [etapaAtual, setEtapaAtual] = useState(0);
  const [etapasConcluidas, setEtapasConcluidas] = useState<number[]>([]);

  useEffect(() => {
    let mounted = true;
    let timer = 0;

    ETAPAS.forEach((etapa, i) => {
      timer += etapa.duracao;
      setTimeout(() => {
        if (!mounted) return;
        setEtapaAtual(i + 1);
        setEtapasConcluidas((prev) => [...prev, i]);
      }, timer - etapa.duracao / 2);
    });

    async function gerarPRD() {
      try {
        const res = await fetch("/api/gerar-prd", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, apiKey }),
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Erro ao gerar PRD");
        }

        const { prd } = await res.json();
        if (mounted) onPRDGerado(prd);
      } catch (err) {
        if (mounted)
          onErro(err instanceof Error ? err.message : "Erro desconhecido");
      }
    }

    gerarPRD();
    return () => { mounted = false; };
  }, []);

  const progresso = Math.round((etapasConcluidas.length / ETAPAS.length) * 100);

  return (
    <div
      className="step-animate"
      style={{
        /* centraliza tudo verticalmente e horizontalmente */
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        /* espaço vertical generoso acima e abaixo */
        padding: "48px 0",
        /* espaço entre os blocos do loading */
        gap: "40px",
      }}
    >
      {/* Spinner com ícone central */}
      <div style={{ position: "relative" }}>
        {/* anel giratório externo */}
        <div
          style={{
            /* tamanho do anel */
            width: "96px",
            height: "96px",
            /* anel circular */
            borderRadius: "50%",
            /* borda cinza com topo verde-limão */
            border: "2px solid #1b1b2520",
            borderTopColor: "#b7c939",
            /* animação de rotação contínua */
            animation: "spin 1s linear infinite",
          }}
        />
        {/* ícone central sobre o spinner */}
        <div
          style={{
            /* posicionado no centro do anel */
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              /* quadrado interno do ícone */
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              /* fundo verde muito translúcido — 5% opacidade */
              background: "#b7c9390D",
              /* borda verde translúcida — 20% opacidade */
              border: "1px solid #b7c93933",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              /* tamanho do ícone estrela */
              fontSize: "24px",
            }}
          >
            ✦
          </div>
        </div>
      </div>

      {/* Texto central de status */}
      <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: "8px" }}>
        <h2
          style={{
            /* tamanho do título de loading */
            fontSize: "20px",
            fontWeight: 700,
            /* cor do título */
            color: "#1b1b25",
            margin: 0,
          }}
        >
          Gerando seu PRD com Llama 3.3
        </h2>
        <p
          style={{
            /* cor do subtítulo */
            color: "#3f3744",
            /* tamanho da fonte do subtítulo */
            fontSize: "13px",
            margin: 0,
            /* largura máxima para não ficar largo demais */
            maxWidth: "280px",
          }}
        >
          {formData.nomeProjeto && (
            <span style={{ color: "#6f7b18", fontWeight: 700 }}>{formData.nomeProjeto}</span>
          )}{" "}
          está sendo analisado. Leva alguns segundos.
        </p>
      </div>

      {/* Barra de progresso */}
      <div style={{ width: "100%", maxWidth: "360px", display: "flex", flexDirection: "column", gap: "8px" }}>
        <div
          style={{
            /* altura da barra */
            height: "4px",
            /* fundo cinza claro da barra */
            background: "#f0f1ea",
            borderRadius: "999px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              /* gradiente verde do preenchimento da barra */
              background: "linear-gradient(90deg, #6f7b18, #b7c939)",
              borderRadius: "999px",
              /* transição suave do avanço da barra */
              transition: "width 500ms ease",
              /* largura proporcional ao progresso */
              width: `${progresso}%`,
            }}
          />
        </div>
        <p
          style={{
            /* alinha o percentual à direita */
            textAlign: "right",
            /* tamanho da fonte do percentual */
            fontSize: "11px",
            /* cor do percentual */
            color: "#3f3744",
            opacity: 0.6,
            margin: 0,
          }}
        >
          {progresso}%
        </p>
      </div>

      {/* Lista de etapas */}
      <div
        style={{
          width: "100%",
          maxWidth: "360px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {ETAPAS.map((etapa, i) => {
          const concluida = etapasConcluidas.includes(i);
          const ativa = etapaAtual === i;

          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                /* tamanho da fonte de cada etapa */
                fontSize: "13px",
                /* transição suave de cor */
                transition: "all 0.3s",
                /* cor: escuro se concluída, escuro forte se ativa, cinza se pendente */
                color: concluida ? "#3f3744" : ativa ? "#1b1b25" : "#3f374470",
              }}
            >
              {/* indicador circular da etapa */}
              <div
                style={{
                  /* tamanho do indicador */
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  /* fundo e borda conforme estado da etapa */
                  background: concluida ? "#b7c939" : ativa ? "#b7c9391A" : "transparent",
                  border: concluida ? "1px solid #b7c939" : ativa ? "1px solid #b7c939" : "1px solid #1b1b2520",
                  /* cor do check */
                  color: "#1b1b25",
                  /* tamanho do check */
                  fontSize: "10px",
                  fontWeight: 900,
                  transition: "all 0.3s",
                }}
              >
                {concluida ? "✓" : ativa ? (
                  <span
                    style={{
                      /* ponto pulsante quando ativa */
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "#b7c939",
                      animation: "pulse 1s ease-in-out infinite",
                    }}
                  />
                ) : null}
              </div>
              <span>{etapa.texto}</span>
            </div>
          );
        })}
      </div>

      {/* Keyframe de rotação do spinner — injetado via style tag */}
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
      `}</style>
    </div>
  );
}
