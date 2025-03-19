import { Link, Outlet, useLocation } from "react-router";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "presentation/components/ui";
import { cn } from "presentation/lib/utils";

const routes = [
  {
    path: "/",
    name: "Estado de cuenta",
  },
  {
    path: "/cartera-cobrada",
    name: "Cartera cobrada",
  },
];

const MainLayout = () => {
  const { pathname } = useLocation();

  return (
    <div className="container mx-auto p-3">
      <section className="flex flex-col-reverse sm:flex-row items-center sm:gap-4">
        <img src="/logo.png" alt="Logo" width={250} height={150} />

        <NavigationMenu>
          <NavigationMenuList>
            {routes.map((route) => (
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
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </section>

      <Outlet />
    </div>
  );
};

export default MainLayout;
