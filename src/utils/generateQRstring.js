import crypto from "crypto";

export const generateQRstring = (sessionId) => {
  const timestamp = Math.floor(Date.now() / 30000);
  const data = `${sessionId}|${timestamp}`;
  const hash = crypto
    .createHmac("sha256", process.env.QRSECRET)
    .update(data)
    .digest("hex");

  return `${data}|${hash}`;
};
