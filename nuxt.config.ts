import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  modules: ['@nuxtjs/supabase'],
  publicRuntimeConfig: {
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_KEY: process.env.SUPABASE_KEY,
  },
})
