import { createTransport } from "nodemailer";


const transporter = createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
        user: "pinkulumc@gmail.com",
        pass: "APUO9kDsT6y8KahI",
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