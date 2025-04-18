import bcrypt from "bcryptjs";
import { sign, verify } from "jsonwebtoken";
import * as jose from "jose";
const SECRET_KEY = "RAHASIA";

export const hashPw = (password: string) => {
  return bcrypt.hashSync(password, 10);
};

export const comparePw = (password: string, hashpassword: string) => {
  return bcrypt.compareSync(password, hashpassword);
};

export const signToken = (payload: object) => {
  return sign(payload, SECRET_KEY);
};

export const readPayload = async <T>(token: string) => {
  const secretKey = new TextEncoder().encode(SECRET_KEY);
  const payloadJose = await jose.jwtVerify<T>(token, secretKey);

  return payloadJose.payload;
};
