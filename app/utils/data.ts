export async function getCategories(): Promise<Category[]> {
  const csrf = useCsrf()
  const response = await $fetch<{
    code: 200
    data: { categories: Category[] }
  }>('/api/categories', {
    method: 'get',
    headers: {
      [csrf.headerName]: csrf.csrf,
    },
  })
  return response.data.categories
}

export async function getAuctions(): Promise<Auction[]> {
  const csrf = useCsrf()
  const response = await $fetch<{ code: 200; data: { auctions: Auction[] } }>(
    '/api/auctions',
    {
      method: 'get',
      headers: {
        [csrf.headerName]: csrf.csrf,
      },
    }
  )
  return response.data.auctions
}

export async function getCurrentAccount(): Promise<Account> {
  const csrf = useCsrf()
  const requestFetch = useRequestFetch()
  const response = await requestFetch('/api/accounts/_current', {
    headers: {
      [csrf.headerName]: csrf.csrf,
    },
  })
  return response.data.account
}
