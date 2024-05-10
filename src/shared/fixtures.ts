import { Lesson, LessonSection, StudentHomework } from '@/education'

export const lessonsFixtures: Lesson[] = [
  {
    _id: 'f3d5c4a4-ef37-4a96-b9cd-68813c6e29aa',
    courseId: "9c16ba20-a7b2-4dbe-8e4a-ce87b80a8d51",
    title: 'ГЛАВА 1: Обзор армий на поле битвы Курукшетра',
    summary: 'Introduction to the course',
  },
  {
    _id: 'b3d5c4a4-ef37-4a96-b9cd-68813c6e29ab',
    courseId: "9c16ba20-a7b2-4dbe-8e4a-ce87b80a8d51",
    title: 'ГЛАВА 2: Краткое изложение «Бхагавад-гиты»',
    summary: 'Introduction to the course',
  },
]


export const lessonSectionFixtures: LessonSection[] = [
  {
    _id: 'bafd8919-6a33-445d-b5a5-d10e57f60e72',
    lessonId: lessonsFixtures[0]._id,
    title: 'Видео',
    blocks: [
      {
        type: 'video',
        videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        posterUrl: 'https://previews.123rf.com/images/kruwt/kruwt1509/kruwt150900004/44680386-beautiful-white-lighthouse-of-urk-dutch-fishing-village.jpg',
        timestamps: [
          {
            time: 10,
            title: 'Вступление'
          },
          {
            time: 20,
            title: 'Вступление'
          },
          {
            time: 45,
            title: 'История Махараджи Прахлады'
          },
          {
            time: 62,
            title: 'Путана в прошлой жизни'
          }
        ]
      },
    ]
  },
  {
    _id: '2ea76f2e-4308-4d5f-bd9a-3503f7d76ec7',
    lessonId: lessonsFixtures[0]._id,
    title: 'BG 1.1',
    blocks: [
      {
        type: 'text',
        content: "### content"
      }
    ]
  },
  {
    _id: '2ea76f2e-4308-4d5f-bd9a-3503f7d76ec8',
    lessonId: lessonsFixtures[0]._id,
    title: 'Тест',
    blocks: [
      {
        type: 'quiz',
        question: 'Сколько лет Богу?',
        answers: [
          'Бог существует вне времени. Это другой мир, вечный там нет времени. Это как вселенная бесконечная. Мы жители планеты земля живём под властью времени. Рождение, жизнь и смерть.',
          'Я в своем познании настолько преисполнился, что я как будто бы уже сто триллионов миллиардов лет проживаю на триллионах и триллионах таких же планет, как эта Земля, мне этот мир абсолютно понятен',
          'Абсурдным является вопрос: «Сколько Богу лет?», точно так же, как если бы мы спросили: «Сколько метров бесконечность?»'
        ],
        rightAnswer: 1
      },
      {
        type: 'quiz',
        question: 'В чем смысл жизни?',
        answers: [
          'Смысл — получать удовольствие от каждого дня.',
          'Смысл жизни — прожить ее так, чтобы тебя знала Википедия, но не знал «Ютуб».',
          'Глобально — смысл в достижении единства с Богом.',
          'Смысл в том, чтобы под конец жизни была куча интересных историй, которые с тобой случались. Чтобы было что рассказывать окружающим, чтобы они слушали, смеялись и удивлялись, а потом пересказывали их своим знакомым :)',
        ],
        rightAnswer: 2
      },
      {
        type: 'quiz',
        question: 'В чем смысл жизни?',
        answers: [
          'Смысл — получать удовольствие от каждого дня.',
          'Смысл жизни — прожить ее так, чтобы тебя знала Википедия, но не знал «Ютуб».',
          'Глобально — смысл в достижении единства с Богом.',
          'Смысл в том, чтобы под конец жизни была куча интересных историй, которые с тобой случались. Чтобы было что рассказывать окружающим, чтобы они слушали, смеялись и удивлялись, а потом пересказывали их своим знакомым :)',
        ],
        rightAnswer: 2
      }
    ]
  },
]


export const studentHomeworks: StudentHomework[] = [
  {
    _id: '17a6a91a-4d6d-4d9c-a311-058d8bc0a200',
    userId: 'a243727d-57ab-4595-ba17-69f3a0679bf6',
    lessonSectionId: lessonSectionFixtures[0]._id,
    status: 'open',
    text: 'Посмотреть видео',
    work: [],
    assessmentMethod: 'teacher',
  },
  {
    _id: '17a6a91a-4d6d-4d9c-a311-058d8bc0a201',
    userId: 'a243727d-57ab-4595-ba17-69f3a0679bf6',
    lessonSectionId: lessonSectionFixtures[2]._id,
    status: 'open',
    text: 'Завершить тест',
    work: [],
    assessmentMethod: 'teacher',
  },
  {
    _id: '17a6a91a-4d6d-4d9c-a311-058d8bc0a202',
    userId: 'a243727d-57ab-4595-ba17-69f3a0679bf6',
    lessonSectionId: lessonSectionFixtures[1]._id,
    status: 'open',
    text: 'Практическое задание',
    work: [],
    assessmentMethod: 'teacher',
  },
]
