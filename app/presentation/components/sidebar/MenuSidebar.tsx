import { Link, useLocation } from "react-router";

import { useAuthStore } from "presentation/store";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  useSidebar,
} from "../ui";
import { cn } from "presentation/lib/utils";

import type { RoutePage } from "routes/rol-routes";
import { ChevronDown } from "lucide-react";

interface MenuSidebarProps {
  route: RoutePage;
}

export const MenuSidebar = ({ route }: MenuSidebarProps) => {
  const { pathname } = useLocation();
  const {open: isOpen} = useSidebar();
  const { hasRole, hasAnyRole } = useAuthStore();

  
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
      <Collapsible defaultOpen className="group/collapsible">
        <SidebarMenuItem>
          <CollapsibleTrigger className="flex items-center w-full" asChild>
            <SidebarMenuButton
              className="mx-auto cursor-pointer text-lg text-slate-950"
              isActive={pathname.includes(route.path!)}
            >
              {route.icon && (
                <route.icon className="text-slate-950" width={20} height={20} />
              )}
              <span>{route.name}</span>
              <ChevronDown className="transition-transform group-data-[state=open]/collapsible:rotate-180 ml-auto text-slate-950" />
            </SidebarMenuButton>
          </CollapsibleTrigger>

          <CollapsibleContent>
            <SidebarMenuSub className="flex gap-3 border-slate-00">
              {route.subRoutes
                .filter((subRoute) =>
                  Array.isArray(subRoute.role)
                    ? hasAnyRole(subRoute.role)
                    : subRoute.role
                    ? hasRole(subRoute.role)
                    : true
                )
                .map((subRoute) => (
                  <SidebarMenuSubItem
                    key={subRoute.path}
                    className="text-slate-800"
                  >
                    <Link
                      to={subRoute.path!}
                      className="flex items-center gap-2"
                    >
                      <span>{subRoute.name}</span>
                    </Link>
                  </SidebarMenuSubItem>
                ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    ) : (
      <SidebarMenuItem
        className={cn({
          "rounded-md transition-colors duration-200":
            isOpen,
        })}
      >
        <SidebarMenuButton
          asChild
          className="mx-auto text-lg text-slate-950"
          isActive={route.path === pathname}
        >
          <Link to={route.path!}>
            {route.icon && <route.icon className="text-slate-950" />}
            <span>{route.name}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  }

  return null;
};
