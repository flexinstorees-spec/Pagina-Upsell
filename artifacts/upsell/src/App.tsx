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
  Star,
  ChevronLeft,
  ChevronRight,
  Volume2,
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

const testimonials = [
  {
    name: "Ana Paula S.",
    role: "Professora de Ensino Fundamental",
    text: "Comprei ontem e já usei duas dinâmicas hoje! Os alunos adoraram e a aula ficou muito mais animada. Vale cada centavo!",
    stars: 5,
  },
  {
    name: "Carla M.",
    role: "Pedagoga",
    text: "Estava com dificuldade de prender a atenção da turma. Depois das dinâmicas, a diferença foi imediata. Recomendo demais!",
    stars: 5,
  },
  {
    name: "Fernanda R.",
    role: "Professora de Português",
    text: "Material muito bem organizado. Dá pra usar na hora, sem precisar preparar nada. Salvou minha semana!",
    stars: 5,
  },
  {
    name: "Juliana T.",
    role: "Professora de Matemática",
    text: "Nunca imaginei que ia conseguir deixar a aula de matemática tão divertida. Os alunos pediram pra repetir!",
    stars: 5,
  },
  {
    name: "Mariana L.",
    role: "Professora de Educação Infantil",
    text: "Excelente conteúdo! As dinâmicas de coordenação motora foram um sucesso com as crianças. Super recomendo.",
    stars: 5,
  },
  {
    name: "Patricia O.",
    role: "Professora do 3º ano",
    text: "Já comprei outros materiais parecidos, mas esse é o melhor. Prático, completo e funciona de verdade em sala.",
    stars: 5,
  },
  {
    name: "Renata B.",
    role: "Coordenadora Pedagógica",
    text: "Indiquei pra toda a equipe da escola. As professoras adoraram e já estão usando. Conteúdo de altíssima qualidade!",
    stars: 5,
  },
  {
    name: "Simone F.",
    role: "Professora de Ciências",
    text: "Pensava que não ia funcionar com minha turma difícil, mas funcionou! Os alunos ficaram engajados do início ao fim.",
    stars: 5,
  },
];

function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % testimonials.length);
    }, 4000);
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const prev = () => {
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
    resetTimer();
  };

  const next = () => {
    setCurrent((c) => (c + 1) % testimonials.length);
    resetTimer();
  };

  const t = testimonials[current];

  return (
    <section className="flex flex-col gap-4">
      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
        <Star className="h-4 w-4 text-amber-400 fill-amber-400" strokeWidth={2} />
        O que dizem as professoras
      </p>

      <div className="relative">
        <div className="rounded-2xl bg-white border border-slate-200 p-6 flex flex-col gap-4 min-h-[180px]">
          <div className="flex gap-0.5">
            {Array.from({ length: t.stars }).map((_, i) => (
              <Star key={i} className="h-4 w-4 text-amber-400 fill-amber-400" strokeWidth={0} />
            ))}
          </div>
          <p className="text-[15px] leading-relaxed text-slate-700 flex-1">"{t.text}"</p>
          <div>
            <p className="text-sm font-semibold text-slate-900">{t.name}</p>
            <p className="text-xs text-slate-400 mt-0.5">{t.role}</p>
          </div>
        </div>

        <button
          onClick={prev}
          className="absolute left-[-16px] top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-white border border-slate-200 shadow-sm text-slate-500 hover:text-slate-900 transition-colors"
          aria-label="Anterior"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          onClick={next}
          className="absolute right-[-16px] top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-white border border-slate-200 shadow-sm text-slate-500 hover:text-slate-900 transition-colors"
          aria-label="Próximo"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="flex justify-center gap-1.5">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => { setCurrent(i); resetTimer(); }}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current ? "w-5 bg-emerald-500" : "w-1.5 bg-slate-300"
            }`}
            aria-label={`Depoimento ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

function App() {
  const initialized = useRef(false);
  const [secondsLeft, setSecondsLeft] = useState(COUNTDOWN_SECONDS);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleVideoTap = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.muted = false;
      videoRef.current.play();
      setHasInteracted(true);
    }
  };

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
          <div className="relative mt-1 w-full overflow-hidden rounded-xl" style={{ aspectRatio: "9/16" }}>
            <video
              ref={videoRef}
              src="https://i.imgur.com/Myw9yLg.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
            {!hasInteracted && (
              <button
                onClick={handleVideoTap}
                className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/50"
              >
                <span className="relative flex items-center justify-center">
                  <span className="absolute h-24 w-24 rounded-full bg-emerald-400/40 animate-ping" />
                  <span className="absolute h-20 w-20 rounded-full bg-emerald-400/30" />
                  <span className="relative flex items-center justify-center h-16 w-16 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50">
                    <Volume2 className="h-7 w-7 text-white" />
                  </span>
                </span>
                <span className="rounded-full bg-white px-5 py-2 text-sm font-bold text-emerald-700 shadow-lg tracking-wide uppercase">
                  Toque para ouvir
                </span>
              </button>
            )}
          </div>
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

        <TestimonialsCarousel />

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
            R$14,90
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
