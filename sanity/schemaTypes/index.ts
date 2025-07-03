import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import adventures from './adventures'
import privateadventure from './privateadventure'
import booking from './booking'
import testimonial from './testimonial'
import ecoTips from './ecoTips'
import hero from './hero'
import blogs from './blogs'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, hero, adventures,testimonial, privateadventure,ecoTips, booking, blogs],
}
