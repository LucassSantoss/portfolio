export const profile = {
  name: "Lucas Pereira dos Santos",
  shortName: "Lucas Santos",
  role: "Desenvolvedor backend",
  city: "São Carlos, SP",
  company: "Backend Jr. @ Softable",
  email: "lucasspereirasantos05@gmail.com",
  linkedin: "https://www.linkedin.com/in/lucaspereiradossantos/",
  github: "https://github.com/LucassSantoss",
  resume: "/curriculo-lucas-santos.pdf",
};

export const timeline = [
  {
    year: "2023",
    title: "Engenharia de Software",
    text: "Começo no Instituto Federal de São Paulo (IFSP). Algoritmos em C, estruturas de dados e os primeiros projetos em Java e Python.",
    meta: "huffman · binaryTree · runLength",
  },
  {
    year: "2024",
    title: "Estágio no PETE",
    text: "HexaClima: programação em blocos que gera código para uma estação climática, com painel de monitoramento. HexaBot: app multiplataforma para controlar um robô.",
    meta: "jan 2024 → jul 2025",
  },
  {
    year: "2025",
    title: "Backend Jr. na Softable",
    text: "Plataforma de dados que gera SQL a partir de linguagem natural e monta dashboards com IA. Líder de equipe no app de roteiros de viagem com IA.",
    meta: "jul 2025 → hoje",
  },
  {
    year: "2026",
    title: "Formatura",
    text: "Conclusão de Engenharia de Software no IFSP. E o próximo capítulo.",
    meta: "dez 2026",
  },
];

export type StackLayer = {
  id: string;
  label: string;
  items: { name: string; note: string }[];
  emphasis?: boolean;
};

export const stackLayers: StackLayer[] = [
  {
    id: "cliente",
    label: "Cliente",
    items: [
      { name: "React", note: "Frontends web, como o do Investments Wallet" },
      { name: "React Native", note: "Apps mobile" },
      { name: "Flutter", note: "Apps multiplataforma" },
    ],
  },
  {
    id: "api",
    label: "API",
    emphasis: true,
    items: [
      { name: "C# · ASP.NET Core", note: "Minha principal stack, usada no dia a dia de trabalho" },
      { name: "Java · Spring Boot", note: "Investments Wallet, com Spring Security e testes em JUnit" },
    ],
  },
  {
    id: "dados",
    label: "Dados",
    items: [
      { name: "PostgreSQL", note: "Banco relacional" },
      { name: "MongoDB", note: "Banco não relacional" },
      { name: "Redis", note: "Cache" },
    ],
  },
  {
    id: "infra",
    label: "Infra & entrega",
    items: [
      { name: "AWS", note: "S3, Cognito, EC2, RDS e CloudWatch" },
      { name: "Docker", note: "Ambientes de desenvolvimento e produção" },
      { name: "GitHub Actions", note: "CI/CD" },
    ],
  },
];

export const practices = ["TDD", "SOLID", "Testes automatizados", "CI/CD", "Inglês avançado"];
