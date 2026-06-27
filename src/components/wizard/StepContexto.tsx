"use client";

import { useState } from "react";
import { FormData } from "@/lib/types";

const FEATURES_GRUPOS = [
  {
    grupo: "Acesso e Usuários",
    items: [
      { label: "Login e Autenticação", desc: "Sistema de cadastro e login para controlar quem acessa o sistema.", exemplo: "Ex: entrar com email/senha, ou com conta do Google" },
      { label: "Multi-usuário", desc: "Várias pessoas com contas separadas usam o mesmo sistema.", exemplo: "Ex: uma agência onde cada funcionário tem seu próprio acesso" },
      { label: "Multi-empresa", desc: "O sistema suporta múltiplos clientes (empresas) dentro da mesma plataforma, isolados entre si.", exemplo: "Ex: um SaaS que vende para várias empresas, cada uma vê só seus próprios dados" },
      { label: "Permissões por perfil", desc: "Diferentes tipos de usuário têm acesso a partes diferentes do sistema.", exemplo: "Ex: admin vê tudo, editor só edita conteúdo, leitor só visualiza" },
      { label: "Onboarding do usuário", desc: "Fluxo de boas-vindas que guia o usuário a configurar a conta na primeira vez.", exemplo: "Ex: tela de boas-vindas, tour guiado, ou perguntas iniciais de configuração" },
    ],
  },
  {
    grupo: "Interface",
    items: [
      { label: "Dashboard / Painel", desc: "Página principal com resumo visual do que está acontecendo no sistema.", exemplo: "Ex: cards com métricas, gráficos, atividade recente" },
      { label: "Landing Page", desc: "Página pública de apresentação do produto para atrair novos usuários.", exemplo: "Ex: página com hero, benefícios, preços e botão de cadastro" },
      { label: "Kanban / Board", desc: "Visualização de tarefas ou itens em colunas que representam etapas.", exemplo: "Ex: colunas 'A fazer', 'Em andamento', 'Concluído' com cards arrastáveis" },
      { label: "Calendário", desc: "Visualização de eventos, tarefas ou registros em formato de calendário.", exemplo: "Ex: agenda de reuniões, calendário de publicações, agenda de entregas" },
      { label: "Modo escuro", desc: "Opção de trocar o visual do sistema entre tema claro e escuro.", exemplo: "Ex: botão no canto que alterna entre fundo branco e fundo preto" },
    ],
  },
  {
    grupo: "Dados e Conteúdo",
    items: [
      { label: "Upload de arquivos", desc: "Usuários podem enviar arquivos (imagens, PDFs, documentos) para o sistema.", exemplo: "Ex: enviar foto de perfil, anexar contrato, importar planilha" },
      { label: "Busca e filtros", desc: "Campo de busca e filtros para encontrar itens rapidamente dentro do sistema.", exemplo: "Ex: buscar cliente por nome, filtrar pedidos por data ou status" },
      { label: "Relatórios e exportação", desc: "Geração de relatórios com dados do sistema e opção de baixar como PDF ou Excel.", exemplo: "Ex: relatório de vendas do mês, exportar lista de clientes em CSV" },
      { label: "Tabelas e listas", desc: "Visualização de dados em tabelas com ordenação, paginação e ações por linha.", exemplo: "Ex: lista de clientes, tabela de pedidos, histórico de transações" },
      { label: "Editor de texto rico", desc: "Campo de texto com formatação: negrito, itálico, listas, títulos, imagens.", exemplo: "Ex: editor de posts de blog, campo de descrição de produto com formatação" },
    ],
  },
  {
    grupo: "Comunicação",
    items: [
      { label: "Chat / Mensagens", desc: "Sistema de troca de mensagens em tempo real dentro da plataforma.", exemplo: "Ex: chat entre cliente e suporte, mensagens entre membros da equipe" },
      { label: "Notificações", desc: "Alertas que avisam o usuário sobre eventos importantes no sistema.", exemplo: "Ex: 'Você tem uma nova mensagem', 'Seu pedido foi aprovado'" },
      { label: "E-mails automáticos", desc: "O sistema envia e-mails automaticamente quando algo acontece.", exemplo: "Ex: e-mail de boas-vindas, confirmação de pedido, lembrete de pagamento" },
      { label: "Comentários", desc: "Usuários podem deixar comentários em itens do sistema.", exemplo: "Ex: comentar em uma tarefa, dar feedback em um projeto, responder uma postagem" },
    ],
  },
  {
    grupo: "Negócio",
    items: [
      { label: "Parte premium (paga)", desc: "Algumas funcionalidades só ficam disponíveis para usuários que pagam.", exemplo: "Ex: plano grátis com limite de 3 projetos, plano pago sem limite" },
      { label: "Assinaturas recorrentes", desc: "Cobrança automática mensal ou anual pelo uso do sistema.", exemplo: "Ex: R$ 49/mês debitado automaticamente no cartão do cliente" },
      { label: "Integração com APIs externas", desc: "O sistema se conecta a outros serviços para trocar dados automaticamente.", exemplo: "Ex: integrar com Instagram, Google Ads, WhatsApp, ou sistema do cliente" },
      { label: "Marketplace", desc: "Plataforma onde múltiplos vendedores ou prestadores oferecem seus produtos/serviços.", exemplo: "Ex: plataforma onde freelancers se cadastram e clientes contratam" },
      { label: "Afiliados", desc: "Sistema de indicação onde usuários ganham comissão ao trazer novos clientes.", exemplo: "Ex: cada usuário tem um link único, e ganha % sobre quem se cadastrar pelo link" },
    ],
  },
];

const NECESSIDADES = [
  { key: "precisaAuth" as const, label: "Autenticação", desc: "Controle de quem pode acessar o sistema. Necessário se houver cadastro, login ou áreas restritas.", exemplo: "Ex: sistema com contas de usuário, área logada, ou dados privados por pessoa" },
  { key: "precisaBanco" as const, label: "Banco de dados", desc: "Armazenamento persistente de informações — tudo que precisa ser salvo e consultado depois.", exemplo: "Ex: salvar clientes, pedidos, mensagens, configurações de conta" },
  { key: "precisaPagamento" as const, label: "Pagamentos", desc: "Processamento de cobranças dentro do próprio sistema, com cartão, PIX ou boleto.", exemplo: "Ex: checkout de produto, assinatura mensal, cobrança de serviço" },
];

const STACKS_OPCOES = [
  { label: "Next.js", categoria: "Frontend", desc: "Framework principal para criar sites e sistemas web completos com React.", quando: "Use para qualquer projeto web — funciona como frontend e backend ao mesmo tempo" },
  { label: "React", categoria: "Frontend", desc: "Biblioteca para construir interfaces com componentes reutilizáveis.", quando: "Use quando quer só o frontend, sem o servidor do Next.js" },
  { label: "Vue.js", categoria: "Frontend", desc: "Alternativa ao React — mais simples para quem está começando com JavaScript.", quando: "Use se já tem experiência com Vue ou prefere uma curva de aprendizado menor" },
  { label: "Tailwind CSS", categoria: "Estilo", desc: "Framework de CSS que você aplica diretamente no HTML. Rápido e sem arquivos CSS separados.", quando: "Use para estilizar qualquer projeto — é a escolha mais popular hoje em dia" },
  { label: "shadcn/ui", categoria: "Componentes", desc: "Coleção de componentes prontos (botão, modal, tabela, formulário) para React/Next.js.", quando: "Use para não criar tudo do zero — os componentes são bonitos e acessíveis" },
  { label: "Supabase", categoria: "Backend + Banco", desc: "Backend pronto com banco de dados (PostgreSQL), login e armazenamento de arquivos.", quando: "Use quando quer autenticação e banco sem criar um servidor do zero. Gratuito para começar" },
  { label: "Firebase", categoria: "Backend + Banco", desc: "Plataforma do Google com banco em tempo real, login e hospedagem de arquivos.", quando: "Use para apps mobile, chats em tempo real ou projetos com ecossistema Google" },
  { label: "PostgreSQL", categoria: "Banco de dados", desc: "Banco de dados relacional robusto e confiável. O mais usado em sistemas sérios.", quando: "Use quando os dados têm relações complexas (clientes têm pedidos, pedidos têm itens...)" },
  { label: "MongoDB", categoria: "Banco de dados", desc: "Banco NoSQL que armazena dados em formato flexível, sem estrutura rígida de tabelas.", quando: "Use quando os dados mudam muito de formato ou são documentos e objetos aninhados" },
  { label: "Prisma", categoria: "ORM", desc: "Ferramenta que facilita a comunicação entre o código e o banco de dados — sem escrever SQL.", quando: "Use com PostgreSQL ou MySQL para consultar o banco de forma mais segura e legível" },
  { label: "Stripe", categoria: "Pagamentos", desc: "Plataforma de pagamentos internacional. Aceita cartão, suporta assinaturas recorrentes.", quando: "Use para cobrar em reais ou dólares com cartão. Plano gratuito para desenvolvimento" },
  { label: "Mercado Pago", categoria: "Pagamentos", desc: "Plataforma de pagamentos brasileira. Aceita PIX, boleto, cartão e parcelamento.", quando: "Use se o público é brasileiro e quer PIX como opção de pagamento" },
  { label: "Vercel", categoria: "Deploy", desc: "Plataforma de hospedagem otimizada para Next.js. Deploy automático pelo GitHub.", quando: "Use para qualquer projeto Next.js — é gratuito para projetos pessoais e pequenos" },
  { label: "Railway", categoria: "Deploy", desc: "Plataforma simples para hospedar backend, banco de dados e qualquer linguagem.", quando: "Use quando precisa de backend personalizado ou banco próprio com custo baixo" },
  { label: "Node.js", categoria: "Backend", desc: "Ambiente para rodar JavaScript no servidor — base de qualquer backend em JS.", quando: "Use quando precisa criar APIs, automações ou scripts do lado do servidor" },
  { label: "TypeScript", categoria: "Linguagem", desc: "Versão do JavaScript com tipagem — detecta erros antes de rodar o código.", quando: "Use sempre que possível. Evita uma classe enorme de bugs em projetos maiores" },
  { label: "n8n", categoria: "Automação", desc: "Ferramenta visual para criar automações e fluxos entre sistemas sem muito código.", quando: "Use para conectar APIs, enviar e-mails automáticos, processar dados periodicamente" },
];

const DEPLOY_OPCOES = [
  { label: "Vercel", custo: "Grátis no plano Hobby", pros: "Deploy automático pelo GitHub, configuração em 2 minutos, otimizado para Next.js", contras: "Funções têm limite de 10 segundos, banco de dados precisa ser externo" },
  { label: "Netlify", custo: "Grátis no plano básico", pros: "Fácil de configurar, bom para sites estáticos e frontends", contras: "Menos otimizado para Next.js do que Vercel, backend limitado" },
  { label: "Railway", custo: "~$5/mês após o trial", pros: "Suporta backend completo, banco incluído, qualquer linguagem", contras: "Tem custo após o período grátis, mais configuração necessária" },
  { label: "Render", custo: "Grátis (com limitações) ou ~$7/mês", pros: "Suporta backend, banco, crons. Boa alternativa ao Railway", contras: "No plano grátis o servidor 'dorme' após inatividade e demora para acordar" },
  { label: "VPS (DigitalOcean, etc.)", custo: "A partir de ~$6/mês", pros: "Controle total, sem limitações de plataforma, ideal para projetos grandes", contras: "Requer configuração manual de servidor, mais técnico de manter" },
  { label: "Ainda não sei", custo: "—", pros: "A IA vai sugerir a melhor opção para o tipo de projeto", contras: "—" },
];

const CATEGORIAS_STACK = ["Frontend", "Estilo", "Componentes", "Backend + Banco", "Banco de dados", "ORM", "Pagamentos", "Deploy", "Backend", "Linguagem", "Automação"];

interface Props {
  data: FormData;
  onChange: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StepContexto({ data, onChange, onNext, onBack }: Props) {
  const [featureCustom, setFeatureCustom] = useState("");
  const [stacksSelecionadas, setStacksSelecionadas] = useState<string[]>([]);

  const toggleFeature = (f: string) => {
    const current = data.features;
    if (current.includes(f)) {
      onChange({ features: current.filter((x) => x !== f) });
    } else {
      onChange({ features: [...current, f] });
    }
  };

  const toggleStack = (s: string) => {
    const novas = stacksSelecionadas.includes(s)
      ? stacksSelecionadas.filter((x) => x !== s)
      : [...stacksSelecionadas, s];
    setStacksSelecionadas(novas);
    onChange({ stackPreferencia: novas.join(", ") });
  };

  const addFeatureCustom = () => {
    const trimmed = featureCustom.trim();
    if (trimmed && !data.features.includes(trimmed)) {
      onChange({ features: [...data.features, trimmed] });
      setFeatureCustom("");
    }
  };

  const todasFeaturesLista = FEATURES_GRUPOS.flatMap((g) => g.items.map((i) => i.label));
  const featuresCustom = data.features.filter((f) => !todasFeaturesLista.includes(f));
  const podeAvancar = data.problema.trim() && data.publicoAlvo.trim();

  return (
    <div
      className="step-animate"
      style={{
        /* espaço vertical entre seções do step */
        display: "flex",
        flexDirection: "column",
        gap: "32px",
      }}
    >
      {/* Cabeçalho */}
      <div>
        <h2
          style={{
            /* tamanho do título */
            fontSize: "24px",
            fontWeight: 900,
            /* cor do título */
            color: "#1b1b25",
            margin: "0 0 4px",
            letterSpacing: "-0.5px",
          }}
        >
          contexto do projeto
        </h2>
        <p style={{ color: "#3f3744", fontSize: "13px", margin: 0 }}>
          Quanto mais detalhe você der, mais preciso e útil fica o PRD.
        </p>
      </div>

      {/* Problema */}
      <div>
        <label className="label">
          Qual problema este projeto resolve?{" "}
          <span style={{ color: "#b7c939" }}>*</span>
        </label>
        <textarea
          value={data.problema}
          onChange={(e) => onChange({ problema: e.target.value })}
          placeholder="Descreva o problema de forma clara. Ex: Freelancers perdem horas toda semana organizando propostas em planilhas sem padrão..."
          rows={3}
          className="textarea"
        />
      </div>

      {/* Público-alvo */}
      <div>
        <label className="label">
          Quem vai usar?{" "}
          <span style={{ color: "#b7c939" }}>*</span>
        </label>
        <input
          type="text"
          value={data.publicoAlvo}
          onChange={(e) => onChange({ publicoAlvo: e.target.value })}
          placeholder="Ex: Freelancers digitais, donos de pequenas agências, gestores de tráfego..."
          className="input"
        />
      </div>

      {/* Features desejadas */}
      <div>
        <div
          style={{
            /* cabeçalho da seção de features em linha */
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            /* margem abaixo do cabeçalho */
            marginBottom: "12px",
          }}
        >
          <label className="label" style={{ margin: 0 }}>Features desejadas</label>
          {data.features.length > 0 && (
            <span
              style={{
                /* tamanho da fonte do contador */
                fontSize: "11px",
                /* cor do texto do contador — verde escuro */
                color: "#6f7b18",
                /* fundo verde translúcido — 12% opacidade */
                background: "#b7c9391F",
                /* espaço interno do contador */
                padding: "2px 8px",
                /* contador completamente redondo */
                borderRadius: "999px",
                /* peso negrito */
                fontWeight: 800,
              }}
            >
              {data.features.length} selecionadas
            </span>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {FEATURES_GRUPOS.map((grupo) => (
            <div key={grupo.grupo}>
              <p
                style={{
                  /* label do grupo — maiúsculas e apertadas */
                  fontSize: "11px",
                  color: "#3f3744",
                  fontWeight: 900,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  /* margem abaixo do label do grupo */
                  margin: "0 0 8px",
                  opacity: 0.6,
                }}
              >
                {grupo.grupo}
              </p>
              <div
                style={{
                  /* grade de 2 colunas para os botões de feature */
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "8px",
                }}
              >
                {grupo.items.map((f) => {
                  const selecionada = data.features.includes(f.label);
                  return (
                    <button
                      key={f.label}
                      onClick={() => toggleFeature(f.label)}
                      style={{
                        textAlign: "left",
                        /* espaço interno do botão de feature */
                        padding: "10px 12px",
                        borderRadius: "8px",
                        /* borda: verde se selecionada, cinza se não */
                        border: selecionada ? "1px solid #b7c939" : "1px solid #1b1b2524",
                        /* fundo: verde translúcido se selecionada, cinza claro se não */
                        background: selecionada ? "#b7c93918" : "#f0f1ea",
                        transition: "all 0.15s",
                        cursor: "pointer",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "12px",
                          fontWeight: 700,
                          /* cor: escuro se selecionada, cinza se não */
                          color: selecionada ? "#1b1b25" : "#3f3744",
                          marginBottom: "3px",
                        }}
                      >
                        {selecionada ? "✓ " : ""}{f.label}
                      </div>
                      <div style={{ fontSize: "11px", color: "#3f3744", opacity: 0.7, lineHeight: 1.4 }}>{f.desc}</div>
                      <div style={{ fontSize: "11px", color: "#3f3744", opacity: 0.45, marginTop: "2px", fontStyle: "italic" }}>{f.exemplo}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Campo para feature customizada */}
        <div
          style={{
            /* margem acima do campo de feature customizada */
            marginTop: "16px",
            display: "flex",
            gap: "8px",
          }}
        >
          <input
            type="text"
            value={featureCustom}
            onChange={(e) => setFeatureCustom(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addFeatureCustom()}
            placeholder="Adicionar outra feature não listada..."
            className="input"
          />
          <button
            onClick={addFeatureCustom}
            className="btn"
            style={{
              /* largura mínima do botão de adicionar */
              minWidth: "40px",
              flexShrink: 0,
            }}
          >
            +
          </button>
        </div>

        {/* Tags de features customizadas */}
        {featuresCustom.length > 0 && (
          <div
            style={{
              marginTop: "8px",
              display: "flex",
              flexWrap: "wrap",
              gap: "6px",
            }}
          >
            {featuresCustom.map((f) => (
              <span
                key={f}
                style={{
                  /* tag de feature customizada */
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  /* espaço interno da tag */
                  padding: "4px 10px",
                  /* fundo verde translúcido */
                  background: "#b7c93918",
                  /* borda verde */
                  border: "1px solid #b7c93950",
                  /* cor do texto da tag */
                  color: "#6f7b18",
                  /* tag completamente redonda */
                  borderRadius: "999px",
                  fontSize: "11px",
                  fontWeight: 700,
                }}
              >
                {f}
                <button
                  onClick={() => toggleFeature(f)}
                  style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    /* cor do botão de remover */
                    color: "#6f7b18",
                    cursor: "pointer",
                    /* tamanho do botão de remover */
                    fontSize: "14px",
                    lineHeight: 1,
                  }}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Necessidades técnicas */}
      <div>
        <label className="label">O projeto vai precisar de...</label>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {NECESSIDADES.map(({ key, label, desc, exemplo }) => {
            const ativo = data[key] as boolean;
            return (
              <button
                key={key}
                onClick={() => onChange({ [key]: !ativo })}
                style={{
                  width: "100%",
                  textAlign: "left",
                  /* espaço interno do botão de necessidade */
                  padding: "12px 14px",
                  borderRadius: "8px",
                  /* borda: verde se ativo, cinza se não */
                  border: ativo ? "1px solid #b7c939" : "1px solid #1b1b2524",
                  /* fundo: verde translúcido se ativo, cinza claro se não */
                  background: ativo ? "#b7c93918" : "#f0f1ea",
                  transition: "all 0.15s",
                  cursor: "pointer",
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                  {/* checkbox visual */}
                  <div
                    style={{
                      /* tamanho do checkbox */
                      width: "18px",
                      height: "18px",
                      borderRadius: "4px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "11px",
                      flexShrink: 0,
                      /* fundo e borda: verde se ativo, cinza se não */
                      background: ativo ? "#b7c939" : "transparent",
                      border: ativo ? "1px solid #b7c939" : "1px solid #1b1b2538",
                      /* cor do check */
                      color: "#1b1b25",
                      fontWeight: 900,
                      marginTop: "1px",
                    }}
                  >
                    {ativo ? "✓" : ""}
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "13px",
                        fontWeight: 700,
                        /* cor: escuro se ativo, cinza se não */
                        color: ativo ? "#1b1b25" : "#3f3744",
                      }}
                    >
                      {label}
                    </div>
                    <div style={{ fontSize: "12px", color: "#3f3744", opacity: 0.7, marginTop: "2px" }}>{desc}</div>
                    <div style={{ fontSize: "11px", color: "#3f3744", opacity: 0.45, marginTop: "2px", fontStyle: "italic" }}>{exemplo}</div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Tipo de banco — aparece quando banco está ativo */}
        {data.precisaBanco && (
          <div style={{ marginTop: "12px" }}>
            <p style={{ fontSize: "12px", color: "#3f3744", marginBottom: "8px", opacity: 0.7 }}>Qual tipo de banco?</p>
            <div style={{ display: "flex", gap: "8px" }}>
              {[
                { label: "SQL", desc: "PostgreSQL, MySQL — dados com relações e estrutura fixa" },
                { label: "NoSQL", desc: "MongoDB — dados flexíveis ou que mudam de formato" },
                { label: "Não sei", desc: "A IA vai recomendar o mais adequado" },
              ].map((t) => {
                const sel = data.tipoBanco === t.label;
                return (
                  <button
                    key={t.label}
                    onClick={() => onChange({ tipoBanco: t.label })}
                    style={{
                      flex: 1,
                      /* espaço interno do botão de banco */
                      padding: "10px 8px",
                      borderRadius: "8px",
                      /* borda: verde se selecionado, cinza se não */
                      border: sel ? "1px solid #b7c939" : "1px solid #1b1b2524",
                      /* fundo: verde translúcido se selecionado */
                      background: sel ? "#b7c93918" : "#f0f1ea",
                      textAlign: "center",
                      fontSize: "12px",
                      transition: "all 0.15s",
                      cursor: "pointer",
                    }}
                  >
                    <div style={{ fontWeight: 700, color: sel ? "#1b1b25" : "#3f3744" }}>{t.label}</div>
                    <div style={{ fontSize: "11px", color: "#3f3744", opacity: 0.6, marginTop: "3px", lineHeight: 1.3 }}>{t.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Stack preferida */}
      <div>
        <label className="label">
          Stack preferida{" "}
          <span style={{ fontWeight: 400, textTransform: "none", letterSpacing: 0, fontSize: "11px", color: "#3f3744", opacity: 0.6 }}>
            — opcional. Se não selecionar nada, a IA sugere 2 opções
          </span>
        </label>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {CATEGORIAS_STACK.map((cat) => {
            const items = STACKS_OPCOES.filter((s) => s.categoria === cat);
            if (items.length === 0) return null;
            return (
              <div key={cat}>
                <p
                  style={{
                    /* label da categoria */
                    fontSize: "11px",
                    color: "#3f3744",
                    fontWeight: 900,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    margin: "0 0 8px",
                    opacity: 0.6,
                  }}
                >
                  {cat}
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "8px" }}>
                  {items.map((s) => {
                    const sel = stacksSelecionadas.includes(s.label);
                    return (
                      <button
                        key={s.label}
                        onClick={() => toggleStack(s.label)}
                        style={{
                          textAlign: "left",
                          padding: "10px 12px",
                          borderRadius: "8px",
                          /* borda: azul se selecionada, cinza se não */
                          border: sel ? "1px solid #adcbf8" : "1px solid #1b1b2524",
                          /* fundo: azul translúcido se selecionada */
                          background: sel ? "#adcbf818" : "#f0f1ea",
                          transition: "all 0.15s",
                          cursor: "pointer",
                        }}
                      >
                        <div style={{ fontSize: "12px", fontWeight: 700, color: sel ? "#1b1b25" : "#3f3744", marginBottom: "3px" }}>
                          {sel ? "✓ " : ""}{s.label}
                        </div>
                        <div style={{ fontSize: "11px", color: "#3f3744", opacity: 0.7, lineHeight: 1.4 }}>{s.desc}</div>
                        <div style={{ fontSize: "11px", color: "#3f3744", opacity: 0.45, marginTop: "2px", fontStyle: "italic" }}>{s.quando}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Referência de design */}
      <div>
        <label className="label">
          Referências de design{" "}
          <span style={{ fontWeight: 400, textTransform: "none", letterSpacing: 0, fontSize: "11px", color: "#3f3744", opacity: 0.6 }}>— opcional</span>
        </label>
        <input
          type="text"
          value={data.referenciaDesign}
          onChange={(e) => onChange({ referenciaDesign: e.target.value })}
          placeholder="Ex: Notion, Linear, Stripe, Vercel, Raycast..."
          className="input"
        />
        <p className="hint" style={{ marginTop: "6px" }}>
          Escreva o nome de produtos cujo visual você admira — não cole URLs, pois a IA não consegue acessar sites.
        </p>
      </div>

      {/* Deploy alvo */}
      <div>
        <label className="label">Onde quer fazer o deploy?</label>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {DEPLOY_OPCOES.map((d) => {
            const sel = data.deployAlvo === d.label;
            return (
              <button
                key={d.label}
                onClick={() => onChange({ deployAlvo: d.label })}
                style={{
                  width: "100%",
                  textAlign: "left",
                  padding: "12px 14px",
                  borderRadius: "8px",
                  /* borda: lilás se selecionado, cinza se não */
                  border: sel ? "1px solid #c987e1" : "1px solid #1b1b2524",
                  /* fundo: lilás translúcido se selecionado */
                  background: sel ? "#c987e118" : "#f0f1ea",
                  transition: "all 0.15s",
                  cursor: "pointer",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px" }}>
                  <span style={{ fontSize: "13px", fontWeight: 700, color: sel ? "#1b1b25" : "#3f3744" }}>{d.label}</span>
                  <span style={{ fontSize: "11px", color: "#3f3744", opacity: 0.6 }}>{d.custo}</span>
                </div>
                {d.contras !== "—" && (
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginTop: "4px" }}>
                    <div style={{ fontSize: "11px", color: "#3f3744", opacity: 0.7 }}>+ {d.pros}</div>
                    <div style={{ fontSize: "11px", color: "#3f3744", opacity: 0.5 }}>- {d.contras}</div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Botões de navegação */}
      <div style={{ display: "flex", gap: "12px", paddingTop: "4px" }}>
        <button onClick={onBack} className="btn" style={{ padding: "10px 20px", fontSize: "13px" }}>
          Voltar
        </button>
        <button
          onClick={onNext}
          disabled={!podeAvancar}
          className="btn primary"
          style={{
            flex: 1,
            minHeight: "44px",
            fontSize: "13px",
            opacity: podeAvancar ? 1 : 0.45,
          }}
        >
          Gerar PRD com Llama
        </button>
      </div>
    </div>
  );
}
