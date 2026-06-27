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
    <div
      style={{
        /* borda ao redor de cada seção colapsável */
        border: "1px solid #1b1b2524",
        /* cantos arredondados da seção */
        borderRadius: "8px",
        /* esconde conteúdo que ultrapasse o raio */
        overflow: "hidden",
      }}
    >
      <button
        onClick={() => setAberto(!aberto)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          /* espaço interno do cabeçalho da seção */
          padding: "12px 16px",
          /* fundo cinza claro do cabeçalho */
          background: "#f0f1ea",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          transition: "background 0.15s",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span
            style={{
              /* tamanho do título da seção */
              fontSize: "13px",
              fontWeight: 700,
              /* cor do título da seção */
              color: "#1b1b25",
            }}
          >
            {title}
          </span>
          {badge && (
            <span
              style={{
                /* tamanho da fonte do badge */
                fontSize: "11px",
                /* cor do badge — verde escuro */
                color: "#6f7b18",
                /* fundo verde translúcido do badge */
                background: "#b7c93918",
                /* espaço interno do badge */
                padding: "2px 6px",
                borderRadius: "999px",
                fontWeight: 700,
              }}
            >
              {badge}
            </span>
          )}
        </div>
        {/* seta indicando estado aberto/fechado */}
        <span style={{ fontSize: "10px", color: "#3f3744", opacity: 0.5 }}>
          {aberto ? "▲" : "▼"}
        </span>
      </button>
      {aberto && (
        <div
          style={{
            /* espaço interno do conteúdo da seção */
            padding: "16px",
            /* fundo levemente mais claro que o card */
            background: "#ffffff",
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}

function Lista({ items }: { items: string[] }) {
  return (
    <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "6px" }}>
      {items.map((item, i) => (
        <li
          key={i}
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "8px",
            /* tamanho do texto do item */
            fontSize: "13px",
            /* cor do texto do item */
            color: "#1b1b25",
          }}
        >
          {/* marcador verde-limão do item */}
          <span
            style={{
              color: "#b7c939",
              marginTop: "3px",
              flexShrink: 0,
              fontSize: "10px",
            }}
          >
            ▸
          </span>
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

  /* tela de edição do JSON */
  if (modoEdicao) {
    return (
      <div
        className="step-animate"
        style={{ display: "flex", flexDirection: "column", gap: "16px" }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h2 style={{ fontSize: "20px", fontWeight: 900, color: "#1b1b25", margin: 0, letterSpacing: "-0.5px" }}>
            Editar PRD
          </h2>
          <button
            onClick={() => setModoEdicao(false)}
            style={{
              background: "none",
              border: "none",
              /* tamanho da fonte do botão cancelar */
              fontSize: "13px",
              /* cor do botão cancelar */
              color: "#3f3744",
              cursor: "pointer",
            }}
          >
            Cancelar
          </button>
        </div>
        <p style={{ fontSize: "12px", color: "#3f3744", opacity: 0.6, margin: 0 }}>
          Edite o JSON do PRD. Mantenha a estrutura intacta.
        </p>
        <textarea
          value={editandoJSON}
          onChange={(e) => setEditandoJSON(e.target.value)}
          style={{
            width: "100%",
            /* altura do campo de edição JSON */
            height: "384px",
            /* fundo cinza claro do editor */
            background: "#f0f1ea",
            /* borda ao redor do editor */
            border: "1px solid #1b1b2524",
            borderRadius: "8px",
            /* espaço interno do editor */
            padding: "14px",
            /* tamanho da fonte do editor */
            fontSize: "11px",
            /* fonte monoespaçada do editor */
            fontFamily: '"JetBrains Mono", Consolas, monospace',
            /* cor do texto do editor */
            color: "#1b1b25",
            outline: "none",
            resize: "none",
            lineHeight: 1.6,
          }}
        />
        {erroJSON && (
          <p style={{ color: "#b44b7a", fontSize: "13px", margin: 0 }}>{erroJSON}</p>
        )}
        <button
          onClick={salvarEdicao}
          className="btn primary full"
          style={{ minHeight: "44px", fontSize: "13px" }}
        >
          Salvar edições
        </button>
      </div>
    );
  }

  return (
    <div
      className="step-animate"
      style={{ display: "flex", flexDirection: "column", gap: "20px" }}
    >
      {/* Cabeçalho com nome do projeto e botão editar */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px" }}>
        <div>
          <h2
            style={{
              /* tamanho do nome do projeto */
              fontSize: "24px",
              fontWeight: 900,
              color: "#1b1b25",
              margin: "0 0 4px",
              letterSpacing: "-0.5px",
            }}
          >
            {prd.nomeProjeto}
          </h2>
          <p style={{ color: "#3f3744", fontSize: "13px", margin: 0 }}>{prd.tagline}</p>
        </div>
        <button
          onClick={() => setModoEdicao(true)}
          style={{
            /* tamanho da fonte do botão editar */
            fontSize: "11px",
            color: "#3f3744",
            /* borda fina do botão editar */
            border: "1px solid #1b1b2524",
            borderRadius: "6px",
            /* espaço interno do botão editar */
            padding: "4px 10px",
            background: "none",
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          Editar
        </button>
      </div>

      {/* Seções colapsáveis do PRD */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Section title="Visão Geral">
          <p style={{ fontSize: "13px", color: "#1b1b25", lineHeight: 1.6, margin: 0 }}>{prd.visaoGeral}</p>
        </Section>

        <Section title="Problema e Solução">
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div>
              {/* label "Problema" */}
              <p style={{ fontSize: "10px", color: "#3f3744", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 4px", opacity: 0.6 }}>Problema</p>
              <p style={{ fontSize: "13px", color: "#1b1b25", margin: 0 }}>{prd.problema}</p>
            </div>
            <div>
              {/* label "Solução" */}
              <p style={{ fontSize: "10px", color: "#3f3744", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 4px", opacity: 0.6 }}>Solução</p>
              <p style={{ fontSize: "13px", color: "#1b1b25", margin: 0 }}>{prd.solucao}</p>
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

        {/* Seleção de stack */}
        <Section title="Opções de Stack">
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <p style={{ fontSize: "12px", color: "#3f3744", opacity: 0.7, margin: "0 0 4px" }}>
              Escolha a opção que melhor se encaixa no momento do projeto:
            </p>
            {prd.opcoesStack?.map((opcao, i) => {
              const sel = stackSelecionada === i;
              return (
                <button
                  key={i}
                  onClick={() => setStackSelecionada(i)}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    /* espaço interno do card de stack */
                    padding: "16px",
                    borderRadius: "8px",
                    /* borda: verde se selecionada, cinza se não */
                    border: sel ? "1px solid #b7c939" : "1px solid #1b1b2524",
                    /* fundo: verde translúcido se selecionada */
                    background: sel ? "#b7c93918" : "#f7f7f4",
                    transition: "all 0.15s",
                    cursor: "pointer",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: 700,
                        /* cor: verde escuro se selecionada */
                        color: sel ? "#6f7b18" : "#1b1b25",
                      }}
                    >
                      {opcao.nome}
                    </span>
                    <span
                      style={{
                        fontSize: "11px",
                        color: "#3f3744",
                        /* borda ao redor do custo estimado */
                        border: "1px solid #1b1b2524",
                        borderRadius: "4px",
                        padding: "2px 6px",
                      }}
                    >
                      {opcao.custoEstimado}
                    </span>
                  </div>
                  <p style={{ fontSize: "12px", color: "#3f3744", margin: "0 0 12px", lineHeight: 1.5 }}>{opcao.descricao}</p>
                  {/* grade de detalhes da stack */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px 20px" }}>
                    {[
                      ["Frontend", opcao.frontend],
                      ["Backend", opcao.backend],
                      ["Banco", opcao.banco],
                      ["Auth", opcao.autenticacao],
                      ["Hosting", opcao.hosting],
                    ].map(([k, v]) => (
                      <div key={k} style={{ display: "flex", gap: "4px", fontSize: "12px" }}>
                        <span style={{ color: "#3f3744", opacity: 0.6 }}>{k}:</span>
                        <span style={{ color: "#1b1b25", fontWeight: 600 }}>{v}</span>
                      </div>
                    ))}
                  </div>
                  {opcao.futuramenteAdicionar?.length > 0 && (
                    <div
                      style={{
                        /* separador e bloco de "pode deixar para depois" */
                        marginTop: "12px",
                        paddingTop: "12px",
                        borderTop: "1px solid #1b1b2514",
                      }}
                    >
                      <p style={{ fontSize: "11px", color: "#3f3744", opacity: 0.6, margin: "0 0 4px" }}>Pode deixar para depois:</p>
                      <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                        {opcao.futuramenteAdicionar.map((f, j) => (
                          <p key={j} style={{ fontSize: "12px", color: "#3f3744", margin: 0 }}>— {f}</p>
                        ))}
                      </div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </Section>

        <Section title="Skills Sugeridas para o Agente" badge={`${prd.skillsAgente?.length}`}>
          <p style={{ fontSize: "12px", color: "#3f3744", opacity: 0.7, margin: "0 0 12px" }}>
            Instale estas skills no Claude Code para acelerar o desenvolvimento:
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {prd.skillsAgente?.map((s, i) => {
              const [nome, ...resto] = s.split(" — ");
              return (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                  <code
                    style={{
                      /* tamanho da fonte do nome da skill */
                      fontSize: "11px",
                      /* cor do texto da skill — verde escuro */
                      color: "#6f7b18",
                      /* fundo verde translúcido da skill */
                      background: "#b7c93918",
                      /* espaço interno do badge da skill */
                      padding: "3px 8px",
                      borderRadius: "4px",
                      flexShrink: 0,
                      fontFamily: '"JetBrains Mono", Consolas, monospace',
                    }}
                  >
                    /{nome.trim()}
                  </code>
                  <span style={{ fontSize: "12px", color: "#3f3744", paddingTop: "3px", lineHeight: 1.4 }}>
                    {resto.join(" — ")}
                  </span>
                </div>
              );
            })}
          </div>
        </Section>

        <Section title="Fases de Desenvolvimento" badge={`${prd.fases.length} fases`}>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {prd.fases.map((fase) => (
              <div
                key={fase.numero}
                style={{
                  /* linha vertical verde à esquerda de cada fase */
                  borderLeft: "2px solid #b7c93960",
                  /* espaço interno à esquerda da fase */
                  paddingLeft: "12px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "2px" }}>
                  <p style={{ fontSize: "13px", fontWeight: 700, color: "#1b1b25", margin: 0 }}>
                    Fase {fase.numero}: {fase.nome}
                  </p>
                  <span style={{ fontSize: "11px", color: "#3f3744", opacity: 0.5 }}>({fase.duracaoEstimada})</span>
                </div>
                <p style={{ fontSize: "12px", color: "#3f3744", margin: 0, lineHeight: 1.5 }}>{fase.descricao}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Regras de Segurança para o Agente" defaultAberto={false}>
          <Lista items={prd.regrasSegurancaAgente} />
        </Section>
      </div>

      {/* Botões de ação */}
      <div style={{ paddingTop: "8px", display: "flex", flexDirection: "column", gap: "10px" }}>
        <button
          onClick={() => onAprovar(prd.opcoesStack[stackSelecionada])}
          className="btn primary full"
          style={{
            /* altura maior para o botão principal */
            minHeight: "52px",
            /* tamanho da fonte do botão principal */
            fontSize: "15px",
            fontWeight: 900,
          }}
        >
          Aprovar PRD e Gerar Arquivos
        </button>
        <button
          onClick={onVoltar}
          className="btn full"
          style={{
            minHeight: "40px",
            fontSize: "13px",
            /* cor do texto do botão secundário */
            color: "#3f3744",
          }}
        >
          Recomeçar com novas informações
        </button>
      </div>
    </div>
  );
}
