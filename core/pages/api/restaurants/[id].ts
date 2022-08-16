import { NextApiHandler } from 'next'
import { scrapeRestaurant } from '../../../libs/scraper'
import { Node as Logtail } from '@logtail/js'
import { apiLog } from '../../../libs/logger/api'

const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === 'GET') {
      const result = await scrapeRestaurant('')
      return res.status(200).json(result)
    }
  } catch (err) {
    apiLog.error(err)
    return res.status(500).json({ err })
  }
}

export default handler
