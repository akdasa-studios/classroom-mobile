<template>
  <ion-page class="ion-padding">
    <div class="top">
      Welcome
    </div>
    <div class="email">
      <ion-input
        v-model="name"
        placeholder="Name"
      />
    </div>
    <div class="bottom">
      <!-- <async-button
        expand="block"
        :progress="signUpTask"
        @click="onSignUpButtonClicked"
      >
        Register
      </async-button> -->
    </div>
  </ion-page>
</template>


<script lang="ts" setup>
import { ref } from 'vue';
import { IonPage, IonInput } from '@ionic/vue'
// import { SignUpTask } from '../services/SignUpService';

/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

// const signUpTask = new SignUpTask()

/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const name = ref()


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

// function onSignUpButtonClicked() {
// }

</script>