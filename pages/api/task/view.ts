// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { shaHash, getPrisma } from '@/lib/utils'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
    const { session_token, task_name } = req.headers;

    if (!session_token) {
        return res.status(400).json({
                success: false,
                cause: "session_token_required"
        });
    }
    const tokenHash = shaHash(session_token as string);

    const prisma = getPrisma();

    const session = await prisma.session.findUnique({
        where: {
            session_hash: tokenHash
        }
    });

    if (!session) {
        return res.status(401).json({
                success: false,
                cause: "invalid_session"
        });
    }

    const task = await prisma.task.findMany({
        where: {
            user_id: session.user_id,
            title: {
                contains: task_name as string
            }
        },
        
    });


    return res.status(200).json({
        tasks: task,
        success: true
    });
    

}
