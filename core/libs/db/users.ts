import { ENV } from '../config'
import { redisCacheUserFromPhone, redisFindUserFromPhone } from '../redis/user'
import { prisma } from './prisma'

export const findUserByPhone = async (phoneNumber: string) => {
  const key = `user:${phoneNumber}-${ENV}`
  let user = await redisFindUserFromPhone(key)
  if (user) {
    return user
  }
  user = await prisma.user.findUnique({
    where: {
      phoneNumber,
    },
  })
  if (!user) {
    return null
  }
  await redisCacheUserFromPhone(key, user)
  return user
}
