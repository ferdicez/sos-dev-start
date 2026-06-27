export interface FormData {
  nomeProjeto: string;
  tagline: string;
  tipoProjeto: string;
  problema: string;
  publicoAlvo: string;
  features: string[];
  stackPreferencia: string;
  precisaAuth: boolean;
  precisaBanco: boolean;
  tipoBanco: string;
  precisaPagamento: boolean;
  deployAlvo: string;
  referenciaDesign: string;
}

export interface StackOpcao {
  nome: string;
  descricao: string;
  frontend: string;
  backend: string;
  banco: string;
  autenticacao: string;
  hosting: string;
  outrasFerramentas: string[];
  justificativa: string;
  custoEstimado: string;
  futuramenteAdicionar: string[];
}

export interface FasePRD {
  numero: number;
  nome: string;
  descricao: string;
  tarefas: string[];
  duracaoEstimada: string;
}

export interface PRDData {
  nomeProjeto: string;
  tagline: string;
  visaoGeral: string;
  problema: string;
  solucao: string;
  publicoAlvo: string[];
  userStories: string[];
  funcionalidadesMVP: string[];
  funcionalidadesNiceToHave: string[];
  opcoesStack: StackOpcao[];
  skillsAgente: string[];
  estruturaPastas: string;
  fases: FasePRD[];
  regrasSegurancaAgente: string[];
  comandosIniciais: string[];
  variaveisAmbiente: string[];
}

export type WizardStep =
  | "basicos"
  | "contexto"
  | "gerando-prd"
  | "aprovacao-prd"
  | "download";
