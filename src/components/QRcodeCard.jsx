import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import QRCode from "react-qr-code";

export default function QRCodeCard({ joinUrl="/session123" }) {
    if(!joinUrl) return null;
  return (
    <Card className="w-fit mx-auto p-4">
      <CardHeader>
        <CardTitle>Scan QR to Join Session</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-3">
        <QRCode value={joinUrl} size={200} />
        {/* <p className="text-sm text-muted-foreground text-center break-words max-w-xs">
          {joinUrl}
        </p> */}
      </CardContent>
    </Card>
  );
}
