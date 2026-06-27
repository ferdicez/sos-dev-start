"use client";

import { FormData } from "@/lib/types";

const TIPOS_PROJETO = [
  { label: "Landing Page / Site", desc: "Página para apresentar um produto, serviço ou portfólio" },
  { label: "SaaS", desc: "Software por assinatura — sistema que vira um negócio recorrente" },
  { label: "E-commerce", desc: "Loja virtual para vender produtos físicos ou digitais" },
  { label: "Aplicativo Web", desc: "Sistema com funcionalidades específicas rodando no navegador" },
  { label: "API / Backend", desc: "Serviço que processa dados e responde a outros sistemas" },
  { label: "Dashboard / Admin", desc: "Painel interno para visualizar, gerenciar ou operar dados" },
  { label: "App Mobile", desc: "Aplicativo para Android e/ou iOS" },
  { label: "Automação / Bot", desc: "Fluxo automático que executa tarefas sem interação humana" },
  { label: "Portfólio / Blog", desc: "Site pessoal, de conteúdo ou de apresentação profissional" },
  { label: "Outro", desc: "Tipo diferente dos listados acima" },
];

interface Props {
  data: FormData;
  onChange: (data: Partial<FormData>) => void;
  onNext: () => void;
}

export function StepBasicos({ data, onChange, onNext }: Props) {
  const podeAvancar =
    data.nomeProjeto.trim() && data.tagline.trim() && data.tipoProjeto;

  return (
    <div
      className="step-animate"
      style={{
        /* espaço vertical entre as seções do step */
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      {/* Cabeçalho do step */}
      <div>
        <h2
          style={{
            /* tamanho do título do step */
            fontSize: "24px",
            /* peso da fonte — máximo */
            fontWeight: 900,
            /* cor do título — escuro */
            color: "#1b1b25",
            /* remove margem padrão */
            margin: "0 0 4px",
            /* espaçamento negativo entre letras */
            letterSpacing: "-0.5px",
          }}
        >
          sobre o projeto
        </h2>
        <p
          style={{
            /* cor do subtítulo — cinza médio */
            color: "#3f3744",
            /* tamanho da fonte do subtítulo */
            fontSize: "13px",
            margin: 0,
          }}
        >
          Não precisa ser perfeito — comece pelo básico.
        </p>
      </div>

      {/* Campos do formulário */}
      <div
        style={{
          /* espaço entre os campos */
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {/* Campo: nome do projeto */}
        <div>
          <label className="label">
            Nome do projeto{" "}
            <span style={{ color: "#b7c939" }}>*</span>
          </label>
          <input
            type="text"
            value={data.nomeProjeto}
            onChange={(e) => onChange({ nomeProjeto: e.target.value })}
            placeholder="Ex: TaskFlow, ClientesPro, MeuSaaS..."
            className="input"
          />
        </div>

        {/* Campo: tagline */}
        <div>
          <label className="label">
            Tagline{" "}
            <span style={{ color: "#b7c939" }}>*</span>
          </label>
          <input
            type="text"
            value={data.tagline}
            onChange={(e) => onChange({ tagline: e.target.value })}
            placeholder="Uma frase que resume o projeto"
            className="input"
          />
        </div>

        {/* Campo: tipo de projeto — grade de botões */}
        <div>
          <label className="label">
            Tipo de projeto{" "}
            <span style={{ color: "#b7c939" }}>*</span>
          </label>
          <div
            style={{
              /* grade de 2 colunas para os tipos */
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              /* espaço entre os botões */
              gap: "8px",
            }}
          >
            {TIPOS_PROJETO.map((tipo) => {
              const selecionado = data.tipoProjeto === tipo.label;
              return (
                <button
                  key={tipo.label}
                  onClick={() => onChange({ tipoProjeto: tipo.label })}
                  style={{
                    /* alinhamento do texto à esquerda */
                    textAlign: "left",
                    /* espaço interno do botão de tipo */
                    padding: "12px 14px",
                    /* cantos arredondados */
                    borderRadius: "8px",
                    /* borda: verde se selecionado, cinza se não */
                    border: selecionado ? "1px solid #b7c939" : "1px solid #1b1b2524",
                    /* fundo: verde translúcido se selecionado, cinza claro se não */
                    background: selecionado ? "#b7c93918" : "#f0f1ea",
                    /* transição suave de todas as propriedades */
                    transition: "all 0.15s",
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      /* tamanho do nome do tipo */
                      fontSize: "13px",
                      /* peso negrito */
                      fontWeight: 700,
                      /* cor: escuro se selecionado, cinza se não */
                      color: selecionado ? "#1b1b25" : "#3f3744",
                    }}
                  >
                    {tipo.label}
                  </div>
                  <div
                    style={{
                      /* tamanho da descrição do tipo */
                      fontSize: "11px",
                      /* cor da descrição — cinza médio */
                      color: "#3f3744",
                      /* margem acima da descrição */
                      marginTop: "2px",
                      /* opacidade reduzida na descrição */
                      opacity: 0.7,
                    }}
                  >
                    {tipo.desc}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Botão continuar */}
      <button
        onClick={onNext}
        disabled={!podeAvancar}
        className="btn primary full"
        style={{
          /* altura maior para o botão principal */
          minHeight: "44px",
          /* tamanho da fonte do botão */
          fontSize: "13px",
          /* opacidade reduzida quando desabilitado */
          opacity: podeAvancar ? 1 : 0.45,
        }}
      >
        Continuar
      </button>
    </div>
  );
}
