import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAppStore = defineStore('app', () => {
  const activeId = ref('home');

  function setActiveId(id: string) {
    activeId.value = id;
  }

  return {
    activeId,
    setActiveId,
  };
});
