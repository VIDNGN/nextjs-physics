import { lusitana } from "@/app/ui/fonts";
import Logo from "@/app/ui/logo.png";
import Image from "next/image";

export default function PhysTLogo() {
  return (

      <div
        // className={`${lusitana.className} flex flex-col items-center leading-none text-white`}>
        className="flex items-center justify-center leading-none text-[#DDE6ED]"
      >
        <Image
          className="h-20 w-20 rounded-full object-cover"
          src={Logo}
          alt="Electromageticsm Maxwell Equations Logo"
          width={1024}
          height={1024}
        />
        <div>
          <p className="text-[38px]">The Physics Tutorials</p>{" "}
        </div>
      
    </div>
  );
}
