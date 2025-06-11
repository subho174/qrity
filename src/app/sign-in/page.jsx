import LoginForm from "@/src/components/login-form";

export const metadata = {
  title: "Sign In - QRity",
  description:
    "Access your QRity dashboard. Sign in as a student or admin to manage or view attendance via QR codes.",
  openGraph: {
    title: "Sign In - QRity",
    description:
      "Securely log into QRity. Admins can manage courses and attendance; students can view and scan QR sessions.",
    url: "https://qrity.vercel.app/sign-in",
    siteName: "QRity",
    images: [
      {
        url: "https://qrity.vercel.app/favicon.ico",
        width: 400,
        height: 400,
        alt: "QRity Login Page",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sign In - QRity",
    description:
      "Log in to manage or check attendance using QRity's QR-code based system.",
    images: ["https://qrity.vercel.app/favicon.ico"],
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-semibold text-foreground">
            Welcome Back
          </h1>
          <p className="text-gray-800 text-sm">
            Login as a student or admin to manage attendance.
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
