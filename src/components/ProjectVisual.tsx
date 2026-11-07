import type { ProjectVisual as Kind } from "@/data/projects";

/** Small illustration of what each project does. Drawn with HTML so it stays crisp at any size. */
export function ProjectVisual({ kind, large = false }: { kind: Kind; large?: boolean }) {
  const box = `relative flex h-full w-full overflow-hidden rounded-2xl bg-paper text-ink ${large ? "p-6 sm:p-10" : "p-4 sm:p-5"}`;
  const label = "font-mono text-[11px] text-paper-muted sm:text-xs";

  switch (kind) {
    case "data":
      return (
        <div className={`${box} grid grid-cols-3 gap-2.5 sm:gap-3`} aria-hidden="true">
          <div className="flex flex-col gap-2 rounded-xl bg-white p-3">
            <span className={label}>1 · pergunta</span>
            <span className={`${large ? "text-sm sm:text-xl lg:text-2xl" : "text-[13px] sm:text-[15px]"} leading-snug`}>
              “Quanto vendemos por região no trimestre?”
            </span>
          </div>
          <div className="flex flex-col gap-2 rounded-xl bg-ink p-3 font-mono text-[10px] leading-relaxed text-soft sm:text-xs">
            <span className="text-muted">2 · SQL</span>
            <span>
              <span className="text-signal">SELECT</span> regiao,
              <br />
              SUM(valor)
              <br />
              <span className="text-signal">FROM</span> vendas
              <br />
              <span className="text-signal">GROUP BY</span> regiao
            </span>
          </div>
          <div className="flex flex-col gap-2 rounded-xl bg-white p-3">
            <span className={label}>3 · dashboard</span>
            <div className="flex flex-1 items-end gap-1.5">
              {[45, 80, 60, 30].map((h, i) => (
                <div key={i} className={`flex-1 rounded-sm ${i === 1 ? "bg-signal-deep" : "bg-ink"}`} style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
        </div>
      );
    case "travel":
      return (
        <div className={`${box} flex-col gap-2.5`} aria-hidden="true">
          <span className={label}>roteiro · Lisboa · 3 dias</span>
          {[
            ["Dia 1", "Alfama, miradouros e fado à noite"],
            ["Dia 2", "Belém, pastéis e LX Factory"],
            ["Dia 3", "Sintra: Pena e Quinta da Regaleira"],
          ].map(([d, t]) => (
            <div key={d} className="flex items-center gap-3 rounded-xl bg-white px-3 py-2.5">
              <span className="rounded-md bg-ink px-2 py-1 font-mono text-[10px] text-paper sm:text-xs">{d}</span>
              <span className={large ? "text-base sm:text-xl" : "text-[13px] sm:text-sm"}>{t}</span>
            </div>
          ))}
        </div>
      );
    case "climate":
      return (
        <div className={`${box} grid grid-cols-2 gap-3 ${large ? "sm:[zoom:1.4]" : ""}`} aria-hidden="true">
          <div className="flex flex-col gap-1.5">
            <span className={label}>blocos</span>
            <span className="w-fit rounded-md bg-signal-deep px-2.5 py-1.5 text-xs text-white sm:text-sm">a cada 10 min</span>
            <span className="ml-3 w-fit rounded-md bg-ink px-2.5 py-1.5 text-xs text-paper sm:text-sm">ler temperatura</span>
            <span className="ml-3 w-fit rounded-md bg-ink px-2.5 py-1.5 text-xs text-paper sm:text-sm">ler umidade</span>
            <span className="ml-3 w-fit rounded-md bg-[#2563eb] px-2.5 py-1.5 text-xs text-white sm:text-sm">enviar dados</span>
          </div>
          <div className="flex flex-col justify-between rounded-xl bg-white p-3">
            <span className={label}>monitoramento</span>
            <span className={`font-display font-extrabold ${large ? "text-6xl" : "text-3xl sm:text-4xl"}`}>24,6°</span>
            <svg viewBox="0 0 100 30" className="w-full" fill="none">
              <path d="M0 22 L15 18 L30 20 L45 12 L60 14 L75 8 L100 10" stroke="#c2410c" strokeWidth="2" />
            </svg>
          </div>
        </div>
      );
    case "robot":
      return (
        <div className={`${box} items-center justify-center gap-6 sm:gap-10 ${large ? "sm:[zoom:1.6]" : ""}`} aria-hidden="true">
          <div className="grid grid-cols-3 grid-rows-3 gap-1.5">
            {[1, 3, 4, 5, 7].map((cell) => (
              <span
                key={cell}
                className={`h-9 w-9 rounded-lg sm:h-11 sm:w-11 ${cell === 4 ? "bg-signal-deep" : "bg-ink"}`}
                style={{ gridColumn: (cell % 3) + 1, gridRow: Math.floor(cell / 3) + 1 }}
              />
            ))}
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="grid h-16 w-16 place-items-center rounded-full border-[3px] border-ink sm:h-20 sm:w-20">
              <span className="h-6 w-6 rounded-full bg-signal-deep sm:h-8 sm:w-8" />
            </span>
            <span className={label}>conectado</span>
          </div>
        </div>
      );
    case "wallet":
      return (
        <div className={`${box} items-center gap-5 ${large ? "justify-center sm:gap-12 sm:[zoom:1.5]" : ""}`} aria-hidden="true">
          <div
            className="aspect-square h-[70%] max-h-40 flex-none rounded-full"
            style={{ background: "conic-gradient(#0e1726 0 45%, #c2410c 45% 70%, #2563eb 70% 88%, #9aabc6 88% 100%)" }}
          >
            <div className="m-[22%] aspect-square rounded-full bg-paper" />
          </div>
          <div className="flex min-w-0 flex-col gap-2 text-[13px] sm:text-sm">
            <span className={label}>carteira</span>
            <span className="flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full bg-ink" />Renda fixa 45%</span>
            <span className="flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full bg-signal-deep" />Ações 25%</span>
            <span className="flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full bg-[#2563eb]" />FIIs 18%</span>
            <span className="flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full bg-muted" />Outros 12%</span>
          </div>
        </div>
      );
    case "auth":
      return (
        <div className={`${box} flex-col justify-center gap-3`} aria-hidden="true">
          <span className={label}>POST /auth/login → 200</span>
          <p className={`break-all font-mono leading-relaxed ${large ? "text-base sm:text-xl" : "text-[12px] sm:text-sm"}`}>
            <span className="text-signal-deep">eyJhbGciOiJIUzI1NiJ9</span>.
            <span className="text-[#2563eb]">eyJzdWIiOiJsdWNhcyJ9</span>.
            <span className="text-paper-muted">SflKxwRJSMeKKF2QT4fw</span>
          </p>
          <div className="flex flex-wrap gap-2 font-mono text-[11px] sm:text-xs">
            <span className="rounded-md bg-ink px-2 py-1 text-paper">header</span>
            <span className="rounded-md bg-ink px-2 py-1 text-paper">payload</span>
            <span className="rounded-md bg-ink px-2 py-1 text-paper">assinatura</span>
          </div>
        </div>
      );
  }
}
