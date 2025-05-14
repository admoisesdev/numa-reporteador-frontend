import type { Route } from "./+types/user-companies";
import { Link } from "react-router";

import { TypographyH1, TypographyH4 } from "presentation/components/shared";
import { useCompaniesByUser } from "presentation/hooks/company";

import { BriefcaseBusiness } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Clientes" },
    { name: "description", content: "Bienvenido a la pagina de clientes" },
  ];
}

export default function UserCompaniesPage() {
  const { queryCompaniesByUser } = useCompaniesByUser();

  return (
    <section className="container flex flex-col justify-center min-h-screen">
      <TypographyH1 className="text-slate-900 text-xl lg:text-xl font-semibold text-center mb-3 uppercase">
        Seleccione la empresa
      </TypographyH1>

      <section className="flex flex-col items-center space-y-4">
        {queryCompaniesByUser.isLoading ? (
          <div className="flex items-center space-x-2">
            <BriefcaseBusiness className="w-7 h-7 animate-spin text-slate-800" />
            <span className="text-slate-900 text-xl">Cargando...</span>
          </div>
        ) : queryCompaniesByUser.data &&
          queryCompaniesByUser.data.length === 0 ? (
          <div className="flex items-center space-x-4 rounded-md border p-4 w-3/4 bg-white border-slate-200">
            <BriefcaseBusiness className="w-7 h-7 text-slate-800" />
            <TypographyH4 className="text-slate-900">
              No hay empresas asignadas para el usuario aún.
            </TypographyH4>
          </div>
        ) : (
          queryCompaniesByUser.data?.map((company) => (
            <Link
              to="/clientes"
              key={company.id}
              className="flex items-center space-x-4 rounded-md border p-4 w-2/4 hover:shadow-sm transition-all duration-200 ease-in-out bg-white border-slate-200 hover:border-slate-300 focus:outline-none focus:ring-1 focus:ring-slate-400 focus:ring-offset-slate-50"
            >
              <BriefcaseBusiness className="w-7 h-7 text-slate-800" />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {company.businessName}
                </p>
                <p className="text-sm text-muted-foreground">
                  {company.project}
                </p>
              </div>
            </Link>
          ))
        )}
      </section>
    </section>
  );
}
