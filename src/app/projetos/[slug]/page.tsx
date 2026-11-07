import { ViewTransition } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, getProject } from "@/data/projects";
import { ProjectVisual } from "@/components/ProjectVisual";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projetos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} · Lucas Santos`,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: PageProps<"/projetos/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <main id="conteudo" className="bg-ink px-5 pb-24 pt-28 sm:px-8 lg:px-16 lg:pt-36">
      <article className="mx-auto flex w-full max-w-[1200px] flex-col gap-12 lg:gap-16">
        <div className="flex flex-col gap-6">
          <Link href="/#projetos" className="w-fit font-mono text-sm text-muted transition-colors hover:text-signal">
            ← Voltar aos projetos
          </Link>
          <p className="font-mono text-sm text-signal">
            {project.org} · {project.period}
          </p>
          <ViewTransition name={`project-title-${project.slug}`}>
            <h1 className="w-fit font-display text-[clamp(2.75rem,8vw,6.5rem)] font-extrabold leading-[0.95] tracking-[-0.035em]">
              {project.title}
            </h1>
          </ViewTransition>
          <p className="max-w-3xl text-lg leading-relaxed text-soft sm:text-2xl">{project.summary}</p>
        </div>

        <ViewTransition name={`project-visual-${project.slug}`}>
          <div className="h-64 sm:h-96 lg:h-[30rem]">
            <ProjectVisual kind={project.visual} large />
          </div>
        </ViewTransition>

        <div className="grid gap-10 md:grid-cols-2 md:gap-12">
          <section className="flex flex-col gap-3">
            <h2 className="font-mono text-sm text-signal">O problema</h2>
            <p className="text-lg leading-relaxed sm:text-xl">{project.problem}</p>
          </section>
          <section className="flex flex-col gap-3">
            <h2 className="font-mono text-sm text-signal">A solução</h2>
            <p className="text-lg leading-relaxed sm:text-xl">{project.solution}</p>
          </section>
        </div>

        <div className="grid gap-10 border-t border-line pt-10 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] md:gap-12">
          <section className="flex flex-col gap-4">
            <h2 className="font-mono text-sm text-signal">O que eu fiz</h2>
            <p className="text-muted">{project.role}</p>
            <ul className="flex flex-col gap-3">
              {project.highlights.map((h) => (
                <li key={h} className="flex gap-3 text-base leading-relaxed sm:text-lg">
                  <span aria-hidden="true" className="mt-[0.6em] h-1.5 w-1.5 flex-none rounded-full bg-signal" />
                  {h}
                </li>
              ))}
            </ul>
          </section>
          <section className="flex flex-col gap-4">
            <h2 className="font-mono text-sm text-signal">Stack</h2>
            <ul className="flex flex-wrap gap-2 font-mono text-xs sm:text-sm">
              {project.stack.map((s) => (
                <li key={s} className="rounded-full border border-line px-3 py-1.5 text-soft">
                  {s}
                </li>
              ))}
            </ul>
            {project.links?.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex min-h-12 w-fit items-center rounded-full bg-signal px-6 font-medium text-ink transition-colors hover:bg-fg"
              >
                {l.label} ↗
              </a>
            ))}
          </section>
        </div>

        <Link
          href={`/projetos/${next.slug}`}
          data-cursor="Próximo"
          className="group flex flex-col gap-2 rounded-3xl border border-line bg-panel p-6 transition-colors hover:border-signal sm:p-10"
        >
          <span className="font-mono text-sm text-muted">Próximo projeto</span>
          <span className="font-display text-[clamp(2rem,5vw,3.75rem)] font-extrabold leading-none tracking-[-0.03em] transition-colors group-hover:text-signal">
            {next.title} →
          </span>
        </Link>
      </article>
    </main>
  );
}
