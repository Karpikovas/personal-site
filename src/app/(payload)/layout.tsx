import type { ReactNode } from 'react'
import type { ServerFunctionClient } from 'payload'

import { RootLayout, handleServerFunctions, metadata } from '@payloadcms/next/layouts'
import '@payloadcms/next/css'

import config from '@/payload.config'

import { importMap } from './admin/importMap'
import './custom.scss'

export { metadata }

const serverFunction: ServerFunctionClient = async (args) => {
  'use server'

  return handleServerFunctions({
    ...args,
    config,
    importMap,
  })
}

export default function Layout({ children }: { children: ReactNode }) {
  return RootLayout({
    children,
    config,
    importMap,
    serverFunction,
  })
}
