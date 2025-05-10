interface RouteRol {
  role?: string | string[];
  path?: string;
}

interface Route extends RouteRol {
  name: string;
  subRoutes?: Route[];
}

export const routes: Route[] = [
  {
    path: "/clientes",
    name: "Estado de cuenta",
    role: ["user", "asesor-credito", "jefe-credito"],
  },
  {
    role: ["user", "asesor-credito", "jefe-credito"],
    name: "Reportes de Cartera",
    subRoutes: [
      {
        path: "/cartera-cobrada",
        name: "Cartera cobrada",
      },
      {
        path: "/cartera-por-cobrar",
        name: "Cartera por cobrar",
      },
      {
        path: "/antiguedad-cartera",
        name: "Antigüedad de cartera",
      },
    ],
  },
  {
    path: "/usuarios",
    name: "Usuarios",
    role: "admin",
  },
  {
    path: "/empresas",
    name: "Empresas",
    role: "admin",
  },
];

export const routesWithRol: RouteRol[] = [
  {
    path: "/clientes",
    role: ["user", "asesor-credito", "jefe-credito"],
  },
  {
    path: "/cartera-cobrada",
    role: ["user", "asesor-credito", "jefe-credito"],
  },
  {
    path: "/cartera-por-cobrar",
    role: ["user", "asesor-credito", "jefe-credito"],
  },
  {
    path: "/antiguedad-cartera",
    role: ["user", "asesor-credito", "jefe-credito"],
  },
  {
    path: "/usuarios",
    role: "admin",
  },
  {
    path: "/crear-usuario",
    role: "admin",
  },
  {
    path: "/empresas",
    role: "admin",
  },
  {
    path: "/crear-empresa",
    role: "admin",
  },
];
