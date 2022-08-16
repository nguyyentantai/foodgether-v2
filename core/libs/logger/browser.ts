import { Browser as Logtail } from '@logtail/js'

let browserTail: Logtail | null = null
if (process.env.NEXT_PUBLIC_LOGTAIL_SOURCE_TOKEN) {
  browserTail = new Logtail(process.env.NEXT_PUBLIC_LOGTAIL_SOURCE_TOKEN)
}

export const browserLog = browserTail ? browserTail : console
