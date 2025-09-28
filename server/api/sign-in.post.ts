import z from 'zod'

const schema = z.object({
  username: z.string(),
  password: z.string(),
})

type FetchResponse = {
  code: 201
  data: {
    accountId: string
    accessToken: string
    refreshToken: string
  }
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const body = await readValidatedBody(event, schema.parse)
  const res = await $fetch<FetchResponse, string>(
    `${config.apiUrl}/credentials`,
    {
      body,
      method: 'post',
    }
  )
  setCookie(event, 'accessToken', res.data.accessToken, {
    sameSite: true,
    maxAge: 10_000_000,
  })
  setCookie(event, 'refreshToken', res.data.refreshToken, {
    sameSite: true,
    maxAge: 10_000_000,
  })
  return setResponseStatus(event, 200)
})
