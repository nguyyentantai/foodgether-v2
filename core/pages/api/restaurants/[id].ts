import { NextApiHandler } from 'next'
import { scrapeRestaurant } from '../../../libs/scraper'

const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === 'GET') {
      const result = await scrapeRestaurant('')
      return res.status(200).json(result)
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({ err })
  }
}

export default handler
