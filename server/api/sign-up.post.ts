import z from 'zod'

const schema = z.object({
  username: z.string(),
  password: z.string(),
})

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, schema.parse)
  await $fetch(`${process.env.API_URL}/accounts`, {
    body,
    method: 'post',
  })
  return { code: 200, message: 'sign up success' }
})
