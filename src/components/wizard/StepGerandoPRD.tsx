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
    return () => {
      mounted = false;
    };
  }, []);

  const progresso = Math.round((etapasConcluidas.length / ETAPAS.length) * 100);

  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-10 step-animate">
      {/* Spinner com ícone */}
      <div className="relative">
        <div className="w-24 h-24 rounded-full border-2 border-zinc-800 border-t-emerald-500 animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-emerald-500/5 border border-emerald-500/20 flex items-center justify-center">
            <span className="text-2xl">✦</span>
          </div>
        </div>
      </div>

      {/* Texto central */}
      <div className="text-center space-y-2">
        <h2 className="text-xl font-semibold text-white">
          Gerando seu PRD com Llama 3.3
        </h2>
        <p className="text-zinc-500 text-sm max-w-xs mx-auto">
          {formData.nomeProjeto && (
            <span className="text-emerald-400 font-medium">{formData.nomeProjeto}</span>
          )}{" "}
          está sendo analisado. Leva alguns segundos.
        </p>
      </div>

      {/* Barra de progresso */}
      <div className="w-full max-w-sm space-y-2">
        <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full transition-all duration-500"
            style={{ width: `${progresso}%` }}
          />
        </div>
        <p className="text-xs text-zinc-600 text-right">{progresso}%</p>
      </div>

      {/* Etapas */}
      <div className="w-full max-w-sm space-y-2.5">
        {ETAPAS.map((etapa, i) => {
          const concluida = etapasConcluidas.includes(i);
          const ativa = etapaAtual === i;

          return (
            <div
              key={i}
              className={`flex items-center gap-3 text-sm transition-all duration-300 ${
                concluida
                  ? "text-zinc-400"
                  : ativa
                  ? "text-white"
                  : "text-zinc-700"
              }`}
            >
              <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border transition-all ${
                concluida
                  ? "bg-emerald-500 border-emerald-500 text-black text-xs"
                  : ativa
                  ? "border-emerald-500 bg-emerald-500/10"
                  : "border-zinc-800"
              }`}>
                {concluida ? "✓" : ativa ? (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                ) : null}
              </div>
              <span>{etapa.texto}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
