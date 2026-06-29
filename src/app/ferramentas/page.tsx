'use client';

import Link from 'next/link';
import { useState } from 'react';

/* ── tipos ── */
type GuiaId = 'm3-guia' | 'm3-install' | null;

/* ── dados dos cards ── */
const FERRAMENTAS = [
  {
    id: 'm3-guia' as GuiaId,
    etiqueta: 'design system',
    titulo: 'Guia completo do Material Design 3',
    desc: 'Do zero ao primeiro projeto com M3. Entenda o que é, como navegar o site, como funcionam as cores, os componentes e o Figma. Inclui glossário para iniciantes.',
    info: '6 etapas • interativo',
  },
  {
    id: 'm3-install' as GuiaId,
    etiqueta: 'instalação',
    titulo: 'Instalando M3 no seu site',
    desc: 'Passo a passo real para usar Material Design 3 em HTML/CSS puro ou em React/Next.js. Com exemplos de código prontos para copiar.',
    info: '2 formatos • com código',
  },
];

/* ════════════════════════════════════════════
   GUIA COMPLETO M3
════════════════════════════════════════════ */
const STEPS_M3 = [
  {
    emoji: '🎓',
    titulo: 'O que é o Material Design 3?',
    sub: 'Entenda a ideia antes de abrir o site',
    conteudo: (
      <div className='ft-guide-body'>
        <div className='ft-analogy'>
          <span className='ft-analogy-icon'>🧱</span>
          <p>
            <strong>Imagine que você vai construir uma casa.</strong> Em vez de
            inventar do zero como fazer uma janela, uma porta ou uma escada —
            você compra componentes prontos que já foram testados, já têm medidas
            certas e já combinam entre si. O Material Design 3 é exatamente isso,
            mas para <strong>interfaces digitais</strong>.
          </p>
        </div>
        <div className='ft-block ft-block--purple'>
          <h3>O que é exatamente?</h3>
          <p>
            É um <strong>sistema de design criado pelo Google</strong> — uma
            coleção de regras, componentes visuais (botões, cards, menus) e
            guias que ajudam a criar interfaces bonitas, funcionais e acessíveis
            sem precisar inventar tudo do zero.
          </p>
        </div>
        <div className='ft-block ft-block--green'>
          <h3>Para que serve na prática?</h3>
          <ul>
            <li>Criar telas de apps, dashboards ou sites com visual profissional</li>
            <li>Garantir que as cores tenham contraste legível automaticamente</li>
            <li>Ter botões, menus e formulários que 'fazem sentido' para o usuário</li>
            <li>Agilizar o trabalho: você não cria, você <em>escolhe e adapta</em></li>
          </ul>
        </div>
        <div className='ft-block ft-block--orange'>
          <h3>Quem usa isso?</h3>
          <p>
            Designers de produto, devs front-end e gestores de produto. Você
            pode usar para criar protótipos, fazer wireframes e comunicar ideias
            visualmente sem precisar de um designer à mão.
          </p>
        </div>
        <div className='ft-block ft-block--blue'>
          <h3>M3 vs versões anteriores</h3>
          <p>
            O M3 é a <strong>terceira geração</strong> do Material Design. A
            diferença principal: ele tem um sistema de cores muito mais
            personalizado e componentes mais modernos. Se você ver 'Material You'
            em algum lugar, é o mesmo M3.
          </p>
        </div>
      </div>
    ),
  },
  {
    emoji: '🗺️',
    titulo: 'Navegando o site m3.material.io',
    sub: 'Um mapa de cada seção — o que você vai encontrar em cada uma',
    conteudo: <NavegacaoSite />,
  },
  {
    emoji: '🎨',
    titulo: 'Sistema de Cores — o coração do M3',
    sub: 'Como funciona e como gerar a paleta do seu projeto',
    conteudo: (
      <div className='ft-guide-body'>
        <div className='ft-analogy'>
          <span className='ft-analogy-icon'>🌈</span>
          <p>
            Imagine que você tem uma cor favorita. O M3 pega essa cor e{' '}
            <strong>constrói um universo de cores</strong> ao redor dela — tons
            mais claros, mais escuros, cores de apoio, cores de fundo — tudo
            calculado para ficar bonito E legível. Você não precisa escolher cada
            cor manualmente.
          </p>
        </div>
        <div className='ft-block ft-block--purple'>
          <h3>O que são 'papéis de cor' (Color Roles)?</h3>
          <p>
            Cada cor no M3 tem um <strong>papel</strong> — uma função específica.
            Pense como uma peça de teatro: cada ator tem um papel definido.
          </p>
        </div>
        <div className='ft-color-row'>
          {[
            { bg: '#6750A4', fg: '#fff', nome: 'Primary', desc: 'Ações principais' },
            { bg: '#625B71', fg: '#fff', nome: 'Secondary', desc: 'Destaques' },
            { bg: '#7D5260', fg: '#fff', nome: 'Tertiary', desc: 'Contraste' },
            { bg: '#ECE6F0', fg: '#333', nome: 'Surface', desc: 'Fundos' },
            { bg: '#B3261E', fg: '#fff', nome: 'Error', desc: 'Erros' },
          ].map((c) => (
            <div
              key={c.nome}
              className='ft-chip'
              style={{ background: c.bg, color: c.fg }}
            >
              <strong>{c.nome}</strong>
              <span>{c.desc}</span>
            </div>
          ))}
        </div>
        <div className='ft-block ft-block--blue'>
          <h3>📌 Regra importante: 'On' colors</h3>
          <p>
            Para cada cor, existe uma cor 'On' — é a cor do texto ou ícone que
            fica <em>sobre</em> ela. Ex: sobre o fundo 'Primary' (roxo), o texto
            é 'On Primary' (branco). Isso garante contraste automático.
          </p>
        </div>
        <div className='ft-block ft-block--green'>
          <h3>Como gerar sua paleta — passo a passo</h3>
          <ol>
            <li>Acesse: <strong>material-foundation.github.io/material-theme-builder</strong></li>
            <li>Clique em <strong>'Primary'</strong> no painel de cores</li>
            <li>Insira o hexadecimal da cor do cliente (ex: #FF5722)</li>
            <li>O sistema gera TODAS as outras cores automaticamente</li>
            <li>Visualize ao vivo como a interface fica com essas cores</li>
            <li>Clique em <strong>'Export'</strong> → escolha <strong>'Figma'</strong></li>
          </ol>
        </div>
        <div className='ft-block ft-block--orange'>
          <h3>⚠️ E se eu já tiver uma paleta definida?</h3>
          <p>
            Você não perde a identidade visual do cliente. Coloque a cor primária
            da paleta existente no builder — ele gera os tons complementares a
            partir dela. Os tons que o cliente já definiu você pode forçar
            manualmente. O sistema garante o contraste e a acessibilidade; você
            adapta o M3 à marca, não o contrário.
          </p>
        </div>
      </div>
    ),
  },
  {
    emoji: '🧩',
    titulo: 'Componentes — os blocos da interface',
    sub: 'Como ler a documentação de cada componente e escolher o certo',
    conteudo: (
      <div className='ft-guide-body'>
        <div className='ft-analogy'>
          <span className='ft-analogy-icon'>🛒</span>
          <p>
            Pense nos componentes como <strong>produtos de supermercado</strong>:
            você não fabrica o arroz — você escolhe a marca, o tipo e o tamanho.
            No M3, você não cria um botão do zero — você escolhe qual tipo faz
            mais sentido para aquela ação.
          </p>
        </div>
        <div className='ft-block ft-block--purple'>
          <h3>Como ler uma página de componente no site</h3>
          <ul>
            <li><strong>Overview:</strong> o que é e para que serve — leia sempre</li>
            <li><strong>Usage:</strong> quando usar e quando NÃO usar — muito importante</li>
            <li><strong>Specs:</strong> medidas exatas (espaçamento, tamanho)</li>
            <li><strong>Accessibility:</strong> como tornar acessível</li>
          </ul>
        </div>
        <div className='ft-comp-demo'>
          <p className='ft-comp-label'>Exemplo: Botões — 3 variantes, 3 usos diferentes</p>
          <div className='ft-btn-row'>
            <span className='ft-demo-btn ft-demo-btn--filled'>Filled</span>
            <span className='ft-demo-btn ft-demo-btn--outlined'>Outlined</span>
            <span className='ft-demo-btn ft-demo-btn--text'>Text</span>
          </div>
          <div className='ft-comp-desc'>
            <p><strong>Filled (preenchido):</strong> ação mais importante da tela. Use 1 por tela.</p>
            <p><strong>Outlined (contorno):</strong> ação secundária, menos urgente.</p>
            <p><strong>Text:</strong> ação terciária ou dentro de cards.</p>
          </div>
        </div>
        <div className='ft-block ft-block--green'>
          <h3>Os 5 componentes mais usados para começar</h3>
          <ul>
            <li><strong>Buttons</strong> — toda interface precisa</li>
            <li><strong>Cards</strong> — organiza qualquer conteúdo</li>
            <li><strong>Text fields</strong> — formulários</li>
            <li><strong>Navigation bar</strong> — menu principal mobile</li>
            <li><strong>App bar</strong> — cabeçalho de tela</li>
          </ul>
        </div>
        <div className='ft-comp-grid'>
          {[
            { nome: 'Ações', itens: ['Buttons (filled, outlined, text)', 'FAB (ação principal)', 'Icon buttons', 'Segmented buttons'] },
            { nome: 'Navegação', itens: ['Navigation bar (mobile)', 'Navigation drawer (desktop)', 'Navigation rail (tablet)', 'Tabs'] },
            { nome: 'Conteúdo', itens: ['Cards', 'Lists', 'Chips', 'Badges'] },
            { nome: 'Formulários', itens: ['Text fields', 'Checkboxes', 'Radio buttons', 'Switches'] },
            { nome: 'Feedback', itens: ['Snackbar', 'Dialog', 'Progress indicators', 'Tooltips'] },
            { nome: 'Containers', itens: ['App bars (top/bottom)', 'Bottom sheets', 'Side sheets', 'Dividers'] },
          ].map((g) => (
            <div key={g.nome} className='ft-comp-card'>
              <h4>{g.nome}</h4>
              <ul>{g.itens.map((i) => <li key={i}>{i}</li>)}</ul>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    emoji: '🖥️',
    titulo: 'Usando M3 no Figma — do zero',
    sub: 'O passo a passo real para montar sua primeira tela',
    conteudo: (
      <div className='ft-guide-body'>
        {[
          { n: '1', t: 'Abra o Figma e crie um novo arquivo', d: `Em figma.com, clique em "New design file". Esse será o arquivo do seu projeto.`, onde: 'figma.com → New design file' },
          { n: '2', t: 'Importe o Kit oficial do M3', d: `Vá em figma.com/community e busque "Material 3 Design Kit". Encontre o arquivo do Google. Clique em "Open in Figma". Todos os componentes ficam disponíveis na sua biblioteca.`, onde: 'figma.com/community → Material 3 Design Kit' },
          { n: '3', t: 'Instale o plugin Material Theme Builder', d: `No Figma, vá em Menu → Plugins → Browse plugins. Busque "Material Theme Builder". Instale. É o plugin que vai transformar as cores do kit para a cor do seu cliente.`, onde: 'Figma → Menu → Plugins → Browse' },
          { n: '4', t: 'Rode o plugin com a cor do seu projeto', d: `Abra o plugin, coloque a cor primária do cliente no campo "Primary". Clique em "Apply to file". Todos os componentes do kit mudam de cor automaticamente.`, onde: 'Plugins → Material Theme Builder → Primary → Apply' },
          { n: '5', t: 'Crie um frame (tela) para começar', d: `Pressione F no Figma e escolha um tamanho de tela (ex: iPhone 14 para mobile). Esse é o "canvas" onde você vai montar a interface.`, onde: 'Tecla F → selecione tamanho → clique na tela' },
          { n: '6', t: 'Arraste componentes do kit para a tela', d: `No painel lateral esquerdo, clique em "Assets" (ícone de caixinha). Busque "Button" ou "Card" e arraste para o frame. Os componentes já têm as cores do projeto.`, onde: 'Painel esquerdo → Assets → busque → arraste' },
          { n: '7', t: 'Troque textos e adapte o conteúdo', d: 'Dê duplo clique em qualquer texto para editar. Não mexa nas cores diretamente — use sempre os componentes do kit para manter consistência.', onde: 'Duplo clique no texto → edite → Enter para confirmar' },
          { n: '8', t: 'Compartilhe ou exporte', d: `Para apresentar: Share → ative "Anyone with the link can view". Para exportar: selecione o frame → painel direito → Export → PNG ou PDF.`, onde: 'Share (canto superior) ou Export no painel direito' },
        ].map((p, i, arr) => (
          <div key={p.n} className='ft-fstep'>
            <div className='ft-fstep-left'>
              <div className='ft-fstep-num'>{p.n}</div>
              {i < arr.length - 1 && <div className='ft-fstep-line' />}
            </div>
            <div className='ft-fstep-body'>
              <h4>{p.t}</h4>
              <p>{p.d}</p>
              <span className='ft-where'>📍 {p.onde}</span>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    emoji: '📖',
    titulo: 'Glossário — palavras que você vai ouvir',
    sub: 'Significado simples dos termos técnicos do M3',
    conteudo: (
      <div className='ft-guide-body'>
        {[
          { t: 'Design System', d: 'Um conjunto de regras, componentes e guias que garante consistência visual em todo o produto. O M3 é um design system.' },
          { t: 'Token', d: `Um valor com nome. Em vez de escrever "#6750A4", você usa o token "color-primary". Se a cor mudar, muda só no token e atualiza em todo lugar.` },
          { t: 'Component / Componente', d: 'Um bloco visual reutilizável: botão, card, campo de texto. Já vem com comportamento, variantes e estados definidos.' },
          { t: 'Variant / Variante', d: `Versões diferentes do mesmo componente. Ex: botão tem variantes "filled", "outlined" e "text" — são o mesmo componente com aparências diferentes.` },
          { t: 'Color Role / Papel de cor', d: `A função de uma cor no sistema. "Primary" é a cor de ações principais. "Surface" é a cor de fundo. Cada papel tem um propósito.` },
          { t: 'Frame (Figma)', d: `O equivalente a uma "tela" no Figma. Você cria um frame do tamanho de um celular e monta a interface dentro dele.` },
          { t: 'Elevation / Elevação', d: `O nível de "altura" visual de um elemento. Elementos com maior elevação parecem estar "na frente" dos outros, geralmente com sombra.` },
          { t: 'Accessibility / Acessibilidade', d: 'Garantir que a interface funciona para pessoas com deficiência visual, motora, etc. O M3 inclui diretrizes de contraste mínimo de cores.' },
          { t: 'Breakpoint', d: `O ponto onde o layout "quebra" e se adapta. Ex: abaixo de 600px de largura, a interface vira versão mobile.` },
          { t: 'Handoff', d: 'A entrega do design para o desenvolvedor. No Figma, você compartilha o arquivo e o dev consegue ver medidas, cores e especificações direto na ferramenta.' },
        ].map((item) => (
          <div key={item.t} className='ft-gloss-item'>
            <p className='ft-gloss-term'>{item.t}</p>
            <p className='ft-gloss-def'>{item.d}</p>
          </div>
        ))}
      </div>
    ),
  },
];

function NavegacaoSite() {
  const [aberto, setAberto] = useState<number | null>(null);
  const secoes = [
    {
      icon: '🏠', nome: 'Get started (Começar)',
      desc: 'A porta de entrada do site. Explica o que é o M3 e como ele funciona. Se você ler só uma coisa no site, leia essa seção.',
      itens: ['Design: visão geral do sistema de design', 'Develop: como implementar em código (não precisa agora)'],
    },
    {
      icon: '🎨', nome: 'Styles (Estilos)',
      desc: `Aqui ficam as bases visuais do sistema. É onde você aprende as "regras" de cor, tipografia e formas antes de começar a montar qualquer coisa.`,
      itens: ['Color: como as cores funcionam e se relacionam', 'Typography: escalas de texto — qual tamanho usar em cada situação', `Elevation: sombras e camadas (o que está "na frente" ou "atrás")`, 'Icons: biblioteca de ícones do Google (2.500+)', 'Shape: bordas arredondadas — quando usar mais ou menos', 'Motion: animações e transições (avançado, pode pular)'],
    },
    {
      icon: '🧩', nome: 'Components (Componentes)',
      desc: 'A seção mais usada no dia a dia. São os blocos prontos que você vai usar nas suas telas. Cada componente tem uma página explicando:',
      itens: ['✅ Para que serve', '✅ Variantes disponíveis', '✅ Quando usar cada variante', '✅ Como ele se comporta em diferentes tamanhos de tela', '✅ Erros comuns (o que NÃO fazer)'],
    },
    {
      icon: '📐', nome: 'Layout',
      desc: 'Explica como organizar os elementos na tela. Margens, grades (grids), breakpoints.',
      itens: ['Adaptive design: como o layout se adapta ao tamanho da tela', 'Understanding layout: princípios básicos de grid e espaçamento', 'Applying layout: exemplos práticos'],
    },
    {
      icon: '📋', nome: 'Patterns (Padrões)',
      desc: 'Vai além dos componentes isolados — mostra como combinar vários elementos para resolver situações comuns de design.',
      itens: ['Navigation: como estruturar a navegação de um app', 'Search: como montar uma busca', 'Forms: como criar formulários intuitivos', 'Notifications: como comunicar alertas ao usuário'],
    },
    {
      icon: '🛠️', nome: 'Blog & Resources',
      desc: 'Artigos, atualizações do sistema e links para ferramentas externas como o Material Theme Builder e os kits de componentes para Figma.',
      itens: [],
    },
  ];
  return (
    <div className='ft-guide-body'>
      <div className='ft-block ft-block--purple'>
        <h3>Abrindo o site pela primeira vez</h3>
        <p>Quando você entra em <strong>m3.material.io</strong>, vai ver um menu lateral à esquerda com várias seções. Não precisa ler tudo — entenda o que cada seção contém e acesse quando precisar.</p>
      </div>
      {secoes.map((s, i) => (
        <div key={s.nome} className='ft-accordion'>
          <button className='ft-accordion-header' onClick={() => setAberto(aberto === i ? null : i)}>
            <span>{s.icon} {s.nome}</span>
            <span className='ft-accordion-arrow'>{aberto === i ? '▲' : '▶'}</span>
          </button>
          {aberto === i && (
            <div className='ft-accordion-body'>
              <p>{s.desc}</p>
              {s.itens.length > 0 && <ul>{s.itens.map((it) => <li key={it}>{it}</li>)}</ul>}
            </div>
          )}
        </div>
      ))}
      <div className='ft-block ft-block--green' style={{ marginTop: '14px' }}>
        <h3>💡 Dica de navegação</h3>
        <p>Na sua primeira semana, leia só: <strong>Get Started → Color → Components</strong>. O resto você acessa conforme a necessidade aparecer.</p>
      </div>
    </div>
  );
}

function GuiaM3() {
  const [step, setStep] = useState(0);
  const atual = STEPS_M3[step];
  return (
    <div className='ft-guia'>
      <div className='ft-guia-steps'>
        {STEPS_M3.map((s, i) => (
          <button
            key={i}
            className={`ft-guia-step-btn${step === i ? ' active' : ''}${i < step ? ' done' : ''}`}
            onClick={() => setStep(i)}
          >
            <span className='ft-guia-step-num'>{i < step ? '✓' : i + 1}</span>
            <span className='ft-guia-step-label'>{s.emoji} {s.titulo}</span>
          </button>
        ))}
      </div>
      <div className='ft-guia-content'>
        <div className='ft-guia-header'>
          <p className='ft-guia-emoji'>{atual.emoji}</p>
          <div>
            <h2 className='ft-guia-title'>{atual.titulo}</h2>
            <p className='ft-guia-sub'>{atual.sub}</p>
          </div>
        </div>
        <div className='ft-guia-body'>{atual.conteudo}</div>
        <div className='ft-guia-nav'>
          <button className='btn ghost' onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}>← anterior</button>
          <span className='ft-guia-counter'>etapa {step + 1} de {STEPS_M3.length}</span>
          <button className='btn primary' onClick={() => setStep(Math.min(STEPS_M3.length - 1, step + 1))} disabled={step === STEPS_M3.length - 1}>próximo →</button>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   GUIA DE INSTALAÇÃO
════════════════════════════════════════════ */
function GuiaInstalacao() {
  const [aba, setAba] = useState<'html' | 'react'>('html');
  return (
    <div className='ft-install'>
      <div className='ft-install-tabs'>
        <button className={`ft-install-tab${aba === 'html' ? ' active' : ''}`} onClick={() => setAba('html')}>🌐 HTML / CSS</button>
        <button className={`ft-install-tab${aba === 'react' ? ' active' : ''}`} onClick={() => setAba('react')}>⚛️ React / Next.js</button>
      </div>

      {aba === 'html' && (
        <div className='ft-guide-body'>
          <div className='ft-block ft-block--purple'>
            <h3>O que você vai instalar</h3>
            <p>A biblioteca oficial do Google chama <strong>Material Web</strong>. Ela transforma componentes M3 em tags HTML simples. Você escreve <code className='ft-code-inline'>&lt;md-filled-button&gt;</code> e o botão aparece pronto.</p>
          </div>
          {[
            {
              n: '1', t: 'Adicione o script no <head> do seu HTML',
              d: 'A forma mais simples — sem instalar nada, só colar um link. Abre seu arquivo HTML e cole dentro da tag <head>:',
              code: `<head>\n  <!-- Material Web via CDN -->\n  <script type='importmap'>\n  {\n    'imports': {\n      '@material/web/': 'https://esm.run/@material/web/'\n    }\n  }\n  </script>\n  <script type='module'>\n    import '@material/web/all.js';\n  </script>\n</head>`,
              onde: 'Cole dentro do <head> do seu HTML',
            },
            {
              n: '2', t: 'Use os componentes como tags HTML normais',
              d: 'Agora você pode usar qualquer componente M3 direto no HTML. As tags começam com md-:',
              code: `<!-- Botões -->\n<md-filled-button>Cadastrar</md-filled-button>\n<md-outlined-button>Cancelar</md-outlined-button>\n<md-text-button>Ver mais</md-text-button>\n\n<!-- Campo de texto -->\n<md-filled-text-field\n  label='Seu email'\n  type='email'\n></md-filled-text-field>\n\n<!-- Checkbox e Switch -->\n<md-checkbox></md-checkbox>\n<md-switch></md-switch>`,
              onde: 'No <body> do seu HTML',
            },
            {
              n: '3', t: 'Aplique as cores do seu projeto com CSS',
              d: 'O M3 usa variáveis CSS para as cores. Substitua pelos hex do seu cliente:',
              code: `:root {\n  /* Substitua pelos hex do seu cliente */\n  --md-sys-color-primary: #6750A4;\n  --md-sys-color-on-primary: #FFFFFF;\n  --md-sys-color-secondary: #625B71;\n  --md-sys-color-surface: #FFFBFE;\n  --md-sys-color-background: #FFFBFE;\n  --md-sys-color-error: #B3261E;\n}`,
              onde: 'No seu arquivo styles.css',
            },
            {
              n: '4', t: 'Consulte a lista de componentes disponíveis',
              d: 'O site oficial tem todos os componentes com exemplos prontos para copiar.',
              code: null,
              onde: 'material.web.dev/components',
            },
          ].map((p) => (
            <div key={p.n} className='ft-fstep'>
              <div className='ft-fstep-left'>
                <div className='ft-fstep-num'>{p.n}</div>
                <div className='ft-fstep-line' />
              </div>
              <div className='ft-fstep-body'>
                <h4>{p.t}</h4>
                <p>{p.d}</p>
                {p.code && <pre className='ft-code'>{p.code}</pre>}
                <span className='ft-where'>📍 {p.onde}</span>
              </div>
            </div>
          ))}
          <div className='ft-block ft-block--orange'>
            <h3>⚠️ Limitação do CDN</h3>
            <p>O método com CDN carrega <strong>todos</strong> os componentes de uma vez — pode deixar o site um pouco mais lento. Para sites de produção, o ideal é instalar via npm e importar só o que usar.</p>
          </div>
        </div>
      )}

      {aba === 'react' && (
        <div className='ft-guide-body'>
          <div className='ft-block ft-block--purple'>
            <h3>O que você vai instalar</h3>
            <p>A biblioteca mais usada é o <strong>MUI (Material UI)</strong> — implementação completa do M3 para React. É a biblioteca de componentes mais popular do ecossistema React.</p>
          </div>
          {[
            {
              n: '1', t: 'Instale os pacotes no terminal',
              d: 'Dentro da pasta do seu projeto Next.js, rode no terminal:',
              code: `npm install @mui/material @emotion/react @emotion/styled\n\n# Se quiser ícones também:\nnpm install @mui/icons-material`,
              onde: 'Terminal na raiz do projeto',
            },
            {
              n: '2', t: 'Crie o arquivo de tema com as cores do cliente',
              d: 'Crie um arquivo theme.js (ou theme.ts) na raiz ou em uma pasta /lib:',
              code: `// src/theme.js\nimport { createTheme } from '@mui/material/styles';\n\nconst theme = createTheme({\n  palette: {\n    primary: {\n      main: '#6750A4', // cor do cliente\n    },\n    secondary: {\n      main: '#625B71',\n    },\n    error: {\n      main: '#B3261E',\n    },\n    background: {\n      default: '#FFFBFE',\n    },\n  },\n});\n\nexport default theme;`,
              onde: 'src/theme.js',
            },
            {
              n: '3', t: 'Envolva o app com o ThemeProvider',
              d: 'No Next.js, edite o arquivo _app.js (Pages Router) ou layout.js (App Router):',
              code: `'use client'; // só no App Router\n\nimport { ThemeProvider } from '@mui/material/styles';\nimport CssBaseline from '@mui/material/CssBaseline';\nimport theme from '../theme';\n\nexport default function RootLayout({ children }) {\n  return (\n    <ThemeProvider theme={theme}>\n      <CssBaseline />\n      {children}\n    </ThemeProvider>\n  );\n}`,
              onde: 'pages/_app.js ou app/layout.js',
            },
            {
              n: '4', t: 'Use os componentes nas suas páginas',
              d: 'Agora é só importar e usar — as cores do tema são aplicadas automaticamente:',
              code: `import Button from '@mui/material/Button';\nimport Card from '@mui/material/Card';\nimport TextField from '@mui/material/TextField';\n\nexport default function MinhaPage() {\n  return (\n    <div>\n      <Button variant='contained'>Cadastrar</Button>\n      <Button variant='outlined'>Cancelar</Button>\n\n      <TextField\n        label='Seu email'\n        type='email'\n        fullWidth\n      />\n\n      <Card>Conteúdo do card</Card>\n    </div>\n  );\n}`,
              onde: 'Qualquer página ou componente',
            },
            {
              n: '5', t: 'Consulte a documentação do MUI',
              d: 'Cada componente tem página própria com props, exemplos e playground interativo.',
              code: null,
              onde: 'mui.com/material-ui/all-components',
            },
          ].map((p) => (
            <div key={p.n} className='ft-fstep'>
              <div className='ft-fstep-left'>
                <div className='ft-fstep-num'>{p.n}</div>
                <div className='ft-fstep-line' />
              </div>
              <div className='ft-fstep-body'>
                <h4>{p.t}</h4>
                <p>{p.d}</p>
                {p.code && <pre className='ft-code'>{p.code}</pre>}
                <span className='ft-where'>📍 {p.onde}</span>
              </div>
            </div>
          ))}
          <div className='ft-block ft-block--blue'>
            <h3>💡 Observação sobre M3 no MUI</h3>
            <p>O MUI v5 usa Material Design 2 por padrão. Para ativar o M3, adicione <code className='ft-code-inline'>experimental_extendTheme</code> e consulte a documentação do MUI sobre Material You. Para a maioria dos projetos, o MUI padrão já resolve bem.</p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ════════════════════════════════════════════
   MODAL
════════════════════════════════════════════ */
function Modal({ id, onClose }: { id: GuiaId; onClose: () => void }) {
  const ferramenta = FERRAMENTAS.find((f) => f.id === id);
  if (!ferramenta) return null;
  return (
    <div className='ft-overlay' onClick={onClose}>
      <div className='ft-modal' onClick={(e) => e.stopPropagation()}>
        <div className='ft-modal-header'>
          <div>
            <span className='ft-modal-kicker'>{ferramenta.etiqueta}</span>
            <h2 className='ft-modal-title'>{ferramenta.titulo}</h2>
          </div>
          <button className='btn ghost ft-modal-close' onClick={onClose}>✕ fechar</button>
        </div>
        <div className='ft-modal-body'>
          {id === 'm3-guia' && <GuiaM3 />}
          {id === 'm3-install' && <GuiaInstalacao />}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   PÁGINA PRINCIPAL
════════════════════════════════════════════ */
export default function FerramentasPage() {
  const [modalAberto, setModalAberto] = useState<GuiaId>(null);

  return (
    <>
      <header className='topbar'>
        <div className='topbar-inner'>
          <div className='brand'>
            <span className='mark'>
              <svg xmlns='http://www.w3.org/2000/svg' width='17' height='17' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                <path d='M15.033 9.44a.647.647 0 0 1 0 1.12l-4.065 2.352a.645.645 0 0 1-.968-.56V7.648a.645.645 0 0 1 .967-.56z' />
                <path d='M12 17v4' /><path d='M8 21h8' />
                <rect x='2' y='3' width='20' height='14' rx='2' />
              </svg>
            </span>
            <Link href='/'>sos dev start</Link>
          </div>
          <div className='tabs'>
            <Link href='/criar' className='btn tab'>projeto</Link>
            <Link href='/ferramentas' className='btn tab active'>ferramentas</Link>
          </div>
        </div>
      </header>

      <div className='lp-shell' style={{ paddingTop: '56px', paddingBottom: '80px' }}>
        <div style={{ marginBottom: '40px' }}>
          <p className='kicker'>recursos de apoio</p>
          <h1 style={{ font: '900 42px/1 \'Manrope\', Arial, sans-serif', letterSpacing: '-2px', textTransform: 'lowercase', margin: '10px 0 14px' }}>
            outras ferramentas
          </h1>
          <p style={{ color: '#3f3744', fontSize: '15px', lineHeight: '1.5', maxWidth: '540px' }}>
            Guias, referências e recursos extras para complementar o seu processo de desenvolvimento.
            Clique em qualquer card para abrir o guia completo.
          </p>
        </div>

        <div className='ft-cards-grid'>
          {FERRAMENTAS.map((f) => (
            <article key={f.id} className='lp-feature-card ft-tool-card' onClick={() => setModalAberto(f.id)}>
              <span className='lp-feature-kicker'>{f.etiqueta}</span>
              <h3 className='lp-feature-title'>{f.titulo}</h3>
              <p className='lp-feature-desc'>{f.desc}</p>
              <div className='ft-card-footer'>
                <span className='ft-card-info'>{f.info}</span>
                <span className='btn primary ft-card-btn'>abrir guia →</span>
              </div>
            </article>
          ))}
        </div>
      </div>

      {modalAberto && <Modal id={modalAberto} onClose={() => setModalAberto(null)} />}

      <style>{`
        /* ── Cards grid ── */
        .ft-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 16px;
        }
        .ft-tool-card {
          cursor: pointer;
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .ft-card-footer {
          margin-top: auto;
          padding-top: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }
        .ft-card-info {
          font-size: 11px;
          font-weight: 800;
          color: #3f3744;
          font-family: 'JetBrains Mono', Consolas, monospace;
        }
        .ft-card-btn {
          font-size: 11px;
          padding: 6px 12px;
          min-height: 28px;
          pointer-events: none;
        }

        /* ── Modal / Overlay ── */
        .ft-overlay {
          position: fixed;
          inset: 0;
          background: #1b1b25CC;
          z-index: 100;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: 24px 16px;
          overflow-y: auto;
          backdrop-filter: blur(4px);
        }
        .ft-modal {
          background: #f7f7f4;
          border: 1px solid #1b1b2524;
          border-radius: 12px;
          width: 100%;
          max-width: 900px;
          overflow: hidden;
          box-shadow: 0 24px 64px #1b1b2540;
        }
        .ft-modal-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
          padding: 22px 24px;
          border-bottom: 1px solid #1b1b2524;
          background: #ffffff;
          position: sticky;
          top: 0;
          z-index: 2;
        }
        .ft-modal-kicker {
          display: block;
          color: #6f7b18;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 4px;
        }
        .ft-modal-title {
          margin: 0;
          font: 900 22px/1.1 'Manrope', Arial, sans-serif;
          letter-spacing: -0.8px;
          text-transform: lowercase;
        }
        .ft-modal-close { font-size: 12px; white-space: nowrap; }
        .ft-modal-body { overflow-y: auto; }

        /* ── Guia M3 layout ── */
        .ft-guia {
          display: grid;
          grid-template-columns: 240px 1fr;
          min-height: 540px;
        }
        .ft-guia-steps {
          border-right: 1px solid #1b1b2524;
          background: #f0f1ea;
          padding: 16px 12px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .ft-guia-step-btn {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 10px;
          border: 1px solid transparent;
          border-radius: 8px;
          background: transparent;
          text-align: left;
          cursor: pointer;
          transition: all 0.16s;
          font-size: 12px;
          color: #3f3744;
          font-weight: 600;
          font-family: 'Manrope', Arial, sans-serif;
        }
        .ft-guia-step-btn:hover { background: #ffffff80; border-color: #1b1b2518; }
        .ft-guia-step-btn.active { background: #ffffff; border-color: #b7c939; color: #1b1b25; }
        .ft-guia-step-btn.done .ft-guia-step-num { background: #6f7b18; }
        .ft-guia-step-num {
          min-width: 22px; height: 22px;
          border-radius: 50%;
          background: #1b1b2540;
          color: #fff;
          font-size: 10px;
          font-weight: 900;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: background 0.16s;
          font-family: 'JetBrains Mono', Consolas, monospace;
        }
        .ft-guia-step-btn.active .ft-guia-step-num { background: #b7c939; color: #1b1b25; }
        .ft-guia-step-label { line-height: 1.35; }
        .ft-guia-content {
          display: flex;
          flex-direction: column;
        }
        .ft-guia-header {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 22px 24px 16px;
          border-bottom: 1px solid #1b1b2524;
          background: #ffffff;
        }
        .ft-guia-emoji { font-size: 28px; line-height: 1; margin-top: 2px; }
        .ft-guia-title {
          margin: 0;
          font: 900 18px/1.2 'Manrope', Arial, sans-serif;
          letter-spacing: -0.5px;
          text-transform: lowercase;
        }
        .ft-guia-sub { margin: 4px 0 0; font-size: 12px; color: #3f3744; }
        .ft-guia-body { flex: 1; overflow-y: auto; max-height: 400px; padding: 20px 24px; }
        .ft-guia-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 14px 24px;
          border-top: 1px solid #1b1b2524;
          background: #f0f1ea;
        }
        .ft-guia-counter { font-size: 11px; color: #3f3744; font-family: 'JetBrains Mono', Consolas, monospace; }

        /* ── Instalação tabs ── */
        .ft-install { display: flex; flex-direction: column; }
        .ft-install-tabs {
          display: flex;
          border-bottom: 1px solid #1b1b2524;
          background: #f0f1ea;
        }
        .ft-install-tab {
          padding: 14px 20px;
          border: none;
          background: transparent;
          font: 700 13px 'Manrope', Arial, sans-serif;
          color: #3f3744;
          cursor: pointer;
          border-bottom: 3px solid transparent;
          transition: all 0.16s;
        }
        .ft-install-tab:hover { color: #1b1b25; }
        .ft-install-tab.active { color: #1b1b25; border-bottom-color: #b7c939; background: #f7f7f4; }
        .ft-install .ft-guide-body { padding: 20px 24px; max-height: 480px; overflow-y: auto; }

        /* ── Conteúdo dos guias ── */
        .ft-guide-body { display: flex; flex-direction: column; gap: 12px; }
        .ft-block {
          border-radius: 8px;
          padding: 14px 16px;
          border-left: 4px solid #1b1b2524;
        }
        .ft-block--purple { background: #f3eeff; border-left-color: #6750A4; }
        .ft-block--green  { background: #f1f8f1; border-left-color: #6f7b18; }
        .ft-block--orange { background: #fff8f0; border-left-color: #c87030; }
        .ft-block--blue   { background: #f0f5ff; border-left-color: #3060c8; }
        .ft-block h3 { font-size: 13px; font-weight: 800; margin-bottom: 6px; color: #1b1b25; }
        .ft-block p { font-size: 13px; color: #3f3744; line-height: 1.6; }
        .ft-block ul, .ft-block ol { padding-left: 18px; }
        .ft-block ul li, .ft-block ol li { font-size: 13px; color: #3f3744; margin-bottom: 4px; line-height: 1.5; }

        .ft-analogy {
          display: flex;
          gap: 12px;
          background: #fff8e8;
          border-radius: 8px;
          padding: 14px 16px;
          border-left: 4px solid #e0a020;
        }
        .ft-analogy-icon { font-size: 22px; flex-shrink: 0; }
        .ft-analogy p { font-size: 13px; color: #5a3a10; line-height: 1.6; }
        .ft-analogy strong { color: #7a4a10; }

        .ft-color-row { display: flex; gap: 6px; flex-wrap: wrap; }
        .ft-chip {
          border-radius: 8px;
          padding: 10px 12px;
          font-size: 11px;
          font-weight: 700;
          flex: 1;
          min-width: 70px;
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .ft-chip strong { font-size: 12px; }
        .ft-chip span { font-weight: 400; opacity: 0.85; }

        /* Comp demo */
        .ft-comp-demo {
          background: #ffffff;
          border: 1px solid #1b1b2524;
          border-radius: 8px;
          padding: 14px;
        }
        .ft-comp-label { font-size: 11px; font-weight: 900; color: #6f7b18; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 10px; }
        .ft-btn-row { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; margin-bottom: 10px; }
        .ft-demo-btn {
          border-radius: 20px;
          padding: 8px 18px;
          font-size: 12px;
          font-weight: 700;
          font-family: 'Manrope', Arial, sans-serif;
        }
        .ft-demo-btn--filled { background: #1b1b25; color: #b7c939; border: 1px solid transparent; }
        .ft-demo-btn--outlined { background: transparent; color: #1b1b25; border: 1.5px solid #1b1b2540; padding: 7px 17px; }
        .ft-demo-btn--text { background: transparent; color: #6f7b18; border: none; }
        .ft-comp-desc p { font-size: 12px; color: #3f3744; line-height: 1.6; }

        .ft-comp-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
        }
        .ft-comp-card {
          background: #ffffff;
          border: 1px solid #1b1b2524;
          border-radius: 8px;
          padding: 12px;
        }
        .ft-comp-card h4 { font-size: 11px; font-weight: 900; color: #6f7b18; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 6px; }
        .ft-comp-card ul { padding-left: 14px; }
        .ft-comp-card ul li { font-size: 11px; color: #3f3744; margin-bottom: 3px; line-height: 1.4; }

        /* Steps (Figma / instalação) */
        .ft-fstep { display: flex; gap: 12px; }
        .ft-fstep-left { display: flex; flex-direction: column; align-items: center; min-width: 32px; }
        .ft-fstep-num {
          width: 28px; height: 28px;
          border-radius: 50%;
          background: #1b1b25;
          color: #b7c939;
          font: 900 11px/1 'JetBrains Mono', Consolas, monospace;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .ft-fstep-line { width: 2px; flex: 1; background: #1b1b2520; margin: 4px 0; min-height: 10px; }
        .ft-fstep-body { padding-bottom: 16px; flex: 1; }
        .ft-fstep-body h4 { font-size: 13px; font-weight: 800; margin-bottom: 4px; color: #1b1b25; }
        .ft-fstep-body p { font-size: 12px; color: #3f3744; line-height: 1.6; margin-bottom: 6px; }
        .ft-where {
          display: inline-block;
          background: #f0f1ea;
          border: 1px solid #1b1b2524;
          color: #3f3744;
          font-size: 11px;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 6px;
          font-family: 'JetBrains Mono', Consolas, monospace;
        }

        /* Code blocks */
        .ft-code {
          background: #1b1b25;
          color: #b7c939;
          border-radius: 8px;
          padding: 12px 14px;
          font: 12px/1.6 'JetBrains Mono', Consolas, monospace;
          overflow-x: auto;
          white-space: pre;
          margin: 8px 0;
        }
        .ft-code-inline {
          background: #f0f1ea;
          border: 1px solid #1b1b2524;
          border-radius: 4px;
          padding: 1px 5px;
          font: 12px 'JetBrains Mono', Consolas, monospace;
          color: #6f7b18;
        }

        /* Accordion (navegação site) */
        .ft-accordion { border: 1px solid #1b1b2524; border-radius: 8px; overflow: hidden; }
        .ft-accordion + .ft-accordion { margin-top: 6px; }
        .ft-accordion-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          padding: 12px 14px;
          background: #ffffff;
          border: none;
          width: 100%;
          text-align: left;
          font: 700 13px 'Manrope', Arial, sans-serif;
          color: #1b1b25;
          cursor: pointer;
          transition: background 0.16s;
        }
        .ft-accordion-header:hover { background: #f0f1ea; }
        .ft-accordion-arrow { font-size: 10px; color: #3f3744; }
        .ft-accordion-body {
          padding: 10px 14px 14px;
          background: #f7f7f4;
          border-top: 1px solid #1b1b2524;
          font-size: 13px;
          color: #3f3744;
          line-height: 1.6;
        }
        .ft-accordion-body p { margin-bottom: 8px; }
        .ft-accordion-body ul { padding-left: 16px; }
        .ft-accordion-body ul li { margin-bottom: 4px; line-height: 1.5; }

        /* Glossário */
        .ft-gloss-item { padding: 10px 0; border-bottom: 1px solid #1b1b2514; }
        .ft-gloss-item:last-child { border-bottom: none; }
        .ft-gloss-term { font-size: 13px; font-weight: 900; color: #6f7b18; margin-bottom: 3px; }
        .ft-gloss-def { font-size: 12px; color: #3f3744; line-height: 1.55; }

        /* Responsivo */
        @media (max-width: 720px) {
          .ft-guia { grid-template-columns: 1fr; }
          .ft-guia-steps { flex-direction: row; overflow-x: auto; border-right: none; border-bottom: 1px solid #1b1b2524; padding: 10px; gap: 6px; }
          .ft-guia-step-btn { min-width: 120px; }
          .ft-guia-step-label { font-size: 10px; }
          .ft-comp-grid { grid-template-columns: repeat(2, 1fr); }
          .ft-modal { margin: 0; border-radius: 12px 12px 0 0; }
          .ft-overlay { align-items: flex-end; padding: 0; }
        }
      `}</style>
    </>
  );
}
