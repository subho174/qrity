// "use client";

// import { useEffect, useRef, useState } from "react";
// // import { Html5Qrcode } from "html5-qrcode";
// import { useRouter } from "next/navigation";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { toast } from "sonner";
// import { Html5Qrcode, Html5QrcodeScannerState } from "html5-qrcode";

// export default function QRScannerPage() {
//   const scannerRef = useRef(null);
//   const [scanning, setScanning] = useState(false);
//   const router = useRouter();

// useEffect(() => {
//   const html5QrCode = new Html5Qrcode("reader");
//   let isMounted = true;

//   const startScanner = async () => {
//     try {
//       if (!isMounted) return;

//       const screenWidth = window.innerWidth;
//       const qrBoxSize = Math.min(screenWidth * 0.8, 300);

//       setScanning(true);

//       await html5QrCode.start(
//         { facingMode: "environment" },
//         {
//           fps: 10,
//           qrbox: {
//             width: qrBoxSize,
//             height: qrBoxSize,
//           },
//         },
//         async (sessionId) => {
//           await html5QrCode.stop();
//           setScanning(false);
// console.log(sessionId);

//           try {
//             const res = await fetch("/api/attendance/mark", {
//               method: "POST",
//               headers: { "Content-Type": "application/json" },
//               body: JSON.stringify({ sessionURL: sessionId }),
//             });

//             const data = await res.json();
//             if (res.ok) {
//               toast.success("Attendance marked successfully");
//               router.push("/student/dashboard");
//             } else {
//               toast.error(data.message || "Failed to mark attendance");
//             }
//           } catch (err) {
//             toast.error("Error contacting server");
//           }
//         },
//         (error) => {
//           // silently ignore scan errors
//         }
//       );
//     } catch (err) {
//       console.error("QR Scanner failed", err);
//       toast.error("Unable to start camera");
//     }
//   };

//   startScanner();

//   return () => {
//     isMounted = false;
//     html5QrCode.getState() === Html5QrcodeScannerState.SCANNING &&
//       html5QrCode.stop().catch(() => {});
//   };
// }, []);

//   return (
//     <Card className="max-w-md mx-auto mt-10">
//       <CardHeader>
//         <CardTitle className="text-center">Scan QR Code</CardTitle>
//       </CardHeader>
//       <CardContent className="flex flex-col items-center gap-4">
//         <div
//           id="reader"
//           className="w-full max-w-sm aspect-square rounded-lg border bg-black sm:max-w-md sm:aspect-video"
//         />
//         <p className="text-muted-foreground text-sm text-center">
//           Point your camera at the QR code to mark attendance.
//         </p>
//       </CardContent>
//     </Card>
//   );
// }

"use client";

import { useEffect, useRef, useState } from "react";
// import { Html5Qrcode } from "html5-qrcode";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Html5Qrcode, Html5QrcodeScannerState } from "html5-qrcode";
import { getLocation } from "../../../utils/getLocation";
import axios from "axios";

export default function ScannerComponent() {
  const html5QrCodeRef = useRef(null);
  const hasStartedRef = useRef(false); // ensures scanner starts only once
  // const [scanning, setScanning] = useState(false);
  // const [location, setlocation] = useState();
  // const router = useRouter();
  useEffect(() => {
    const startScanner = async () => {
      if (hasStartedRef.current) return; // avoid duplicate starts
      hasStartedRef.current = true;

      if (!html5QrCodeRef.current) {
        html5QrCodeRef.current = new Html5Qrcode("reader");
      }

      const screenWidth = window.innerWidth;
      const qrBoxSize = Math.min(screenWidth * 0.8, 300);

      try {
        await html5QrCodeRef.current.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: {
              width: qrBoxSize,
              height: qrBoxSize,
            },
          },
          async (sessionId) => {
            await html5QrCodeRef.current?.stop();
            setScanning(false);
            hasStartedRef.current = false;
            console.log(sessionId);
            const location = await getLocation();
            console.log(location);
            
            axios
              .post("/api/attendance", { sessionId, location })
              .then((res) => console.log(res))
              .catch((err) => console.log(err));
            // try {
            //   const res = await fetch("/api/attendance/mark", {
            //     method: "POST",
            //     headers: { "Content-Type": "application/json" },
            //     body: JSON.stringify({ sessionURL: sessionId }),
            //   });

            //   const data = await res.json();
            //   if (res.ok) {
            //     toast.success("Attendance marked successfully");
            //     router.push("/student/dashboard");
            //   } else {
            //     toast.error(data.message || "Failed to mark attendance");
            //   }
            // } catch {
            //   toast.error("Error contacting server");
            // }
            // router.replace(sessionId);
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
    // <div id="reader" className="w-full h-64 rounded-lg border" />
    <Card className="max-w-md mx-auto mt-10">
      <CardHeader>
        <CardTitle className="text-center">Scan QR Code</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <div
          id="reader"
          className="w-full max-w-sm aspect-square rounded-lg border bg-black sm:max-w-md sm:aspect-video"
        />
        <p className="text-muted-foreground text-sm text-center">
          Point your camera at the QR code to mark attendance.
        </p>
      </CardContent>
    </Card>
  );
}
