"use client";

import { useEffect, useState } from "react";
import { PRDData, StackOpcao } from "@/lib/types";
import {
  gerarCLAUDEmd,
  gerarAGENTSmd,
  gerarPlanomd,
  gerarSOSmd,
  gerarEnvExample,
  gerarGitignore,
  gerarREADME,
  gerarClaudeSettings,
  gerarPRDMarkdown,
} from "@/lib/templates";

interface Props {
  prd: PRDData;
  stackEscolhida: StackOpcao;
  onNovoProjeto: () => void;
}

interface ArquivoGerado {
  nome: string;
  conteudo: string;
  descricao: string;
}

export function StepDownload({ prd, stackEscolhida, onNovoProjeto }: Props) {
  const [arquivos, setArquivos] = useState<ArquivoGerado[]>([]);
  const [baixado, setBaixado] = useState(false);

  useEffect(() => {
    const lista: ArquivoGerado[] = [
      { nome: "CLAUDE.md", conteudo: gerarCLAUDEmd(prd, stackEscolhida), descricao: "Instruções completas para o agente Claude Code" },
      { nome: "AGENTS.md", conteudo: gerarAGENTSmd(prd, stackEscolhida), descricao: "Instruções para outros agentes (Codex, Copilot, etc.)" },
      { nome: "plano.md", conteudo: gerarPlanomd(prd), descricao: "Plano de desenvolvimento em fases com tarefas" },
      { nome: "sos.md", conteudo: gerarSOSmd(), descricao: "Guia de sobrevivência no terminal" },
      { nome: ".env.example", conteudo: gerarEnvExample(prd), descricao: "Template das variáveis de ambiente" },
      { nome: ".gitignore", conteudo: gerarGitignore(), descricao: "Arquivos que o Git deve ignorar" },
      { nome: "README.md", conteudo: gerarREADME(prd, stackEscolhida), descricao: "Documentação principal do projeto" },
      { nome: ".claude/settings.json", conteudo: gerarClaudeSettings(), descricao: "Permissões seguras pré-configuradas para o agente" },
      { nome: "PRD.md", conteudo: gerarPRDMarkdown(prd), descricao: "Product Requirements Document completo" },
    ];
    setArquivos(lista);
  }, [prd, stackEscolhida]);

  const baixarZIP = async () => {
    const JSZip = (await import("jszip")).default;
    const zip = new JSZip();

    for (const arquivo of arquivos) {
      if (arquivo.nome.includes("/")) {
        const partes = arquivo.nome.split("/");
        const pasta = zip.folder(partes[0]);
        pasta?.file(partes[1], arquivo.conteudo);
      } else {
        zip.file(arquivo.nome, arquivo.conteudo);
      }
    }

    const blob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${prd.nomeProjeto.toLowerCase().replace(/\s+/g, "-")}-starter.zip`;
    a.click();
    URL.revokeObjectURL(url);
    setBaixado(true);
  };

  const baixarArquivo = (arquivo: ArquivoGerado) => {
    const blob = new Blob([arquivo.conteudo], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = arquivo.nome.split("/").pop() || arquivo.nome;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="step-animate"
      style={{
        /* espaço vertical entre os blocos da tela de download */
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      {/* Cabeçalho centralizado */}
      <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: "8px" }}>
        <h2
          style={{
            /* tamanho do título "Pronto!" */
            fontSize: "24px",
            fontWeight: 900,
            /* cor do título */
            color: "#1b1b25",
            margin: 0,
            letterSpacing: "-0.5px",
          }}
        >
          Pronto!
        </h2>
        <p
          style={{
            /* cor do subtítulo */
            color: "#3f3744",
            /* tamanho da fonte do subtítulo */
            fontSize: "13px",
            margin: 0,
            /* largura máxima do subtítulo */
            maxWidth: "360px",
            /* centraliza o subtítulo */
            marginLeft: "auto",
            marginRight: "auto",
            lineHeight: 1.5,
          }}
        >
          Projeto{" "}
          <span style={{ color: "#6f7b18", fontWeight: 700 }}>{prd.nomeProjeto}</span>{" "}
          configurado. Baixe o ZIP e coloque os arquivos na raiz do seu projeto.
        </p>
      </div>

      {/* Card da stack escolhida */}
      <div
        style={{
          /* fundo cinza claro do card */
          background: "#f0f1ea",
          /* borda ao redor do card */
          border: "1px solid #1b1b2524",
          borderRadius: "8px",
          /* espaço interno do card */
          padding: "16px",
        }}
      >
        {/* label "Stack gerada" */}
        <p
          style={{
            fontSize: "10px",
            color: "#3f3744",
            fontWeight: 900,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            /* margem abaixo do label */
            margin: "0 0 8px",
            opacity: 0.6,
          }}
        >
          Stack gerada
        </p>
        <p
          style={{
            /* nome da stack em destaque */
            fontSize: "13px",
            fontWeight: 700,
            color: "#1b1b25",
            /* margem abaixo do nome */
            margin: "0 0 8px",
          }}
        >
          {stackEscolhida.nome}
        </p>
        {/* grade de detalhes da stack */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px 20px" }}>
          {[
            ["Frontend", stackEscolhida.frontend],
            ["Backend", stackEscolhida.backend],
            ["Banco", stackEscolhida.banco],
            ["Hosting", stackEscolhida.hosting],
          ].map(([k, v]) => (
            <div key={k} style={{ fontSize: "12px" }}>
              <span style={{ color: "#3f3744", opacity: 0.6 }}>{k}: </span>
              <span style={{ color: "#1b1b25", fontWeight: 600 }}>{v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Botão principal de download */}
      <button
        onClick={baixarZIP}
        className="btn primary full"
        style={{
          /* altura maior para o botão principal */
          minHeight: "56px",
          /* tamanho da fonte do botão */
          fontSize: "16px",
          fontWeight: 900,
          borderRadius: "10px",
        }}
      >
        {baixado ? "Baixar novamente (.zip)" : "Baixar pacote completo (.zip)"}
      </button>

      {/* Próximos passos — aparece após o primeiro download */}
      {baixado && (
        <div
          style={{
            /* fundo verde translúcido do bloco de próximos passos */
            background: "#b7c93918",
            /* borda verde translúcida */
            border: "1px solid #b7c93933",
            borderRadius: "8px",
            /* espaço interno do bloco */
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <p
            style={{
              /* título dos próximos passos */
              color: "#6f7b18",
              fontWeight: 700,
              fontSize: "13px",
              margin: 0,
            }}
          >
            Próximos passos:
          </p>
          <ol
            style={{
              margin: 0,
              padding: 0,
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
              gap: "6px",
            }}
          >
            {[
              <>Extraia o ZIP na raiz da pasta do seu projeto</>,
              <>Copie <code style={{ color: "#6f7b18", fontSize: "11px", background: "#b7c93918", padding: "1px 5px", borderRadius: "3px" }}>.env.example</code> para <code style={{ color: "#6f7b18", fontSize: "11px", background: "#b7c93918", padding: "1px 5px", borderRadius: "3px" }}>.env.local</code> e preencha os valores reais</>,
              <>Abra a pasta no terminal</>,
              <>Diga ao Claude: <code style={{ color: "#6f7b18", fontSize: "11px", background: "#b7c93918", padding: "1px 5px", borderRadius: "3px" }}>iniciar projeto</code></>,
            ].map((texto, i) => (
              <li
                key={i}
                style={{
                  display: "flex",
                  gap: "8px",
                  /* tamanho da fonte dos passos */
                  fontSize: "13px",
                  /* cor do texto dos passos */
                  color: "#1b1b25",
                }}
              >
                {/* número do passo em verde */}
                <span style={{ color: "#6f7b18", fontWeight: 900, flexShrink: 0 }}>{i + 1}.</span>
                {texto}
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Lista de arquivos incluídos */}
      <div>
        <p
          style={{
            /* label da lista de arquivos */
            fontSize: "10px",
            color: "#3f3744",
            fontWeight: 900,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            /* margem abaixo do label */
            margin: "0 0 10px",
            opacity: 0.6,
          }}
        >
          Arquivos incluídos ({arquivos.length})
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {arquivos.map((arquivo) => (
            <div
              key={arquivo.nome}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                /* fundo cinza claro de cada linha */
                background: "#f0f1ea",
                /* borda ao redor de cada linha */
                border: "1px solid #1b1b2524",
                borderRadius: "8px",
                /* espaço interno da linha */
                padding: "10px 14px",
              }}
            >
              <div>
                <p
                  style={{
                    /* nome do arquivo em fonte mono */
                    fontSize: "12px",
                    fontFamily: '"JetBrains Mono", Consolas, monospace',
                    /* cor do nome do arquivo — escuro */
                    color: "#1b1b25",
                    fontWeight: 600,
                    margin: "0 0 2px",
                  }}
                >
                  {arquivo.nome}
                </p>
                <p style={{ fontSize: "11px", color: "#3f3744", opacity: 0.6, margin: 0 }}>{arquivo.descricao}</p>
              </div>
              <button
                onClick={() => baixarArquivo(arquivo)}
                style={{
                  background: "none",
                  border: "none",
                  /* tamanho da fonte do botão baixar individual */
                  fontSize: "11px",
                  /* cor do botão baixar — cinza que vira verde no hover */
                  color: "#3f3744",
                  cursor: "pointer",
                  /* espaço interno do botão baixar */
                  padding: "4px 8px",
                  /* margem à esquerda separando do texto */
                  marginLeft: "12px",
                  flexShrink: 0,
                  opacity: 0.6,
                  transition: "opacity 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.6")}
              >
                baixar
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Botão criar outro projeto */}
      <button
        onClick={onNovoProjeto}
        className="btn full"
        style={{
          minHeight: "40px",
          /* tamanho da fonte do botão secundário */
          fontSize: "13px",
          /* cor do texto */
          color: "#3f3744",
        }}
      >
        Criar outro projeto
      </button>
    </div>
  );
}
