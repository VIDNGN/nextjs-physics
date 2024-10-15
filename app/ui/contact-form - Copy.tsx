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

export default function ContactForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/signup";

  const [formState, formAction, isPending] = useFormState(signup, undefined);

  return (
    <form action={formAction}>
      <section className="relative">
        <div className="container p-8 rounded-lg bg-gray-200 w-7xl">
          <div className="mb-12 flex flex-col text-center">
            <h1 className="title-font mb-4 text-2xl font-medium text-black sm:text-3xl">
              Contact Us
            </h1>
            <p className="mx-auto text-base leading-relaxed lg:w-96">
              Feel free to reach out to us! Whether you have a question,
              feedback, or a collaboration proposal, we'd love to hear from
              you.
            </p>
          </div>
          {/* <div>
          <img src="/images/auth-icon.jpg" alt="A lock icon" />
        </div> */}
          <div className="mx-auto md:w--96 lg:w-96">
            <div>
              {" "}
              <input type="hidden" name="callbackUrl" value={callbackUrl} />
            </div>
            <div>
              <div>
                <label
                  className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                  htmlFor="name"
                >
                  Name
                </label>
              </div>
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="name"
                name="name"
                placeholder="Name"
              />
            </div>
            {formState?.errors?.name && (
              <p>{formState.errors.name.join(",")}</p>
            )}
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
                htmlFor="message"
              >
                Message
              </label>
              <div className="relative">
                <textarea
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="message"
                  type="text"
                  name="message"
                  placeholder="Messages"
                  required
                  rows={5}
                  
                />
                {/* <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> */}
              </div>
            </div>
            {formState?.errors?.message &&
              formState.errors.message.length > 0 && (
                <div>
                  <p>Messages must: </p>
                  <ul>
                    {formState.errors.message.map((error) => (
                      <li key={error}> -{error}</li>
                    ))}
                  </ul>
                </div>
              )}
          </div>

          <div className="flex justify-center">
            <Button className="mt-4" aria-disabled={isPending} type="submit">
              Send Message
              <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
            </Button>
          </div>

          <p>
            {formState?.message && formState.message.length > 0 && (
              <p>{formState.message}</p>
            )}
          </p>
        </div>
      </section>
    </form>
  );
}
