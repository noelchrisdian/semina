import { urlDB } from "../config.js";
import mongoose from "mongoose";

mongoose.connect(urlDB);
const db = mongoose.connection;

export { db };