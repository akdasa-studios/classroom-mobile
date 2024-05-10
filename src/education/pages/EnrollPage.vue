<template>
  <PageWithHeaderLayout
    :title="$t('enroll')"
    :has-padding="true"
    :has-data="isReady"
  >
    <!-- Select group -->
    <IonList>
      <IonItem lines="none">
        <IonLabel>
          <h2>{{ $t('group') }}</h2>
          <p>{{ $t('select-group') }}</p>
        </IonLabel>
      </IonItem>
      <GroupSelector
        v-model="groupId"
        :groups="groups"
      />
    </IonList>

    <!-- Select time -->
    <IonList>
      <IonItem lines="none">
        <IonLabel>
          <h2>{{ $t('time') }}</h2>
          <p>{{ $t('select-time') }}</p>
        </IonLabel>
      </IonItem>
      <TimeRangeSelector
        v-model="timeRanges"
        :presets="timeRangePresets"
        custom-preset-text="Свой вариант"
        add-range-text="Добавить"
      />
    </IonList>

    <!-- Comments -->
    <IonList>
      <IonItem lines="none">
        <IonLabel>
          <h2>{{ $t('comments') }}</h2>
          <p>{{ $t('comments-to-join') }}</p>
        </IonLabel>
      </IonItem>
      <IonItem lines="none">
        <IonTextarea
          v-model="comments"
          aria-label="Comments"
        />
      </IonItem>
    </IonList>

    <!-- Enroll -->
    <AsyncButton
      :busy="false"
      expand="block"
      @click="onEnrollButtonClicked"
    >
      {{ $t("enroll") }}
    </AsyncButton>
  </PageWithHeaderLayout>
</template>


<script setup lang="ts">
import { useAsyncState } from '@vueuse/core'
import { ref } from 'vue'
import { IonTextarea, IonItem, IonLabel, IonList,  useIonRouter } from '@ionic/vue'
import { PageWithHeaderLayout, AsyncButton } from '@/shared'
import {
  GroupSelector, TimeRangeSelector, TimeRange, TimeRangePreset,
  FetchActiveGroupsOfCourse, Repositories
} from '@/education'
import { v4 } from 'uuid'

// --- Interface -------------------------------------------------------------
const props = defineProps<{
  courseId: string
}>()

// --- Interface -------------------------------------------------------------
const router = useIonRouter()
const userId = 'a243727d-57ab-4595-ba17-69f3a0679bf6'


// --- State -----------------------------------------------------------------
const timeRangePresets: TimeRangePreset[] = [
  { name: 'Выходные до 11 утра',    range: { start: [6, 0],  end: [11, 0], days: [6,7] } },
  { name: 'Будние дни до 9:00',     range: { start: [6, 0],  end: [9, 0],  days: [1,2,3,4,5] } },
  { name: 'Будние дни после 18:00', range: { start: [18, 0], end: [21, 0], days: [1,2,3,4,5] } },
  { name: 'Любое время ',           range: { start: [0, 0],  end: [24, 0], days: [1,2,3,4,5,6,7] } },
]

const { state: groups, isReady } = useAsyncState(async () => await FetchActiveGroupsOfCourse(props.courseId), [])
const groupId = ref('')
const timeRanges = ref<TimeRange[]>([])
const comments = ref('')

// --- Handlers --------------------------------------------------------------
async function onEnrollButtonClicked() {
  await Repositories.Enrollments.save({
    _id: v4(),
    userId: userId,
    groupId: groupId.value,
    courseId: props.courseId,
    status: 'not-submitted',
  })

  router.navigate({ name: 'enroll-completed' }, 'none', 'pop')
}
</script>


<fluent locale="en">
enroll = Enroll
group = Group
select-group = Select group to join
comments = Comments
comments-to-join = Leave a comment if necessary
time = Time
select-time = Select time
enrollment-request-submited = The enrolment request has been submitted
</fluent>