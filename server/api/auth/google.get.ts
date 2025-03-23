import type { EventHandlerRequest, H3Event } from 'h3'

export default defineOAuthGoogleEventHandler({
  config: {
    scope: ['email'],
  },
  async onSuccess(event: H3Event<EventHandlerRequest>, { user }: { user: any }) {
    if (user.email.split('@')[1] !== 'lo31.krakow.pl') {
      return sendRedirect(event, '/?error=invalid_domain')
    }

    await setUserSession(event, { user })
    return sendRedirect(event, '/panel')
  },
  async onError(event, error) {
    console.error(error)
    return sendRedirect(event, '/')
  },
})
