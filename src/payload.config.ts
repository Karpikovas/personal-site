import path from 'path'
import { fileURLToPath } from 'url'

import { postgresAdapter } from '@payloadcms/db-postgres'
import { s3Storage } from '@payloadcms/storage-s3'
import { buildConfig } from 'payload'

import { LiveOrchestralChamber } from './collections/LiveOrchestralChamber.ts'
import { Media } from './collections/Media.ts'
import { Releases } from './collections/Releases.ts'
import { Users } from './collections/Users.ts'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || 'dev-only-secret-change-me',
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Releases, LiveOrchestralChamber],
  db: postgresAdapter({
    pool: {
      connectionString:
        process.env.DATABASE_URI || 'postgres://postgres:postgres@localhost:5432/personal_site',
    },
    push: true,
  }),
  plugins: [
    s3Storage({
      bucket: process.env.S3_BUCKET || 'personal-site',
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY || 'minioadmin',
          secretAccessKey: process.env.S3_SECRET_KEY || 'minioadmin',
        },
        endpoint: process.env.S3_ENDPOINT || 'http://localhost:9000',
        forcePathStyle: true,
        region: process.env.S3_REGION || 'us-east-1',
      },
      collections: {
        media: {
          generateFileURL: ({ filename, prefix }) => {
            const endpoint = process.env.S3_PUBLIC_URL || 'http://localhost:9000'
            const bucket = process.env.S3_BUCKET || 'personal-site'
            const key = prefix ? `${prefix}/${filename}` : filename
            return `${endpoint}/${bucket}/${key}`
          },
        },
      },
    }),
  ],
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
