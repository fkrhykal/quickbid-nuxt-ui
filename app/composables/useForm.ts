export type FormOption<T, P extends Record<number, any>> = {
  payload: T
  requestHandler: (
    payload: T,
    signal: AbortSignal,
    registry: HandlerRegistry<P>
  ) => Promise<void> | void
  responseHandler: HandlerRegistry<P>
}

export function useForm<T extends {}, P extends Record<number, any>>(
  option: FormOption<T, P>
) {
  const error = reactive<Partial<T>>({})
  const payload = reactive(option.payload)
  const controler = new AbortController()
  const loading = ref(false)
  const hasError = computed(() =>
    Object.entries(error).some(([_, v]) => v !== undefined)
  )
  const handler = option.responseHandler[400]
  const setError = (res: { error: Partial<T> }) => {
    for (const k in res.error) {
      ;(error as Partial<T>)[k] = res.error[k]
    }
  }
  const clearError = (k: keyof T) => {
    ;(error as Partial<T>)[k] = undefined
  }
  const clearErrors = () => {
    for (const k in error) {
      ;(error as Partial<T>)[k as keyof T] = undefined
    }
  }
  if (handler !== undefined) {
    option.responseHandler[400] = async (res) => {
      if (isBadRequest<P>(res)) {
        setError(res)
      }
      await handler(res)
    }
  } else {
    option.responseHandler[400] = setError
  }
  const submit = async () => {
    loading.value = true
    await option.requestHandler(
      option.payload,
      controler.signal,
      option.responseHandler
    )
    loading.value = false
  }
  return {
    error,
    loading,
    submit,
    ...toRefs(payload),
    hasError,
    clearError,
    clearErrors,
  }
}

function isBadRequest<P extends Record<number, any>>(
  res: P[400]
): res is { code: 400; error: Partial<P> } {
  if (typeof res !== 'object') {
    return false
  }
  const code = Object.getOwnPropertyDescriptor(res, 'code')
  if (typeof code?.value !== 'number') {
    return false
  }
  const error = Object.getOwnPropertyDescriptor(res, 'error')
  return typeof error?.value !== 'object'
}
