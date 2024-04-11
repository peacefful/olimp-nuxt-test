// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      BASE_URL: process.env.NUXT_PUBLIC_BASE_URL
    },
    experimental: {
      payloadExtraction: true
    }
  },
  devtools: { enabled: true },
  css: ['~/assets/styles/main.scss', '~/assets/styles/vars.scss'],
  modules: ['@vee-validate/nuxt', '@pinia/nuxt']
})
