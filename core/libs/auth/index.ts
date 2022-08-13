import { User } from '@prisma/client'
import { JwtPayload } from 'jsonwebtoken'
import { z } from 'zod'

export const verifyToken = () => {}

export type UserClaim = {
  id: string
  name: string
  email: string
}

export type Claim = UserClaim & JwtPayload

export const loginSchema = z.object({
  phoneNumber: z
    .string()
    .regex(/^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/),
  pin: z.string().trim().min(4).max(8),
})

export const hideUserData = (user: User) => {
  const { pin: _, createdAt, updatedAt, ...userInfo } = user
  return userInfo
}

export type HiddenUserData = ReturnType<typeof hideUserData>
export type LoginSchemaType = z.infer<typeof loginSchema>
