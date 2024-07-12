import { Network } from '@capacitor/network'
import { ref } from 'vue'

/* -------------------------------------------------------------------------- */
/*                                Global State                                */
/* -------------------------------------------------------------------------- */

const connected = ref(true)


/* -------------------------------------------------------------------------- */
/*                               Global Handlers                              */
/* -------------------------------------------------------------------------- */

Network.addListener('networkStatusChange', status => {
  connected.value = status.connected
})


/* -------------------------------------------------------------------------- */
/*                                 Composable                                 */
/* -------------------------------------------------------------------------- */

export function useNetworkStatus() {
  return { connected }
}
