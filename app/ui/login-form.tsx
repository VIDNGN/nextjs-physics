"use client";

import Link from "next/link";
//import { useActionState } from 'react';
import { useFormState } from "react-dom";
import { authenticate } from "@/app/lib/auth-actions";
import { Button } from "@/app/ui/button";
import GoogleLogo from "@/app/ui/icons8-google.svg";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { SignupFormState } from "@/app/lib/definitions";

import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/login";
  //console.log("search params callbackUrl login form", callbackUrl);

  const [formState, formAction, isPending] = useFormState(
    authenticate,
    undefined
  );

  return (
    <form action={formAction} className="space-y-3">
      <div className="flex w-full justify-center rounded-lg bg-gray-50 p-16 md:p-8">
        <div className="md:w-2/3 lg:w-full">
          <h1 className="mx-auto text-2xl text-pretty text-center">
            Please log in to ask questions.
          </h1>
          <div className="">
            <div>
              {" "}
              <input type="hidden" name="callbackUrl" value={callbackUrl} />
            </div>
            <div>
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="email"
              >
                Email
              </label>

              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  required
                />
                <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
            {formState?.errors?.email && <p>{formState.errors.email}</p>}
            <div className="mt-4">
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  required
                  minLength={6}
                />
                <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
            {formState?.errors?.password &&
              formState.errors.password.length > 0 && (
                <div>
                  <div className="flex flex-row">
                    <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                    <p>Password must: </p>
                  </div>
                  <ul>
                    {formState.errors.password.map((error) => (
                      <li key={error}> -{error}</li>
                    ))}
                  </ul>
                </div>
              )}
          </div>

          <div className="mt-8 flex justify-center">
            <Button
              //className="mt-4 w-full"
              aria-disabled={isPending}
              type="submit"
            >
              Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
            </Button>
          </div>

          <div className="flex justify-center text-rose-600">
            {formState?.message && formState.message.length > 0 && (
              <p>{formState.message}</p>
            )}
          </div>
          <div className="mt-4 flex justify-center">
            <Link
              className="flex h-10 items-center rounded-lg bg-[#DDE6ED] px-4 text-sm font-medium text-[#27374D] transition-colors hover:bg-[#9DB2BF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bg-[#526D82] active:bg-[#9DB2BF] aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
              href="/login/google"
            >
              <Image
                className="h-10 w-10 rounded-full object-cover p-2"
                src={GoogleLogo}
                alt="Google logo"
                width={48}
                height={48}
              />
              Log in with Google{" "}
              {/* <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" /> */}
            </Link>
          </div>

          <div className="flex justify-center text-rose-600">
            {formState?.message && formState.message.length > 0 && (
              <p>{formState.message}</p>
            )}
          </div>
          <div className="py-2 flex justify-center text-[#526D82]">
            <p>
              <Link href="/signup">New here? Create an account</Link>
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}

{
  /* <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div> */
}

// {formState?.errors && (
//     <ul id="form-errors">
//       {Object.keys(formState.errors).map((error, idx) => (
//         <li key={idx}>{formState.errors[error]}</li>
//       ))}
//     </ul>
//   )}
