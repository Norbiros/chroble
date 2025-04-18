import type { EventHandlerRequest, H3Event } from 'h3'

export default defineOAuthGoogleEventHandler({
  config: {
    scope: ['email'],
  },
  async onSuccess(event: H3Event<EventHandlerRequest>, { user }: { user: any }) {
    if (!process.env.DO_NOT_RESTRICT_EMAIL_DOMAIN) {
      if (user.email.split('@')[1] !== 'lo31.krakow.pl') {
        await clearUserSession(event)
        return sendRedirect(event, '/?error=invalid_domain')
      }
    }

    await useDrizzle().insert(tables.users).values({
      email: user.email,
    }).onConflictDoNothing().execute()

    const userModel = await useDrizzle().select().from(tables.users).where(eq(tables.users.email, user.email)).execute()

    await setUserSession(event, {
      user: {
        id: userModel[0]?.id,
        ...user,
      },
    })
    return sendRedirect(event, '/panel')
  },
  async onError(event, error) {
    console.error(error)
    return sendRedirect(event, '/')
  },
})
