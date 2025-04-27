import { useConfirmAccount } from "@/presentation/hooks";

import { TypographyH1 } from "@/presentation/components/shared/TypographyH1"
import { Alert, AlertTitle } from "@/presentation/components/ui";

import { useParams } from "react-router-dom";
import { CircleCheckBig, Loader, Tags } from "lucide-react";

export const ConfirmAccount = () => {
  const params = useParams();
  const { queryConfirmAccount } = useConfirmAccount(params.id as string);
  return (
    <section className="p-4">
      <TypographyH1 className="text-sky-700 text-center py-10 px-3">
        Confirma tu cuenta para poder acceder a tus{" "}
        <span className="text-slate-900">proyectos</span>
      </TypographyH1>

      {queryConfirmAccount.isLoading && (
        <Alert className="justify-center">
          <Loader />
          <AlertTitle>Validando cuenta...</AlertTitle>
        </Alert>
      )}

      {queryConfirmAccount.data && (
        <Alert variant="success" className="justify-center">
          <CircleCheckBig />
          <AlertTitle>{queryConfirmAccount.data.message}</AlertTitle>
        </Alert>
      )}

      {queryConfirmAccount.isError && (
        <Alert variant="destructive" className="justify-center">
          <Tags />
          <AlertTitle>{queryConfirmAccount.error.message}</AlertTitle>
        </Alert>
      )}
    </section>
  );
}
