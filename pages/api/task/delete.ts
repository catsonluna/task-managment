// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Success } from '../types';
import { shaHash, getPrisma } from '@/lib/utils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Success>
) {
    const { method, body, headers } = req;

    if (method === "DELETE") {
        const { taskId } = body;
        const { session_token } = headers;

        if (!taskId) {
            return res.status(400).json({
                success: false,
                cause: "taskId_required"
            });
        }

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
 // parbauda vai task ir lietotaja
        if (!session) {
            return res.status(401).json({
                success: false,
                cause: "invalid_session"
            });
        }

        const task = await prisma.task.findUnique({
            where: {
                task_id: taskId
            },
            select: {
                user_id: true
            }
        });

        if (!task || task.user_id !== session.user_id) {
            return res.status(403).json({
                success: false,
                cause: "forbidden"
            });
        }

        // delete task
        await prisma.task.delete({
            where: {
                task_id: taskId
            }
        });

        return res.status(200).json({
            success: true,
        });
    } else {
        return res.status(405).json({
            success: false,
            cause: "method_not_allowed"
        });
    }
}