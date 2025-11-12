import { ref } from 'vue'
import { defineStore } from 'pinia'
import { fetchFilms } from '@/api';
import type { Film } from '@/types';

export const useFilmStore = defineStore('films', () => {
  const films = ref<Film[]>([]);
  const selectedFilm = ref<Film | null>(null)
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function loadFilms() {
    if (films.value.length) return;
    loading.value = true;
    error.value = null;

    try {
      const data = await fetchFilms();
      films.value = data
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
      } else {
        console.error("An unknown error occurred:", error);
      }
    } finally {
      loading.value = false;
    }
  }

  return { films, selectedFilm, loadFilms, loading, error }
})
