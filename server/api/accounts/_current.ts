export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const accessToken = getCookie(event, 'accessToken')
  if (!Boolean(accessToken)) {
    throw createError({
      statusCode: 400,
    })
  }
  const response = await $fetch<{ code: 200; data: { account: Account } }>(
    `${config.apiUrl}/accounts/_current`,
    {
      method: 'get',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  ).catch((res) => {
    console.log({ res })
  })
  return response
})
