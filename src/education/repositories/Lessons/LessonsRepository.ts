import { LessonSection } from './../../aggregates/LessonSection'
import { Lesson } from '@/education'
import { CacheRepository, RestRepository } from '@/shared'
import { lessonSectionFixtures, lessonsFixtures } from '@/shared/fixtures'


export const CacheLessonsRepository  = new CacheRepository<Lesson>()
export const RemoteLessonsRepository = new RestRepository<Lesson>(lessonsFixtures)

export const CacheLessonSectionsRepository  = new CacheRepository<LessonSection>()
export const RemoteLessonSectionssRepository = new RestRepository<LessonSection>(lessonSectionFixtures)