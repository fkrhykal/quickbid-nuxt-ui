export function useAuth() {
  const account = useState<Account | undefined>('auth:account')
  const isFetched = useState('auth:fetch-status', () => false)

  const fetch = async () => {
    if (account.value === undefined && isFetched.value === false) {
      try {
        const res = await useRequestFetch()('/api/accounts/_current')
        account.value = res
      } catch (error) {
        account.value = undefined
      } finally {
        isFetched.value = true
      }
    }
  }

  const isAuthenticated = computed(() => Boolean(account.value))

  const signIn = async (options: {
    body: { username: string; password: string }
    onError?: (error: any) => Promise<void> | void
    onSuccess?: (res: any) => Promise<void> | void
  }) => {
    try {
      const csrf = useCsrf()
      const res = await useRequestFetch()('/api/sign-in', {
        body: options.body,
        method: 'post',
        headers: {
          [csrf.headerName]: csrf.csrf,
        },
      })
      await options.onSuccess?.(res)
      await fetch()
    } catch (error) {
      await options.onError?.(error)
    }
  }

  const signOut = async (onSuccess?: () => Promise<void> | void) => {
    try {
      const csrf = useCsrf()
      await useRequestFetch()('/api/sign-out', {
        method: 'post',
        headers: {
          [csrf.headerName]: csrf.csrf,
        },
      })
      account.value = undefined
      isFetched.value = false
      await onSuccess?.()
    } catch (error) {}
  }

  return {
    account,
    isAuthenticated,
    fetch,
    signIn,
    signOut,
  }
}
