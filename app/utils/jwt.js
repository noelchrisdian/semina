import jwt from "jsonwebtoken";
import {
    jwtExpiration,
    jwtSecret,
    jwtRefreshExpiration
} from "../config.js";

const createJWT = ({ payload }) => {
    return jwt.sign(payload, jwtSecret, { expiresIn: jwtExpiration })
}

const createRefreshJWT = ({ payload }) => {
    return jwt.sign(payload, jwtSecret, { expiresIn: jwtRefreshExpiration })
}

const tokenValid = ({ token }) => jwt.verify(token, jwtSecret);

export {
    createJWT,
    createRefreshJWT,
    tokenValid
}