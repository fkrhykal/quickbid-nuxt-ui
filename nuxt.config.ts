import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/app.css'],
  modules: ['@nuxt/icon', 'nuxt-security', '@nuxt/image', '@nuxt/fonts'],
  vite: {
    server: {
      https: false as any,
    },
    plugins: [tailwindcss()],
  },
  icon: {
    mode: 'css',
    cssLayer: 'basse',
  },
  security: {
    csrf: true,
    headers: {
      contentSecurityPolicy: {
        'img-src': [
          "'self'",
          'data:',
          'https://github.com',
          'https://raw.githubusercontent.com',
          'https://picsum.photos',
          'https://fastly.picsum.photos',
        ],
        'upgrade-insecure-requests': process.env.NODE_ENV === 'production',
      },
    },
  },
})
