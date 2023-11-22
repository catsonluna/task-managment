// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { shaHash, getPrisma } from '@/lib/utils'
import { Task } from '../types'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
    const [session_token] = req.headers.session_token as string[];
    const tokenHash = shaHash(session_token);

    const prisma = getPrisma();

    const session = await prisma.session.findUnique({
        where: {
            session_hash: tokenHash
        }
    });

    if (!session) {
        return res.status(401).json({
            success: false,
        });
    }

    const tasks = await prisma.task.findMany({
        where: {
            user_id: session.user_id
        }
    });

    return res.status(200).json({
        tasks: tasks,
        success: true
    });
    

}
