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
  ]),
] satisfies RouteConfig;
