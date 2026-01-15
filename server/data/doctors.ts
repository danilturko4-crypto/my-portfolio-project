import type { Doctor } from '~/types/medical'

export const doctors: Doctor[] = [
  {
    id: 1,
    name: 'Анна Викторовна Петрова',
    specialty: 'Кардиолог',
    rating: 4.9,
    reviewsCount: 128,
    achievements: ['Кандидат мед. наук', 'Стажировка в Mayo Clinic'],
    experience: 12,
    price: 3200,
    todaySlots: ['10:30', '12:00', '15:30'],
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=facearea&w=140&h=140',
    education: 'Первый МГМУ им. И.М. Сеченова',
    description: 'Специализируется на диагностике и лечении сердечно-сосудистых заболеваний.',
    weeklySchedule: [
      { date: '2024-09-23', dayLabel: 'Пн, 23', slots: ['09:00', '10:00', '11:30'] },
      { date: '2024-09-25', dayLabel: 'Ср, 25', slots: ['13:00', '14:30'] },
      { date: '2024-09-27', dayLabel: 'Пт, 27', slots: ['09:30', '12:00', '16:00'] }
    ],
    reviews: [
      { id: 1, name: 'Мария К.', rating: 5, text: 'Очень внимательный врач, все объяснила.', date: '2024-08-14' },
      { id: 2, name: 'Иван С.', rating: 4, text: 'Профессионально, но ожидал больше времени.', date: '2024-07-20' },
      { id: 3, name: 'Алина П.', rating: 5, text: 'После консультации стало спокойнее.', date: '2024-07-02' }
    ]
  },
  {
    id: 2,
    name: 'Дмитрий Сергеевич Волков',
    specialty: 'Невролог',
    rating: 4.7,
    reviewsCount: 94,
    achievements: ['Член Ассоциации неврологов', 'Автор 15 публикаций'],
    experience: 9,
    price: 2800,
    todaySlots: ['11:00', '13:30'],
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=facearea&w=140&h=140',
    education: 'РНИМУ им. Н.И. Пирогова',
    description: 'Занимается лечением хронических болевых синдромов и мигреней.',
    weeklySchedule: [
      { date: '2024-09-24', dayLabel: 'Вт, 24', slots: ['09:00', '12:00', '14:00'] },
      { date: '2024-09-26', dayLabel: 'Чт, 26', slots: ['10:30', '11:30', '15:00'] }
    ],
    reviews: [
      { id: 4, name: 'Ольга Н.', rating: 5, text: 'Помог разобраться с диагнозом.', date: '2024-08-01' },
      { id: 5, name: 'Сергей Р.', rating: 4, text: 'Все четко и по делу.', date: '2024-06-18' }
    ]
  },
  {
    id: 3,
    name: 'Елена Михайловна Юдина',
    specialty: 'Терапевт',
    rating: 4.8,
    reviewsCount: 211,
    achievements: ['Лучший терапевт года', 'Ведущий врач клиники'],
    experience: 15,
    price: 2400,
    todaySlots: ['09:00', '10:00', '17:00'],
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=facearea&w=140&h=140',
    education: 'СПбГМУ им. акад. И.П. Павлова',
    description: 'Проводит комплексные консультации и профилактические осмотры.',
    weeklySchedule: [
      { date: '2024-09-23', dayLabel: 'Пн, 23', slots: ['10:00', '11:00', '12:00'] },
      { date: '2024-09-27', dayLabel: 'Пт, 27', slots: ['09:30', '13:00'] }
    ],
    reviews: [
      { id: 6, name: 'Людмила П.', rating: 5, text: 'Очень доброжелательная и внимательная.', date: '2024-08-19' },
      { id: 7, name: 'Артем Л.', rating: 4, text: 'Помогла быстро вылечиться.', date: '2024-07-08' },
      { id: 8, name: 'Дарья Ф.', rating: 5, text: 'Советую всем знакомым.', date: '2024-06-30' }
    ]
  },
  {
    id: 4,
    name: 'Николай Алексеевич Смирнов',
    specialty: 'Дерматолог',
    rating: 4.6,
    reviewsCount: 58,
    achievements: ['Эксперт по акне', 'Опыт 7 лет'],
    experience: 7,
    price: 2600,
    todaySlots: [],
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=facearea&w=140&h=140',
    education: 'КГМУ',
    description: 'Работает с хроническими кожными заболеваниями.',
    weeklySchedule: [
      { date: '2024-09-25', dayLabel: 'Ср, 25', slots: ['09:00', '10:30'] },
      { date: '2024-09-28', dayLabel: 'Сб, 28', slots: ['09:00', '11:00'] }
    ],
    reviews: [{ id: 9, name: 'Юрий П.', rating: 4, text: 'Хороший специалист.', date: '2024-06-12' }]
  },
  {
    id: 5,
    name: 'Марина Олеговна Орлова',
    specialty: 'Педиатр',
    rating: 4.9,
    reviewsCount: 173,
    achievements: ['Врач высшей категории', '10 лет в детской клинике'],
    experience: 11,
    price: 2300,
    todaySlots: ['08:30', '11:00'],
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=facearea&w=140&h=140',
    education: 'СГМУ',
    description: 'Консультирует родителей по вопросам здоровья детей.',
    weeklySchedule: [
      { date: '2024-09-24', dayLabel: 'Вт, 24', slots: ['09:30', '10:30', '13:00'] },
      { date: '2024-09-26', dayLabel: 'Чт, 26', slots: ['09:00', '12:00'] }
    ],
    reviews: [
      { id: 10, name: 'Ксения М.', rating: 5, text: 'Очень чуткий врач, ребенок в восторге.', date: '2024-08-09' },
      { id: 11, name: 'Павел С.', rating: 5, text: 'Подробно объяснила лечение.', date: '2024-07-15' }
    ]
  },
  {
    id: 6,
    name: 'Светлана Игоревна Белова',
    specialty: 'Офтальмолог',
    rating: 4.5,
    reviewsCount: 66,
    achievements: ['Операции по коррекции зрения', 'Член общества офтальмологов'],
    experience: 8,
    price: 3000,
    todaySlots: ['14:00'],
    avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=facearea&w=140&h=140',
    education: 'НГМУ',
    description: 'Проводит диагностику зрения и подбор оптики.',
    weeklySchedule: [
      { date: '2024-09-23', dayLabel: 'Пн, 23', slots: ['12:00', '14:00'] },
      { date: '2024-09-26', dayLabel: 'Чт, 26', slots: ['09:00', '11:00'] }
    ],
    reviews: [{ id: 12, name: 'Егор П.', rating: 4, text: 'Все понравилось, внимательно.', date: '2024-07-28' }]
  }
]

export const specialties = Array.from(new Set(doctors.map((doctor) => doctor.specialty)))
