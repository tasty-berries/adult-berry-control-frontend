// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools         : {enabled: true},

    devServer: {
        port: 3100
    },

    extends: ['@nuxt/ui-pro'],
    modules: ['@nuxt/ui', 'nuxt-tiptap-editor'],

    runtimeConfig: {
        public: {
            apiUrl  : process.env.NUXT_API_URL,
            assetUrl: process.env.NUXT_ASSET_URL
        }
    },

    tiptap: {
        prefix: 'Tiptap'
    }
})