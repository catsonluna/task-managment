// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Success } from '../types';
import { shaHash, getPrisma } from '@/lib/utils';

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

    // get duedate from int and convert to date
    const dueDateInt = parseInt(dueDate as string);
    const dueDateDate = new Date(dueDateInt);


    const task = await prisma.task.create({
        data: {
            title: name,
            description: description,
            dueTill: dueDateDate,
            user: {
                connect: {
                    user_id: session.user_id
                }
            }
        }
    });

    return res.status(200).json({
            success: true,
    });

}
