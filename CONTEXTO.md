# SOS Dev Start — Contexto do Projeto

## O que é

Uma **aplicação web** (Next.js) que funciona como um **gerador de pacote inicial para qualquer projeto de software**. A ideia central é: antes de abrir o editor de código, o usuário passa pelo SOS Dev Start para estruturar tudo.

---

## Estrutura de arquivos (src/)

```
src/
├── app/
│   ├── layout.tsx              # layout raiz (fontes: Manrope + JetBrains Mono)
│   ├── page.tsx                # landing page (homepage)
│   ├── globals.css             # design system completo (cores, botões, topbar, grid...)
│   ├── criar/
│   │   └── page.tsx            # página do wizard de criação de projeto
│   ├── ferramentas/
│   │   └── page.tsx            # página "outras ferramentas" com guias interativos (modal)
│   └── api/
│       └── gerar-prd/
│           └── route.ts        # API route — gera o PRD via IA
├── components/
│   └── wizard/
│       ├── WizardContainer.tsx     # container do wizard, controla steps
│       ├── StepApiKey.tsx          # step 0: chave da API
│       ├── StepBasicos.tsx         # step 1: dados básicos do projeto
│       ├── StepContexto.tsx        # step 2: contexto adicional
│       ├── StepGerandoPRD.tsx      # step 3: tela de loading durante geração
│       ├── StepAprovacaoPRD.tsx    # step 4: revisão do PRD gerado
│       └── StepDownload.tsx        # step 5: download do ZIP
└── lib/
    ├── types.ts                # tipos TypeScript compartilhados
    └── templates.ts            # templates dos arquivos gerados no ZIP
```

---

## Design system (globals.css)

Todas as classes visuais estão em `globals.css`. Não usar Tailwind para novos componentes — usar as classes existentes.

**Cores principais:**
- `#b7c939` — verde-limão (ação primária, destaques, hover)
- `#6f7b18` — verde escuro (labels, kickers, textos secundários verdes)
- `#1b1b25` — quase preto (fundo escuro, texto principal)
- `#f7f7f4` — bege claro (fundo da página)
- `#f0f1ea` — cinza esverdeado (fundo de campos, seções alt)
- `#3f3744` — cinza roxo (textos secundários)
- `#adcbf8` — azul claro (accent decorativo)
- `#c987e1` — lilás (accent decorativo)

**Fontes:**
- `Manrope` — corpo e títulos (peso 400–900)
- `JetBrains Mono` — código, labels, números, pills

**Classes utilitárias importantes:**
- `.btn`, `.btn.primary`, `.btn.ghost`, `.btn.small`, `.btn.danger`
- `.topbar`, `.topbar-inner`, `.brand`, `.tabs`, `.tab`, `.tab.active`
- `.input`, `.textarea`, `.select`, `.label`, `.hint`, `.divider`
- `.lp-shell`, `.lp-section`, `.lp-section--dark`, `.lp-section--alt`
- `.pill`, `.kicker`

---

## Páginas existentes

| Rota | Arquivo | Descrição |
|---|---|---|
| `/` | `app/page.tsx` | Landing page com hero, mapa do pacote, features, arquivos, como funciona, CTA |
| `/criar` | `app/criar/page.tsx` | Wizard de criação (6 steps) |
| `/ferramentas` | `app/ferramentas/page.tsx` | Página de ferramentas extras com guias M3 em modal |

---

## Topbar

O topbar é declarado **dentro de cada page** (não é um componente compartilhado). Ao criar novas páginas, copiar o padrão:

```tsx
<header className="topbar">
  <div className="topbar-inner">
    <div className="brand">
      <span className="mark">...</span>
      <Link href="/">sos dev start</Link>
    </div>
    <div className="tabs">
      <Link href="/criar" className="btn tab">projeto</Link>
      <Link href="/ferramentas" className="btn tab">ferramentas</Link>
      {/* adicionar className="active" na aba da página atual */}
    </div>
  </div>
</header>
```

---

## Como funciona o fluxo

O usuário passa por um **wizard em etapas**:

1. **Basics** — preenche nome do projeto, objetivo, público-alvo, features desejadas, stack preferida, se precisa de auth/banco/pagamento, onde vai hospedar
2. **Contexto** — complementa com detalhes adicionais
3. **Geração do PRD** — a IA (via API call para `/api/gerar-prd`) processa tudo e gera um PRD estruturado com user stories, funcionalidades MVP, opções de stack com justificativa de custo, fases de desenvolvimento etc.
4. **Aprovação** — o usuário lê, revisa e pode ajustar antes de baixar
5. **Download** — baixa um ZIP com todos os arquivos prontos

---

## O que vem no pacote gerado

| Arquivo | Função |
|---|---|
| `PRD.md` | Visão do produto, problema, solução, user stories, funcionalidades |
| `PLANO.md` | Fases de desenvolvimento com tarefas em checklist |
| `AGENTS.md` | Regras para qualquer agente de IA seguir no projeto |
| `CLAUDE.md` | Instruções específicas para o Claude Code |
| `.claude/settings.json` | Permissões pré-configuradas (o que o agente pode e não pode fazer) |
| `.env.example` | Modelo das variáveis de ambiente necessárias |
| `sos.md` | Guia de comandos do terminal para quem não é dev |
| `prompt-inicial.txt` | Mensagem pronta para colar no agente e começar |

---

## Proposta de valor

O problema que resolve é o **começo confuso de projetos com IA**: sem contexto estruturado, o agente vai na direção errada, toma decisões arquiteturais sem respaldo, ou o usuário fica reexplicando tudo a cada sessão. O SOS Dev Start resolve isso gerando toda essa base **antes** de escrever a primeira linha de código.

É especialmente pensado para **não-devs que usam agentes de IA** para desenvolver — daí o glossário de terminal no `sos.md` e o foco em deixar o agente "já alinhado" desde o início.


---

## CLAUDE.md gerado

```
# [NOME DO PROJETO]
[tagline]

## Visão Geral
[visão geral gerada pela IA]

## STACK DO PROJETO
- Frontend: [ex: Next.js 14]
- Backend: [ex: Next.js API Routes]
- Banco de Dados: [ex: PostgreSQL]
- Autenticação: [ex: NextAuth.js]
- Hosting: [ex: Vercel]
- Outras Ferramentas: [ex: Prisma, Tailwind CSS]


## COMO INICIAR O PROJETO
Quando o usuário disser "iniciar projeto", execute esta sequência:

1. Leia o arquivo PRD.md
2. Leia o arquivo PLANO.md
3. Informe ao usuário quais serão os próximos passos.


# REGRAS DE COMPORTAMENTO

## ESCOPO
- Só faça exatamente o que foi pedido. Se a tarefa não deixar claro o que fazer em algum ponto, pare e pergunte antes de decidir por conta própria.
- Nunca expanda o escopo da tarefa (refatorar arquivo extra, "melhorar" algo que não foi pedido, trocar abordagem) sem confirmar antes.
- Se enxergar um problema ou risco fora do que foi pedido, avise — mas não corrija sozinho sem aprovação.

## ORDEM DE DESENVOLVIMENTO
- Siga SEMPRE a ordem do arquivo `PLANO.md`
- Antes de iniciar cada fase, liste o que será feito e pergunte se pode iniciar.
- A cada tarefa concluída, marque no PLANO.md substituindo `- [ ]` por `- [x]`
- Após concluir cada fase, pergunte ao usuário se ele gostaria de fazer o commit.
- Após cada commit, sugira ao usuário: "Antes de passar para a próxima fase, lembre de compactar e limpar a conversa."
- Design, animações e polish visual ficam na penúltima fase — antes disso, foque em funcionar


## ARQUIVOS
- Não edite, renomeie ou delete nenhum arquivo que não esteja diretamente relacionado à tarefa pedida.
- Antes de editar um arquivo que ainda não apareceu na conversa, diga qual arquivo é e por quê.
- Se a tarefa puder ser resolvida de mais de um jeito, explique as opções e pergunte qual eu prefiro — não escolha por mim.


## SEGURANÇA — NUNCA viole estas regras
[regras de segurança específicas do projeto]
- NUNCA instale pacotes sem confirmar com o usuário primeiro.
- NUNCA faça push ou deploy sem aprovação explícita do usuário.
- NUNCA exponha dados sensíveis em logs ou mensagens de commit.
- SEMPRE use variáveis de ambiente para chaves e segredos.
- SEMPRE atualize o .env.example ao adicionar novas variáveis de ambiente.


## COMUNICAÇÃO
- Antes de qualquer mudança maior (mais de um arquivo, mudança de lógica, nova dependência), explique o que vai fazer e por quê, em poucas frases.
- Seja direto e específico: diga o nome dos arquivos, o que muda em cada um, e o motivo. Nada de resumo vago.
- Se terminar uma tarefa e tiver feito algo além do que foi pedido, destaque isso no final, separado do resto.


## DÚVIDA
- Na dúvida, pergunte. Não assuma a interpretação mais "razoável" — pergunte qual é a interpretação certa.

# INFORMAÇÕES GERAIS

## Skills Sugeridas para este Projeto
[lista de skills sugeridas pela IA para o projeto]

## Variáveis de Ambiente
Todas estão documentadas no `.env.example`. Crie seu `.env.local` a partir dele.
[lista de variáveis de ambiente do projeto]
```