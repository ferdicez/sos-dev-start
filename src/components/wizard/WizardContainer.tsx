"use client";

import { useState } from "react";
import { FormData, PRDData, StackOpcao, WizardStep } from "@/lib/types";
import { StepBasicos } from "./StepBasicos";
import { StepContexto } from "./StepContexto";
import { StepGerandoPRD } from "./StepGerandoPRD";
import { StepAprovacaoPRD } from "./StepAprovacaoPRD";
import { StepDownload } from "./StepDownload";
import { StepApiKey } from "./StepApiKey";

const STEPS: { id: WizardStep; label: string }[] = [
  { id: "basicos", label: "Básicos" },
  { id: "contexto", label: "Contexto" },
  { id: "gerando-prd", label: "PRD" },
  { id: "aprovacao-prd", label: "Revisão" },
  { id: "download", label: "Pronto" },
];

const FORM_INICIAL: FormData = {
  nomeProjeto: "",
  tagline: "",
  tipoProjeto: "",
  problema: "",
  publicoAlvo: "",
  features: [],
  stackPreferencia: "",
  precisaAuth: false,
  precisaBanco: false,
  tipoBanco: "",
  precisaPagamento: false,
  deployAlvo: "Vercel",
  referenciaDesign: "",
};

export function WizardContainer() {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [step, setStep] = useState<WizardStep>("basicos");
  const [formData, setFormData] = useState<FormData>(FORM_INICIAL);
  const [prd, setPRD] = useState<PRDData | null>(null);
  const [stackEscolhida, setStackEscolhida] = useState<StackOpcao | null>(null);
  const [erro, setErro] = useState<string>("");

  if (!apiKey) {
    return <StepApiKey onConfirmar={(chave) => setApiKey(chave)} />;
  }

  const updateForm = (partial: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...partial }));
  };

  const stepIndex = STEPS.findIndex((s) => s.id === step);

  const resetar = () => {
    setStep("basicos");
    setFormData(FORM_INICIAL);
    setPRD(null);
    setStackEscolhida(null);
    setErro("");
  };

  return (
    <div
      style={{
        /* ocupa a altura total da viewport */
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Topbar do wizard */}
      <div className="topbar">
        <div
          className="topbar-inner"
          style={{
            /* largura máxima centralizada do conteúdo da topbar */
            maxWidth: "720px",
            margin: "0 auto",
            width: "100%",
          }}
        >
          {/* Brand / logo */}
          <a
            href="/"
            className="brand"
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <span className="mark">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15.033 9.44a.647.647 0 0 1 0 1.12l-4.065 2.352a.645.645 0 0 1-.968-.56V7.648a.645.645 0 0 1 .967-.56z"/>
                <path d="M12 17v4"/><path d="M8 21h8"/>
                <rect x="2" y="3" width="20" height="14" rx="2"/>
              </svg>
            </span>
            <span style={{ fontSize: "13px" }}>sos dev start</span>
          </a>

          {/* Indicador de progresso */}
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            {STEPS.map((s, i) => (
              <div key={s.id} style={{ display: "flex", alignItems: "center" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  {/* bolinha do step */}
                  <div
                    style={{
                      /* tamanho da bolinha */
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      /* tamanho da fonte do número/check */
                      fontSize: "10px",
                      fontWeight: 900,
                      /* fundo: verde se concluído, verde translúcido se atual, transparente se futuro */
                      background: i < stepIndex ? "#b7c939" : i === stepIndex ? "#b7c9391A" : "transparent",
                      /* borda: verde forte se concluído/atual, cinza se futuro */
                      border: i === stepIndex ? "2px solid #b7c939" : i < stepIndex ? "2px solid #b7c939" : "1px solid #1b1b2533",
                      /* cor: escuro se concluído, verde escuro se atual, cinza se futuro */
                      color: i < stepIndex ? "#1b1b25" : i === stepIndex ? "#6f7b18" : "#3f3744",
                      /* transição suave entre estados */
                      transition: "all 0.3s",
                    }}
                  >
                    {i < stepIndex ? "✓" : i + 1}
                  </div>
                </div>
                {/* linha conectora entre bolinhas */}
                {i < STEPS.length - 1 && (
                  <div
                    style={{
                      /* largura da linha conectora */
                      width: "20px",
                      height: "1px",
                      /* cor: verde se step concluído, cinza se não */
                      background: i < stepIndex ? "#b7c939" : "#1b1b2524",
                      /* margem lateral das linhas */
                      margin: "0 2px 10px",
                      transition: "background 0.3s",
                    }}
                  />
                )}
              </div>
            ))}
            {/* contador X/Y */}
            <span
              style={{
                /* tamanho da fonte do contador */
                fontSize: "11px",
                /* cor do contador */
                color: "#3f3744",
                /* margem à esquerda do contador */
                marginLeft: "8px",
                opacity: 0.7,
              }}
            >
              {stepIndex + 1}/{STEPS.length}
            </span>
          </div>
        </div>
      </div>

      {/* Área de conteúdo dos steps */}
      <div
        style={{
          /* ocupa o espaço restante da tela */
          flex: 1,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          /* espaço ao redor do conteúdo */
          padding: "40px 16px",
        }}
      >
        <div
          style={{
            width: "100%",
            /* largura máxima do card do wizard */
            maxWidth: "640px",
          }}
        >
          {/* Banner de erro */}
          {erro && (
            <div
              style={{
                /* margem abaixo do banner de erro */
                marginBottom: "24px",
                /* fundo rosa translúcido do erro — 8% opacidade */
                background: "#b44b7a14",
                /* borda rosa do erro — 20% opacidade */
                border: "1px solid #b44b7a33",
                borderRadius: "8px",
                padding: "16px",
              }}
            >
              <div style={{ display: "flex", gap: "12px" }}>
                {/* ícone de exclamação */}
                <span
                  style={{
                    color: "#b44b7a",
                    flexShrink: 0,
                    fontWeight: 900,
                    /* tamanho do ícone de exclamação */
                    fontSize: "14px",
                  }}
                >
                  !
                </span>
                <div>
                  <p
                    style={{
                      /* cor do título do erro */
                      color: "#b44b7a",
                      fontSize: "13px",
                      fontWeight: 800,
                      margin: "0 0 4px",
                    }}
                  >
                    Erro ao gerar PRD
                  </p>
                  <p style={{ color: "#b44b7ab3", fontSize: "12px", margin: 0 }}>{erro}</p>
                  <p style={{ fontSize: "11px", color: "#3f3744", margin: "8px 0 0" }}>
                    Verifique se sua chave API está correta ou{" "}
                    <button
                      onClick={() => { setApiKey(null); setErro(""); }}
                      style={{
                        background: "none",
                        border: "none",
                        padding: 0,
                        /* cor do link de trocar chave */
                        color: "#6f7b18",
                        fontWeight: 800,
                        cursor: "pointer",
                        textDecoration: "underline",
                        fontSize: "11px",
                      }}
                    >
                      troque a chave
                    </button>
                  </p>
                  <button
                    onClick={() => { setErro(""); setStep("contexto"); }}
                    style={{
                      marginTop: "10px",
                      background: "none",
                      border: "none",
                      padding: 0,
                      fontSize: "11px",
                      color: "#3f3744",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                  >
                    Tentar novamente
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Renderização do step atual */}
          {step === "basicos" && (
            <StepBasicos data={formData} onChange={updateForm} onNext={() => setStep("contexto")} />
          )}
          {step === "contexto" && (
            <StepContexto data={formData} onChange={updateForm} onNext={() => setStep("gerando-prd")} onBack={() => setStep("basicos")} />
          )}
          {step === "gerando-prd" && (
            <StepGerandoPRD
              formData={formData}
              apiKey={apiKey}
              onPRDGerado={(prdGerado) => { setPRD(prdGerado); setStep("aprovacao-prd"); }}
              onErro={(msg) => { setErro(msg); setStep("aprovacao-prd"); }}
            />
          )}
          {step === "aprovacao-prd" && prd && (
            <StepAprovacaoPRD
              prd={prd}
              onAprovar={(stack) => { setStackEscolhida(stack); setStep("download"); }}
              onEditar={(prdEditado) => setPRD(prdEditado)}
              onVoltar={() => { setPRD(null); setStep("basicos"); }}
            />
          )}
          {step === "download" && prd && stackEscolhida && (
            <StepDownload prd={prd} stackEscolhida={stackEscolhida} onNovoProjeto={resetar} />
          )}
        </div>
      </div>
    </div>
  );
}
