import { FetchError } from 'ofetch'

import z from 'zod'

const schema = z.object({
  username: z.string(),
  password: z.string(),
})

function errorHandler(res: any) {}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const body = await readValidatedBody(event, schema.parse)
  await $fetch(`${config.apiUrl}/accounts`, {
    body,
    method: 'post',
  }).catch((error) => {
    if (error instanceof FetchError) {
      switch (error.statusCode) {
        case 400: {
          throw createError({
            status: 400,
            statusCode: 400,
            data: error.data?.error,
          })
        }
        case 409: {
          throw createError({
            status: 409,
            statusCode: 409,
          })
        }
        default: {
          throw createError({
            statusCode: 500,
          })
        }
      }
    }
  })
  return setResponseStatus(event, 200)
})
