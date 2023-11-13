// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { hashPassword, verifyPassword } from '@/lib/utils'
type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { password } = req.body
  const hashedPassword = await hashPassword(password)
  console.log(hashedPassword)
  const isPasswordValid = await verifyPassword(hashedPassword, password)
  console.log(isPasswordValid)
  res.status(200).json({ name: 'John Doe' })
}
