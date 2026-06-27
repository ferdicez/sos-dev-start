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
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div className="topbar">
        <div className="topbar-inner" style={{ maxWidth: 720, margin: "0 auto", width: "100%" }}>
          <a href="/" className="brand" style={{ textDecoration: "none", color: "inherit" }}>
            <span className="mark">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15.033 9.44a.647.647 0 0 1 0 1.12l-4.065 2.352a.645.645 0 0 1-.968-.56V7.648a.645.645 0 0 1 .967-.56z"/>
                <path d="M12 17v4"/><path d="M8 21h8"/>
                <rect x="2" y="3" width="20" height="14" rx="2"/>
              </svg>
            </span>
            <span style={{ fontSize: 13 }}>sos dev start</span>
          </a>

          {/* Progress steps */}
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            {STEPS.map((s, i) => (
              <div key={s.id} style={{ display: "flex", alignItems: "center" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{
                    width: 24, height: 24, borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 10, fontWeight: 900,
                    background: i < stepIndex ? "#b7c939" : i === stepIndex ? "rgba(183,201,57,.15)" : "transparent",
                    border: i === stepIndex ? "2px solid #b7c939" : i < stepIndex ? "2px solid #b7c939" : "1px solid rgba(27,27,37,.2)",
                    color: i < stepIndex ? "#1b1b25" : i === stepIndex ? "#6f7b18" : "#3f3744",
                    transition: "all .3s",
                  }}>
                    {i < stepIndex ? "✓" : i + 1}
                  </div>
                  <span style={{ fontSize: 9, marginTop: 2, color: i <= stepIndex ? "#6f7b18" : "rgba(27,27,37,.3)", display: "none" }}
                    className="sm-label">{s.label}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <div style={{ width: 20, height: 1, background: i < stepIndex ? "#b7c939" : "rgba(27,27,37,.14)", margin: "0 2px 10px" }} />
                )}
              </div>
            ))}
            <span style={{ fontSize: 11, color: "#3f3744", marginLeft: 8 }}>{stepIndex + 1}/{STEPS.length}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "40px 16px" }}>
        <div style={{ width: "100%", maxWidth: 640 }}>
          {erro && (
            <div style={{ marginBottom: 24, background: "rgba(180,75,122,.08)", border: "1px solid rgba(180,75,122,.2)", borderRadius: 8, padding: 16 }}>
              <div style={{ display: "flex", gap: 12 }}>
                <span style={{ color: "#b44b7a", flexShrink: 0, fontWeight: 900 }}>!</span>
                <div>
                  <p style={{ color: "#b44b7a", fontSize: 13, fontWeight: 800, margin: "0 0 4px" }}>Erro ao gerar PRD</p>
                  <p style={{ color: "rgba(180,75,122,.7)", fontSize: 12, margin: 0 }}>{erro}</p>
                  <p style={{ fontSize: 11, color: "#3f3744", margin: "8px 0 0" }}>
                    Verifique se sua chave API está correta ou{" "}
                    <button onClick={() => { setApiKey(null); setErro(""); }}
                      style={{ background: "none", border: "none", padding: 0, color: "#6f7b18", fontWeight: 800, cursor: "pointer", textDecoration: "underline" }}>
                      troque a chave
                    </button>
                  </p>
                  <button onClick={() => { setErro(""); setStep("contexto"); }}
                    style={{ marginTop: 10, background: "none", border: "none", padding: 0, fontSize: 11, color: "#3f3744", cursor: "pointer", textDecoration: "underline" }}>
                    Tentar novamente
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === "basicos" && (
            <StepBasicos
              data={formData}
              onChange={updateForm}
              onNext={() => setStep("contexto")}
            />
          )}

          {step === "contexto" && (
            <StepContexto
              data={formData}
              onChange={updateForm}
              onNext={() => setStep("gerando-prd")}
              onBack={() => setStep("basicos")}
            />
          )}

          {step === "gerando-prd" && (
            <StepGerandoPRD
              formData={formData}
              apiKey={apiKey}
              onPRDGerado={(prdGerado) => {
                setPRD(prdGerado);
                setStep("aprovacao-prd");
              }}
              onErro={(msg) => {
                setErro(msg);
                setStep("aprovacao-prd");
              }}
            />
          )}

          {step === "aprovacao-prd" && prd && (
            <StepAprovacaoPRD
              prd={prd}
              onAprovar={(stack) => {
                setStackEscolhida(stack);
                setStep("download");
              }}
              onEditar={(prdEditado) => setPRD(prdEditado)}
              onVoltar={() => { setPRD(null); setStep("basicos"); }}
            />
          )}

          {step === "download" && prd && stackEscolhida && (
            <StepDownload
              prd={prd}
              stackEscolhida={stackEscolhida}
              onNovoProjeto={resetar}
            />
          )}
        </div>
      </div>
    </div>
  );
}
