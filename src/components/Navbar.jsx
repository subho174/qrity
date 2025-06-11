import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogIn } from "lucide-react";
import fetchUserAtServer from "../utils/fetchUserAtServer";
import { LogOutButton } from "./Buttons";

export default async function Navbar({ role = null }) {
  const user = await fetchUserAtServer();
  // bg-gradient-to-b from-[#0e0017]/80 to-transparent
  return (
    <header
      className={`fixed top-0 left-0 w-full z-50  backdrop-blur-sm border-b border-white/10 shadow-lg px-4 py-3 ${
        user ? "md:px-12 xl:px-32 2xl:px-54" : "md:px-16 "
      }`}
    >
      <div className="max-w-8xl mx-auto flex items-center justify-between">
        <Link
          href="/"
          aria-label="Go to QRity homepage"
          prefetch={false}
          className="inline-flex items-center gap-0.25 font-semibold tracking-wide text-[26px] md:text-3xl transition-all hover:opacity-90 focus:outline-none hover:text-primary"
        >
          <span>QRity</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="flex items-center space-x-6">
          {user ? (
            <>
              <Link
                href={`/${user.isAdmin ? "admin" : "student"}/courses`}
                className="hover:text-primary/95 font-medium"
              >
                Courses
              </Link>
              <LogOutButton />
            </>
          ) : (
            <>
              <Button asChild>
                <Link href="/sign-in">
                  <LogIn />
                  Login
                </Link>
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
