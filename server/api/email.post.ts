export default defineEventHandler(async (event) => {
  const { email } = await readBody(event)

  if (!email) {
    return {
      success: false,
    }
  }

  try {
    const response = await fetch(useRuntimeConfig().email.api.url, {
      method: 'POST',
      headers: {
        Authorization: `Token ${useRuntimeConfig().email.api.token}`,
        'Content-Type': 'application/json'
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
})
