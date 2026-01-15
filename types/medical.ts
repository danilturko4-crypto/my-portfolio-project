export interface Review {
  id: number
  name: string
  rating: number
  text: string
  date: string
}

export interface ScheduleDay {
  date: string
  dayLabel: string
  slots: string[]
}

export interface Doctor {
  id: number
  name: string
  specialty: string
  rating: number
  reviewsCount: number
  achievements: string[]
  experience: number
  price: number
  todaySlots: string[]
  avatar: string
  education: string
  description: string
  weeklySchedule: ScheduleDay[]
  reviews: Review[]
}

export interface UserProfile {
  name: string
  avatar: string
  email: string
}

export interface DoctorsResponse {
  data: Doctor[]
  total: number
  page: number
  pageSize: number
}

export interface ReviewsResponse {
  data: Review[]
  total: number
  page: number
  pageSize: number
}
