
<template>
  <PageWithHeaderLayout
    :title="$t('downloading-queue')"
    :has-padding="true"
    :has-data="true"
  >
    <IonList>
      <IonItem
        v-for="item in downloaderQueue.queue.value"
        :key="item.url"
      >
        <IonLabel>
          <h2>{{ item.title || $t('unknown-file') }}</h2>
          <p>{{ item.url }}</p>
        </IonLabel>
      </IonItem>
    </IonList>
  </PageWithHeaderLayout>
</template>

<script lang="ts" setup>
import { PageWithHeaderLayout, useDownloaderQueue } from '@classroom/app/shared'
import { IonItem, IonList, IonLabel } from '@ionic/vue'

/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const downloaderQueue = useDownloaderQueue()
</script>


<fluent locale="en">
downloading-queue = Downloading
unknown-file = Unknown file
</fluent>

<fluent locale="ru">
downloading-queue = Загрузка
unknown-file = Неизвестный файл
</fluent>