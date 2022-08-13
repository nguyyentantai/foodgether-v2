import { prisma } from './prisma'

export const findUserByPhone = async (phoneNumber: string) => {
  return prisma.user.findUnique({
    where: {
      phoneNumber,
    },
  })
}
