import PhysTLogo from "@/app/ui/phys-logo";
import SignUpForm from "@/app/ui/signup-form";
//import { AuthMode, AuthFormProps } from "@/app/lib/definitions";
export default function SignUpPage() {


  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-center justify-center rounded-lg bg-[#27374D] p-3 md:h-36">
          <div className="w-32 md:w-36">
            <PhysTLogo />
          </div>
        </div>
        <SignUpForm />
      </div>
    </main>
  );
}
