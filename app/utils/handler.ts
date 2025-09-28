import { FetchError } from 'ofetch'

type Handlers<T> = {
  [K in keyof T]?: (res: T[K]) => Promise<void> | void
}

export function handleClientFetchError<T>(
  handlers: Handlers<T>
): (res: any) => Promise<void> | void {
  return (res) => {
    if (res instanceof FetchError && res.statusCode !== undefined) {
      const fetchError = res.data as FetchError<T[keyof T]>
      return handlers[res.statusCode as keyof T]?.(
        fetchError.data as T[keyof T]
      )
    }
  }
}
