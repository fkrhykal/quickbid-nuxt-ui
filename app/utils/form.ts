export type SignInRequest = { username: string; password: string }

export type SignInResponse = {
  200: ResponseMessage<200>
  401: ResponseError<401, string>
  500: ResponseError<500, string>
}

export async function signInHandler(
  payload: SignInRequest,
  signal: AbortSignal,
  registry: HandlerRegistry<SignInResponse>
) {
  const token = useCsrf()
  await $fetch('/api/sign-in', {
    body: payload,
    headers: {
      [token.headerName]: token.csrf,
    },
    ignoreResponseError: true,
    onResponse: handleResponse(registry),
    method: 'POST',
    signal,
  })
}

export type SignUpRequest = { username: string; password: string }

export type SignUpResponse = {
  200: ResponseMessage<string>
  400: ResponseError<400, Partial<SignUpRequest>>
  500: ResponseError<500, string>
  409: ResponseError<409, string>
}

export async function signUpHandler(
  payload: SignUpRequest,
  signal: AbortSignal,
  registry: HandlerRegistry<SignUpResponse>
) {
  const token = useCsrf()
  await $fetch('/api/sign-up', {
    body: payload,
    headers: {
      [token.headerName]: token.csrf,
    },
    onResponse: handleResponse(registry),
    method: 'POST',
    signal,
  })
}
