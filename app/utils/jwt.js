import jwt from "jsonwebtoken";
import { jwtExpiration, jwtSecret } from "../config.js";

const createJWT = ({ payload }) => {
    return jwt.sign(payload, jwtSecret, { expiresIn: jwtExpiration })
}

const tokenValid = ({ token }) => jwt.verify(token, jwtSecret);

export { createJWT, tokenValid };