import { FetchError } from 'ofetch'

export function handleServerFetchError<T extends { [key: number]: any }>(
  statusHandlers: {
    [K in keyof T]?: (res: T[K]) => Promise<void> | void
  },
  defaultHandler?: <T>(res: T) => Promise<void> | void
) {
  return async (res: any) => {
    if (res instanceof FetchError && res.statusCode !== undefined) {
      const handler = statusHandlers[res.statusCode]
      if (handler) {
        return await handler(res.data)
      }
      if (defaultHandler) {
        return await defaultHandler(res.data)
      }
      throw createError({
        statusCode: res.statusCode,
      })
    }
  }
}
