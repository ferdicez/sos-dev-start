import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { apiKey: apiKeyBody, ...formData } = body;
    const apiKey = apiKeyBody || process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Chave API não encontrada. Configure sua Groq API Key na tela inicial." },
        { status: 400 }
      );
    }

    const groq = new Groq({ apiKey });

    const systemPrompt = `Você é um especialista sênior em Product Management e arquitetura de software.
Gere um PRD (Product Requirements Document) completo em português brasileiro.

REGRAS ABSOLUTAS:
- Responda APENAS com JSON válido. Nenhum texto antes ou depois.
- Seja específico e prático. Nada genérico.
- Para "opcoesStack" gere EXATAMENTE 2 opções:
  * Opção 1: mais simples, preferencialmente sem custo ou com plano gratuito, que possa crescer depois
  * Opção 2: mais completa ou robusta, possivelmente com custo, mais escalável
- Em cada opção, "futuramenteAdicionar" deve listar o que pode ser deixado para depois caso a pessoa esteja com pressa
- "skillsAgente" deve ter de 4 a 8 skills/plugins REAIS do Claude Code que ajudariam neste projeto específico. Exemplos de skills reais: brainstorm, code-review, frontend-design, deep-research, content-creator, social-media-posts, analytics-tracking, seo-audit, dashboard-creator, flowchart-creator, copywriting
- Fases de desenvolvimento: design e ajustes visuais SEMPRE na penúltima fase, deploy na última
- "regrasSegurancaAgente" deve ser específico ao projeto, não genérico

Retorne exatamente neste formato JSON:
{
  "nomeProjeto": "string",
  "tagline": "string",
  "visaoGeral": "parágrafo completo",
  "problema": "string",
  "solucao": "string",
  "publicoAlvo": ["persona 1 com descrição", "persona 2"],
  "userStories": ["Como [perfil], quero [ação] para [benefício]"],
  "funcionalidadesMVP": ["feature com descrição breve"],
  "funcionalidadesNiceToHave": ["feature com descrição breve"],
  "opcoesStack": [
    {
      "nome": "Opção 1 — Simples e sem custo",
      "descricao": "Por que essa opção faz sentido para começar",
      "frontend": "tecnologia",
      "backend": "tecnologia ou 'Não necessário'",
      "banco": "tecnologia ou 'Não necessário'",
      "autenticacao": "solução ou 'Não necessário'",
      "hosting": "plataforma",
      "outrasFerramentas": ["ferramenta 1"],
      "justificativa": "explicação das escolhas",
      "custoEstimado": "Gratuito / ~$X/mês",
      "futuramenteAdicionar": ["o que pode ser adicionado depois sem quebrar o que foi feito"]
    },
    {
      "nome": "Opção 2 — Mais completo",
      "descricao": "Por que essa opção faz sentido para escalar",
      "frontend": "tecnologia",
      "backend": "tecnologia ou 'Não necessário'",
      "banco": "tecnologia",
      "autenticacao": "solução",
      "hosting": "plataforma",
      "outrasFerramentas": ["ferramenta 1"],
      "justificativa": "explicação das escolhas",
      "custoEstimado": "~$X/mês",
      "futuramenteAdicionar": ["o que pode ser deixado para depois"]
    }
  ],
  "skillsAgente": ["nome-da-skill — para que serve neste projeto específico"],
  "estruturaPastas": "árvore de pastas relevante para o projeto",
  "fases": [
    {
      "numero": 1,
      "nome": "nome da fase",
      "descricao": "o que acontece nessa fase",
      "tarefas": ["tarefa específica"],
      "duracaoEstimada": "X dias"
    }
  ],
  "regrasSegurancaAgente": ["regra específica para este projeto"],
  "comandosIniciais": ["comando exato para rodar"],
  "variaveisAmbiente": ["NOME_VARIAVEL=descrição do que é e onde obter"]
}`;

    const userPrompt = `Gere o PRD para este projeto:

NOME: ${formData.nomeProjeto}
TIPO: ${formData.tipoProjeto}

PROBLEMA: ${formData.problema}
PÚBLICO-ALVO: ${formData.publicoAlvo}

FEATURES DESEJADAS: ${formData.features.length > 0 ? formData.features.join(", ") : "Não especificado — sugira as mais relevantes"}
AUTENTICAÇÃO: ${formData.precisaAuth ? "Sim" : "Não"}
BANCO DE DADOS: ${formData.precisaBanco ? `Sim (${formData.tipoBanco || "tipo a definir"})` : "Não"}
PAGAMENTOS: ${formData.precisaPagamento ? "Sim" : "Não"}

STACK PREFERIDA: ${formData.stackPreferencia || "Sem preferência — sugira 2 opções com e sem custo"}
DEPLOY ALVO: ${formData.deployAlvo}
REFERÊNCIA VISUAL: ${formData.referenciaDesign || "Não informada"}

Gere um PRD completo e prático. As 2 opções de stack devem ser realmente diferentes entre si — não apenas variações pequenas.`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 4096,
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0].message.content;
    if (!content) throw new Error("Resposta vazia do modelo");

    const prd = JSON.parse(content);

    return NextResponse.json({ prd });
  } catch (error) {
    console.error("Erro ao gerar PRD:", error);
    return NextResponse.json(
      { error: "Erro ao gerar PRD. Verifique sua chave Groq e tente novamente." },
      { status: 500 }
    );
  }
}
