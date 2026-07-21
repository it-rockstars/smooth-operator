// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: false,
  nitro: {
    preset: 'static'
  },
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  css: [
    '~/assets/css/main.css'
  ],
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Smooth Operator — On-Demand Technical Firefighting',
      meta: [
        { name: 'robots', content: 'noindex, nofollow' },
        { name: 'description', content: 'Technical hotline for startups. A Smooth Operator responds in 30 minutes — and fixes your K8s, AWS or CI/CD problem.' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
      ]
    }
  }
})
