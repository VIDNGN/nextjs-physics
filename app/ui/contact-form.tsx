"use client";

import Link from "next/link";
//import { useActionState } from 'react';
import { useFormState } from "react-dom";
import { Button } from "./button";
//import { ContactFormSchema } from "@/app/lib/definitions";
import { contact } from "@/app/lib/actions";

import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

import { useSearchParams } from "next/navigation";

export default function ContactForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/contact";

  const [formState, formAction, isPending] = useFormState(contact, undefined);

  return (
    <form action={formAction}>
      <div className="flex p-16 rounded-lg bg-gray-200 z-20 sm:pb-16 md:pb-16 mt-28 md:mt-16">
        <div className="flex flex-col text-center">
          <h1 className="title-font mb-4 text-2xl font-medium text-black sm:text-3xl">
            Contact Us
          </h1>
          <p className="mx-auto text-base leading-relaxed">
            Feel free to reach out to us! Whether you have a question, feedback,
            or a collaboration proposal, we&apos;d love to hear from you.
          </p>

          {/* <div>
          <img src="/images/auth-icon.jpg" alt="A lock icon" />
        </div> */}
          <div className="mx-auto md:w-2/3 lg:w-full">
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
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="name"
                name="name"
                placeholder="Name"
              />
            </div>
            {formState?.errors?.name && (
              <p className="text-rose-600 py-4">{formState.errors.name.join(",")}</p>
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
            {formState?.errors?.email && <p className="text-rose-600 py-4">{formState.errors.email}</p>}
            <div className="mt-4">
              <div className="flex justify-right">
                <label
                  className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                  htmlFor="content"
                >
                  Message
                </label>
              </div>
              <div className="relative">
                <textarea
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="content"
                  type="text"
                  name="content"
                  placeholder="Messages"
                  required
                  rows={7}
                />
                {/* <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> */}
              </div>
            </div>
            {formState?.errors?.message &&
              formState.errors.message.length > 0 && (
                <div>
                  <p className="text-rose-600">Failed to submit your message: </p>
                  <ul>
                    {formState.errors.message.map((error) => (
                      <li key={error} className="text-rose-600"> -{error}</li>
                    ))}
                  </ul>
                </div>
              )}
          </div>

          <div className="flex justify-center">
            <Button className="mt-8 " aria-disabled={isPending} type="submit">
              Send Message
              <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
            </Button>
          </div>

          <p>
            {formState?.message && formState.message.length > 0 && (
              <p className="text-violet-700 py-4">{formState.message}</p>
            )}
          </p>
        </div>
      </div>
    </form>
  );
}
