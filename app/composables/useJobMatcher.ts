import { ref } from 'vue'

const isJobMatcherOpen = ref(false)
const initialJobPreset = ref('')

export const useJobMatcher = () => {
  const openJobMatcher = (preset = '') => {
    initialJobPreset.value = preset
    isJobMatcherOpen.value = true
  }

  const closeJobMatcher = () => {
    isJobMatcherOpen.value = false
  }

  return {
    isJobMatcherOpen,
    initialJobPreset,
    openJobMatcher,
    closeJobMatcher,
  }
}
