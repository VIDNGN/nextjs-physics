import ContactForm from "@/app/ui/contact-form";
//import PhysTLogo from "@/app/ui/phys-logo";
import Image from 'next/image';
import Logo from "@/app/ui/logo.png";

import { Suspense } from "react";
export default function Page() {
  return (
    <main className="flex min-h-screen items-center justify-center mx-auto max-w-7xl">
      <div className="relative mx-auto flex flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex items-center justify-center">
          {/* <PhysTLogo /> */}
          <Image
          className="rounded-md h-40 w-40"
          src={Logo}
          alt="G and V logo"
          width={961}
          height={871}
        />
        </div>
        <div>
          <Suspense fallback={<div>Loading....</div>}>
            {" "}
            <ContactForm />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
