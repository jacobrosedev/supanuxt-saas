// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-02-16',
  debug: false,
  build: { transpile: ['trpc-nuxt'] },
  imports: { dirs: ['./stores'] },
  typescript: { shim: false },

  runtimeConfig: {
    stripeSecretKey: process.env.STRIPE_SECRET_TEST_KEY, // STRIPE_SECRET_KEY
    public: {
      debugMode: true,
      siteRootUrl: process.env.URL || 'http://localhost:3000', // URL env variable is provided by netlify by default
      stripePublicTest: process.env.STRIPE_PUBLIC_TEST_KEY, // STRIPE_ENDPOINT_SECRET
    }
  },

  modules: [
    '@nuxtjs/supabase',
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    'nuxt-icon'
  ],

  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      title: 'SupaNuxt SaaS',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicon-32x32.png'
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicon-16x16.png'
        },
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png'
        },
        { rel: 'manifest', href: '/site.webmanifest' }
      ]
    }
  },

  router: {
    middleware: {
      // Global middleware
      'auth': '~/middleware/auth',
      
      // Route-specific middleware
      '/admin/**': '~/middleware/admin',
      '/profile/**': '~/middleware/profile',
      '/api/**': ['~/middleware/auth', '~/middleware/api'],
    }
  },

  supabase: {
    redirect: false,
    redirectOptions: {
      login: '/login',
      callback: '/confirm'
    }
  }
});