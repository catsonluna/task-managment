// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Success } from '../types';
import { shaHash } from '@/lib/utils';
type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Success>
) {
    if (req.method !== "POST") {
        return res.status(405).json({
                success: false,
                cause: "method_not_allowed"
        });
    }

    const { name, description, dueDate } = req.body;
    const { session_token } = req.headers;

    if (!name) {
        return res.status(400).json({
                success: false,
                cause: "name_required"
        });
    }

    if (!description) {
        return res.status(400).json({
                success: false,
                cause: "description_required"
        });
    }

    if (!dueDate) {
        return res.status(400).json({
                success: false,
                cause: "dueDate_required"
        });
    }

    if (!session_token) {
        return res.status(400).json({
                success: false,
                cause: "session_token_required"
        });
    }
    const tokenHash = shaHash(session_token as string);

    const session = await connection.promise().query(
        `SELECT * FROM sessions WHERE token = ?`,
        [tokenHash]
    );

    if (session[0].length === 0) {
        return res.status(401).json({
                success: false,
                cause: "invalid_session"
        });
    }

    connection.query(
        `INSERT INTO tasks (name, description, dueDate, user_id) VALUES (?, ?, ?, ?)`,
        [name, description, dueDate, session[0][0].user_id],
        (error, results, fields) => {
            if (error) {
                return res.status(500).json({
                        success: false,
                        cause: "internal_server_error"
                });
            }

            return res.status(200).json({
                success: true,
            });
        }
    );    
}
