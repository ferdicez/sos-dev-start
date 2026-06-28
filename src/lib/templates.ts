import { PRDData, StackOpcao } from "./types";

function stackResumo(stack: StackOpcao): string {
  return `- Frontend: ${stack.frontend}
- Backend: ${stack.backend}
- Banco de Dados: ${stack.banco}
- Autenticação: ${stack.autenticacao}
- Hosting: ${stack.hosting}
- Outras Ferramentas: ${stack.outrasFerramentas.join(", ")}`;
}

export function gerarCLAUDEmd(prd: PRDData, stackEscolhida?: StackOpcao): string {
  const stack = stackEscolhida ?? prd.opcoesStack[0];

  return `# ${prd.nomeProjeto}
${prd.tagline}

## Visão Geral
${prd.visaoGeral}

## Stack do Projeto
${stackResumo(stack)}

## Como Iniciar o Projeto
Quando o usuário disser "iniciar projeto", execute esta sequência:
\`\`\`
${prd.comandosIniciais.join("\n")}
\`\`\`

## Regras Obrigatórias para o Agente

### Segurança — NUNCA viole estas regras
${prd.regrasSegurancaAgente.map((r) => `- ${r}`).join("\n")}
- NUNCA instale pacotes sem confirmar com o usuário primeiro
- NUNCA faça push ou deploy sem aprovação explícita do usuário
- NUNCA exponha dados sensíveis em logs ou mensagens de commit
- SEMPRE use variáveis de ambiente para chaves e segredos
- SEMPRE atualize o .env.example ao adicionar novas variáveis de ambiente

### Git e Branches
- SEMPRE crie uma branch para cada nova feature: \`git checkout -b feature/nome-da-feature\`
- NUNCA faça commit ou push direto para main/master
- Mensagens de commit em português e descritivas: \`feat: descrição clara do que foi feito\`
- Delete branches após o merge
- Abra PR para revisão antes de mergear qualquer coisa

### Ordem de Desenvolvimento
- Siga SEMPRE a ordem do arquivo \`plano.md\`
- Conclua uma fase antes de iniciar a próxima
- Design, animações e polish visual ficam na penúltima fase — antes disso, foque em funcionar
- Marque tarefas concluídas no plano.md substituindo \`- [ ]\` por \`- [x]\`

### Boas Práticas
- Pergunte antes de tomar decisões de arquitetura não planejadas
- Avise quando encontrar algo que pode impactar outra parte do projeto
- Teste localmente antes de marcar como concluído
- Consulte o sos.md se tiver dúvidas sobre comandos

## Estrutura de Pastas
\`\`\`
${prd.estruturaPastas}
\`\`\`

## Skills Sugeridas para este Projeto
${prd.skillsAgente.map((s) => `- ${s}`).join("\n")}

## Variáveis de Ambiente
Todas estão documentadas no \`.env.example\`. Crie seu \`.env.local\` a partir dele.
${prd.variaveisAmbiente.map((v) => `- ${v}`).join("\n")}
`;
}

export function gerarAGENTSmd(prd: PRDData, stackEscolhida?: StackOpcao): string {
  const stack = stackEscolhida ?? prd.opcoesStack[0];

  return `# ${prd.nomeProjeto}
${prd.tagline}

## Project Overview
${prd.visaoGeral}

## Tech Stack
${stackResumo(stack)}

## Getting Started
When the user says "start project" or "iniciar projeto", run these commands in order:
\`\`\`
${prd.comandosIniciais.join("\n")}
\`\`\`

## Agent Rules

### Security — Never break these rules
${prd.regrasSegurancaAgente.map((r) => `- ${r}`).join("\n")}
- NEVER install packages without confirming with the user first
- NEVER push or deploy without explicit user approval
- NEVER expose secrets or API keys in code, logs, or commits
- ALWAYS use environment variables for secrets and API keys
- ALWAYS update .env.example when adding new environment variables

### Git Workflow
- ALWAYS create a branch before starting any new feature: \`git checkout -b feature/feature-name\`
- NEVER commit or push directly to main/master
- Write descriptive commit messages: \`feat: clear description of what was done\`
- Delete branches after merge
- Open a PR for review before merging

### Development Order
- Follow the \`plano.md\` file for the order of development
- Complete each phase before starting the next
- Design polish, animations, and visual refinements go in the second-to-last phase
- Mark completed tasks in plano.md by replacing \`- [ ]\` with \`- [x]\`

### Best Practices
- Ask before making architectural decisions not covered in the plan
- Warn the user when you find something that might impact other parts of the project
- Test locally before marking anything as done
- Reference sos.md for terminal commands

## Folder Structure
\`\`\`
${prd.estruturaPastas}
\`\`\`

## Environment Variables
All variables are documented in \`.env.example\`. Create your \`.env.local\` from it.
${prd.variaveisAmbiente.map((v) => `- ${v}`).join("\n")}
`;
}

export function gerarPlanomd(prd: PRDData): string {
  const fasesTexto = prd.fases
    .map(
      (fase) => `## Fase ${fase.numero}: ${fase.nome}
Estimativa: ${fase.duracaoEstimada}

${fase.descricao}

### Tarefas:
${fase.tarefas.map((t) => `- [ ] ${t}`).join("\n")}
`
    )
    .join("\n---\n\n");

  return `# Plano de Desenvolvimento — ${prd.nomeProjeto}

> Siga esta ordem. Design e polish visual ficam para o final — construa primeiro o que funciona.

## Funcionalidades MVP
${prd.funcionalidadesMVP.map((f) => `- [ ] ${f}`).join("\n")}

## Nice-to-Have (após MVP)
${prd.funcionalidadesNiceToHave.map((f) => `- [ ] ${f}`).join("\n")}

---

${fasesTexto}

---

## Observacao importante
Design, animacoes, responsividade fina e polish visual sao sempre a penultima fase.
Construa primeiro o que funciona. Depois o que fica bonito.
`;
}

export function gerarSOSmd(): string {
  return `# SOS — Guia rápido

## Para começar
1. Abra a pasta do projeto no terminal.
2. Configure \`.env.local\` usando \`.env.example\` como modelo.
3. Diga ao agente: **iniciar projeto**.

---

## Glossário de comandos do terminal

\`npm install\` — Instala todas as dependências listadas no package.json
  - Use sempre que clonar o projeto ou alguém adicionar um pacote

\`npm run dev\` — Inicia o servidor local de desenvolvimento 
  - Use para ver o projeto rodando enquanto desenvolve

\`npm run build\` — Gera a versão final otimizada para publicar
  - Use antes de fazer deploy

\`npm install <pacote>\` — Instala um pacote específico
  - Use quando o agente indicar que precisa de uma nova dependência

\`npm uninstall <pacote>\` — Remove um pacote do projeto
  - Use quando um pacote não for mais necessário

\`ls\` (Mac/Linux) \`dir\` (Windows) — Lista os arquivos e pastas do diretório atual
  - Use para saber o que tem na pasta onde você está

\`cd <pasta>\` — Entra em uma pasta
  - Use para navegar entre diretórios

\`cd ..\` — Volta para a pasta anterior
  - Use para subir um nível no diretório

\`pwd\` — Mostra o caminho completo da pasta atual
  - Use quando não souber onde está no sistema

\`clear\` — Limpa a tela do terminal 
  - Use quando o terminal estiver cheio de texto

---

## Glossário de versionamento (Git)

\`git init\` — Inicia um repositório Git na pasta
  - Use uma vez, no começo do projeto

\`git status\` — Mostra o que foi alterado e o que está pendente
  - Use sempre que quiser saber o estado atual

\`git add .\` — Prepara todas as alterações para o commit
  - Use antes de commitar

\`git commit -m "mensagem"\` — Salva um ponto de controle com uma descrição
  - Use ao terminar uma tarefa ou fase

\`git log\` — Mostra o histórico de commits
  - Use para ver o que já foi salvo

\`git branch\` — Lista as branches existentes
  - Use para ver em qual versão você está trabalhando

\`git checkout -b <nome>\` — Cria e entra em uma branch nova
  - Use ao iniciar uma funcionalidade nova

\`git checkout <branch>\` — Troca de branch
  - Use para mudar de versão ou funcionalidade

\`git merge <branch>\` — Une uma branch com a atual
  - Use quando terminar uma funcionalidade e quiser juntar com a main

\`git push\` — Envia os commits para o repositório remoto (GitHub)
  - Use depois de commitar, para salvar online

\`git pull\` — Baixa as atualizações do repositório remoto
  - Use antes de começar a trabalhar ou quando alguém subiu alterações

**Branch** — Uma versão paralela do projeto
  - Permite desenvolver funcionalidades sem afetar o código principal

**Commit** — Um ponto salvo no histórico do projeto
  - Funciona como um checkpoint — dá para voltar a ele se algo der errado

**Pull Request (PR)** — Pedido para unir sua branch com a principal
  - Use quando terminar uma funcionalidade e quiser integrar ao projeto

**Main / Master** — A branch principal do projeto
  - É a versão oficial e estável do código

**Merge** — Unir duas branches
  - Use para combinar o trabalho de uma branch com outra

**Clone** — Baixar um repositório do GitHub para o computador
  - Use para clonar um projeto existente remotamente

---

## Boas práticas — o que fazer ao final de cada fase

Ao terminar uma fase do plano, siga este fluxo antes de continuar:

### 1. Rode o projeto e teste
- Abra o terminal e rode: \`npm run dev\`
- Abra no navegador e teste o que foi feito nessa fase. Verifique se o fluxo principal funciona sem erros visíveis.

### 2. Peça ao agente para revisar
- Diga: "revise o que foi feito nessa fase e aponte qualquer problema."
- O agente vai checar o código, a lógica e se os critérios do PRD foram atendidos.

### 3. Atualize o PLANO.md
- O agente vai marcar as tarefas concluídas com \`[x]\`.
- Confirme se está correto antes de continuar.

### 4. Faça o commit
- Abra o terminal e rode:
- \`git add .\`
- \`git commit -m "fase 1: fundação concluída"\`
- Use mensagens curtas e descritivas. O commit é o seu ponto de segurança — se algo der errado depois, você pode voltar até aqui.

### 5. Suba para o repositório remoto
- Abra o terminal e rode: \`git push\`
- Isso salva tudo online (GitHub, etc.). Faça isso ao final de cada fase.

### 6. (Se estiver em uma branch separada) Abra um Pull Request
- Acesse o GitHub, vá até o repositório e clique em **"Compare & pull request"**. Dê um título descritivo e clique em **"Create pull request"**. Isso une sua branch com a principal de forma organizada e rastreável.

### 7. Compacte e limpe a conversa
- Antes de iniciar a próxima fase, diga ao agente: "resuma o que foi feito, atualize o PLANO.md se necessário e compacte a conversa."
- Isso evita que o agente fique confuso com muito histórico acumulado e mantém as respostas mais precisas e rápidas.

---

## Quando der erro
Copie o erro completo e diga ao agente: "está dando este erro: [cole aqui]"
`;
}

export function gerarEnvExample(prd: PRDData): string {
  if (!prd.variaveisAmbiente || prd.variaveisAmbiente.length === 0) {
    return `# Variaveis de Ambiente — ${prd.nomeProjeto}
# Copie este arquivo para .env.local e preencha os valores
# NUNCA commite o .env.local!

# URL da aplicacao em desenvolvimento
NEXT_PUBLIC_APP_URL=http://localhost:3000
`;
  }

  const vars = prd.variaveisAmbiente.map((v) => {
    const [key, ...rest] = v.split("=");
    const desc = rest.join("=");
    return `# ${desc}\n${key}=`;
  });

  return `# Variaveis de Ambiente — ${prd.nomeProjeto}
# Copie este arquivo para .env.local e preencha os valores reais
# NUNCA commite o .env.local!

${vars.join("\n\n")}
`;
}

export function gerarGitignore(): string {
  return `# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# environment variables — NUNCA commite estes arquivos
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

# OS
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
`;
}

export function gerarREADME(prd: PRDData, stackEscolhida?: StackOpcao): string {
  const stack = stackEscolhida ?? prd.opcoesStack[0];
  const slug = prd.nomeProjeto.toLowerCase().replace(/\s+/g, "-");

  return `# ${prd.nomeProjeto}
${prd.tagline}

## Sobre
${prd.visaoGeral}

## Stack
- Frontend: ${stack.frontend}
- Backend: ${stack.backend}
- Banco: ${stack.banco}
- Hosting: ${stack.hosting}

## Como rodar localmente

\`\`\`bash
# 1. Clone o repositorio
git clone [url-do-repo]
cd ${slug}

# 2. Configure as variaveis de ambiente
cp .env.example .env.local
# Edite o .env.local com seus valores

# 3. Instale as dependencias
npm install

# 4. Rode em desenvolvimento
npm run dev
\`\`\`

Abra http://localhost:3000 no navegador.

## Desenvolvimento
Veja o plano.md para a ordem de desenvolvimento e o sos.md para duvidas sobre comandos.
`;
}

export function gerarClaudeSettings(): string {
  return JSON.stringify(
    {
      permissions: {
        allow: [
          "Bash(npm run dev)",
          "Bash(npm run build)",
          "Bash(npm run lint)",
          "Bash(npm install *)",
          "Bash(npm run *)",
          "Bash(git status)",
          "Bash(git diff *)",
          "Bash(git add *)",
          "Bash(git commit *)",
          "Bash(git checkout *)",
          "Bash(git branch *)",
          "Bash(git log *)",
          "Bash(git push)",
          "Bash(git pull)",
          "Bash(git merge *)",
          "Bash(git stash *)",
        ],
        deny: [
          "Bash(rm -rf *)",
          "Bash(git push --force *)",
          "Bash(git reset --hard *)",
          "Bash(curl * | bash)",
          "Bash(wget * | bash)",
          "Bash(npx * --yes)",
        ],
      },
    },
    null,
    2
  );
}

export function gerarPRDMarkdown(prd: PRDData): string {
  const opcoes = prd.opcoesStack
    .map(
      (op) => `### ${op.nome}
${op.descricao}

${stackResumo(op)}

Custo estimado: ${op.custoEstimado}
Justificativa: ${op.justificativa}

Pode deixar para depois:
${op.futuramenteAdicionar.map((f) => `- ${f}`).join("\n")}`
    )
    .join("\n\n---\n\n");

  return `# PRD — ${prd.nomeProjeto}
${prd.tagline}

## Visao Geral
${prd.visaoGeral}

## O Problema
${prd.problema}

## A Solucao
${prd.solucao}

## Publico-Alvo
${prd.publicoAlvo.map((p) => `- ${p}`).join("\n")}

## User Stories
${prd.userStories.map((s) => `- ${s}`).join("\n")}

## Funcionalidades MVP
${prd.funcionalidadesMVP.map((f) => `- ${f}`).join("\n")}

## Funcionalidades Nice-to-Have
${prd.funcionalidadesNiceToHave.map((f) => `- ${f}`).join("\n")}

## Opcoes de Stack

${opcoes}

## Skills Sugeridas para o Agente
${prd.skillsAgente.map((s) => `- ${s}`).join("\n")}

## Estrutura de Pastas
\`\`\`
${prd.estruturaPastas}
\`\`\`

## Fases de Desenvolvimento
${prd.fases
  .map(
    (f) => `### Fase ${f.numero}: ${f.nome} (${f.duracaoEstimada})
${f.descricao}
${f.tarefas.map((t) => `- ${t}`).join("\n")}`
  )
  .join("\n\n")}
`;
}
