// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import type { SessionToken } from '@/pages/api/types'
import { connection } from '@/lib/database';
import { checkEmail, shaHash } from '@/lib/utils';
import { verifyPassword, generateSecret } from '@/lib/utils';
export default function handler(
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

    connection.query(
        `SELECT * FROM users WHERE username = ? or email = ?`,
        [username, username],
        (error, results, fields) => {
            if (error) {
                return res.status(500).json({
                    success: {
                        success: false,
                        cause: "internal_server_error"
                    },
                });
            }

            if (results.length === 0) {
                return res.status(401).json({
                    success: {
                        success: false,
                        cause: "invalid_credentials"
                    },
                });
            }

            const user = results[0];

            if (!verifyPassword(password, user.password)) {
                return res.status(401).json({
                    success: {
                        success: false,
                        cause: "invalid_credentials"
                    },
                });
            }

            const session_id = generateSecret(32);
            const session_token = generateSecret(32);
            const session_hash = shaHash(session_token);
            
            connection.query(
                `INSERT INTO sessions (user_id, session_id, session_hash) VALUES (?, ?, ?)`,
                [user.id, session_id, session_hash],
                (error, results, fields) => {
                    if (error) {
                        return res.status(500).json({
                            success: {
                                success: false,
                                cause: "internal_server_error"
                            },
                        });
                    }

                    return res.status(200).json({
                        success: {
                            success: true,
                        },
                        data: {
                            token: session_token,
                        }
                    });
                }
            );
        }
    );


    
}
