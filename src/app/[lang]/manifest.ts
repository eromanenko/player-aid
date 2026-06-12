import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Player Aid',
    short_name: 'Player Aid',
    description: 'Quick reference guide for board games',
    start_url: '/uk',
    display: 'standalone',
    background_color: '#0a0a0a',
    theme_color: '#2563eb',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'maskable'
      }
    ]
  }
}
