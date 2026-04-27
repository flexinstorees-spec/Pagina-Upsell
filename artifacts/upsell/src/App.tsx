import { useEffect, useRef } from "react";
import {
  Check,
  X,
  Download,
  Sparkles,
  Clock,
  ShieldCheck,
  Zap,
  Pencil,
  BookOpen,
  Heart,
  Star,
  Smile,
  Palette,
} from "lucide-react";

declare global {
  interface Window {
    initWiapyUpsell?: (config: Record<string, unknown>) => void;
  }
}

function App() {
  const initialized = useRef(false);

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
            borderRadius: "16px",
          },
          refusalLinkUrl: "https://wiapy.com/login",
          refusalLinkText: "Não quero aproveitar a oferta",
          refusalLinkColor: "#64748b",
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
    { icon: BookOpen, text: "Dinâmicas de Português", color: "bg-rose-100 text-rose-600" },
    { icon: Pencil, text: "Dinâmicas de Matemática", color: "bg-sky-100 text-sky-600" },
    { icon: Palette, text: "Coordenação motora", color: "bg-amber-100 text-amber-600" },
    { icon: Heart, text: "Interação em grupo", color: "bg-pink-100 text-pink-600" },
    { icon: Star, text: "Atividades para prender atenção", color: "bg-violet-100 text-violet-600" },
    { icon: Smile, text: "Dinâmicas para momentos difíceis", color: "bg-emerald-100 text-emerald-600" },
    { icon: Sparkles, text: "Ideias rápidas para qualquer aula", color: "bg-yellow-100 text-yellow-600" },
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
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-sky-50 via-amber-50/40 to-emerald-50 text-neutral-900">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-yellow-200/40 blur-2xl" />
        <div className="absolute top-32 -right-12 h-44 w-44 rounded-full bg-pink-200/40 blur-2xl" />
        <div className="absolute top-[55%] -left-16 h-48 w-48 rounded-full bg-sky-200/40 blur-2xl" />
        <div className="absolute bottom-10 -right-10 h-40 w-40 rounded-full bg-emerald-200/40 blur-2xl" />

        <div className="absolute top-24 right-6 text-3xl opacity-40 animate-[float_6s_ease-in-out_infinite]">✏️</div>
        <div className="absolute top-[42%] left-4 text-2xl opacity-40 animate-[float_7s_ease-in-out_infinite_0.5s]">⭐</div>
        <div className="absolute top-[68%] right-5 text-2xl opacity-40 animate-[float_8s_ease-in-out_infinite_1s]">🎨</div>
        <div className="absolute bottom-32 left-6 text-2xl opacity-40 animate-[float_6s_ease-in-out_infinite_1.5s]">📚</div>
      </div>

      <div className="relative mx-auto w-full max-w-md px-5 py-6 flex flex-col gap-8 animate-[fadeIn_400ms_ease-out]">
        <div className="rounded-full bg-amber-100 border-2 border-amber-300 px-4 py-2.5 text-center text-sm font-bold text-amber-800 shadow-sm">
          ⚠️ ESPERE! Não feche esta página
        </div>

        <header className="flex flex-col gap-3 text-center pt-2">
          <div className="flex justify-center gap-1 text-2xl">
            <span>🍎</span>
            <span>📓</span>
            <span>🖍️</span>
          </div>
          <h1 className="text-[28px] leading-tight font-extrabold text-neutral-900">
            Complete sua aula com um material{" "}
            <span className="text-emerald-600">pronto para aplicar</span> todos os dias
          </h1>
          <p className="text-base text-neutral-600 leading-relaxed">
            Você já garantiu seus painéis… mas sua aula está preparada para
            manter os alunos envolvidos?
          </p>
        </header>

        <section className="rounded-3xl bg-white/80 backdrop-blur shadow-md border border-rose-100 p-5 flex flex-col gap-3">
          <p className="text-sm font-bold text-rose-600 uppercase tracking-wide flex items-center gap-2">
            <span className="text-base">😔</span> Talvez você se identifique
          </p>
          {problems.map((item) => (
            <div key={item} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-100 ring-2 ring-red-50">
                <X className="h-4 w-4 text-red-600" strokeWidth={3} />
              </span>
              <p className="text-[15px] leading-snug text-neutral-700 pt-0.5">{item}</p>
            </div>
          ))}
        </section>

        <section className="flex flex-col gap-4">
          <div className="text-center flex flex-col gap-3">
            <span className="inline-flex items-center justify-center gap-1.5 self-center rounded-full bg-gradient-to-r from-emerald-400 to-sky-400 px-4 py-1.5 text-xs font-bold text-white shadow-md">
              <Sparkles className="h-3.5 w-3.5" /> OFERTA EXCLUSIVA
            </span>
            <h2 className="text-[26px] font-extrabold text-neutral-900 leading-tight">
              Pack com{" "}
              <span className="relative inline-block">
                <span className="relative z-10">300 Dinâmicas</span>
                <span className="absolute inset-x-0 bottom-1 h-3 bg-yellow-200/70 -z-0 rounded" />
              </span>{" "}
              Interativas para Sala de Aula
            </h2>
          </div>

          <div className="rounded-3xl bg-white shadow-lg border border-emerald-100 p-5 flex flex-col gap-4">
            <p className="text-sm font-bold text-emerald-700 uppercase tracking-wide flex items-center gap-2">
              <span className="text-base">🎁</span> O que está incluso
            </p>
            <div className="flex flex-col gap-3">
              {included.map(({ icon: Icon, text, color }) => (
                <div key={text} className="flex items-center gap-3">
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${color}`}>
                    <Icon className="h-5 w-5" strokeWidth={2.5} />
                  </span>
                  <p className="text-[15px] leading-snug text-neutral-800 font-medium">
                    {text}
                  </p>
                  <Check className="ml-auto h-5 w-5 text-emerald-500 shrink-0" strokeWidth={3} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h3 className="text-center text-xl font-extrabold text-neutral-900">
            Como funciona <span className="text-base">✨</span>
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: Download, label: "Baixar", color: "from-sky-400 to-sky-500", emoji: "1️⃣" },
              { icon: Zap, label: "Aplicar", color: "from-amber-400 to-amber-500", emoji: "2️⃣" },
              { icon: Clock, label: "Usar no mesmo dia", color: "from-emerald-400 to-emerald-500", emoji: "3️⃣" },
            ].map(({ icon: Icon, label, color, emoji }) => (
              <div
                key={label}
                className="relative flex flex-col items-center gap-2 rounded-3xl bg-white shadow-md border border-neutral-100 px-2 py-5 text-center"
              >
                <span className="absolute -top-2 -left-2 text-lg">{emoji}</span>
                <span className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${color} shadow-sm`}>
                  <Icon className="h-6 w-6 text-white" strokeWidth={2.5} />
                </span>
                <p className="text-xs font-bold text-neutral-700 leading-tight">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl bg-gradient-to-br from-sky-50 to-emerald-50 shadow-md border border-sky-100 p-5 flex flex-col gap-3">
          <p className="text-sm font-bold text-sky-700 uppercase tracking-wide flex items-center gap-2">
            <span className="text-base">💚</span> Benefícios para você
          </p>
          {benefits.map((item) => (
            <div key={item} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500 shadow-sm">
                <Check className="h-4 w-4 text-white" strokeWidth={3.5} />
              </span>
              <p className="text-[15px] leading-snug text-neutral-800 font-medium pt-0.5">{item}</p>
            </div>
          ))}
        </section>

        <section className="relative rounded-3xl bg-white border-4 border-dashed border-emerald-300 p-6 flex flex-col items-center text-center gap-2 shadow-lg">
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald-500 px-4 py-1 text-xs font-bold text-white shadow-md">
            🔥 OFERTA DE HOJE
          </span>
          <p className="text-sm text-neutral-400 line-through mt-2">De R$197,00 por:</p>
          <p className="text-6xl font-extrabold leading-none bg-gradient-to-r from-emerald-500 to-sky-500 bg-clip-text text-transparent">
            R$49,90
          </p>
          <p className="text-sm font-semibold text-neutral-600 mt-1 flex items-center gap-1.5">
            <span>💳</span> Pagamento único • Sem mensalidade
          </p>
        </section>

        <div id="wiapy_upsell" className="w-full" />

        <p className="text-center text-sm font-bold text-amber-800 bg-amber-100 border-2 border-amber-200 rounded-2xl py-3 px-4 flex items-center justify-center gap-2">
          <span>⏰</span> Essa oferta é válida somente nesta página
        </p>

        <section className="flex flex-col gap-3">
          <h3 className="text-center text-base font-bold text-neutral-700 uppercase tracking-wide">
            Suas garantias
          </h3>
          {guarantees.map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 rounded-2xl bg-white border border-emerald-100 px-4 py-3.5 shadow-sm"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 shrink-0">
                <ShieldCheck className="h-5 w-5 text-emerald-600" />
              </span>
              <p className="text-[15px] font-semibold text-neutral-700">{item}</p>
            </div>
          ))}
        </section>

        <p className="text-center text-xs text-neutral-400 pb-4">
          © {new Date().getFullYear()} • Feito com <span className="text-rose-400">♥</span> para professoras
        </p>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}

export default App;
