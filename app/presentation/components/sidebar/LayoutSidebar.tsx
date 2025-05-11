import { Outlet, useLocation, useMatches } from "react-router";

import {
  SidebarInset,
  SidebarTrigger,
  useSidebar,
} from "presentation/components/ui";
import { TypographyH1 } from "presentation/components/shared";

import { PanelLeftClose, PanelRightClose } from "lucide-react";

export const LayoutSidebar = () => {
  const matches = useMatches();
  const { pathname } = useLocation();
  const { open: isOpen } = useSidebar();

  const currentRoute = matches.find((match) => match.pathname === pathname);
  const title = currentRoute?.id;

  return (
    <SidebarInset className="border border-slate-200">
      <div className="container mx-auto p-3">
        <TypographyH1 className="text-slate-900 text-2xl lg:text-2xl font-semibold my-3 lg:my-0 ml-1">
          {title}
        </TypographyH1>

        <main>
          <SidebarTrigger icon={isOpen ? PanelLeftClose : PanelRightClose} />
          <Outlet />
        </main>
      </div>
    </SidebarInset>
  );
};
