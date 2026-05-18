import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Gonku Docs",
  description: "Dokumentasi Resmi Infrastruktur Home Server Gonku",
  lastUpdated: true,
  cleanUrls: true,
  
  themeConfig: {
    siteTitle: 'Gonku Docs',
    
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Beranda', link: '/' },
      { text: 'Panduan', link: '/getting-started' },
      { text: 'Troubleshooting', link: '/troubleshooting' }
    ],

    sidebar: [
      {
        text: 'Pendahuluan',
        collapsed: false,
        items: [
          { text: 'Memulai (Getting Started)', link: '/getting-started' },
          { text: 'Standar Coding', link: '/coding-standards' },
          { text: 'Panduan Belajar', link: '/learning-path' }
        ]
      },
      {
        text: 'Arsitektur Jaringan',
        collapsed: false,
        items: [
          { text: 'Cloudflare Zero Trust', link: '/zero-trust-network' },
          { text: 'Akses Remote SSH', link: '/remote-ssh' }
        ]
      },
      {
        text: 'Operasional & Deployment',
        collapsed: false,
        items: [
          { text: 'Alur CI/CD', link: '/ci-cd-deployment' },
          { text: 'Panduan Deployment', link: '/how-to-deploy' }
        ]
      },
      {
        text: 'Bantuan',
        items: [
          { text: 'Troubleshooting', link: '/troubleshooting' }
        ]
      }
    ],

    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: 'Cari Dokumen',
                buttonAriaLabel: 'Cari Dokumen'
              },
              modal: {
                noResultsText: 'Tidak ada hasil untuk',
                resetButtonTitle: 'Hapus pencarian',
                footer: {
                  selectText: 'untuk memilih',
                  navigateText: 'untuk navigasi'
                }
              }
            }
          }
        }
      }
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/rijalrf/docs-gonku' }
    ],

    editLink: {
      pattern: 'https://github.com/rijalrf/docs-gonku/edit/main/docs/:path',
      text: 'Saran perbaikan halaman ini'
    },

    lastUpdated: {
      text: 'Terakhir diperbarui',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    },

    footer: {
      message: 'Dibuat dengan VitePress oleh Gonku Team.',
      copyright: 'Copyright © 2024-sekarang Home Server Gonku'
    },

    docFooter: {
      prev: 'Halaman Sebelumnya',
      next: 'Halaman Selanjutnya'
    },

    outline: {
      label: 'Daftar Isi Halaman',
      level: [2, 3]
    }
  }
})
