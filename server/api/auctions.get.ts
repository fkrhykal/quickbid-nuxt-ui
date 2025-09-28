import { faker } from '@faker-js/faker'

export default defineEventHandler(async (event) => {
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
  return {
    code: 200,
    data: {
      auctions,
    },
  }
})
