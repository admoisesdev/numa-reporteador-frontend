import { Link } from "react-router";

import { useAuthStore } from "presentation/store";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "../ui";

import type { RoutePage } from "routes/rol-routes";
import { ChevronDown } from "lucide-react";

interface MenuSidebarProps {
  route: RoutePage;
}

export const MenuSidebar = ({ route }: MenuSidebarProps) => {
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
            <SidebarMenuButton className="mx-auto cursor-pointer text-lg text-slate-950 md:hover:bg-slate-200 rounded-md transition-colors duration-200">
              {route.icon && (
                <route.icon className="text-slate-950" width={20} height={20} />
              )}
              <span>{route.name}</span>
              <ChevronDown className="transition-transform group-data-[state=open]/collapsible:rotate-180 ml-auto text-slate-950" />
            </SidebarMenuButton>
          </CollapsibleTrigger>

          <CollapsibleContent>
            <SidebarMenuSub className="flex gap-3 border-slate-300">
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
        className="md:hover:bg-slate-200 rounded-md transition-colors duration-200"
      >
        <SidebarMenuButton asChild className="mx-auto text-lg text-slate-950">
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
