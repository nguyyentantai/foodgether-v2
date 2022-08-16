import dayjs from 'dayjs'
import { prisma } from './prisma'

export const getIdPathForRestaurant = async () => {
  const restaurants = await prisma.restaurant.findMany({
    select: {
      id: true,
    },
  })
  return restaurants.map((restaurant) => restaurant.id)
}

export const getRestaurantFromId = async (id: string) => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      id,
    },
    include: {
      menu: true,
    },
  })
  if (!restaurant) {
    return null
  }
  return {
    ...restaurant,
    createdAt: dayjs(restaurant.createdAt).unix(),
    updatedAt: dayjs(restaurant.updatedAt).unix(),
    menu: {
      ...restaurant.menu,
      createdAt: dayjs(restaurant.menu?.createdAt).unix(),
      updatedAt: dayjs(restaurant.menu?.updatedAt).unix(),
    },
  }
}
