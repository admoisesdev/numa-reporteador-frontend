import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("routes/layout.tsx", [
    index("routes/customer/home.tsx"),
    route("cartera-cobrada", "routes/contract/charged-portfolio.tsx"),
    route("cartera-por-cobrar", "routes/contract/receivables.tsx"),
    route("antiguedad-cartera", "routes/contract/portfolio-age.tsx"),
  ]),
  layout("routes/auth/layout.tsx", [
    index("routes/auth/login.tsx"),
    route("register", "routes/auth/register.tsx"),
    route("confirm-account", "routes/auth/confirm-account.tsx"),
  ]),
] satisfies RouteConfig;
