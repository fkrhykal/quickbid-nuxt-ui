import type { FetchContext, FetchResponse, ResponseType } from 'ofetch'

export type Result<T> = FetchContext<T, ResponseType> & {
  response: FetchResponse<T>
}

export type HandlerRegistry<T> = {
  [K in keyof T]?: (res: T[K]) => void | Promise<void>
}

type ResponseError<T> = { error: true; data: T; [key: string]: any }

type MaybeResponseError<T> = T | ResponseError<T>

export function handleResponse<T extends { [key: number]: any }>(
  registry: HandlerRegistry<T>
) {
  return async ({
    response: { status, _data },
  }: Result<MaybeResponseError<T[keyof T]>>) => {
    if (isErrorData(_data)) {
      return await registry[status]?.(_data.data)
    }
    return await registry[status]?.(_data)
  }
}

function isErrorData<T>(v: MaybeResponseError<T>): v is ResponseError<T> {
  if (typeof v !== 'object') {
    return false
  }
  if (v === null) {
    return false
  }
  return 'error' in v && v.error
}
