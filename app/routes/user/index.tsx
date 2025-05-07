import type { Route } from "./+types/index";

import { DataTable } from "presentation/components/shared";



export function meta({}: Route.MetaArgs) {
  return [
    { title: "Usuarios" },
    { name: "description", content: "Bienvenido a la pagina de usuarios" },
  ];
}

export default function CompanyPage() {

  return (
    <>
      <div className="flex flex-col gap-4">
        <h1>Usuarios con empresas asociadas</h1>
      </div>
    </>
  );
}
