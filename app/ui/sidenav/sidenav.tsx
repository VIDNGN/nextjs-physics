import Link from "next/link";
import NavLinks from "@/app/ui/nav-links/nav-links";
import PhysTLogo from "@/app/ui/phys-logo";
//import { PowerIcon } from '@heroicons/react/24/outline';
import { UserCircleIcon } from "@heroicons/react/24/outline";
//import { signOut } from "@/auth";
import { logout } from '@/app/lib/auth-actions';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-2 py-2 md:px-2">
      <Link
        className="mb-2 items-center w-full rounded-md bg-[#F5EFFF] md:h-auto mx-auto h-auto p-8"

        href="/"
      >
        <PhysTLogo />
      </Link>

      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <form
          action={async () => {
            "use server";
            await logout();
          }}
        >
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            {/* <PowerIcon className="w-6" /> */}
            <UserCircleIcon className="w-8" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
