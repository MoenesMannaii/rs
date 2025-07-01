import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import adventures from './adventures'
import privateadventure from './privateadventure'
import booking from './booking'
import blogComment from './blogComment'
import blog from './blog'
import testimonial from './testimonial'
import ecoTips from './ecoTips'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, adventures,testimonial, privateadventure,ecoTips, booking,blog, blogComment],
}
