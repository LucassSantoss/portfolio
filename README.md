# Portfólio · Lucas Santos

Site pessoal de Lucas Pereira dos Santos, desenvolvedor backend (C# e Java).

A página inteira conta uma história: um `GET /api/lucas` sai do topo da página e atravessa o "backend" conforme a pessoa rola, até voltar como `201 Created` na seção de contato.

## Seções

| Seção | O que acontece |
|---|---|
| Abertura | Nome em tela cheia, letra por letra, sobre uma rede de nós em WebGL que reage ao mouse e vira grade com o scroll. |
| Sobre | Seção fixada: o texto acende palavra por palavra junto com uma classe em C#. |
| Jornada | O scroll vertical vira horizontal numa linha do tempo de 2023 a 2026. |
| Projetos | Galeria horizontal fixada. Cada card mostra o problema e a solução e abre a página do projeto com View Transitions. |
| Stack | Diagrama de arquitetura que acende camada por camada. |
| Contato | Resposta JSON digitada, botões magnéticos e um "201 Created" gigante. |

No celular e no tablet as seções fixadas viram listas verticais com animações leves. Com "reduzir movimento" ativado no sistema, as animações são desligadas.

## Tecnologias

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- [GSAP](https://gsap.com) + ScrollTrigger + SplitText
- [Lenis](https://lenis.darkroom.engineering) para scroll suave
- [Three.js](https://threejs.org) com [React Three Fiber](https://r3f.docs.pmnd.rs)
- [Motion](https://motion.dev) para microinterações
- View Transitions do React
- Tailwind CSS

## Rodando localmente

```bash
npm install
npm run dev
```

Abra http://localhost:3000.

## Onde editar o conteúdo

- `src/data/projects.ts`: projetos (problema, solução, destaques, stack, links)
- `src/data/profile.ts`: contatos, linha do tempo e stack
- `public/curriculo-lucas-santos.pdf`: currículo do botão "Baixar currículo"

## Deploy

O jeito mais simples é importar o repositório na [Vercel](https://vercel.com/new). Cada push na `main` publica uma nova versão.
