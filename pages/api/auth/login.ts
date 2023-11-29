// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import type { SessionToken } from '@/pages/api/types'
import { checkEmail, shaHash } from '@/lib/utils';
import { verifyPassword, generateSecret, getPrisma } from '@/lib/utils';
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

    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            success: {
                success: false,
                cause: "missing_parameters"
            },
        });
    }

    const prisma = getPrisma();
    
    let user = await prisma.user.findUnique({
        where: {
            username: username
        }
    });

    if (!user) {
        user = await prisma.user.findUnique({
            where: {
                email: username
            }
        });
    }

    if (!user) {
        return res.status(401).json({
            success: {
                success: false,
                cause: "invalid_credentials"
            },
        });
    }

    const passwordMatch = await verifyPassword(user.password, password);

    if (!passwordMatch) {
        return res.status(401).json({
            success: {
                success: false,
                cause: "invalid_password"
            },
        });
    }


    const sessionToken = generateSecret(64);
    const sessionHash = shaHash(sessionToken);

    await prisma.session.create({
        data: {
            session_hash: sessionHash,
            user_id: user.user_id,
            expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
        },
    }).then(() => {
        res.status(200).json({
            success: {
                success: true,
            },
            data:{
                token: sessionToken,
            },
        });
    }).catch(() => {
        res.status(500).json({
            success: {
                success: false,
                cause: "internal_server_error"
            },
        });
    });
}
