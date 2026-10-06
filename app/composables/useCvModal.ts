import { ref } from 'vue'

const isCvModalOpen = ref(false)

export const useCvModal = () => {
  const openCvModal = () => {
    isCvModalOpen.value = true
  }

  const closeCvModal = () => {
    isCvModalOpen.value = false
  }

  return {
    isCvModalOpen,
    openCvModal,
    closeCvModal,
  }
}
