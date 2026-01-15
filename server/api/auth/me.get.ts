import type { UserProfile } from '~/types/medical'

export default defineEventHandler((event) => {
  const token = getHeader(event, 'authorization')?.replace('Bearer ', '')

  if (!token) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const user: UserProfile = {
    name: 'Екатерина Иванова',
    avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=facearea&w=48&h=48',
    email: 'demo@digitaldirection.ru'
  }

  return { user }
})
