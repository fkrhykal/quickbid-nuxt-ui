type Result = {
  409: { code: 409; error: string }
  500: { code: 409; error: string }
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const accessToken = getCookie(event, 'accessToken')
  if (!Boolean(accessToken)) {
    throw createError({
      statusCode: 400,
    })
  }
  const res = await $fetch<{ code: 200; data: { account: Account } }>(
    `${config.apiUrl}/accounts/_current`,
    {
      method: 'get',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  ).catch(
    handleServerFetchError({
      409() {
        throw createError({
          statusCode: 409,
        })
      },
      500() {
        throw createError({
          statusCode: 500,
        })
      },
    })
  )
  if (res === undefined) {
    throw createError({
      statusCode: 500,
    })
  }
  return res.data.account
})
