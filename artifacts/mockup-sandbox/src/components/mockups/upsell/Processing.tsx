import { useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";

declare global {
  interface Window {
    initWiapyUpsell?: (config: Record<string, unknown>) => void;
  }
}

export function Processing() {
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
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      <Loader2 className="w-12 h-12 text-primary animate-spin" />
      <p className="mt-6 text-base font-medium text-foreground">
        Processando o pagamento
      </p>
      <p className="mt-2 text-sm text-muted-foreground text-center">
        Aguarde um instante, não feche esta página.
      </p>

      <div id="wiapy_upsell" className="mt-10 w-full max-w-sm" />
    </div>
  );
}
