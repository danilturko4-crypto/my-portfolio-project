import { doctors } from '~/server/data/doctors'

export default defineEventHandler((event) => {
  const id = Number(getRouterParam(event, 'id'))
  const doctor = doctors.find((item) => item.id === id)

  if (!doctor) {
    throw createError({ statusCode: 404, statusMessage: 'Doctor not found' })
  }

  return doctor
})
