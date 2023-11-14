// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import type { SessionToken } from '@/pages/api/types'
import { connection } from '@/lib/database';
import { checkEmail, checkUsername, shaHash } from '@/lib/utils';
import { hashPassword, generateSecret } from '@/lib/utils';
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

        if (checkUsername(username)) {
            return res.status(400).json({
                success: {
                    success: false,
                    cause: "invalid_username"
                },
            });
        }

        connection.query(
            "SELECT * FROM users WHERE username = ? OR email = ?",
            [username, email],
            (err, results) => {
                if (err) {
                    return res.status(500).json({
                        success: {
                            success: false,
                            cause: "internal_server_error"
                        },
                    });
                }
                //@ts-ignore
                if (results.length > 0) {
                    return res.status(400).json({
                        success: {
                            success: false,
                            cause: "user_already_exists"
                        },
                    });
                }
                const user_id = generateSecret(32);
                connection.query(
                    "INSERT INTO users (user_id, username, email, password) VALUES (?, ?, ?, ?)",
                    [user_id, username, email, hashPassword(password)],
                    (err, results) => {
                        if (err) {
                            return res.status(500).json({
                                success: {
                                    success: false,
                                    cause: "internal_server_error"
                                },
                            });
                        }
                        const session_id = generateSecret(32);
                        const session_token = generateSecret(32);
                        const session_hash = shaHash(session_token);
                        connection.query(
                            "INSERT INTO sessions (session_id, session_hash, user_id) VALUES (?, ?, ?)",
                            [session_id, session_hash, user_id],
                            (err, results) => {
                                if (err) {
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
                                        cause: ""
                                    },
                                    data:
                                    {
                                        token: session_token
                                    }
                                });
                            }
                        )
                    }
                )
            }
        )
}
