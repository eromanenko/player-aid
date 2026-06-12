import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  // Prepend basePath for Github Pages if needed
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

  return {
    name: 'Player Aid',
    short_name: 'Player Aid',
    description: 'Quick reference guide for board games',
    start_url: `${basePath}/uk`,
    display: 'standalone',
    background_color: '#0a0a0a',
    theme_color: '#2563eb',
    icons: [
      {
        src: `${basePath}/icon.svg`,
        sizes: '192x192 512x512 any',
        type: 'image/svg+xml',
        purpose: 'any'
      },
      {
        src: `${basePath}/icon.svg`,
        sizes: '192x192 512x512 any',
        type: 'image/svg+xml',
        purpose: 'maskable'
      }
    ]
  }
}
