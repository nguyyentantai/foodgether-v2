import type { NextApiRequest, NextApiResponse } from 'next'
import { registerSchema } from '../../../libs/user'
import { HiddenUserData, hideUserData } from '../../../libs/auth'
import { createUser, findUserByPhone } from '../../../libs/db/users'

type Data =
  | {
      message?: string
    }
  | HiddenUserData

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { name, phoneNumber, pin } = registerSchema.parse(req.body)
  const user = await findUserByPhone(phoneNumber)

  if (user) {
    return res.status(400).send({message: 'Your phone number is taken!'})
  }

  const data = await createUser(name, phoneNumber, pin)

  return res.status(200).json(hideUserData(data))
}
