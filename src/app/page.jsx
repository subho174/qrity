import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookCheck, QrCode, UserCheck, Eye, ArrowRight } from "lucide-react";
import Link from "next/link";
import { MotionCard, MotionSection } from "@/src/components/Motion";

export default function Home() {
  return (
    <>
      <div className="min-h-screen content-center text-foreground py-24 px-4 md:px-16 space-y-16">
        <MotionSection>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Smart QR-Based <span className="text-primary">Attendance</span>{" "}
            System
          </h1>
          <p className="text-textColor text-base my-6 sm:text-lg">
            Eliminate proxy attendance and manual tracking with our seamless QR
            attendance solution. Built for students and faculty to streamline
            classroom presence.
          </p>
          <Button asChild>
            <Link href="/sign-in">
              Get Started
              <ArrowRight />
            </Link>
          </Button>
        </MotionSection>

        {/* Features */}
        <section className="mt-24 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featureList.map((feature, i) => (
            <MotionCard key={i} i={i}>
              <FeatureCard {...feature} />
            </MotionCard>
          ))}
        </section>
      </div>
    </>
  );
}

const featureList = [
  {
    icon: <QrCode className="w-5 h-5" />,
    title: "QR Attendance",
    description:
      "Students mark attendance by scanning secure, time-bound QR codes — proxy-proof and seamless.",
  },
  {
    icon: <BookCheck className="w-5 h-5" />,
    title: "Student Dashboard",
    description:
      "Track attendance for all opted and joinable courses with intuitive session-level breakdowns.",
  },
  {
    icon: <UserCheck className="w-5 h-5" />,
    title: "Admin Control",
    description:
      "Admins can manage courses, create sessions, and view students enrolled in each course.",
  },
  {
    icon: <Eye className="w-5 h-5" />,
    title: "Student Insights",
    description:
      "Admins can view detailed insights into student attendanc — spot irregularities, and support timely interventions.",
  },
];

function FeatureCard({ icon, title, description }) {
  return (
    <Card className="h-full border-1 border-[#e5e5e5] flex flex-col justify-between hover:-translate-y-2 shadow-lg hover:shadow-xl transition-all duration-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-700">{description}</p>
      </CardContent>
    </Card>
  );
}

// shadow-primary hover:shadow-[#1e40af]
