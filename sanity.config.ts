'use client'

/**
 * This configuration is used for the Sanity Studio that’s mounted on the `\app\studio\[[...tool]]\page.tsx` route
 */

import { visionTool } from '@sanity/vision'
import { deskTool } from 'sanity/desk' // Use deskTool instead of structureTool
import { defineConfig } from 'sanity'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from './sanity/env'
import { schema } from './sanity/schemaTypes'
import { structure } from './sanity/structure' // Import your custom structure

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema,
  plugins: [
    deskTool({ structure }), // Use deskTool with your custom structure
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})