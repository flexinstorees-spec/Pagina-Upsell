import { Loader2 } from "lucide-react";

export function Processing() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      <Loader2 className="w-12 h-12 text-primary animate-spin" />
      <p className="mt-6 text-base font-medium text-foreground">
        Processando o pagamento
      </p>
      <p className="mt-2 text-sm text-muted-foreground text-center">
        Aguarde um instante, não feche esta página.
      </p>
    </div>
  );
}
