import { Building2, FileText, Home, UserCog, Users, type LucideProps } from "lucide-react";

type Icon = React.ForwardRefExoticComponent<
  Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
>;

interface RouteRol {
  role?: string | string[];
  path?: string;
}

export interface RoutePage extends RouteRol {
  name: string;
  subRoutes?: RoutePage[];
  icon?: Icon;
}

export const routes: RoutePage[] = [
  {
    path: "/clientes",
    name: "Estado de cuenta",
    role: ["admin","user", "asesor-credito", "jefe-credito"],
    icon: Users,
  },
  {
    role: ["admin","user", "asesor-credito", "jefe-credito"],
    name: "Reportes de Cartera",
    path: "cartera",
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
    icon: FileText,
  },
  {
    path: "/usuarios",
    name: "Usuarios",
    role: ["admin"],
    icon: UserCog,
  },
  {
    path: "/empresas",
    name: "Empresas",
    role: ["admin"],
    icon: Building2,
  },
];

export const routesWithRol: RouteRol[] = [
  {
    path: "/empresas-usuario",
    role: [],
  },
  {
    path: "/clientes",
    role: ["admin", "user", "asesor-credito", "jefe-credito"],
  },
  {
    path: "/cartera-cobrada",
    role: ["admin", "user", "asesor-credito", "jefe-credito"],
  },
  {
    path: "/cartera-por-cobrar",
    role: ["admin", "user", "asesor-credito", "jefe-credito"],
  },
  {
    path: "/antiguedad-cartera",
    role: ["admin", "user", "asesor-credito", "jefe-credito"],
  },
  {
    path: "/usuarios",
    role: ["admin"],
  },
  {
    path: "/crear-usuario",
    role: ["admin"],
  },
  {
    path: "/empresas",
    role: ["admin"],
  },
  {
    path: "/crear-empresa",
    role: ["admin"],
  },
];
