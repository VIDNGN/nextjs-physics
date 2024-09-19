"use client";

import Link from "next/link";
//import { useActionState } from 'react';
import { useFormState } from "react-dom";
import { authenticate } from "@/app/lib/auth-actions";
import { Button } from "@/app/ui/button";
import { ArrowRightIcon } from "@heroicons/react/20/solid";

import {
  //AuthMode,
  //AuthFormProps,
  SignupFormState,
} from "@/app/lib/definitions";

import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";

export default function LoginForm() {
  //mode = 'login' or 'signup'
  //const [formState, formAction] = useActionState(signup, {});

  const [formState, formAction, isPending] = useFormState(
    authenticate,
    undefined
  );

  return (
    <form action={formAction} className="space-y-3">
      <div className="flex-1 w-full rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className="mb-3 text-2xl">Please log in to ask a question.</h1>
        <div className="w-full">
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
          {formState?.errors?.password && formState.errors.password.length > 0 && (
            <div>
              <p>Password must: </p>
              <ul>
                {formState.errors.password.map((error) => (
                  <li key={error}> -{error}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <p>
          <Button
            //className="mt-4 w-full"
            aria-disabled={isPending}
            type="submit"
          >
            Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
          </Button>
        </p>
        <p>
          New here? <Link href="/signup">Create an account</Link>
        </p>
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
