import { decodeGlobalID, encodeGlobalID } from "@pothos/plugin-relay";
import jwt, { type JwtPayload } from "jsonwebtoken";

export const signingKey = process.env.JWT_SECRET || "hogefuga";

export const parseID = (id: string | number) => {
  const { id: rawID } = decodeGlobalID(String(id));
  return Number.parseInt(rawID, 10);
};

export const jwtSign = (userId: number, payload: object = {}) => {
  return jwt.sign(payload, signingKey, {
    subject: encodeGlobalID("User", userId),
  });
};

export const jwtVerify = (token: string): JwtPayload => {
  return jwt.verify(token, signingKey) as JwtPayload;
};
