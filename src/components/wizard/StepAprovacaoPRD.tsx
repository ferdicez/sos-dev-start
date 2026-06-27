"use client";

import { useState } from "react";
import { PRDData, StackOpcao } from "@/lib/types";

interface Props {
  prd: PRDData;
  onAprovar: (stackEscolhida: StackOpcao) => void;
  onEditar: (prd: PRDData) => void;
  onVoltar: () => void;
}

function Section({
  title,
  badge,
  children,
  defaultAberto = true,
}: {
  title: string;
  badge?: string;
  children: React.ReactNode;
  defaultAberto?: boolean;
}) {
  const [aberto, setAberto] = useState(defaultAberto);
  return (
    <div className="border border-zinc-800 rounded-lg overflow-hidden">
      <button
        onClick={() => setAberto(!aberto)}
        className="w-full flex items-center justify-between px-4 py-3 bg-zinc-900/80 hover:bg-zinc-900 transition-colors text-left"
      >
        <div className="flex items-center gap-2">
          <span className="font-medium text-zinc-200 text-sm">{title}</span>
          {badge && (
            <span className="text-xs text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-full">
              {badge}
            </span>
          )}
        </div>
        <span className="text-zinc-600 text-xs">{aberto ? "▲" : "▼"}</span>
      </button>
      {aberto && <div className="px-4 py-4 bg-zinc-950">{children}</div>}
    </div>
  );
}

function Lista({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
          <span className="text-emerald-500 mt-0.5 shrink-0 text-xs">▸</span>
          {item}
        </li>
      ))}
    </ul>
  );
}

export function StepAprovacaoPRD({ prd, onAprovar, onEditar, onVoltar }: Props) {
  const [modoEdicao, setModoEdicao] = useState(false);
  const [editandoJSON, setEditandoJSON] = useState(JSON.stringify(prd, null, 2));
  const [erroJSON, setErroJSON] = useState("");
  const [stackSelecionada, setStackSelecionada] = useState<number>(0);

  const salvarEdicao = () => {
    try {
      const parsed = JSON.parse(editandoJSON);
      onEditar(parsed);
      setModoEdicao(false);
      setErroJSON("");
    } catch {
      setErroJSON("JSON inválido. Verifique a sintaxe.");
    }
  };

  if (modoEdicao) {
    return (
      <div className="space-y-4 step-animate">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Editar PRD</h2>
          <button
            onClick={() => setModoEdicao(false)}
            className="text-sm text-zinc-500 hover:text-white"
          >
            Cancelar
          </button>
        </div>
        <p className="text-xs text-zinc-600">
          Edite o JSON do PRD. Mantenha a estrutura intacta.
        </p>
        <textarea
          value={editandoJSON}
          onChange={(e) => setEditandoJSON(e.target.value)}
          className="w-full h-96 bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-xs font-mono text-zinc-300 focus:outline-none focus:border-emerald-500 resize-none"
        />
        {erroJSON && <p className="text-red-400 text-sm">{erroJSON}</p>}
        <button
          onClick={salvarEdicao}
          className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-lg transition-all"
        >
          Salvar edições
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5 step-animate">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">{prd.nomeProjeto}</h2>
          <p className="text-zinc-500 text-sm mt-0.5">{prd.tagline}</p>
        </div>
        <button
          onClick={() => setModoEdicao(true)}
          className="text-xs text-zinc-600 hover:text-zinc-300 border border-zinc-800 rounded px-2 py-1 shrink-0"
        >
          Editar
        </button>
      </div>

      <div className="space-y-3">
        <Section title="Visão Geral">
          <p className="text-sm text-zinc-300 leading-relaxed">{prd.visaoGeral}</p>
        </Section>

        <Section title="Problema e Solução">
          <div className="space-y-3">
            <div>
              <p className="text-xs text-zinc-600 uppercase mb-1">Problema</p>
              <p className="text-sm text-zinc-300">{prd.problema}</p>
            </div>
            <div>
              <p className="text-xs text-zinc-600 uppercase mb-1">Solução</p>
              <p className="text-sm text-zinc-300">{prd.solucao}</p>
            </div>
          </div>
        </Section>

        <Section title="Público-Alvo" badge={`${prd.publicoAlvo.length}`}>
          <Lista items={prd.publicoAlvo} />
        </Section>

        <Section title="User Stories" badge={`${prd.userStories.length}`}>
          <Lista items={prd.userStories} />
        </Section>

        <Section title="MVP" badge={`${prd.funcionalidadesMVP.length} features`}>
          <Lista items={prd.funcionalidadesMVP} />
        </Section>

        <Section title="Nice-to-Have" badge={`${prd.funcionalidadesNiceToHave.length}`} defaultAberto={false}>
          <Lista items={prd.funcionalidadesNiceToHave} />
        </Section>

        {/* Stack — 2 opções */}
        <Section title="Opções de Stack">
          <div className="space-y-4">
            <p className="text-xs text-zinc-500 mb-3">
              Escolha a opção que melhor se encaixa no momento do projeto:
            </p>
            {prd.opcoesStack?.map((opcao, i) => (
              <button
                key={i}
                onClick={() => setStackSelecionada(i)}
                className={`w-full text-left p-4 rounded-lg border transition-all ${
                  stackSelecionada === i
                    ? "bg-emerald-500/10 border-emerald-500/50"
                    : "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-sm font-semibold ${stackSelecionada === i ? "text-emerald-300" : "text-zinc-200"}`}>
                    {opcao.nome}
                  </span>
                  <span className="text-xs text-zinc-500 border border-zinc-700 rounded px-2 py-0.5">
                    {opcao.custoEstimado}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 mb-3">{opcao.descricao}</p>
                <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-xs">
                  {[
                    ["Frontend", opcao.frontend],
                    ["Backend", opcao.backend],
                    ["Banco", opcao.banco],
                    ["Auth", opcao.autenticacao],
                    ["Hosting", opcao.hosting],
                  ].map(([k, v]) => (
                    <div key={k} className="flex gap-1">
                      <span className="text-zinc-600">{k}:</span>
                      <span className="text-zinc-300">{v}</span>
                    </div>
                  ))}
                </div>
                {opcao.futuramenteAdicionar?.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-zinc-800">
                    <p className="text-xs text-zinc-600 mb-1">Pode deixar para depois:</p>
                    <div className="space-y-0.5">
                      {opcao.futuramenteAdicionar.map((f, j) => (
                        <p key={j} className="text-xs text-zinc-500">— {f}</p>
                      ))}
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </Section>

        <Section title="Skills Sugeridas para o Agente" badge={`${prd.skillsAgente?.length}`}>
          <p className="text-xs text-zinc-500 mb-3">
            Instale estas skills no Claude Code para acelerar o desenvolvimento:
          </p>
          <div className="space-y-2">
            {prd.skillsAgente?.map((s, i) => {
              const [nome, ...resto] = s.split(" — ");
              return (
                <div key={i} className="flex items-start gap-3">
                  <code className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded shrink-0">
                    /{nome.trim()}
                  </code>
                  <span className="text-xs text-zinc-400 pt-1">{resto.join(" — ")}</span>
                </div>
              );
            })}
          </div>
        </Section>

        <Section title="Fases de Desenvolvimento" badge={`${prd.fases.length} fases`}>
          <div className="space-y-3">
            {prd.fases.map((fase) => (
              <div key={fase.numero} className="border-l-2 border-zinc-700 pl-3">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-sm font-medium text-zinc-200">
                    Fase {fase.numero}: {fase.nome}
                  </p>
                  <span className="text-xs text-zinc-600">({fase.duracaoEstimada})</span>
                </div>
                <p className="text-xs text-zinc-500">{fase.descricao}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Regras de Segurança para o Agente" defaultAberto={false}>
          <Lista items={prd.regrasSegurancaAgente} />
        </Section>
      </div>

      <div className="pt-2 space-y-3">
        <button
          onClick={() => onAprovar(prd.opcoesStack[stackSelecionada])}
          className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-lg transition-all text-base glow-emerald"
        >
          Aprovar PRD e Gerar Arquivos
        </button>
        <button
          onClick={onVoltar}
          className="w-full py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 font-medium rounded-lg transition-all text-sm"
        >
          Recomeçar com novas informações
        </button>
      </div>
    </div>
  );
}
