"use client";

import Link from "next/link";
//import { useActionState } from 'react';
import { useFormState } from "react-dom";
import { signup } from "@/app/lib/auth-actions";
import { Button } from "./button";
import { SignupFormState } from "@/app/lib/definitions";
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

import { useSearchParams } from "next/navigation";

export default function SignUpForm() {
  /*
  usePathname(): This hook gets the current path on the server component (DiscussionPage) so you can pass it as the callbackUrl to the sign-in link.
    useSearchParams(): Used on the sign-in page to retrieve the callbackUrl query parameter from the URL.
    signIn(): This is an example using NextAuth.js, where you can sign in without redirecting immediately (redirect: false). After successful authentication, 
    you use router.push(callbackUrl) to send the user back to the original page.
  */
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/signup";

  const [formState, formAction, isPending] = useFormState(signup, undefined);

  return (
    <form action={formAction} className="space-y-3">
      <div className="flex w-full justify-center rounded-lg bg-gray-50 p-16 md:p-8">
        {/* <div>
          <img src="/images/auth-icon.jpg" alt="A lock icon" />
        </div> */}
        <div className="md:w-2/3 lg:w-full text-center">
          <h1 className="title-font mb-4 text-2xl font-medium text-black sm:text-3xl">
            Welcome!
            {/* <p className="mx-auto text-base leading-relaxed">
            Feel free to reach out to us! Whether you have a question, feedback,
            or a collaboration proposal, we&apos;d love to hear from you.
          </p> */}
          </h1>

          <div className="">
            <div>
              {" "}
              <input type="hidden" name="callbackUrl" value={callbackUrl} />
            </div>
            <div>
              <div className="flex justify-right">
                <label
                  className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                  htmlFor="name"
                >
                  Name
                </label>
              </div>
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-5 text-sm outline-2 placeholder:text-gray-500"
                id="name"
                name="name"
                placeholder="Name"
              />
            </div>
            {formState?.errors?.name && (
              <p>{formState.errors.name.join(",")}</p>
            )}
            <div>
              <div className="flex justify-right">
                <label
                  className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                  htmlFor="email"
                >
                  Email
                </label>
              </div>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-8 text-sm outline-2 placeholder:text-gray-500"
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
              <div className="flex justify-right">
                <label
                  className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                  htmlFor="password"
                >
                  Password
                </label>
              </div>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  required
                  minLength={8}
                />
                <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
            {formState?.errors?.password &&
              formState.errors.password.length > 0 && (
                <div>
                  <div className="flex flex-row  text-red-500">
                    <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                    <p>Password must: </p>
                  </div>
                  <div className="flex justify-left text-rose-600 py-2">
                    <ul className="">
                      {formState.errors.password.map((error) => (
                        <li key={error}> -{error}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
          </div>

          <div className="flex justify-center mt-8">
            <Button aria-disabled={isPending} type="submit">
              Sign Up{" "}
              <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
            </Button>
          </div>
          <div className="flex justify-center">
            <p className="font-bold text-blue-600 py-2">
              {formState?.message && formState.message.length > 0 && (
                <p>{formState.message}</p>
              )}
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
