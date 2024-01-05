import { UuidIdentity } from '@framework/domain'
import { Course, Group, Enrollment, EnrollmentStatus } from '@/education'

export const courses: Course[] = [
  new Course(
    new UuidIdentity('19c4dd82-c6ac-4772-8c9d-6bdebf5a538f'),
    'Пранама-мантра',
    'Курс для получения пранама-мантры',
    'Если вы хотите принять прибежище у Е.С. Бхакти Чайтанья Свами Махараджа, тогда вам необходимо ознакомиться с его требованиями к кандидатам на получение пранама-мантры и пройти данный курс',
    'https://sun9-80.userapi.com/impf/c840438/v840438487/1b36/0KaFwO7dpco.jpg?size=604x380&quality=96&sign=17a0e7c4e5233288c66b5c9172801240&type=album'
  ),
  new Course(
    new UuidIdentity(),
    'Первое посвящение',
    '',
    'First Initiation',
    'https://back2godhead.com/wp-content/uploads/2012/11/099_1975_10-02-27.jpg'
  ),
  new Course(
    new UuidIdentity(),
    'Второе посвящение',
    '',
    'Second initiation',
    'https://girirajswami.com/blog/wp-content/uploads/2012/07/SP_init.jpg'
  ),
  new Course(
    new UuidIdentity(),
    'Поклонение Божествам',
    '',
    'Archana',
    'https://sastracaksu.nlitn.in/wp-content/uploads/2018/02/Srila-Prabhupada-Praying-to-Radha-Krishna-Deities.jpg'
  ),
  new Course(
    new UuidIdentity(),
    'Бхактивайбхава',
    '',
    'Bhakti-vaibhava',
    'https://prabhupadabooks.com/images/bhagavatam_big.jpg'
  ),
]


export const groupsFixtures: Group[] = [
  new Group(
    new UuidIdentity(),
    courses[0].id,
    'Группа для матаджи',
    'Ямуна дд',
    'https://i.pravatar.cc/150?img=5',
    17039772
  ),
  new Group(
    new UuidIdentity(),
    courses[0].id,
    'Группа для прабху',
    'Кришна дас',
    'https://i.pravatar.cc/150?img=7',
    17039772
  ),
  new Group(
    new UuidIdentity(),
    courses[0].id,
    'Группа 108',
    'Радха дд',
    'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    17139772
  ),
  new Group(
    new UuidIdentity(),
    courses[1].id,
    'Группа 16108',
    'Радха дд',
    'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    17139772
  )
]


export const EnrollmentsFixtures: Enrollment[] = [
  new Enrollment(
    new UuidIdentity(),
    'a243727d-57ab-4595-ba17-69f3a0679bf6',
    groupsFixtures[0].id,
    EnrollmentStatus.Pending
  ),
  new Enrollment(
    new UuidIdentity(),
    '952ae116-1669-49e9-9e39-47a13104e475',
    groupsFixtures[1].id,
    EnrollmentStatus.InReview
  ),
]
