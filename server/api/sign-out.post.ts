export default defineEventHandler(async (event) => {
  deleteCookie(event, 'accessToken')
  deleteCookie(event, 'refreshToken')
  return setResponseStatus(event, 200)
})
