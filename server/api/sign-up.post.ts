import z, { type infer as Infer } from 'zod'

const schema = z.object({
  username: z.string(),
  password: z.string(),
})

type Failure = {
  400: { code: 400; error: Partial<Infer<typeof schema>> }
  409: { code: 409; error: string }
  500: { code: 500; error: string }
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const body = await readValidatedBody(event, schema.parse)
  await $fetch(`${config.apiUrl}/accounts`, {
    body,
    method: 'post',
  }).catch(
    handleServerFetchError<Failure>({
      400(res) {
        throw createError({
          statusCode: 400,
          data: res.error,
        })
      },
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
  return setResponseStatus(event, 200)
})
