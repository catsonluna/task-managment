// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import type { SessionToken } from '@/pages/api/types'
import { connection } from '@/lib/database';
import { checkEmail } from '@/lib/utils';
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

    
}
