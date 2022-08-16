import { Box, Flex, Grid, GridItem, Heading, Stack } from '@chakra-ui/react'
import { Prisma } from '@prisma/client'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/future/image'
import { ParsedUrlQuery } from 'querystring'
import {
  getIdPathForRestaurant,
  getRestaurantFromId,
} from '../../libs/db/restaurant'

export const getStaticPaths: GetStaticPaths = async () => {
  const menuIds = await getIdPathForRestaurant()
  return {
    paths: menuIds.map((id) => ({ params: { id } })),
    fallback: true,
  }
}

interface SingleRestaurantContext extends ParsedUrlQuery {
  id: string
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as SingleRestaurantContext
  try {
    const restaurant = await getRestaurantFromId(id)
    return {
      props: {
        restaurant,
      },
    }
  } catch (err) {
    console.log(err)
    return {
      props: {
        restaurant: null,
      },
    }
  }
}

type RestaurantProps = {
  restaurant: Awaited<Prisma.PromiseReturnType<typeof getRestaurantFromId>>
}

const Restaurant: NextPage<RestaurantProps> = ({ restaurant }) => {
  if (!restaurant) {
    return <div>Don&apos;t have id yet</div>
  }
  const title = `Foodgether for ${restaurant.name}`
  const restaurantCover = restaurant.photos[restaurant.photos.length - 1]
  return (
    <main>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Foodgether restaurant page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box p="2">
        <Stack>
          <Grid templateColumns="repeat(3, 1fr)" h="300px">
            <GridItem colSpan={[3, null, 1]}>
              <Image
                src={restaurantCover.value}
                height={restaurantCover.height}
                width={restaurantCover.width}
              />
            </GridItem>
            <GridItem colSpan={[3, null, 2]}>
              <Stack>
                <Heading>{restaurant.name}</Heading>
              </Stack>
            </GridItem>
          </Grid>
        </Stack>
      </Box>
    </main>
  )
}

export default Restaurant
