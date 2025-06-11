import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QrCode } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Student Dashboard - QRity",
  description: "Access your dashboard and scan QR to mark attendance.",
  keywords: [
    "student dashboard",
    "attendance scanner",
    "QR code",
    "student panel",
  ],
  robots: "index, follow",
};

export default function StudentDashboard() {
  return (
    <div className="h-screen content-center">
      <Card className="w-full max-w-md border-0 mx-auto shadow-lg cursor-pointer hover:bg-white hover:shadow-xl transition">
        <CardContent className="flex flex-col items-center justify-center p-8 gap-4 text-center">
          <QrCode className="w-16 h-16 text-primary" />
          <p className="text-xl font-medium">Tap to Scan QR Code</p>
          <p className="text-sm text-muted-foreground">
            Scan the session QR code shown by your faculty to mark your
            attendance.
          </p>
        </CardContent>
        <CardFooter className="justify-center pb-4">
          <Button asChild>
            <Link href="/student/scan">Open Camera</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
