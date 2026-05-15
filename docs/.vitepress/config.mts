import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Home Server Gonku",
  description: "Dokumentasi Resmi Infrastruktur Home Server Gonku",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Dokumentasi', link: '/getting-started' }
    ],

    sidebar: [
      {
        text: 'Pendahuluan',
        items: [
          { text: 'Getting Started', link: '/getting-started' }
        ]
      },
      {
        text: 'Keamanan & Jaringan',
        items: [
          { text: 'Cloudflare Zero Trust', link: '/zero-trust-network' },
          { text: 'Akses Remote SSH', link: '/remote-ssh' }
        ]
      },
      {
        text: 'DevOps & Deployment',
        items: [
          { text: 'Alur CI/CD', link: '/ci-cd-deployment' },
          { text: 'Panduan Deployment', link: '/how-to-deploy' }
        ]
      },
      {
        text: 'Pembelajaran & Standar',
        items: [
          { text: 'Standar Coding', link: '/coding-standards' },
          { text: 'Panduan Belajar', link: '/learning-path' }
        ]
      },
      {
        text: 'Pemeliharaan',
        items: [
          { text: 'Troubleshooting', link: '/troubleshooting' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/rijalrf/docs-gonku' }
    ],

    footer: {
      message: 'Dirilis di bawah Lisensi MIT.',
      copyright: 'Copyright © 2024-sekarang Gonku Team'
    }
  }
})
