import { useEffect, useRef } from "react";
import {
  Check,
  X,
  Download,
  Sparkles,
  Clock,
  ShieldCheck,
  Zap,
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
            backgroundColor: "#00d769",
            hoverBackgroundColor: "#00b85a",
            fontSize: "18px",
            borderRadius: "12px",
          },
          refusalLinkUrl: "https://wiapy.com/login",
          refusalLinkText: "Não quero aproveitar a oferta",
          refusalLinkColor: "#000000",
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
    <div className="min-h-screen w-full bg-gradient-to-b from-sky-50 via-white to-emerald-50 text-neutral-900">
      <div className="mx-auto w-full max-w-md px-5 py-6 flex flex-col gap-8 animate-[fadeIn_400ms_ease-out]">
        <div className="rounded-full bg-amber-100 border border-amber-200 px-4 py-2 text-center text-sm font-semibold text-amber-800">
          ⚠️ ESPERE! Não feche esta página
        </div>

        <header className="flex flex-col gap-3 text-center">
          <h1 className="text-[26px] leading-tight font-extrabold text-neutral-900">
            Complete sua aula com um material pronto para aplicar todos os dias
          </h1>
          <p className="text-base text-neutral-600 leading-relaxed">
            Você já garantiu seus painéis… mas sua aula está preparada para
            manter os alunos envolvidos?
          </p>
        </header>

        <section className="rounded-2xl bg-white shadow-sm border border-neutral-100 p-5 flex flex-col gap-3">
          {problems.map((item) => (
            <div key={item} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100">
                <X className="h-4 w-4 text-red-600" strokeWidth={3} />
              </span>
              <p className="text-[15px] leading-snug text-neutral-700">{item}</p>
            </div>
          ))}
        </section>

        <section className="flex flex-col gap-4">
          <div className="text-center flex flex-col gap-2">
            <span className="inline-flex items-center justify-center gap-1.5 self-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
              <Sparkles className="h-3.5 w-3.5" /> OFERTA EXCLUSIVA
            </span>
            <h2 className="text-2xl font-extrabold text-neutral-900 leading-tight">
              Pack com 300 Dinâmicas Interativas para Sala de Aula
            </h2>
          </div>

          <div className="rounded-2xl bg-white shadow-sm border border-neutral-100 p-5 flex flex-col gap-3">
            <p className="text-sm font-semibold text-neutral-500 uppercase tracking-wide">
              O que está incluso
            </p>
            {included.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                  <Check className="h-4 w-4 text-emerald-600" strokeWidth={3} />
                </span>
                <p className="text-[15px] leading-snug text-neutral-700">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h3 className="text-center text-lg font-bold text-neutral-900">
            Como funciona
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: Download, label: "Baixar" },
              { icon: Zap, label: "Aplicar" },
              { icon: Clock, label: "Usar no mesmo dia" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-2 rounded-2xl bg-white shadow-sm border border-neutral-100 px-2 py-4 text-center"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sky-100">
                  <Icon className="h-5 w-5 text-sky-600" />
                </span>
                <p className="text-xs font-semibold text-neutral-700 leading-tight">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl bg-white shadow-sm border border-neutral-100 p-5 flex flex-col gap-3">
          <p className="text-sm font-semibold text-neutral-500 uppercase tracking-wide">
            Benefícios
          </p>
          {benefits.map((item) => (
            <div key={item} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                <Check className="h-4 w-4 text-emerald-600" strokeWidth={3} />
              </span>
              <p className="text-[15px] leading-snug text-neutral-700">{item}</p>
            </div>
          ))}
        </section>

        <section className="rounded-3xl bg-gradient-to-br from-emerald-50 to-sky-50 border-2 border-emerald-200 p-6 flex flex-col items-center text-center gap-2">
          <p className="text-sm text-neutral-500 line-through">De R$197,00</p>
          <p className="text-5xl font-extrabold text-emerald-600 leading-none">
            R$49,90
          </p>
          <p className="text-sm font-medium text-neutral-600 mt-1">
            Pagamento único • Sem mensalidade
          </p>
        </section>

        <div id="wiapy_upsell" className="w-full" />

        <p className="text-center text-sm font-semibold text-amber-700 bg-amber-50 border border-amber-200 rounded-xl py-3 px-4">
          Essa oferta é válida somente nesta página
        </p>

        <section className="flex flex-col gap-3">
          {guarantees.map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 rounded-xl bg-white border border-neutral-100 px-4 py-3 shadow-sm"
            >
              <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0" />
              <p className="text-[15px] font-medium text-neutral-700">{item}</p>
            </div>
          ))}
        </section>

        <p className="text-center text-xs text-neutral-400 pb-4">
          © {new Date().getFullYear()} • Todos os direitos reservados
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
