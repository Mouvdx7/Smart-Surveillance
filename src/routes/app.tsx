import { createFileRoute, Outlet } from "@tanstack/react-router";
import { BottomTabs } from "@/components/BottomTabs";

export const Route = createFileRoute("/app")({
  component: AppLayout,
});

function AppLayout() {
  return (
    <div className="relative mx-auto min-h-screen max-w-xl pb-24">
      <Outlet />
      <BottomTabs />
    </div>
  );
}
