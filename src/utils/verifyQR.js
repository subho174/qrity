import crypto from "crypto";

export default function verifyQR(sessionId, timestamp, receivedHash) {
  if ([sessionId, timestamp, receivedHash].some((e) => !e))
    return { success: false, message: "All fields are required" };
  const isValidTime =
    Math.abs(Math.floor(Date.now() / 30000) - Number(timestamp)) <= 1;

  const data = `${sessionId}|${timestamp}`;
  const expectedHash = crypto
    .createHmac("sha256", process.env.QRSECRET)
    .update(data)
    .digest("hex");

  const isValidQR = isValidTime && expectedHash === receivedHash;
  if (!isValidQR) return { success: false, message: "Invaild QR" };
  return { success: true, message: "Verified QR successfully" };
}
