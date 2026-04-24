import { useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";

declare global {
  interface Window {
    initWiapyUpsell?: (config: Record<string, unknown>) => void;
  }
  namespace JSX {
    interface IntrinsicElements {
      "wistia-player": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & { "media-id"?: string; aspect?: string },
        HTMLElement
      >;
    }
  }
}

function App() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;

    const tryInit = () => {
      if (typeof window.initWiapyUpsell === "function") {
        window.initWiapyUpsell({
          linkUrl: "https://pay.wiapy.com/checkout/undefined",
          linkText: "EU QUERO APROVEITAR A OFERTA",
          styles: {
            backgroundColor: "#00d769",
            hoverBackgroundColor: "#00b85a",
            fontSize: "17px",
            borderRadius: "10px",
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

  return (
    <div className="min-h-screen w-full flex flex-col items-center px-6 py-10 bg-white text-neutral-900">
      <div className="w-full max-w-md flex flex-col items-center">
        <div className="flex flex-col items-center">
          <Loader2 className="w-12 h-12 text-[#00d769] animate-spin" />
          <p className="mt-6 text-base font-semibold">
            Processando o pagamento
          </p>
          <p className="mt-2 text-sm text-neutral-500 text-center">
            Aguarde um instante, não feche esta página.
          </p>
        </div>

        <div id="wiapy_upsell" className="mt-8 w-full" />

        <div className="mt-8 w-full">
          <wistia-player media-id="zeh8jif70j" aspect="0.5625"></wistia-player>
        </div>
      </div>
    </div>
  );
}

export default App;
