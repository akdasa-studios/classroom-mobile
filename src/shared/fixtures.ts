import { LessonSection } from './../education/aggregates/LessonSection'
import { UuidIdentity } from '@framework/domain'
import { Course, Group, Enrollment, Lesson, StudentHomework, StudentHomeworkStatus, AssessmentMethod } from '@/education'
import { EnrollmentStatus } from '@core/aggregates'

export const courses: Course[] = [
  new Course(
    new UuidIdentity('19c4dd82-c6ac-4772-8c9d-6bdebf5a538f'),
    'Пранама-мантра',
    'Курс для получения пранама-мантры',
    'Если вы хотите принять прибежище у Е.С. Бхакти Чайтанья Свами Махараджа, тогда вам необходимо ознакомиться с его требованиями к кандидатам на получение пранама-мантры и пройти данный курс',
    'https://sun9-80.userapi.com/impf/c840438/v840438487/1b36/0KaFwO7dpco.jpg?size=604x380&quality=96&sign=17a0e7c4e5233288c66b5c9172801240&type=album'
  ),
  new Course(
    new UuidIdentity('5d924c3c-9e91-4e46-9655-2e68e4d5a919'),
    'Первое посвящение',
    '',
    'First Initiation',
    'https://back2godhead.com/wp-content/uploads/2012/11/099_1975_10-02-27.jpg'
  ),
  new Course(
    new UuidIdentity('b723092d-9944-4574-8533-c8ce71de4416'),
    'Второе посвящение',
    '',
    'Second initiation',
    'https://girirajswami.com/blog/wp-content/uploads/2012/07/SP_init.jpg'
  ),
  new Course(
    new UuidIdentity('5df94725-ae8b-40d2-885b-09da0c06b57f'),
    'Поклонение Божествам',
    '',
    'Archana',
    'https://sastracaksu.nlitn.in/wp-content/uploads/2018/02/Srila-Prabhupada-Praying-to-Radha-Krishna-Deities.jpg'
  ),
  new Course(
    new UuidIdentity('eb7c0bc3-0862-4579-85ae-e8bd45020da1'),
    'Бхактивайбхава',
    '',
    'Bhakti-vaibhava',
    'https://prabhupadabooks.com/images/bhagavatam_big.jpg'
  ),
]


export const groupsFixtures: Group[] = [
  new Group(
    new UuidIdentity('47d69940-20c5-448a-94f1-1d8e427e47af'),
    courses[0].id,
    'Группа для матаджи',
    'Ямуна дд',
    'https://img.freepik.com/free-photo/3d-illustration-cute-cartoon-girl-blue-jacket-glasses_1142-41044.jpg',
    17039772
  ),
  new Group(
    new UuidIdentity('c76e9597-b037-42c8-92d2-10875691b51f'),
    courses[0].id,
    'Группа для прабху',
    'Кришна дас',
    'https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg',
    17039772
  ),
  new Group(
    new UuidIdentity('f3d5c4a4-ef37-4a96-b9cd-68813c6e29a1'),
    courses[0].id,
    'Группа 108',
    'Радха дд',
    'https://img.freepik.com/free-photo/portrait-young-woman-wearing-glasses-3d-rendering_1142-43632.jpg',
    17139772
  ),
  new Group(
    new UuidIdentity('1a4ec14b-f3ce-4ff5-8321-abe7ddd59e33'),
    courses[1].id,
    'Группа 98765',
    'Ivan Pronin',
    'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    17139772
  )
]


export const EnrollmentsFixtures: Enrollment[] = [
  new Enrollment(
    new UuidIdentity('655ce3dd-048a-40c4-881b-4130f50a4a99'),
    'a243727d-57ab-4595-ba17-69f3a0679bf6',
    groupsFixtures[0].id,
    courses[0].id,
    EnrollmentStatus.Approved
  ),
  // new Enrollment(
  //   new UuidIdentity('997b7a4f-bfca-482d-a7ce-1f7bf5d33acf'),
  //   'a243727d-57ab-4595-ba17-69f3a0679bf6',
  //   groupsFixtures[0].id,
  //   courses[0].id,
  //   EnrollmentStatus.Declined
  // ),
  // new Enrollment(
  //   new UuidIdentity('67a6a91a-4d6d-4d9c-a311-058d8bc0a200'),
  //   'a243727d-57ab-4595-ba17-69f3a0679bf6',
  //   groupsFixtures[3].id,
  //   courses[1].id,
  //   EnrollmentStatus.InReview
  // ),
  // new Enrollment(
  //   new UuidIdentity('d6ae0429-1e3d-4434-90e6-88aa2a367e8e'),
  //   'a243727d-57ab-4595-ba17-69f3a0679bf6',
  //   undefined,
  //   courses[0].id,
  //   EnrollmentStatus.NotSubmitted
  // ),
  // new Enrollment(
  //   new UuidIdentity('99681e90-17bb-482e-b00b-2966df238815'),
  //   '952ae116-1669-49e9-9e39-47a13104e475',
  //   groupsFixtures[1].id,
  //   courses[0].id,
  //   EnrollmentStatus.InReview
  // ),
]



export const markdown = `
*dhṛtarāṣṭraḥ* *uvāca* --- King Dhṛtarāṣṭra said; *dharma*-*kṣetre* --- in the place of pilgrimage; *kuru*-*kṣetre* --- in the place named Kurukṣetra; *samavetāḥ* --- assembled; *yuyutsavaḥ* --- desiring to fight; *māmakāḥ* --- my party (sons); *pāṇḍavāḥ* --- the sons of Pāṇḍu; *ca* --- and; *eva* --- certainly; *kim* --- what; *akurvata* --- did they do; *sañjaya* --- O Sañjaya.

Translation
-----------

Dhṛtarāṣṭra said: O Sañjaya, after my sons and the sons of Pāṇḍu assembled in the place of pilgrimage at Kurukṣetra, desiring to fight, what did they do?

Purport
-------

*Bhagavad-gītā* is the widely read theistic science summarized in the *Gītā-māhātmya* (*Glorification of the Gītā*). There it says that one should read *Bhagavad-gītā* very scrutinizingly with the help of a person who is a devotee of Śrī Kṛṣṇa and try to understand it without personally motivated interpretations. The example of clear understanding is there in the *Bhagavad-gītā* itself, in the way the teaching is understood by Arjuna, who heard the *Gītā* directly from the Lord. If someone is fortunate enough to understand the *Bhagavad-gītā* in that line of disciplic succession, without motivated interpretation, then he surpasses all studies of Vedic wisdom, and all scriptures of the world. One will find in the *Bhagavad-gītā* all that is contained in other scriptures, but the reader will also find things which are not to be found elsewhere. That is the specific standard of the *Gītā.* It is the perfect theistic science because it is directly spoken by the Supreme Personality of Godhead, Lord Śrī Kṛṣṇa.

The topics discussed by Dhṛtarāṣṭra and Sañjaya, as described in the *Mahābhārata,* form the basic principle for this great philosophy. It is understood that this philosophy evolved on the Battlefield of Kurukṣetra, which is a sacred place of pilgrimage from the immemorial time of the Vedic age. It was spoken by the Lord when He was present personally on this planet for the guidance of mankind.

The word *dharma-kṣetra* (a place where religious rituals are performed) is significant because, on the Battlefield of Kurukṣetra, the Supreme Personality of Godhead was present on the side of Arjuna. Dhṛtarāṣṭra, the father of the Kurus, was highly doubtful about the possibility of his sons' ultimate victory. In his doubt, he inquired from his secretary Sañjaya, "What did they do?" He was confident that both his sons and the sons of his younger brother Pāṇḍu were assembled in that Field of Kurukṣetra for a determined engagement of the war. Still, his inquiry is significant. He did not want a compromise between the cousins and brothers, and he wanted to be sure of the fate of his sons on the battlefield. Because the battle was arranged to be fought at Kurukṣetra, which is mentioned elsewhere in the *Vedas* as a place of worship -- even for the denizens of heaven -- Dhṛtarāṣṭra became very fearful about the influence of the holy place on the outcome of the battle. He knew very well that this would influence Arjuna and the sons of Pāṇḍu favorably, because by nature they were all virtuous. Sañjaya was a student of Vyāsa, and therefore, by the mercy of Vyāsa, Sañjaya was able to envision the Battlefield of Kurukṣetra even while he was in the room of Dhṛtarāṣṭra. And so, Dhṛtarāṣṭra asked him about the situation on the battlefield.

Both the Pāṇḍavas and the sons of Dhṛtarāṣṭra belong to the same family, but Dhṛtarāṣṭra's mind is disclosed herein. He deliberately claimed only his sons as Kurus, and he separated the sons of Pāṇḍu from the family heritage. One can thus understand the specific position of Dhṛtarāṣṭra in his relationship with his nephews, the sons of Pāṇḍu. As in the paddy field the unnecessary plants are taken out, so it is expected from the very beginning of these topics that in the religious field of Kurukṣetra, where the father of religion, Śrī Kṛṣṇa, was present, the unwanted plants like Dhṛtarāṣṭra's son Duryodhana and others would be wiped out and the thoroughly religious persons, headed by Yudhiṣṭhira, would be established by the Lord. This is the significance of the words *dharma-kṣetre* and *kuru-kṣetre,* apart from their historical and Vedic importance.
`

export const lessonsFixtures: Lesson[] = [
  new Lesson(
    new UuidIdentity('f3d5c4a4-ef37-4a96-b9cd-68813c6e29aa'),
    courses[0].id,
    'ГЛАВА 1: Обзор армий на поле битвы Курукшетра',
    'Introduction to the course',
  ),
  new Lesson(
    new UuidIdentity('b3d5c4a4-ef37-4a96-b9cd-68813c6e29ab'),
    courses[0].id,
    'ГЛАВА 2: Краткое изложение «Бхагавад-гиты»',
    'Introduction to the course',
  ),
]


export const lessonSectionFixtures = [
  new LessonSection(
    new UuidIdentity('bafd8919-6a33-445d-b5a5-d10e57f60e72'),
    lessonsFixtures[0].id,
    'Видео',
    [
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
  ),
  new LessonSection(
    new UuidIdentity('2ea76f2e-4308-4d5f-bd9a-3503f7d76ec7'),
    lessonsFixtures[0].id,
    'BG 1.1',
    [
      {
        type: 'text',
        content: markdown
      }
    ]
  ),
  new LessonSection(
    new UuidIdentity('2ea76f2e-4308-4d5f-bd9a-3503f7d76ec8'),
    lessonsFixtures[0].id,
    'Тест',
    [
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
  ),
]


export const studentHomeworks = [
  new StudentHomework(
    new UuidIdentity('17a6a91a-4d6d-4d9c-a311-058d8bc0a200'),
    'a243727d-57ab-4595-ba17-69f3a0679bf6',
    lessonSectionFixtures[0].id,
    StudentHomeworkStatus.Open,
    'Посмотреть видео',
    [],
    AssessmentMethod.NotRequired
  ),
  new StudentHomework(
    new UuidIdentity('17a6a91a-4d6d-4d9c-a311-058d8bc0a201'),
    'a243727d-57ab-4595-ba17-69f3a0679bf6',
    lessonSectionFixtures[2].id,
    StudentHomeworkStatus.Open,
    'Завершить тест',
    [],
    AssessmentMethod.Teacher
  ),
  new StudentHomework(
    new UuidIdentity('17a6a91a-4d6d-4d9c-a311-058d8bc0a202'),
    'a243727d-57ab-4595-ba17-69f3a0679bf6',
    lessonSectionFixtures[1].id,
    StudentHomeworkStatus.Open,
    'Практическое задание',
    [],
    AssessmentMethod.Teacher
  ),
]
