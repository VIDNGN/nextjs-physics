import PhysTLogo from "@/app/ui/phys-logo";
import SignUpForm from "@/app/ui/signup-form";
import { Suspense } from "react";

export default function SignUpPage() {
  return (
    <main className="flex min-h-screen justify-center mx-auto items-center w-full">
      <div className="w-full max-w-2xl">
        <div className="mx-auto flex-col space-y-2.5 p-4">
          <div className="flex items-center justify-center">
            <div className="w-32 md:w-32">
              <PhysTLogo />
            </div>
          </div>
          <Suspense fallback={<div>Loading...</div>}>
            <SignUpForm />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
