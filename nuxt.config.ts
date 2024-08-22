// https://nuxt.com/docs/api/configuration/nuxt-config
import {resolve} from "path";
export default defineNuxtConfig({
  alias: {
    '@': resolve(__dirname, "/")
  },

  devtools: { enabled: true },
  css: ['~/assets/scss/main.scss'],
  image: {
    format: ['webp'],
    domains: [],
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: ["@nuxt/image"]
})