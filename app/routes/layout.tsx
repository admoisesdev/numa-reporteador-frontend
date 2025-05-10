import { useEffect } from "react";
import { Link, Navigate, Outlet, useLocation, useMatches } from "react-router";

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
import { TypographyH1, TypographyH4, TypographyP } from "presentation/components/shared";

import { cn } from "presentation/lib/utils";
import { routes, routesWithRol } from "./rol-routes";

const MainLayout = () => {
  const matches = useMatches();
  const { pathname } = useLocation();
  const { status, checkStatus, user, hasRole, hasAnyRole } = useAuthStore();

  useEffect(() => {
    checkStatus();
  }, []);

  const currentRoute = matches.find((match) => match.pathname === pathname);
  const title = currentRoute?.id;

  const hasAccess = routesWithRol.some((route) => {
    if (route.path === pathname) {
      return Array.isArray(route.role)
        ? hasAnyRole(route.role)
        : hasRole(route.role!);
    }
    return false;
  });

  if (status === "checking") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner className="text-slate-500" size="xxl" />
      </div>
    );
  }

  if (status === "unauthenticated") {
    return <Navigate to="/" replace />;
  }

  if (!hasAccess) return <Navigate to="/clientes" replace />;

  return (
    <div className="container mx-auto p-3">
      <section className="flex flex-col lg:flex-row justify-between items-center">
        <img src="/logo.png" alt="Logo" width={200} height={150} />

        <TypographyH1 className="text-slate-900 text-center text-2xl lg:text-2xl font-semibold my-3 lg:my-0">
          {title}
        </TypographyH1>

        <section className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex sm:flex-row items-center gap-2">
            <TypographyH4 className="text-slate-800">Bienvenido:</TypographyH4>
            <TypographyP className="text-slate-600 font-semibold text-md">
              {user?.fullName}
            </TypographyP>
          </div>
          <Button className="bg-slate-700 text-white">
            <Link to="/">Cerrar sesión</Link>
          </Button>
        </section>
      </section>

      <NavigationMenu className="mt-4 sm:mt-0">
        <NavigationMenuList className="flex flex-col md:flex-row gap-4 mt-4">
          {routes.map((route) => {
            const hasRouteAccess = Array.isArray(route.role)
              ? hasAnyRole(route.role)
              : route.role
              ? hasRole(route.role)
              : true;

            const hasSubRouteAccess = route.subRoutes?.some((subRoute) =>
              Array.isArray(subRoute.role)
                ? hasAnyRole(subRoute.role)
                : subRoute.role
                ? hasRole(subRoute.role)
                : true
            );

            if (hasRouteAccess || hasSubRouteAccess) {
              return route.subRoutes ? (
                <NavigationMenuItem key={route.name}>
                  <NavigationMenuTrigger className="pl-0 text-xl rounded-none md:hover:text-slate-700 cursor-pointer">
                    {route.name}
                  </NavigationMenuTrigger>

                  <NavigationMenuContent>
                    <ul className="grid gap-3 py-4 px-8 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                      {route.subRoutes
                        .filter((subRoute) =>
                          Array.isArray(subRoute.role)
                            ? hasAnyRole(subRoute.role)
                            : subRoute.role
                            ? hasRole(subRoute.role)
                            : true
                        )
                        .map((subRoute) => (
                          <NavigationMenuLink
                            key={subRoute.path}
                            className={cn(
                              "pl-0 block px-4 py-2 text-md rounded-none md:hover:text-slate-700 text-center",
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
                <NavigationMenuItem key={route.path}>
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "pl-0 text-xl rounded-none md:hover:text-slate-700",
                      {
                        "border-b-2 border-slate-700": pathname === route.path,
                      }
                    )}
                    asChild
                  >
                    <Link to={route.path!}>{route.name}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            }

            return null;
          })}
        </NavigationMenuList>
      </NavigationMenu>

      <Outlet />
    </div>
  );
};

export default MainLayout;
