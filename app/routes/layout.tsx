import { useEffect } from "react";
import { Link, Navigate, Outlet, useLocation } from "react-router";

import { useAuthStore } from "presentation/store";
import {
  Button,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  Spinner,
} from "presentation/components/ui";
import { TypographyP } from "presentation/components/shared";

import { cn } from "presentation/lib/utils";

interface Route {
  name: string;
  path?: string;
  role?: string;
  subRoutes?: Route[];
}

const routes: Route[] = [
  {
    path: "/clientes",
    name: "Estado de cuenta",
    role: "user",
  },
  {
    role: "user",
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
];

const MainLayout = () => {
  const { pathname } = useLocation();
  const { status, checkStatus, user, hasRole } = useAuthStore();

 /*  useEffect(() => {
    checkStatus();
  }, []);

  if (status === "checking") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner className="text-slate-500" size="xxl" />
      </div>
    );
  }

  if (status === "unauthenticated") {
    return <Navigate to="/" replace />;
  } */

  return (
    <div className="container mx-auto p-3 ">
      <section className="flex flex-col lg:flex-row items-center sm:gap-4">
        <img src="/logo.png" alt="Logo" width={250} height={150} />

        <NavigationMenu>
          <NavigationMenuList>
            {routes.map((route) =>
              route.subRoutes ? (
                <NavigationMenuItem key={route.name}>
                  <NavigationMenuTrigger className="text-xl  rounded-none md:hover:text-slate-700 cursor-pointer">
                    {route.name}
                  </NavigationMenuTrigger>

                  <NavigationMenuContent>
                    <ul className="grid gap-3 py-4 px-8 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                      {route.subRoutes.map((subRoute) => (
                        <NavigationMenuLink
                          key={subRoute.path}
                          className={cn(
                            "block px-4 py-2 text-md rounded-none md:hover:text-slate-700 text-center",
                            {
                              "border-b-2 border-slate-700 font-semibold":
                                pathname === subRoute.path,
                            }
                          )}
                          asChild
                        >
                          <Link to={subRoute.path!}>{subRoute.name}</Link>
                        </NavigationMenuLink>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ) : (
                hasRole(route.role!) &&(
                  <NavigationMenuItem key={route.path}>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "text-xl rounded-none md:hover:text-slate-700",
                        {
                          "border-b-2 border-slate-700":
                            pathname === route.path,
                        }
                      )}
                      asChild
                    >
                      <Link to={route.path!}>{route.name}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                )
              )
            )}
          </NavigationMenuList>
        </NavigationMenu>

        <section className="flex items-center gap-4 ml-auto">
          <div className="flex flex-col xl:flex-row items-center gap-0 xl:gap-1">
            <TypographyP className="text-slate-700 font-semibold text-md">
              {user?.fullName}
            </TypographyP>
          </div>
          <Button className="bg-slate-700 text-white">
            <Link to="/">Cerrar sesión</Link>
          </Button>
        </section>
      </section>

      <Outlet />
    </div>
  );
};

export default MainLayout;
