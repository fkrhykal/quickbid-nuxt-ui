import { faker } from '@faker-js/faker'

const api = (path: string) => `${process.env.API_URL}${path}`

export async function getCategories(): Promise<Category[]> {
  const response = await $fetch<{
    code: 200
    data: { categories: Category[] }
  }>(api('/categories'), {
    method: 'get',
  })
  return response.data.categories
}

export async function getAuctions() {
  const getClosedAt = () => {
    const date = faker.date.future({ years: 1 })
    return Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
      date.getMilliseconds()
    )
  }
  const auctions: Auction[] = Array(10)
    .fill(undefined)
    .map(() => ({
      id: faker.string.uuid(),
      bidders: Array(5)
        .fill(undefined)
        .map(() => ({
          id: faker.string.uuid(),
          username: faker.internet.username(),
          bid: faker.number.int({ min: 11_000, max: 99_000 }),
        })),
      lister: {
        id: faker.string.uuid(),
        username: faker.internet.username(),
      },
      product: {
        image: faker.image.urlPicsumPhotos(),
        description: faker.word.words(),
        name: faker.commerce.product(),
        price: faker.number.int({ min: 10_000, max: 100_000 }),
      },
      closedAt: getClosedAt(),
    }))
  return auctions
}

export async function getAccount(): Promise<Account> {
  const token = useCookie('accessToken')
  if (!token.value) {
    throw createError({ status: 402 })
  }
  const response = await $fetch<{ code: 200; data: { account: Account } }>(
    api('/accounts/_current'),
    {
      method: 'post',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  return response.data.account
}
