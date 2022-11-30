import { type H3Event, readBody } from 'h3'

type RequestData = { email: string }
type ResponseData = { success: boolean }

export const config = {
  runtime: 'experimental-edge',
}

const json = (data: ResponseData) => {
  return new Response(JSON.stringify(data), {
    headers: { 'content-type': 'application/json' },
  })
}

const read = async <T>(request: Request | H3Event) => {
  if ('node' in request) {
    return readBody<T>(request)
  }

  return request.json() as T
}

const run = async ({ email }: RequestData): Promise<ResponseData> => {
  if (!email) {
    return {
      success: false,
    }
  }

  try {
    const response = await fetch(`${import.meta.env.NUXT_EMAIL_API_URL}`, {
      method: 'POST',
      headers: {
        'authorization': `Token ${import.meta.env.NUXT_EMAIL_API_TOKEN}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({ email, double_opt_in: false })
    })

    const payload = await response.json()

    if (response.ok) {
      return {
        success: true,
      }
    }

    if (payload?.error?.email) {
      if (Array.isArray(payload.error.email)) {
        if (payload.error.email.includes('This email address has already been subscribed')) {
          return {
            success: true,
          }
        }
      }
    }
  } catch (_error) {
    // Todo: Handle other error states.
  }

  return {
    success: false,
  }
}

export default async function handle(request: Request): Promise<Response>
export default async function handle(request: H3Event): Promise<ResponseData>
export default async function handle(request: Request | H3Event) {
  const body = await read<RequestData>(request)
  const response = await run(body)

  if ('node' in request) {
    return response
  }

  return json(response)
}
