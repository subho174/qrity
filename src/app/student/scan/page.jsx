"use client";

import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Html5Qrcode, Html5QrcodeScannerState } from "html5-qrcode";
import axios from "axios";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function ScannerComponent() {
  const html5QrCodeRef = useRef(null);
  const hasStartedRef = useRef(false); // ensures scanner starts only once
  const [scanning, setScanning] = useState(false);

  const startScanner = () => {
    if (hasStartedRef.current) return; // avoid duplicate starts
    hasStartedRef.current = true;

    if (!html5QrCodeRef.current) {
      html5QrCodeRef.current = new Html5Qrcode("reader");
    }

    const screenWidth = window.innerWidth;
    const qrBoxSize = Math.min(screenWidth * 0.8, 300);

    try {
      html5QrCodeRef.current.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: {
            width: qrBoxSize,
            height: qrBoxSize,
          },
        },
        async (decodedText) => {
          await html5QrCodeRef.current?.stop();
          toast.info("Marking Attendance...");
          setScanning(false);
          hasStartedRef.current = false;

          axios
            .post("/api/attendance", {
              receivedQRstring: decodedText,
              deviceId: localStorage.getItem("deviceId"),
            })
            .then((res) => {
              console.log(res);
              toast.success("Attendance marked successfully !");
              setTimeout(() => toast.info("Logging Out..."), 5000);
              setTimeout(() => signOut({ callbackUrl: "/" }), 6000);
            })
            .catch((err) => {
              console.error(err);
              toast.error(
                `Failed to mark attendance : ${err.response.data.message}`
              );
            });
        },
        () => {
          // ignore scan errors
        }
      );
    } catch (err) {
      console.error("Failed to start QR Scanner", err);
      toast.error("Unable to start camera");
    }
  };

  useEffect(() => {
    startScanner();

    return () => {
      if (
        html5QrCodeRef.current?.getState() === Html5QrcodeScannerState.SCANNING
      ) {
        html5QrCodeRef.current.stop().then(() => {
          html5QrCodeRef.current?.clear();
          html5QrCodeRef.current = null;
          hasStartedRef.current = false;
        });
      }
    };
  }, []);

  return (
    <div className="h-screen justify-items-center content-center">
      <Card className="max-w-md mb-8 mx-auto border-0 hover:bg-white">
        <CardHeader>
          <CardTitle className="text-center">Scan QR Code</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <div
            id="reader"
            className="w-full max-w-sm aspect-square rounded-lg border bg-black"
          />
          <p className="text-muted-foreground text-sm text-center">
            Point your camera at the QR code to mark attendance.
          </p>
        </CardContent>
      </Card>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={async () => {
              await html5QrCodeRef.current?.clear();
              startScanner();
            }}
          >
            <RotateCcw /> Try Again
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Do not click while scanning</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
