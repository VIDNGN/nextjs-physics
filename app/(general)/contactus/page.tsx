import ContactForm from "@/app/ui/contact-form";
//import PhysTLogo from "@/app/ui/phys-logo";
import Image from "next/image";
import Logo from "@/app/ui/logo.png";
import Breadcrumbs from "@/app/ui/tutorials/breadcrumbs";
import { Suspense } from "react";
export default function Page() {
  return (
    <main className="flex min-h-screen justify-center mx-auto px-2 md:pt-28">
      {/* <Breadcrumbs
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact Us", href: "/contactus", active: true },
        ]}
      /> */}
      <div className="items-center justify-center max-w-7xl">
        <div className="relative mx-auto flex flex-col space-y-2.5 p-4">
          {/* <div className="flex items-center justify-center">
          <Image
            className="rounded-md h-40 w-40"
            src={Logo}
            alt="G and V logo"
            width={961}
            height={871}
          />
        </div> */}
          <div>
            <Suspense fallback={<div>Loading....</div>}>
              {" "}
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  );
}
