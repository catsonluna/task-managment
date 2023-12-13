import { createTransport } from "nodemailer";


const transporter = createTransport({
    host: "smtp.sendgrid.net",
    port: 587,
    secure: false,
    auth: {
        user: "apikey",
        pass: "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",
    },
});

export async function sendPasswordResetEmail(to: string, password: string)
{
    await transporter.sendMail({
        from: "task_managment@pinkulu.com",
        to: to,
        subject: "Password Reset",
        html: `<p>Here is your new password: ${password}</p>`,
    })
}