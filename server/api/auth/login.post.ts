import type { UserProfile } from '~/types/medical'

export default defineEventHandler(async (event) => {
  const body = await readBody<{ email?: string; password?: string }>(event)

  if (!body.email || !body.password) {
    throw createError({ statusCode: 400, statusMessage: 'Email and password are required' })
  }

  if (!body.email.includes('@')) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid email format' })
  }

  const user: UserProfile = {
    name: 'Екатерина Иванова',
    avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=facearea&w=48&h=48',
    email: body.email
  }

  const token = 'demo-token'

  return { user, token }
})
