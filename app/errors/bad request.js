import { StatusCodes } from "http-status-codes";
import { CustomError } from "./custom error.js";

class BadRequest extends CustomError {
    constructor (message) {
        super(message);
        this.statusCode = StatusCodes.BAD_REQUEST;
    }
}

export { BadRequest };