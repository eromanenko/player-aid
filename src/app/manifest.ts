import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  // Prepend basePath for Github Pages if needed
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

  return {
    name: 'Board Game Player Aid',
    short_name: 'Board Game Player Aid',
    description: 'Quick reference guide for board games',
    start_url: `${basePath}/uk`,
    display: 'standalone',
    background_color: '#0a0a0a',
    theme_color: '#2563eb',
    icons: [
      {
        src: `${basePath}/icon-192.png`,
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: `${basePath}/icon-512.png`,
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: `${basePath}/icon-512.png`,
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'
      }
    ]
  }
}
