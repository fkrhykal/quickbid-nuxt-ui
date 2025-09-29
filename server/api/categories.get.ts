export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const response = await $fetch<{
    code: 200
    data: { categories: Category[] }
  }>(`${config.apiUrl}/categories`, {
    method: 'get',
  })
  return response.data.categories
})
