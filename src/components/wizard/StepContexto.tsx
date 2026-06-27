"use client";

import { useState } from "react";
import { FormData } from "@/lib/types";

const FEATURES_GRUPOS = [
  {
    grupo: "Acesso e Usuários",
    items: [
      {
        label: "Login e Autenticação",
        desc: "Sistema de cadastro e login para controlar quem acessa o sistema.",
        exemplo: "Ex: entrar com email/senha, ou com conta do Google",
      },
      {
        label: "Multi-usuário",
        desc: "Várias pessoas com contas separadas usam o mesmo sistema.",
        exemplo: "Ex: uma agência onde cada funcionário tem seu próprio acesso",
      },
      {
        label: "Multi-empresa",
        desc: "O sistema suporta múltiplos clientes (empresas) dentro da mesma plataforma, isolados entre si.",
        exemplo: "Ex: um SaaS que vende para várias empresas, cada uma vê só seus próprios dados",
      },
      {
        label: "Permissões por perfil",
        desc: "Diferentes tipos de usuário têm acesso a partes diferentes do sistema.",
        exemplo: "Ex: admin vê tudo, editor só edita conteúdo, leitor só visualiza",
      },
      {
        label: "Onboarding do usuário",
        desc: "Fluxo de boas-vindas que guia o usuário a configurar a conta na primeira vez.",
        exemplo: "Ex: tela de boas-vindas, tour guiado, ou perguntas iniciais de configuração",
      },
    ],
  },
  {
    grupo: "Interface",
    items: [
      {
        label: "Dashboard / Painel",
        desc: "Página principal com resumo visual do que está acontecendo no sistema.",
        exemplo: "Ex: cards com métricas, gráficos, atividade recente",
      },
      {
        label: "Landing Page",
        desc: "Página pública de apresentação do produto para atrair novos usuários.",
        exemplo: "Ex: página com hero, benefícios, preços e botão de cadastro",
      },
      {
        label: "Kanban / Board",
        desc: "Visualização de tarefas ou itens em colunas que representam etapas.",
        exemplo: "Ex: colunas 'A fazer', 'Em andamento', 'Concluído' com cards arrastáveis",
      },
      {
        label: "Calendário",
        desc: "Visualização de eventos, tarefas ou registros em formato de calendário.",
        exemplo: "Ex: agenda de reuniões, calendário de publicações, agenda de entregas",
      },
      {
        label: "Modo escuro",
        desc: "Opção de trocar o visual do sistema entre tema claro e escuro.",
        exemplo: "Ex: botão no canto que alterna entre fundo branco e fundo preto",
      },
    ],
  },
  {
    grupo: "Dados e Conteúdo",
    items: [
      {
        label: "Upload de arquivos",
        desc: "Usuários podem enviar arquivos (imagens, PDFs, documentos) para o sistema.",
        exemplo: "Ex: enviar foto de perfil, anexar contrato, importar planilha",
      },
      {
        label: "Busca e filtros",
        desc: "Campo de busca e filtros para encontrar itens rapidamente dentro do sistema.",
        exemplo: "Ex: buscar cliente por nome, filtrar pedidos por data ou status",
      },
      {
        label: "Relatórios e exportação",
        desc: "Geração de relatórios com dados do sistema e opção de baixar como PDF ou Excel.",
        exemplo: "Ex: relatório de vendas do mês, exportar lista de clientes em CSV",
      },
      {
        label: "Tabelas e listas",
        desc: "Visualização de dados em tabelas com ordenação, paginação e ações por linha.",
        exemplo: "Ex: lista de clientes, tabela de pedidos, histórico de transações",
      },
      {
        label: "Editor de texto rico",
        desc: "Campo de texto com formatação: negrito, itálico, listas, títulos, imagens.",
        exemplo: "Ex: editor de posts de blog, campo de descrição de produto com formatação",
      },
    ],
  },
  {
    grupo: "Comunicação",
    items: [
      {
        label: "Chat / Mensagens",
        desc: "Sistema de troca de mensagens em tempo real dentro da plataforma.",
        exemplo: "Ex: chat entre cliente e suporte, mensagens entre membros da equipe",
      },
      {
        label: "Notificações",
        desc: "Alertas que avisam o usuário sobre eventos importantes no sistema.",
        exemplo: "Ex: 'Você tem uma nova mensagem', 'Seu pedido foi aprovado'",
      },
      {
        label: "E-mails automáticos",
        desc: "O sistema envia e-mails automaticamente quando algo acontece.",
        exemplo: "Ex: e-mail de boas-vindas, confirmação de pedido, lembrete de pagamento",
      },
      {
        label: "Comentários",
        desc: "Usuários podem deixar comentários em itens do sistema.",
        exemplo: "Ex: comentar em uma tarefa, dar feedback em um projeto, responder uma postagem",
      },
    ],
  },
  {
    grupo: "Negócio",
    items: [
      {
        label: "Parte premium (paga)",
        desc: "Algumas funcionalidades só ficam disponíveis para usuários que pagam.",
        exemplo: "Ex: plano grátis com limite de 3 projetos, plano pago sem limite",
      },
      {
        label: "Assinaturas recorrentes",
        desc: "Cobrança automática mensal ou anual pelo uso do sistema.",
        exemplo: "Ex: R$ 49/mês debitado automaticamente no cartão do cliente",
      },
      {
        label: "Integração com APIs externas",
        desc: "O sistema se conecta a outros serviços para trocar dados automaticamente.",
        exemplo: "Ex: integrar com Instagram, Google Ads, WhatsApp, ou sistema do cliente",
      },
      {
        label: "Marketplace",
        desc: "Plataforma onde múltiplos vendedores ou prestadores oferecem seus produtos/serviços.",
        exemplo: "Ex: plataforma onde freelancers se cadastram e clientes contratam",
      },
      {
        label: "Afiliados",
        desc: "Sistema de indicação onde usuários ganham comissão ao trazer novos clientes.",
        exemplo: "Ex: cada usuário tem um link único, e ganha % sobre quem se cadastrar pelo link",
      },
    ],
  },
];

const NECESSIDADES = [
  {
    key: "precisaAuth" as const,
    label: "Autenticação",
    desc: "Controle de quem pode acessar o sistema. Necessário se houver cadastro, login ou áreas restritas.",
    exemplo: "Ex: sistema com contas de usuário, área logada, ou dados privados por pessoa",
  },
  {
    key: "precisaBanco" as const,
    label: "Banco de dados",
    desc: "Armazenamento persistente de informações — tudo que precisa ser salvo e consultado depois.",
    exemplo: "Ex: salvar clientes, pedidos, mensagens, configurações de conta",
  },
  {
    key: "precisaPagamento" as const,
    label: "Pagamentos",
    desc: "Processamento de cobranças dentro do próprio sistema, com cartão, PIX ou boleto.",
    exemplo: "Ex: checkout de produto, assinatura mensal, cobrança de serviço",
  },
];

const STACKS_OPCOES = [
  {
    label: "Next.js",
    categoria: "Frontend",
    desc: "Framework principal para criar sites e sistemas web completos com React.",
    quando: "Use para qualquer projeto web — funciona como frontend e backend ao mesmo tempo",
  },
  {
    label: "React",
    categoria: "Frontend",
    desc: "Biblioteca para construir interfaces com componentes reutilizáveis.",
    quando: "Use quando quer só o frontend, sem o servidor do Next.js",
  },
  {
    label: "Vue.js",
    categoria: "Frontend",
    desc: "Alternativa ao React — mais simples para quem está começando com JavaScript.",
    quando: "Use se já tem experiência com Vue ou prefere uma curva de aprendizado menor",
  },
  {
    label: "Tailwind CSS",
    categoria: "Estilo",
    desc: "Framework de CSS que você aplica diretamente no HTML. Rápido e sem arquivos CSS separados.",
    quando: "Use para estilizar qualquer projeto — é a escolha mais popular hoje em dia",
  },
  {
    label: "shadcn/ui",
    categoria: "Componentes",
    desc: "Coleção de componentes prontos (botão, modal, tabela, formulário) para React/Next.js.",
    quando: "Use para não criar tudo do zero — os componentes são bonitos e acessíveis",
  },
  {
    label: "Supabase",
    categoria: "Backend + Banco",
    desc: "Backend pronto com banco de dados (PostgreSQL), login e armazenamento de arquivos.",
    quando: "Use quando quer autenticação e banco sem criar um servidor do zero. Gratuito para começar",
  },
  {
    label: "Firebase",
    categoria: "Backend + Banco",
    desc: "Plataforma do Google com banco em tempo real, login e hospedagem de arquivos.",
    quando: "Use para apps mobile, chats em tempo real ou projetos com ecossistema Google",
  },
  {
    label: "PostgreSQL",
    categoria: "Banco de dados",
    desc: "Banco de dados relacional robusto e confiável. O mais usado em sistemas sérios.",
    quando: "Use quando os dados têm relações complexas (clientes têm pedidos, pedidos têm itens...)",
  },
  {
    label: "MongoDB",
    categoria: "Banco de dados",
    desc: "Banco NoSQL que armazena dados em formato flexível, sem estrutura rígida de tabelas.",
    quando: "Use quando os dados mudam muito de formato ou são documentos e objetos aninhados",
  },
  {
    label: "Prisma",
    categoria: "ORM",
    desc: "Ferramenta que facilita a comunicação entre o código e o banco de dados — sem escrever SQL.",
    quando: "Use com PostgreSQL ou MySQL para consultar o banco de forma mais segura e legível",
  },
  {
    label: "Stripe",
    categoria: "Pagamentos",
    desc: "Plataforma de pagamentos internacional. Aceita cartão, suporta assinaturas recorrentes.",
    quando: "Use para cobrar em reais ou dólares com cartão. Plano gratuito para desenvolvimento",
  },
  {
    label: "Mercado Pago",
    categoria: "Pagamentos",
    desc: "Plataforma de pagamentos brasileira. Aceita PIX, boleto, cartão e parcelamento.",
    quando: "Use se o público é brasileiro e quer PIX como opção de pagamento",
  },
  {
    label: "Vercel",
    categoria: "Deploy",
    desc: "Plataforma de hospedagem otimizada para Next.js. Deploy automático pelo GitHub.",
    quando: "Use para qualquer projeto Next.js — é gratuito para projetos pessoais e pequenos",
  },
  {
    label: "Railway",
    categoria: "Deploy",
    desc: "Plataforma simples para hospedar backend, banco de dados e qualquer linguagem.",
    quando: "Use quando precisa de backend personalizado ou banco próprio com custo baixo",
  },
  {
    label: "Node.js",
    categoria: "Backend",
    desc: "Ambiente para rodar JavaScript no servidor — base de qualquer backend em JS.",
    quando: "Use quando precisa criar APIs, automações ou scripts do lado do servidor",
  },
  {
    label: "TypeScript",
    categoria: "Linguagem",
    desc: "Versão do JavaScript com tipagem — detecta erros antes de rodar o código.",
    quando: "Use sempre que possível. Evita uma classe enorme de bugs em projetos maiores",
  },
  {
    label: "n8n",
    categoria: "Automação",
    desc: "Ferramenta visual para criar automações e fluxos entre sistemas sem muito código.",
    quando: "Use para conectar APIs, enviar e-mails automáticos, processar dados periodicamente",
  },
];

const DEPLOY_OPCOES = [
  {
    label: "Vercel",
    custo: "Grátis no plano Hobby",
    pros: "Deploy automático pelo GitHub, configuração em 2 minutos, otimizado para Next.js",
    contras: "Funções têm limite de 10 segundos, banco de dados precisa ser externo",
  },
  {
    label: "Netlify",
    custo: "Grátis no plano básico",
    pros: "Fácil de configurar, bom para sites estáticos e frontends",
    contras: "Menos otimizado para Next.js do que Vercel, backend limitado",
  },
  {
    label: "Railway",
    custo: "~$5/mês após o trial",
    pros: "Suporta backend completo, banco incluído, qualquer linguagem",
    contras: "Tem custo após o período grátis, mais configuração necessária",
  },
  {
    label: "Render",
    custo: "Grátis (com limitações) ou ~$7/mês",
    pros: "Suporta backend, banco, crons. Boa alternativa ao Railway",
    contras: "No plano grátis o servidor 'dorme' após inatividade e demora para acordar",
  },
  {
    label: "VPS (DigitalOcean, etc.)",
    custo: "A partir de ~$6/mês",
    pros: "Controle total, sem limitações de plataforma, ideal para projetos grandes",
    contras: "Requer configuração manual de servidor, mais técnico de manter",
  },
  {
    label: "Ainda não sei",
    custo: "—",
    pros: "A IA vai sugerir a melhor opção para o tipo de projeto",
    contras: "—",
  },
];

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
    <div className="space-y-8 step-animate">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Contexto do projeto</h2>
        <p className="text-zinc-500 text-sm">
          Quanto mais detalhe você der, mais preciso e útil fica o PRD.
        </p>
      </div>

      {/* Problema */}
      <div>
        <label className="block text-sm font-medium text-zinc-300 mb-1.5">
          Qual problema este projeto resolve? <span className="text-emerald-400">*</span>
        </label>
        <textarea
          value={data.problema}
          onChange={(e) => onChange({ problema: e.target.value })}
          placeholder="Descreva o problema de forma clara. Ex: Freelancers perdem horas toda semana organizando propostas em planilhas sem padrão — cliente espera dias para receber, e quando chega parece amador..."
          rows={3}
          className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-colors resize-none text-sm"
        />
      </div>

      {/* Público */}
      <div>
        <label className="block text-sm font-medium text-zinc-300 mb-1.5">
          Quem vai usar? <span className="text-emerald-400">*</span>
        </label>
        <input
          type="text"
          value={data.publicoAlvo}
          onChange={(e) => onChange({ publicoAlvo: e.target.value })}
          placeholder="Ex: Freelancers digitais, donos de pequenas agências, gestores de tráfego..."
          className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-colors text-sm"
        />
      </div>

      {/* Features */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-medium text-zinc-300">Features desejadas</label>
          {data.features.length > 0 && (
            <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
              {data.features.length} selecionadas
            </span>
          )}
        </div>

        <div className="space-y-5">
          {FEATURES_GRUPOS.map((grupo) => (
            <div key={grupo.grupo}>
              <p className="text-xs text-zinc-600 uppercase tracking-wide mb-2">
                {grupo.grupo}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {grupo.items.map((f) => {
                  const selecionada = data.features.includes(f.label);
                  return (
                    <button
                      key={f.label}
                      onClick={() => toggleFeature(f.label)}
                      className={`text-left px-3 py-3 rounded-lg border transition-all ${
                        selecionada
                          ? "bg-emerald-500/10 border-emerald-500/50"
                          : "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
                      }`}
                    >
                      <div className={`text-sm font-medium mb-1 ${selecionada ? "text-emerald-300" : "text-zinc-300"}`}>
                        {selecionada ? "✓ " : ""}{f.label}
                      </div>
                      <div className="text-xs text-zinc-500 leading-relaxed">{f.desc}</div>
                      <div className="text-xs text-zinc-600 mt-1 italic">{f.exemplo}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2 mt-4">
          <input
            type="text"
            value={featureCustom}
            onChange={(e) => setFeatureCustom(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addFeatureCustom()}
            placeholder="Adicionar outra feature não listada..."
            className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500"
          />
          <button
            onClick={addFeatureCustom}
            className="px-4 py-2 bg-zinc-800 border border-zinc-700 text-zinc-300 rounded-lg text-sm hover:border-zinc-500"
          >
            +
          </button>
        </div>
        {featuresCustom.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {featuresCustom.map((f) => (
              <span
                key={f}
                className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full text-xs"
              >
                {f}
                <button onClick={() => toggleFeature(f)} className="ml-1 hover:text-white">×</button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Necessidades técnicas */}
      <div>
        <label className="block text-sm font-medium text-zinc-300 mb-3">
          O projeto vai precisar de...
        </label>
        <div className="space-y-2">
          {NECESSIDADES.map(({ key, label, desc, exemplo }) => {
            const ativo = data[key] as boolean;
            return (
              <button
                key={key}
                onClick={() => onChange({ [key]: !ativo })}
                className={`w-full text-left px-4 py-3 rounded-lg border transition-all ${
                  ativo
                    ? "bg-emerald-500/10 border-emerald-500/50"
                    : "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded flex items-center justify-center text-xs shrink-0 border ${
                    ativo ? "bg-emerald-500 border-emerald-500 text-black font-bold" : "border-zinc-600"
                  }`}>
                    {ativo ? "✓" : ""}
                  </div>
                  <div>
                    <div className={`text-sm font-medium ${ativo ? "text-emerald-300" : "text-zinc-300"}`}>
                      {label}
                    </div>
                    <div className="text-xs text-zinc-500 mt-0.5">{desc}</div>
                    <div className="text-xs text-zinc-600 italic mt-0.5">{exemplo}</div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {data.precisaBanco && (
          <div className="mt-3">
            <p className="text-xs text-zinc-500 mb-2">Qual tipo de banco?</p>
            <div className="flex gap-2">
              {[
                { label: "SQL", desc: "PostgreSQL, MySQL — dados com relações e estrutura fixa" },
                { label: "NoSQL", desc: "MongoDB — dados flexíveis ou que mudam de formato" },
                { label: "Não sei", desc: "A IA vai recomendar o mais adequado" },
              ].map((t) => (
                <button
                  key={t.label}
                  onClick={() => onChange({ tipoBanco: t.label })}
                  className={`flex-1 py-2.5 px-2 rounded-lg border text-xs transition-all text-center ${
                    data.tipoBanco === t.label
                      ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-300"
                      : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700"
                  }`}
                >
                  <div className="font-medium">{t.label}</div>
                  <div className="text-zinc-500 mt-0.5 leading-tight">{t.desc}</div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Stack preferida */}
      <div>
        <div className="mb-3">
          <label className="block text-sm font-medium text-zinc-300">
            Stack preferida{" "}
            <span className="text-zinc-600 font-normal text-xs">
              — opcional. Se não selecionar nada, a IA sugere 2 opções
            </span>
          </label>
        </div>
        <div className="space-y-4">
          {["Frontend", "Estilo", "Componentes", "Backend + Banco", "Banco de dados", "ORM", "Pagamentos", "Deploy", "Backend", "Linguagem", "Automação"].map((cat) => {
            const items = STACKS_OPCOES.filter((s) => s.categoria === cat);
            if (items.length === 0) return null;
            return (
              <div key={cat}>
                <p className="text-xs text-zinc-600 uppercase tracking-wide mb-2">{cat}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {items.map((s) => {
                    const selecionada = stacksSelecionadas.includes(s.label);
                    return (
                      <button
                        key={s.label}
                        onClick={() => toggleStack(s.label)}
                        className={`text-left px-3 py-3 rounded-lg border transition-all ${
                          selecionada
                            ? "bg-blue-500/10 border-blue-500/40"
                            : "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
                        }`}
                      >
                        <div className={`text-sm font-medium mb-1 ${selecionada ? "text-blue-300" : "text-zinc-300"}`}>
                          {selecionada ? "✓ " : ""}{s.label}
                        </div>
                        <div className="text-xs text-zinc-500">{s.desc}</div>
                        <div className="text-xs text-zinc-600 italic mt-0.5">{s.quando}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Referências de design */}
      <div>
        <label className="block text-sm font-medium text-zinc-300 mb-1.5">
          Referências de design{" "}
          <span className="text-zinc-600 font-normal text-xs">— opcional</span>
        </label>
        <input
          type="text"
          value={data.referenciaDesign}
          onChange={(e) => onChange({ referenciaDesign: e.target.value })}
          placeholder="Ex: Notion, Linear, Stripe, Vercel, Raycast..."
          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500 text-sm"
        />
        <p className="text-xs text-zinc-600 mt-1.5 leading-relaxed">
          Escreva o nome de produtos cujo visual você admira — não cole URLs, pois a IA não consegue acessar sites.
          O nome já ajuda a IA a entender a direção visual esperada.
        </p>
      </div>

      {/* Deploy */}
      <div>
        <label className="block text-sm font-medium text-zinc-300 mb-3">
          Onde quer fazer o deploy?
        </label>
        <div className="space-y-2">
          {DEPLOY_OPCOES.map((d) => {
            const selecionado = data.deployAlvo === d.label;
            return (
              <button
                key={d.label}
                onClick={() => onChange({ deployAlvo: d.label })}
                className={`w-full text-left px-4 py-3 rounded-lg border transition-all ${
                  selecionado
                    ? "bg-purple-500/10 border-purple-500/40"
                    : "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-sm font-medium ${selecionado ? "text-purple-300" : "text-zinc-300"}`}>
                    {d.label}
                  </span>
                  <span className="text-xs text-zinc-500">{d.custo}</span>
                </div>
                {d.contras !== "—" && (
                  <div className="grid grid-cols-2 gap-x-4 mt-1">
                    <div className="text-xs text-zinc-500">+ {d.pros}</div>
                    <div className="text-xs text-zinc-600">- {d.contras}</div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex gap-3 pt-1">
        <button
          onClick={onBack}
          className="px-6 py-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 font-medium rounded-lg transition-all text-sm"
        >
          Voltar
        </button>
        <button
          onClick={onNext}
          disabled={!podeAvancar}
          className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-400 disabled:bg-zinc-800 disabled:text-zinc-600 text-black font-semibold rounded-lg transition-all glow-emerald"
        >
          Gerar PRD com Llama
        </button>
      </div>
    </div>
  );
}
