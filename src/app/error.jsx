"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const Error = ({ error, reset }) => {
  const router = useRouter();
  return (
    <section className="bg-background h-screen content-center">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-bold lg:text-9xl text-primary">
            500
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-semibold md:text-4xl">
            Internal Server Error
          </p>
          <p className="mb-6 text-lg font-light text-textColor">
            {error.message}
          </p>
          <Button onClick={() => router.back()}>
            <ArrowLeft /> Go back
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Error;
