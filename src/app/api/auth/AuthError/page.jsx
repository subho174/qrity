import Link from "next/link";
import { Button } from "@/components/ui/button";
import { House } from "lucide-react";

const Errorpage = async ({ searchParams }) => {
  const error = (await searchParams).error;
  return (
    <section className="bg-background h-screen content-center">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-bold lg:text-9xl text-primary">
            404
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-semibold md:text-4xl">
            {error}
          </p>
          <Button variant="custom">
            <House />
            <Link href="/">Back to Homepage</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Errorpage;
