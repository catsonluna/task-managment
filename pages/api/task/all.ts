// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { shaHash } from '@/lib/utils'
import { Task } from '../types'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Task[]>
) {
    const [session_token] = req.headers.session_token as string[];
    const tokenHash = shaHash(session_token);
    
    const session = await connection.promise().query(
        `SELECT * FROM sessions WHERE token_hash = ?`,
        [tokenHash]
    );

    if (session[0].length === 0) {
        return res.status(401).json({
                success: false,
                cause: "invalid_session"
        });
    }

    const tasks = await connection.promise().query(
        `SELECT * FROM tasks WHERE user_id = ?`,
        [session[0][0].user_id]
    );


    

}
