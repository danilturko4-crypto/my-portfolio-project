import { doctors } from '~/server/data/doctors'
import type { DoctorsResponse } from '~/types/medical'

export default defineEventHandler((event) => {
  const query = getQuery(event)
  const specialty = typeof query.specialty === 'string' ? query.specialty : ''
  const search = typeof query.search === 'string' ? query.search.trim().toLowerCase() : ''
  const minRating = Number(query.minRating ?? 0)
  const sortBy = typeof query.sortBy === 'string' ? query.sortBy : 'rating'
  const sortOrder = typeof query.sortOrder === 'string' ? query.sortOrder : 'desc'
  const page = Math.max(1, Number(query.page ?? 1))
  const pageSize = Math.max(1, Number(query.pageSize ?? 4))

  let list = [...doctors]

  if (specialty) {
    list = list.filter((doctor) => doctor.specialty === specialty)
  }

  if (minRating > 0) {
    list = list.filter((doctor) => doctor.rating >= minRating)
  }

  if (search) {
    list = list.filter((doctor) => doctor.name.toLowerCase().includes(search))
  }

  list.sort((a, b) => {
    let compare = 0
    switch (sortBy) {
      case 'experience':
        compare = a.experience - b.experience
        break
      case 'price':
        compare = a.price - b.price
        break
      case 'name':
        compare = a.name.localeCompare(b.name)
        break
      default:
        compare = a.rating - b.rating
    }
    return sortOrder === 'asc' ? compare : -compare
  })

  const total = list.length
  const start = (page - 1) * pageSize
  const data = list.slice(start, start + pageSize)

  const response: DoctorsResponse = {
    data,
    total,
    page,
    pageSize
  }

  return response
})
