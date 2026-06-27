"use client";

import { FormData } from "@/lib/types";

const TIPOS_PROJETO = [
  { label: "Landing Page / Site", desc: "Página para apresentar um produto, serviço ou portfólio" },
  { label: "SaaS", desc: "Software por assinatura — sistema que vira um negócio recorrente" },
  { label: "E-commerce", desc: "Loja virtual para vender produtos físicos ou digitais" },
  { label: "Aplicativo Web", desc: "Sistema com funcionalidades específicas rodando no navegador" },
  { label: "API / Backend", desc: "Serviço que processa dados e responde a outros sistemas" },
  { label: "Dashboard / Admin", desc: "Painel interno para visualizar, gerenciar ou operar dados" },
  { label: "App Mobile", desc: "Aplicativo para Android e/ou iOS" },
  { label: "Automação / Bot", desc: "Fluxo automático que executa tarefas sem interação humana" },
  { label: "Portfólio / Blog", desc: "Site pessoal, de conteúdo ou de apresentação profissional" },
  { label: "Outro", desc: "Tipo diferente dos listados acima" },
];

interface Props {
  data: FormData;
  onChange: (data: Partial<FormData>) => void;
  onNext: () => void;
}

export function StepBasicos({ data, onChange, onNext }: Props) {
  const podeAvancar =
    data.nomeProjeto.trim() && data.tagline.trim() && data.tipoProjeto;

  return (
    <div className="space-y-6 step-animate">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Sobre o projeto</h2>
        <p className="text-zinc-500 text-sm">
          Não precisa ser perfeito — comece pelo básico.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1.5">
            Nome do projeto <span className="text-emerald-400">*</span>
          </label>
          <input
            type="text"
            value={data.nomeProjeto}
            onChange={(e) => onChange({ nomeProjeto: e.target.value })}
            placeholder="Ex: TaskFlow, ClientesPro, MeuSaaS..."
            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1.5">
            Tagline <span className="text-emerald-400">*</span>
          </label>
          <input
            type="text"
            value={data.tagline}
            onChange={(e) => onChange({ tagline: e.target.value })}
            placeholder="Uma frase que resume o projeto"
            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">
            Tipo de projeto <span className="text-emerald-400">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {TIPOS_PROJETO.map((tipo) => (
              <button
                key={tipo.label}
                onClick={() => onChange({ tipoProjeto: tipo.label })}
                className={`text-left px-4 py-3 rounded-lg border transition-all ${
                  data.tipoProjeto === tipo.label
                    ? "bg-emerald-500/15 border-emerald-500/60 text-white"
                    : "bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-600"
                }`}
              >
                <div className="text-sm font-medium">{tipo.label}</div>
                <div className="text-xs text-zinc-500 mt-0.5">{tipo.desc}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={onNext}
        disabled={!podeAvancar}
        className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 disabled:bg-zinc-800 disabled:text-zinc-600 text-black font-semibold rounded-lg transition-all glow-emerald"
      >
        Continuar
      </button>
    </div>
  );
}
