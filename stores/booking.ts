import { defineStore } from 'pinia'

interface PendingAppointment {
  doctorId: number
  slot: string
}

export const useBookingStore = defineStore('booking', () => {
  const pending = ref<PendingAppointment | null>(null)

  const setPending = (appointment: PendingAppointment) => {
    pending.value = appointment
  }

  const clearPending = () => {
    pending.value = null
  }

  return {
    pending,
    setPending,
    clearPending
  }
})
