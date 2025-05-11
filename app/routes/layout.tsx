import { useEffect } from "react";
import { Navigate } from "react-router";

import { useAuthStore } from "presentation/store";
import { SidebarProvider, Spinner } from "presentation/components/ui";

import { AppSidebar, LayoutSidebar } from "presentation/components/sidebar";

const MainLayout = () => {
  const { status, checkStatus } = useAuthStore();

  useEffect(() => {
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
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      
      <LayoutSidebar />
    </SidebarProvider>
  );
};

export default MainLayout;
