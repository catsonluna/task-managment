// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import type { SessionToken } from '@/pages/api/types'
import { checkEmail, checkUsername, emailTaken, shaHash, usernameTaken } from '@/lib/utils';
import { hashPassword, generateSecret, getPrisma } from '@/lib/utils';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<SessionToken>
) {
    if (req.method !== "POST") {
        return res.status(405).json({
            success: {
                success: false,
                cause: "method_not_allowed"
            },
        });
    }

        const { username, email, password } = req.body;
        if (!username) {
            return res.status(400).json({
                success: {
                    success: false,
                    cause: "username_required"
                },
            });
        }
        if (!email) {
            return res.status(400).json({
                success: {
                    success: false,
                    cause: "email_required"
                },
            });
        }
        if (!password) {
            return res.status(400).json({
                success: {
                    success: false,
                    cause: "password_required"
                },
            });
        }

        if (username.length < 3 && username.length > 20) {
            return res.status(400).json({
                success: {
                    success: false,
                    cause: "invalid_username_length"
                },
            });
        }

        if (!checkEmail(email)) {
            return res.status(400).json({
                success: {
                    success: false,
                    cause: "invalid_email"
                },
            });
        }

        if (!checkUsername(username)) {
            return res.status(400).json({
                success: {
                    success: false,
                    cause: "invalid_username"
                },
            });
        }
        
        if(await usernameTaken(username)){
            return res.status(400).json({
                success: {
                    success: false,
                    cause: "username_taken"
                },
            });
        }

        if (await emailTaken(email)) {
            return res.status(400).json({
                success: {
                    success: false,
                    cause: "email_taken"
                },
            });
        }

        const hashedPassword = await hashPassword(password)
        
        const prisma = getPrisma();
        const user = await prisma.user.create({
            data: {
                username: username,
                email: email,
                password: hashedPassword,
            },
        });

        const sessionToken = generateSecret(64);
        const sessionHash = shaHash(sessionToken);

        await prisma.session.create({
            data: {
                session_hash: sessionHash,
                user_id: user.user_id,
                expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
            },
        }).then((session) => {
            res.status(200).json({
                success: {
                    success: true,
                },
                data:{
                    token: sessionToken,
                },
            });
        }).catch((error) => {
            res.status(500).json({
                success: {
                    success: false,
                    cause: "internal_server_error"
                },
            });
        });
}
