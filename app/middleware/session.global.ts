export default defineNuxtRouteMiddleware(async (to) => {
  const { fetch } = useAuth()
  await fetch()
  return
})
