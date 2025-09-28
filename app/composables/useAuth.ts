import type { FetchContext, FetchResponse, ResponseType } from 'ofetch'

export function useAuth() {
  const router = useRouter()
  const account = useState<Account | undefined>('auth:account')

  const fetch = async () => {
    const res = await useRequestFetch()('/api/accounts/_current').catch(
      () => undefined
    )
    account.value = res?.data.account
  }

  const isAuthenticated = computed(() => Boolean(account.value))

  const signIn = async (options: {
    body: { username: string; password: string }
    onResponseError?: <T>(
      res: FetchContext<T, ResponseType> & {
        response: FetchResponse<T>
      }
    ) => void | Promise<void>
  }) => {
    const csrf = useCsrf()
    await useRequestFetch()('/api/sign-in', {
      body: options.body,
      onResponseError: options.onResponseError,
      method: 'post',
      headers: {
        [csrf.headerName]: csrf.csrf,
      },
    })
    await fetch()
  }

  const signOut = async (action?: () => Promise<void> | void) => {
    const csrf = useCsrf()
    await useRequestFetch()('/api/sign-out', {
      method: 'post',
      headers: {
        [csrf.headerName]: csrf.csrf,
      },
    })
    account.value = undefined
    return await action?.()
  }

  return {
    account,
    isAuthenticated,
    fetch,
    signIn,
    signOut,
  }
}
