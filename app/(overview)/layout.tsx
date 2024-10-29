import MainHeader from "@/app/ui/main-headers/main-header";
import { GoogleTagManager } from "@next/third-parties/google";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (

    <div className="flex flex-col min-h-screen md:overflow-hidden">
      <div className="w-full">
        <MainHeader />
      </div>
      <div className="flex-grow lg:p-6 mt-20 md:mt-24">{children}</div>
    </div>
  );
}
