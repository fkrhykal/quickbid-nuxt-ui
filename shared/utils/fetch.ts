export type ResponseData<T, P> = { code: T; data: P }
export type ResponseError<T, P> = { code: T; error: P }
export type ResponseMessage<T> = { code: T; message: string }
