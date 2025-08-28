import mustache from "mustache";
import { createTransport } from "nodemailer";
import { readFileSync } from 'fs';
import { gmail, password } from "../../config.js";

const transporter = createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: gmail,
        pass: password
    }
})

const mail = async (email, data) => {
    try {
        const template = readFileSync('app/views/email/otp.html', 'utf8')
        const message = {
            from: gmail,
            to: email,
            subject: 'OTP for registration',
            html: mustache.render(template, data)
        }

        return await transporter.sendMail(message);
    } catch (error) {
        console.log(error);
    }
}

export { mail };