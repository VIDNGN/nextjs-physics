import PhysTLogo from "@/app/ui/phys-logo";
import LoginForm from "@/app/ui/login-form";
import { Suspense } from "react";

export default function LoginPage() {
  //const formMode = searchParams.mode;

  return (
    <main className="flex min-h-screen justify-center mx-auto items-center w-full">
      <div className="w-full max-w-2xl">
        <div className="relative mx-auto flex flex-col space-y-2.5 p-4">
          <div className="flex items-center justify-center">
            <div className="w-32 md:w-32">
              <PhysTLogo />
            </div>
          </div>
          <Suspense fallback={<div>Loading...</div>}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
