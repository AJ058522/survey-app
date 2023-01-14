// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: ["bootstrap/dist/css/bootstrap.min.css"],
    runtimeConfig: {
        public: {
            apiBase: 'http://127.0.0.1:8000/api/'
        }
    }
})
