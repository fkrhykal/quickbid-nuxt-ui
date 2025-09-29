export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('page:loading:start', async () => {
    const { fetch: fetch } = useAuth()
    return await fetch()
  })
})
