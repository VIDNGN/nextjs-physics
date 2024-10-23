import { lusitana } from "@/app/ui/fonts";
import Logo from "@/app/ui/logo.png";
import Image from "next/image";

export default function PhysTLogo() {
  return (

      <div
        // className={`${lusitana.className} flex flex-col items-center leading-none text-white`}>
        className="flex flex-col items-center justify-center leading-none text-[#DDE6ED]"
      >
        <Image
          className="rounded-lg h-32 w-32"
          src={Logo}
          alt="Grok Vectors logo"
          width={1024}
          height={1024}
        />
        <div>
          <p className="text-[20px] text-[#1E3E62] mt-2">Grok Vectors</p>{" "}
        </div>
      
    </div>
  );
}
