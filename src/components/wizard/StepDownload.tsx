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
      {
        nome: "CLAUDE.md",
        conteudo: gerarCLAUDEmd(prd, stackEscolhida),
        descricao: "Instruções completas para o agente Claude Code",
      },
      {
        nome: "AGENTS.md",
        conteudo: gerarAGENTSmd(prd, stackEscolhida),
        descricao: "Instruções para outros agentes (Codex, Copilot, etc.)",
      },
      {
        nome: "plano.md",
        conteudo: gerarPlanomd(prd),
        descricao: "Plano de desenvolvimento em fases com tarefas",
      },
      {
        nome: "sos.md",
        conteudo: gerarSOSmd(prd, stackEscolhida),
        descricao: "Guia de sobrevivência no terminal",
      },
      {
        nome: ".env.example",
        conteudo: gerarEnvExample(prd),
        descricao: "Template das variáveis de ambiente",
      },
      {
        nome: ".gitignore",
        conteudo: gerarGitignore(),
        descricao: "Arquivos que o Git deve ignorar",
      },
      {
        nome: "README.md",
        conteudo: gerarREADME(prd, stackEscolhida),
        descricao: "Documentação principal do projeto",
      },
      {
        nome: ".claude/settings.json",
        conteudo: gerarClaudeSettings(),
        descricao: "Permissões seguras pré-configuradas para o agente",
      },
      {
        nome: "PRD.md",
        conteudo: gerarPRDMarkdown(prd),
        descricao: "Product Requirements Document completo",
      },
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
    <div className="space-y-6 step-animate">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-white">Pronto!</h2>
        <p className="text-zinc-400 text-sm max-w-sm mx-auto">
          Projeto <span className="text-emerald-400 font-medium">{prd.nomeProjeto}</span> configurado.
          Baixe o ZIP e coloque os arquivos na raiz do seu projeto.
        </p>
      </div>

      {/* Stack escolhida */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
        <p className="text-xs text-zinc-600 uppercase mb-2">Stack gerada</p>
        <p className="text-sm font-medium text-zinc-200 mb-2">{stackEscolhida.nome}</p>
        <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-xs">
          {[
            ["Frontend", stackEscolhida.frontend],
            ["Backend", stackEscolhida.backend],
            ["Banco", stackEscolhida.banco],
            ["Hosting", stackEscolhida.hosting],
          ].map(([k, v]) => (
            <div key={k}>
              <span className="text-zinc-600">{k}: </span>
              <span className="text-zinc-300">{v}</span>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={baixarZIP}
        className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-xl text-lg transition-all glow-emerald"
      >
        {baixado ? "Baixar novamente (.zip)" : "Baixar pacote completo (.zip)"}
      </button>

      {baixado && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4 space-y-2">
          <p className="text-emerald-400 font-semibold text-sm">Próximos passos:</p>
          <ol className="space-y-1.5 text-sm text-zinc-300">
            <li className="flex gap-2">
              <span className="text-emerald-500 font-bold shrink-0">1.</span>
              Extraia o ZIP na raiz da pasta do seu projeto
            </li>
            <li className="flex gap-2">
              <span className="text-emerald-500 font-bold shrink-0">2.</span>
              Copie <code className="text-emerald-400">.env.example</code> para{" "}
              <code className="text-emerald-400">.env.local</code> e preencha os valores reais
            </li>
            <li className="flex gap-2">
              <span className="text-emerald-500 font-bold shrink-0">3.</span>
              Abra a pasta no terminal
            </li>
            <li className="flex gap-2">
              <span className="text-emerald-500 font-bold shrink-0">4.</span>
              Diga ao Claude: <code className="text-emerald-400">iniciar projeto</code>
            </li>
          </ol>
        </div>
      )}

      <div>
        <p className="text-xs text-zinc-600 uppercase mb-3">Arquivos incluídos ({arquivos.length})</p>
        <div className="space-y-2">
          {arquivos.map((arquivo) => (
            <div
              key={arquivo.nome}
              className="flex items-center justify-between bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3"
            >
              <div>
                <p className="text-sm font-mono text-zinc-200">{arquivo.nome}</p>
                <p className="text-xs text-zinc-600">{arquivo.descricao}</p>
              </div>
              <button
                onClick={() => baixarArquivo(arquivo)}
                className="text-xs text-zinc-600 hover:text-emerald-400 transition-colors px-2 py-1 ml-3 shrink-0"
              >
                baixar
              </button>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={onNovoProjeto}
        className="w-full py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 font-medium rounded-lg transition-all text-sm"
      >
        Criar outro projeto
      </button>
    </div>
  );
}
