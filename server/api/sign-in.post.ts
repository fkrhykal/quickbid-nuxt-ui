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
  const body = await readValidatedBody(event, schema.parse)
  const res = await $fetch<FetchResponse, string>(
    `${process.env.API_URL}/credentials`,
    {
      body,
      method: 'post',
    }
  )
  setCookie(event, 'accessToken', res.data.accessToken, { sameSite: true })
  setCookie(event, 'refreshToken', res.data.refreshToken, { sameSite: true })
  return { code: 200, message: 'login success' }
})
