import { User } from '@prisma/client'
import { JwtPayload } from 'jsonwebtoken'
import { z } from 'zod'

import { phoneNumberRegex } from './regex'

export type UserClaim = {
  id: string
  name: string
  phoneNumber: string
}

export type Claim = UserClaim & JwtPayload

export const loginSchema = z.object({
  phoneNumber: z.string().regex(phoneNumberRegex),
  pin: z.string().trim().min(4).max(8),
})

export const hideUserData = (user: User) => {
  const data: Partial<User> = user
  delete data.pin
  delete data.createdAt
  delete data.updatedAt
  return data
}

export type HiddenUserData = ReturnType<typeof hideUserData>
export type LoginSchemaType = z.infer<typeof loginSchema>
