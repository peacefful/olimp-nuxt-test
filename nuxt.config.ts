// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      BASE_URL: 'https://phonebook.ddirection.kz'
    }
  },
  devtools: { enabled: true },
  css: ['~/assets/styles/main.scss'],
  modules: ['@vee-validate/nuxt', '@pinia/nuxt']
})
