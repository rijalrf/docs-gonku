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
        text: 'Persiapan',
        items: [
          { text: 'Getting Started', link: '/getting-started' }
        ]
      },
      {
        text: 'Infrastruktur',
        items: [
          { text: 'Zero Trust Network', link: '/zero-trust-network' },
          { text: 'Remote SSH', link: '/remote-ssh' },
          { text: 'CI/CD Deployment', link: '/ci-cd-deployment' }
        ]
      },
      {
        text: 'Panduan Lainnya',
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
