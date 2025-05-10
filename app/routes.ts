import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("routes/auth/layout.tsx", [
    index("routes/auth/login.tsx"),
    route("registrar", "routes/auth/register.tsx"),
  ]),
  layout("routes/layout.tsx", [
    route("clientes", "routes/customer/home.tsx", {
      id: "Estado de cuenta de tus clientes",
    }),
    route("cartera-cobrada", "routes/contract/charged-portfolio.tsx", {
      id: "Reporte de cartera cobrada",
    }),
    route("cartera-por-cobrar", "routes/contract/receivables.tsx", {
      id: "Reporte de cartera por cobrar",
    }),
    route("antiguedad-cartera", "routes/contract/portfolio-age.tsx", {
      id: "Reporte de antigüedad de cartera",
    }),
    route("usuarios", "routes/user/user.tsx", {
      id: "Gestiona los usuarios",
    }),
    route("crear-usuario", "routes/user/new-user.tsx", {
      id: "Crear nuevo usuario",
    }),
    route("empresas", "routes/company/company.tsx", {
      id: "Gestiona las empresas",
    }),
    route("crear-empresa", "routes/company/new-company.tsx", {
      id: "Crear nueva empresa",
    }),
  ]),
] satisfies RouteConfig;
