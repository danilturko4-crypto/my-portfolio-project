export default defineNuxtConfig({
  ssr: true,
  modules: ['@pinia/nuxt'],
  css: ['~/assets/main.css'],
  typescript: {
    strict: true
  },
  app: {
    head: {
      title: 'Digital Direction — Запись к врачам',
      meta: [
        {
          name: 'description',
          content: 'Медицинское веб-приложение для записи на консультации к врачам.'
        }
      ]
    }
  }
})
