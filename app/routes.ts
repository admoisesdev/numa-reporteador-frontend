import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("routes/auth/layout.tsx", [
    route("login","routes/auth/login.tsx"),
    route("registrar", "routes/auth/register.tsx"),
  ]),
  layout("routes/layout.tsx", [
    // route("/clientes", "routes/customer/home.tsx"),
    index("routes/customer/home.tsx"),
    route("cartera-cobrada", "routes/contract/charged-portfolio.tsx"),
    route("cartera-por-cobrar", "routes/contract/receivables.tsx"),
    route("antiguedad-cartera", "routes/contract/portfolio-age.tsx"),
  ]),
] satisfies RouteConfig;
