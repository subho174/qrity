import { generateQRstring } from "../../../utils/generateQRstring";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("sessionId");

    if (!sessionId)
      return NextResponse.json({
        data: null,
        message: "Session Id is required",
        status: 400,
      });

    // const qrString = updateQR(sessionId);
    const qrString = generateQRstring(sessionId);
    if (!qrString)
      return NextResponse.json({
        data: null,
        message: "Failed to update QR",
        status: 400,
      });

    return NextResponse.json({
      data: qrString,
      message: "QR updated successfully",
      status: 201,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { data: null, message: "Server Error" },
      { status: 500 }
    );
  }
}
