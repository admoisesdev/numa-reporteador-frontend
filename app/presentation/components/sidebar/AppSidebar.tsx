import { Link, Navigate, useLocation } from "react-router";
import { useAuthStore } from "presentation/store";

import {
  Button,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarTrigger,
  useSidebar,
} from "../ui";
import { TypographyH4 } from "../shared";
import { MenuSidebar } from "./MenuSidebar";
import { cn } from "presentation/lib/utils";

import { Formatter } from "config/helpers";
import { routes, routesWithRol } from "routes/rol-routes";

import { PanelLeftClose, PanelRightClose } from "lucide-react";

export const AppSidebar = () => {
  const { pathname } = useLocation();
  const { user, hasRole, hasAnyRole } = useAuthStore();
  const { open: isOpen } = useSidebar();

  const hasAccess = routesWithRol.some((route) => {
    if (route.path === pathname) {
      return Array.isArray(route.role)
        ? hasAnyRole(route.role)
        : hasRole(route.role!);
    }
    return false;
  });

  if (!hasAccess) return <Navigate to="/empresas-usuario" replace />;

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarTrigger
        icon={isOpen ? PanelLeftClose : PanelRightClose}
        className={cn("absolute top-1 right-0 text-zinc-800", {
          "pl-2": !isOpen,
        })}
      />
      
      <SidebarHeader>
        {isOpen ? <img src="/logo.png" alt="Logo" height={150} /> : null}
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="flex flex-col gap-2">
          {routes.map((route) => (
            <MenuSidebar key={route.name} route={route} />
          ))}
        </SidebarMenu>
      </SidebarContent>

      {isOpen && (
        <SidebarFooter className="flex flex-col gap-0">
          <TypographyH4 className="text-slate-800 font-semibold">
            {user && user?.fullName.split(" ").length >= 3
              ? Formatter.initialLetters(user?.fullName!, 3)
              : user?.fullName}
          </TypographyH4>

          <Button variant="link" className="justify-start pl-0">
            <Link to="/" className="text-slate-700 uppercase font-semibold">
              Cerrar sesión
            </Link>
          </Button>
        </SidebarFooter>
      )}
    </Sidebar>
  );
};
