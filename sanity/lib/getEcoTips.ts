import { client } from './client';

export const getEcoTips = async () => {
  return await client.fetch(`*[_type == "ecoTip"] | order(order asc) {
    title,
    description,
    icon,
    link,
    slug
  }`);
};
