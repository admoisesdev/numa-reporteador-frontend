import { Link, Outlet, useLocation } from "react-router";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "presentation/components/ui";
import { cn } from "presentation/lib/utils";

const routes = [
  {
    path: "/",
    name: "Estado de cuenta",
  },
  {
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
];

const MainLayout = () => {
  const { pathname } = useLocation();

  return (
    <div className="container mx-auto p-3 ">
      <section className="flex flex-col-reverse sm:flex-row items-center sm:gap-4">
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
                          <Link to={subRoute.path}>{subRoute.name}</Link>
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
                      "text-xl rounded-none md:hover:text-slate-700",
                      {
                        "border-b-2 border-slate-700": pathname === route.path,
                      }
                    )}
                    asChild
                  >
                    <Link to={route.path}>{route.name}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </section>

      <Outlet />
    </div>
  );
};

export default MainLayout;
