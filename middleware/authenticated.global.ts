export default defineNuxtRouteMiddleware((to, from) => {
    const token  = useCookie<string>('token');
    const config = useRuntimeConfig();

    if (!token.value && to.path !== config.app.baseURL + '/login') {
        return navigateTo('/login');
    }

    if (token.value && to.path === config.app.baseURL + '/login') {
        return navigateTo('/');
    }
})