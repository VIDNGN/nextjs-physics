import SideNav from "@/app/ui/sidenav/sidenav";
import { GoogleTagManager } from "@next/third-parties/google";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow p-6 overflow-y-auto overflow-x-auto md:p-8">{children}</div>
    </div>
  );
}
