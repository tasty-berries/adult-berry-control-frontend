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
            apiUrl  : 'http://adultberry.vrkitty.ru/api/control',
            assetUrl: 'http://adultberry.vrkitty.ru/storage'
        }
    },

    tiptap: {
        prefix: 'Tiptap'
    }
})