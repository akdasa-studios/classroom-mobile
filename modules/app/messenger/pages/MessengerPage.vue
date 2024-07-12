<template>
  <PageWithHeaderLayout
    title="Messenger"
    :has-data="true"
    :has-padding="true"
  >
    <div class="chat-list">
      <div
        v-for="item, idx in messages"
        :key="idx"
        class="chat-item"
        :class="{'chat-item-sender': item.isSender}"
      >
        <div class="chat-timestamp">
          {{ item.timestamp }}
        </div>

        <div class="chat-item-content">
          <div
            v-if="!item.isSender"
            class="chat-avatar"
          >
            <ion-avatar class="avatar-sm">
              <img :src="item.avatar">
            </ion-avatar>
          </div>

          <div
            class="chat-item-bubble"
            :class="{'bubble-image': item.type === 'image'}"
          >
            <div
              v-if="item.type !== 'image'"
              class="chat-body"
              v-html="item.body"
            />
            <img
              v-if="item.type === 'image'"
              :src="item.body"
            >
          </div>

          <div
            v-if="!item.isSender && item.type === 'image'"
            class="chat-item-reaction"
          >
            <ion-icon name="share-outline" />
          </div>
        </div>

        <div
          v-if="item.isSender"
          class="chat-item-status"
        >
          Seen
        </div>
      </div>
    </div>
  </PageWithHeaderLayout>
</template>


<script setup lang="ts">
import { PageWithHeaderLayout } from '@classroom/app/shared'

const messages = [
      {
        isSender: false,
        avatar: 'https://api.multiavatar.com/Binx Bond.png',
        type: 'text',// text || image
        body: 'Hey yo what\'s up?',
        timestamp: 'May 2, 2020 9:48 AM'
      },
      {
        isSender: true,
        type: 'image',// text || image
        body: 'https://media.giphy.com/media/1g0Nz8xkYaqiBBYyLe/giphy.gif',
        timestamp: 'May 2, 2020 9:50 AM'
      },
      {
        isSender: false,
        avatar: 'https://api.multiavatar.com/Binx Bond.png',
        type: 'image',// text || image
        body: 'https://media.giphy.com/media/4BWByhavc3Hr2/giphy.gif',
        timestamp: 'May 2, 2020 9:52 AM'
      },
      {
        isSender: true,
        type: 'text',// text || image
        body: 'Where are you, buddy?',
        timestamp: 'May 2, 2020 9:53 AM'
      },
      {
        isSender: false,
        avatar: 'https://api.multiavatar.com/Binx Bond.png',
        type: 'text',// text || image
        body: 'I\'m almost there',
        timestamp: 'May 2, 2020 9:53 AM'
      }
    ]

</script>


<style scoped>
/* https://github.com/mrhieu/ionic-messenger/tree/master */
.chat-list .chat-item {
  margin-bottom: 8px;
}
.chat-list .chat-item.chat-item-sender {
  text-align: right;
}
.chat-list .chat-item.chat-item-sender .chat-item-content {
  justify-content: flex-end;
}
.chat-list .chat-item.chat-item-sender .chat-body {
  color: #fff;
  background: var(--ion-color-primary);
  border-radius: 20px;
  border-color: transparent;
}
.chat-list .chat-timestamp {
  text-align: center;
  font-size: 13px;
  padding: 8px;
  color: var(--ion-color-medium);
  text-transform: uppercase;
}
.chat-list .chat-item-status {
  font-size: 13px;
  color: var(--ion-color-medium);
  margin-right: 8px;
}
.chat-list .chat-item-content {
  display: flex;
  flex-direction: row;
  margin-bottom: 4px;
}
.chat-list .chat-item-content .chat-avatar {
  margin-right: 8px;
  align-self: flex-end;
}
.chat-list .chat-item-content .chat-avatar img {
  display: inline-block;
  width: 100%;
  border-radius: 50%;
}
.chat-list .chat-item-bubble {
  position: relative;
  max-width: 75%;
}
.chat-list .chat-item-bubble .chat-body {
  display: inline-block;
  background: var(--ion-color-light);
  border-radius: 20px;
  padding: 12px 16px;
  white-space: normal;
  max-width: 100%;
  text-align: left;
}
.chat-list .chat-item-bubble.bubble-image {
  font-size: 0;
}
.chat-list .chat-item-bubble.bubble-image img {
  width: 100%;
  max-width: 480px;
  border-radius: 16px;
}
.chat-list .chat-item-reaction {
  text-align: left;
  margin-left: 8px;
  font-size: 18px;
  align-self: center;
  flex-grow: 99;
}
</style>