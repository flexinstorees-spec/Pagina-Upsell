import { useEffect, useRef, useState } from "react";
import {
  Check,
  X,
  ShieldCheck,
  Gift,
  Sparkles,
  Rocket,
  GraduationCap,
  Clock,
} from "lucide-react";

const COUNTDOWN_SECONDS = 15 * 60;

function formatTime(total: number) {
  const m = Math.floor(total / 60).toString().padStart(2, "0");
  const s = (total % 60).toString().padStart(2, "0");
  return { m, s };
}

declare global {
  interface Window {
    initWiapyUpsell?: (config: Record<string, unknown>) => void;
  }
}

function App() {
  const initialized = useRef(false);
  const [secondsLeft, setSecondsLeft] = useState(COUNTDOWN_SECONDS);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (initialized.current) return;

    const tryInit = () => {
      if (typeof window.initWiapyUpsell === "function") {
        window.initWiapyUpsell({
          linkUrl: "https://pay.wiapy.com/checkout/69eab772418dc3d124bec537",
          linkText: "EU QUERO APROVEITAR A OFERTA",
          styles: {
            backgroundColor: "#22c55e",
            hoverBackgroundColor: "#16a34a",
            fontSize: "18px",
            borderRadius: "12px",
          },
          refusalLinkUrl: "https://wiapy.com/login",
          refusalLinkText: "Não quero aproveitar a oferta",
          refusalLinkColor: "#94a3b8",
        });
        initialized.current = true;
        return true;
      }
      return false;
    };

    if (tryInit()) return;

    const interval = window.setInterval(() => {
      if (tryInit()) window.clearInterval(interval);
    }, 100);

    return () => window.clearInterval(interval);
  }, []);

  const problems = [
    "Fica sem ideia do que aplicar em sala",
    "Perde tempo planejando atividades",
    "Precisa improvisar na hora",
    "Tem dificuldade em prender a atenção dos alunos",
  ];

  const included = [
    "Dinâmicas de Português",
    "Dinâmicas de Matemática",
    "Coordenação motora",
    "Interação em grupo",
    "Atividades para prender atenção",
    "Dinâmicas para momentos difíceis",
    "Ideias rápidas para qualquer aula",
  ];

  const benefits = [
    "Mais atenção dos alunos",
    "Aulas mais leves",
    "Menos tempo planejando",
    "Mais organização",
    "Mais segurança na aula",
  ];

  const guarantees = ["Acesso imediato", "Download instantâneo", "Sem mensalidade"];

  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-900">
      <div className="mx-auto w-full max-w-md px-5 py-8 flex flex-col gap-10 animate-[fadeIn_400ms_ease-out]">
        <div className="rounded-full bg-amber-50 border border-amber-200 px-4 py-2 text-center text-sm font-medium text-amber-800">
          ⚠️ Espere! Não feche esta página
        </div>

        <header className="flex flex-col gap-3 text-center">
          <span className="self-center inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
            <GraduationCap className="h-5 w-5" strokeWidth={2.25} />
          </span>
          <h1 className="text-[28px] leading-tight font-semibold tracking-tight text-slate-900">
            Complete Sua Aula Com{" "}
            <span className="text-emerald-600">
              300 Dinâmicas Interativas
            </span>{" "}
            Para Aplicar Todos Os Dias
          </h1>
          <picture>
            <source
              media="(min-width: 640px)"
              srcSet={`${import.meta.env.BASE_URL}apostila-1200.webp`}
            />
            <img
              src={`${import.meta.env.BASE_URL}apostila-800.webp`}
              alt="300 Dinâmicas Interativas para Sala de Aula"
              width={800}
              height={800}
              decoding="async"
              fetchPriority="high"
              className="mt-1 w-full h-auto"
            />
          </picture>
          <p className="text-base text-slate-500 leading-relaxed">
            Você já garantiu seus painéis… mas sua aula está preparada para
            manter os alunos envolvidos?
          </p>
        </header>

        <section className="flex flex-col gap-3">
          {problems.map((item) => (
            <div key={item} className="flex items-start gap-3">
              <X className="mt-1 h-4 w-4 shrink-0 text-rose-500" strokeWidth={3} />
              <p className="text-[15px] leading-snug text-slate-700">{item}</p>
            </div>
          ))}
        </section>

        <section className="flex flex-col gap-5">
          <div className="text-center flex flex-col gap-2">
            <span className="text-xs font-semibold tracking-[0.18em] text-emerald-600 uppercase">
              Oferta exclusiva
            </span>
            <h2 className="text-[26px] font-semibold tracking-tight text-slate-900 leading-tight">
              O Que Vou Receber?
            </h2>
          </div>

          <div className="rounded-2xl bg-white border border-slate-200 p-6 flex flex-col gap-3.5">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
              <Gift className="h-4 w-4 text-emerald-500" strokeWidth={2.25} />
              O que está incluso
            </p>
            {included.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-500" strokeWidth={3} />
                <p className="text-[15px] leading-snug text-slate-700">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h3 className="text-center text-base font-semibold uppercase tracking-wider text-slate-400">
            Como funciona
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {[
              { step: "1", label: "Baixar" },
              { step: "2", label: "Aplicar" },
              { step: "3", label: "Usar no mesmo dia" },
            ].map(({ step, label }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-3 rounded-2xl bg-white border border-slate-200 px-2 py-5 text-center"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 text-sm font-semibold">
                  {step}
                </span>
                <p className="text-[13px] font-medium text-slate-700 leading-tight">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
            <Sparkles className="h-4 w-4 text-emerald-500" strokeWidth={2.25} />
            Benefícios
          </p>
          {benefits.map((item) => (
            <div key={item} className="flex items-start gap-3">
              <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-500" strokeWidth={3} />
              <p className="text-[15px] leading-snug text-slate-700">{item}</p>
            </div>
          ))}
        </section>

        <div className="flex flex-col items-center gap-2">
          <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
            <Clock className="h-3.5 w-3.5 text-rose-500" strokeWidth={2.5} />
            A oferta termina em
          </p>
          <div className="flex items-center gap-2">
            {(() => {
              const { m, s } = formatTime(secondsLeft);
              return (
                <>
                  <div className="flex flex-col items-center">
                    <span className="rounded-xl bg-slate-900 text-white text-2xl font-semibold tracking-tight px-3 py-2 tabular-nums min-w-[3rem] text-center">
                      {m}
                    </span>
                    <span className="mt-1 text-[10px] uppercase tracking-wider text-slate-400">
                      min
                    </span>
                  </div>
                  <span className="text-2xl font-semibold text-slate-400 -mt-4">:</span>
                  <div className="flex flex-col items-center">
                    <span className="rounded-xl bg-slate-900 text-white text-2xl font-semibold tracking-tight px-3 py-2 tabular-nums min-w-[3rem] text-center">
                      {s}
                    </span>
                    <span className="mt-1 text-[10px] uppercase tracking-wider text-slate-400">
                      seg
                    </span>
                  </div>
                </>
              );
            })()}
          </div>
        </div>

        <section className="rounded-2xl bg-white border border-slate-200 p-7 flex flex-col items-center text-center gap-1.5">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 text-emerald-700 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider mb-2">
            <Rocket className="h-3 w-3" strokeWidth={2.5} />
            Oferta de hoje
          </span>
          <p className="text-sm text-slate-400 line-through">R$197,00</p>
          <p className="text-5xl font-semibold tracking-tight text-slate-900 leading-none">
            R$29,90
          </p>
          <p className="text-sm text-slate-500 mt-2">
            Pagamento único · Sem mensalidade
          </p>
        </section>

        <div id="wiapy_upsell" className="w-full" />

        <p className="text-center text-sm text-slate-500">
          Essa oferta é válida somente nesta página
        </p>

        <section className="flex flex-col gap-2.5">
          {guarantees.map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 rounded-xl bg-white border border-slate-200 px-4 py-3"
            >
              <ShieldCheck className="h-5 w-5 text-emerald-500 shrink-0" strokeWidth={2.25} />
              <p className="text-[14px] font-medium text-slate-700">{item}</p>
            </div>
          ))}
        </section>

        <p className="text-center text-xs text-slate-400 pb-4">
          © {new Date().getFullYear()} · Todos os direitos reservados
        </p>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default App;
