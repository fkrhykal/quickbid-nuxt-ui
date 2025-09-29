import z from 'zod'

const schema = z.object({
  username: z.string(),
  password: z.string(),
})

type Success = {
  code: 201
  data: {
    accountId: string
    accessToken: string
    refreshToken: string
  }
}

type Failure = {
  402: { code: 402; error: string }
  500: { code: 500; error: string }
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const body = await readValidatedBody(event, schema.parse)
  const res = await $fetch<Success>(`${config.apiUrl}/credentials`, {
    body,
    method: 'post',
  }).catch(
    handleServerFetchError<Failure>({
      402() {
        throw createError({ statusCode: 402 })
      },
      500() {
        throw createError({ statusCode: 500 })
      },
    })
  )
  if (res === undefined) {
    throw createError({ statusCode: 500 })
  }
  setCookie(event, 'accessToken', res.data.accessToken, {
    sameSite: true,
    maxAge: 10_000_000,
  })
  setCookie(event, 'refreshToken', res.data.refreshToken, {
    sameSite: true,
    maxAge: 10_000_000,
  })
  setResponseStatus(event, 200)
  return
})
