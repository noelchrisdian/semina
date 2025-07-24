import { StatusCodes } from "http-status-codes";
import { CustomError } from "./custom error.js";

class Unauthorized extends CustomError {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.FORBIDDEN;
    }
}

export { Unauthorized };