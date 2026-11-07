export type ProjectVisual = "data" | "travel" | "climate" | "robot" | "wallet" | "auth";

export type Project = {
  slug: string;
  title: string;
  org: string;
  period: string;
  role: string;
  summary: string;
  problem: string;
  solution: string;
  highlights: string[];
  stack: string[];
  visual: ProjectVisual;
  links?: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    slug: "plataforma-de-dados",
    title: "Plataforma de dados com IA",
    org: "Softable",
    period: "2025 — hoje",
    role: "Desenvolvedor backend",
    summary: "Plataforma web para manipular e analisar dados sem precisar escrever SQL.",
    problem:
      "Quem precisa de um número depende de alguém que saiba SQL, e a resposta pode levar dias para chegar.",
    solution:
      "A pessoa monta a consulta numa interface simplificada ou pergunta em linguagem natural. A IA gera o SQL, analisa os dados e monta o dashboard automaticamente.",
    highlights: [
      "Geração de queries SQL por interface simplificada e por IA",
      "Integração com IA para análise dos dados",
      "Geração automática de dashboards",
    ],
    stack: ["Backend", "SQL", "Integração com IA"],
    visual: "data",
  },
  {
    slug: "roteiros-com-ia",
    title: "Roteiros de viagem com IA",
    org: "Softable",
    period: "2025 — hoje",
    role: "Desenvolvedor e líder de equipe",
    summary: "Aplicação que gera roteiros de viagem personalizados com inteligência artificial.",
    problem:
      "Planejar uma viagem leva horas: pesquisar lugares, encaixar horários e equilibrar o orçamento.",
    solution:
      "O viajante conta o que gosta e a IA monta um roteiro dia a dia, sob medida para ele.",
    highlights: [
      "Liderança técnica da equipe de desenvolvimento",
      "Geração de roteiros personalizados com IA",
    ],
    stack: ["Backend", "Integração com IA", "Liderança técnica"],
    visual: "travel",
  },
  {
    slug: "hexaclima",
    title: "HexaClima",
    org: "PETE",
    period: "2024 — 2025",
    role: "Desenvolvedor de software (estágio)",
    summary: "Página web de programação em blocos para a estação climática HexaClima.",
    problem:
      "Programar a estação climática exigia escrever código, o que afastava quem não sabe programar.",
    solution:
      "Blocos visuais que se encaixam e geram o código da estação, com uma tela para visualizar e monitorar os dados coletados.",
    highlights: [
      "Editor de programação em blocos que gera código",
      "Visualização e monitoramento dos dados da estação",
    ],
    stack: ["Web", "Programação em blocos", "Monitoramento"],
    visual: "climate",
  },
  {
    slug: "hexabot",
    title: "HexaBot",
    org: "PETE",
    period: "2024 — 2025",
    role: "Desenvolvedor de software (estágio)",
    summary: "Aplicativo multiplataforma para controlar o robô HexaBot à distância.",
    problem: "O robô HexaBot precisava ser controlado remotamente, a partir de diferentes aparelhos.",
    solution: "Um aplicativo multiplataforma que funciona como controle remoto do robô.",
    highlights: ["Controle remoto do robô pelo aplicativo", "Uma base de código para várias plataformas"],
    stack: ["Mobile", "Multiplataforma"],
    visual: "robot",
  },
  {
    slug: "investments-wallet",
    title: "Investments Wallet",
    org: "Projeto pessoal",
    period: "Full-stack",
    role: "Desenvolvimento completo",
    summary: "Aplicação full-stack para cadastrar e acompanhar investimentos pessoais.",
    problem:
      "Investimentos espalhados em corretoras e planilhas diferentes dificultam enxergar a carteira inteira.",
    solution:
      "Uma carteira única com dashboard de resumo, cadastro de ativos e o histórico de cada investimento.",
    highlights: [
      "API REST em Spring Boot com Spring Security e validação",
      "Documentação da API com OpenAPI (Swagger)",
      "Frontend em React com Material UI",
      "Sobe inteiro com um comando via Docker Compose",
      "Testes automatizados com JUnit",
    ],
    stack: ["Java", "Spring Boot", "React", "SQLite", "Docker"],
    visual: "wallet",
    links: [{ label: "Ver código no GitHub", href: "https://github.com/LucassSantoss/InvestmentsWallet" }],
  },
  {
    slug: "api-de-autenticacao",
    title: "API de autenticação",
    org: "Projeto pessoal",
    period: "Backend",
    role: "Desenvolvimento completo",
    summary: "API REST de cadastro e login de usuários com tokens JWT.",
    problem: "Toda aplicação precisa de login, e implementar autenticação do jeito certo é fácil de errar.",
    solution:
      "Cadastro, login e rotas protegidas com Spring Security e JWT, pronta para rodar com Docker.",
    highlights: [
      "Autenticação stateless com JWT",
      "Filtro de segurança próprio no Spring Security",
      "Docker Compose com hot reload e debug remoto",
      "Imagem de produção otimizada",
    ],
    stack: ["Java", "Spring Boot", "Spring Security", "JWT", "Docker"],
    visual: "auth",
    links: [{ label: "Ver código no GitHub", href: "https://github.com/LucassSantoss/java-login-api" }],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
