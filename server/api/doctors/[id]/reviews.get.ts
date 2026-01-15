import { doctors } from '~/server/data/doctors'
import type { ReviewsResponse } from '~/types/medical'

export default defineEventHandler((event) => {
  const id = Number(getRouterParam(event, 'id'))
  const doctor = doctors.find((item) => item.id === id)

  if (!doctor) {
    throw createError({ statusCode: 404, statusMessage: 'Doctor not found' })
  }

  const query = getQuery(event)
  const sort = typeof query.sort === 'string' ? query.sort : 'date'
  const page = Math.max(1, Number(query.page ?? 1))
  const pageSize = Math.max(1, Number(query.pageSize ?? 6))

  const reviews = [...doctor.reviews]

  if (sort === 'rating') {
    reviews.sort((a, b) => b.rating - a.rating)
  } else {
    reviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }

  const total = reviews.length
  const start = (page - 1) * pageSize
  const data = reviews.slice(start, start + pageSize)

  const response: ReviewsResponse = {
    data,
    total,
    page,
    pageSize
  }

  return response
})
