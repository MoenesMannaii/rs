// lib/getEcoTips.ts
import { client } from '@/sanity/lib/client'

export const getEcoTips = async () => {
  const query = `*[_type == "ecoTip"] | order(order asc) {
    title,
    description,
    icon,
    link
  }`
  return await client.fetch(query)
}
