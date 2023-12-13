// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { hashPassword, getPrisma, generateSecret } from '@/lib/utils'
import { sendPasswordResetEmail } from '@/lib/sendEmail';

type Data = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const { email } = req.body;
    const prisma = getPrisma();

  let user = await prisma.user.findUnique({
    where: {
        email: email
    }
    });
    if(!user){
        return res.status(401).json({message:"User not found"})
    }

    const password = generateSecret(16);
    const hashedPassword = await hashPassword(password);
    const update = await prisma.user.update({
        where:{
            user_id: user.user_id
        },
        data:{
            password: hashedPassword
        }});
  if (update) {
    sendPasswordResetEmail(email, password);
    res.status(200).json({ message: 'Password updated successfully' })
  } else {
    res.status(500).json({ message: 'Error updating password' })
  }
}
