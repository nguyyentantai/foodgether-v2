import { Node as Logtail } from '@logtail/js'

let nodeTail: Logtail | null = null
if (process.env.LOGTAIL_SOURCE_TOKEN) {
  nodeTail = new Logtail(process.env.LOGTAIL_SOURCE_TOKEN)
}

export const apiLog = nodeTail ? nodeTail : console
