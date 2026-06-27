import Link from "next/link";

const FLUXO = [
  { indice: "01", titulo: "Briefing", texto: "Você responde o essencial." },
  { indice: "02", titulo: "PRD", texto: "A ideia vira documento." },
  { indice: "03", titulo: "Plano", texto: "As fases ficam claras." },
  { indice: "04", titulo: "Start", texto: "O agente já sabe o caminho." },
];

const FEATURES = [
  {
    etiqueta: "documento",
    titulo: "PRD pronto para orientar o agente",
    desc: "O briefing vira uma visão clara de produto, com problema, público, escopo, user stories e critérios de aceite.",
  },
  {
    etiqueta: "execução",
    titulo: "plano em fases sem pular etapas",
    desc: "O projeto sai organizado em passos pequenos, com design no momento certo e menos retrabalho no começo.",
  },
  {
    etiqueta: "contexto",
    titulo: "regras para o agente começar alinhado",
    desc: "As instruções essenciais ficam salvas no projeto, para a próxima sessão entender o que fazer sem reexplicar tudo.",
  },
];

const ARQUIVOS = [
  { nome: "PRD.md", desc: "Visão do produto, escopo e histórias do usuário" },
  { nome: "PLANO.md", desc: "Fases de desenvolvimento com tarefas objetivas" },
  { nome: "AGENTS.md", desc: "Regras para qualquer agente seguir o projeto" },
  { nome: "CLAUDE.md", desc: "Instruções de trabalho para o Claude Code" },
  { nome: ".claude/settings.json", desc: "Permissões iniciais configuradas com cuidado" },
  { nome: ".env.example", desc: "Modelo das variáveis que o projeto precisa" },
  { nome: "sos.md", desc: "Guia simples para você abrir no terminal e saber os próximos passos" },
  { nome: "prompt-inicial.txt", desc: "Mensagem pronta para colar no agente e começar" },
];

const PASSOS = [
  { n: "01", titulo: "Descreva o projeto", desc: "Nome, objetivo, público, recursos desejados e preferências de stack.", detalhe: "2 minutos" },
  { n: "02", titulo: "A IA estrutura a base", desc: "O sistema transforma suas respostas em PRD, plano, recomendações e arquivos de apoio.", detalhe: "cerca de 10 segundos" },
  { n: "03", titulo: "Você revisa antes de baixar", desc: "Nada sai como verdade absoluta: você lê, ajusta e aprova antes de gerar o pacote.", detalhe: "editável" },
  { n: "04", titulo: "O agente começa com contexto", desc: 'Baixe o ZIP, extraia na pasta do projeto e diga "iniciar projeto".', detalhe: "pronto para usar" },
];

export default function HomePage() {
  return (
    <>
      <header className="topbar">
        <div className="topbar-inner">
          <div className="brand">
            <span className="mark">
              <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15.033 9.44a.647.647 0 0 1 0 1.12l-4.065 2.352a.645.645 0 0 1-.968-.56V7.648a.645.645 0 0 1 .967-.56z"/>
                <path d="M12 17v4"/><path d="M8 21h8"/>
                <rect x="2" y="3" width="20" height="14" rx="2"/>
              </svg>
            </span>
            <span>sos dev start</span>
          </div>
          <div className="tabs">
            <Link href="/criar" className="btn tab">projeto</Link>
          </div>
        </div>
      </header>

      <div id="inicioView">
        <section className="intro">
          <div className="intro-left">
            <p className="kicker">base limpa para projetos com IA</p>
            <h1 className="intro-title">
              sos dev start<br />
              <span style={{ color: "#6f7b18" }}>começa pelo contexto.</span>
            </h1>
            <p className="intro-copy">
              Responda algumas perguntas e gere o pacote inicial do projeto: PRD,
              plano de fases, instruções do agente e arquivos de apoio. Tudo pronto para baixar.
            </p>
            <div className="intro-actions">
              <Link href="/criar" className="btn primary">criar meu projeto</Link>
              <a href="#arquivos" className="btn ghost">ver o que vem no pacote</a>
            </div>
            <p className="intro-note" style={{ marginTop: "28px" }}>
              <strong>Como usar</strong>
              Ajuste os campos, revise a prévia e baixe os arquivos. O pacote foi
              pensado para colocar na raiz de um projeto novo.
            </p>
          </div>

          <div className="intro-right">
            <div className="preview-board" aria-label="Prévia do pacote SOS Dev Start">
              <aside className="mock-side">
                <p className="mock-title">pacote gerado</p>
                <div className="mock-nav">Briefing <span className="mock-dot"></span></div>
                <div className="mock-nav">PRD <span className="mock-dot"></span></div>
                <div className="mock-nav">Plano <span className="mock-dot"></span></div>
                <div className="mock-nav">Agente <span className="mock-dot"></span></div>
                <div className="mock-nav">Download <span className="mock-dot"></span></div>
              </aside>
              <main className="mock-main">
                <div className="mock-top">
                  <div>
                    <h2>o guia pra você começar seu projeto do jeito certo.</h2>
                    <p>Você recebe todos os arquivos necessários pra começar seu projeto e a própria documentação orienta o agente a te guiar durante todo o processo.</p>
                  </div>
                  <span className="pill">ZIP pronto</span>
                </div>
                <div className="mock-grid">
                  <article className="mock-card">
                    <span className="mock-label">Contexto</span>
                    <p className="mock-value">98%</p>
                    <div className="bar"><span style={{ width: "98%" }}></span></div>
                  </article>
                  <article className="mock-card">
                    <span className="mock-label">Fases</span>
                    <p className="mock-value">06</p>
                    <div className="bar"><span style={{ width: "72%" }}></span></div>
                  </article>
                  <article className="mock-card wide">
                    <span className="mock-label">Arquivos principais</span>
                    <div className="mock-row"><strong>PRD.md</strong><span>pronto pra copiar e colar</span></div>
                    <div className="mock-row"><strong>PLANO.md</strong><span>um plano à prova de erros pra o seu agente não esquecer de nada</span></div>
                    <div className="mock-row"><strong>AGENTS.md</strong><span>regras pra qualquer agente seguir o projeto</span></div>
                    <div className="mock-row"><strong>CLAUDE.md</strong><span>instruções prontas para o Claude Code</span></div>
                    <div className="mock-row"><strong>sos.md</strong><span>um guia simples pra você não travar no terminal</span></div>
                  </article>
                </div>
              </main>
            </div>
          </div>
        </section>

        {/* Mapa do pacote */}
        <section className="lp-section lp-section--dark">
          <div className="lp-shell">
            <div className="lp-flow-map">
              <div className="lp-flow-top">
                <p className="lp-flow-label">mapa do pacote gerado</p>
                <span className="lp-flow-pill">pronto para baixar</span>
              </div>
              <div className="lp-flow-cards">
                {FLUXO.map((item) => (
                  <article key={item.indice} className="lp-flow-card">
                    <span className="lp-flow-index">{item.indice}</span>
                    <div>
                      <h2 className="lp-flow-title">{item.titulo}</h2>
                      <p className="lp-flow-text">{item.texto}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Sistema inicial */}
        <section className="lp-section">
          <div className="lp-shell">
            <div className="lp-section-head">
              <div>
                <p className="lp-section-label">sistema inicial</p>
                <h2 className="lp-section-title">tudo que o agente precisa saber antes de escrever código.</h2>
              </div>
              <p className="lp-section-copy">A proposta é evitar o começo confuso: menos arquivo solto, menos decisão escondida, mais direção visível.</p>
            </div>
            <div className="lp-features-grid">
              {FEATURES.map((f) => (
                <article key={f.titulo} className="lp-feature-card">
                  <span className="lp-feature-kicker">{f.etiqueta}</span>
                  <h3 className="lp-feature-title">{f.titulo}</h3>
                  <p className="lp-feature-desc">{f.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Arquivos gerados */}
        <section className="lp-section lp-section--alt" id="arquivos">
          <div className="lp-shell">
            <div className="lp-section-head">
              <div>
                <p className="lp-section-label">arquivos gerados</p>
                <h2 className="lp-section-title">um pacote enxuto, legível e pronto para abrir no projeto.</h2>
              </div>
              <p className="lp-section-copy">Cada arquivo tem uma função clara. O objetivo é começar com uma base organizada, não com uma pasta cheia de ruído.</p>
            </div>
            <div className="lp-files-grid">
              {ARQUIVOS.map((a) => (
                <article key={a.nome} className="lp-file-row">
                  <span className="lp-file-name">{a.nome}</span>
                  <span className="lp-file-desc">{a.desc}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Como funciona */}
        <section className="lp-section">
          <div className="lp-shell">
            <div className="lp-section-head">
              <div>
                <p className="lp-section-label">como funciona</p>
                <h2 className="lp-section-title">um fluxo simples para sair da ideia e chegar no começo certo.</h2>
              </div>
            </div>
            <div className="lp-steps">
              {PASSOS.map((p) => (
                <article key={p.n} className="lp-step">
                  <span className="lp-step-number">{p.n}</span>
                  <div>
                    <h3 className="lp-step-title">{p.titulo}</h3>
                    <p className="lp-step-desc">{p.desc}</p>
                    <span className="lp-step-detail">{p.detalhe}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section className="lp-final">
          <div className="lp-shell lp-final-inner">
            <div>
              <h2 className="lp-final-title">comece com menos improviso.</h2>
              <p className="lp-final-text">Em poucos minutos, você transforma uma ideia solta em um ponto de partida que o agente consegue seguir.</p>
            </div>
            <Link href="/criar" className="btn primary" style={{ whiteSpace: "nowrap", padding: "12px 20px", fontSize: "13px" }}>
              criar projeto agora
            </Link>
          </div>
        </section>

        <footer className="lp-footer">
          <div className="lp-shell">
            <p className="lp-footer-text">SOS Dev Start — feito para começar projeto com contexto.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
