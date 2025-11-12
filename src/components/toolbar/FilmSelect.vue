<template>
  <CustomSelect class="w-[352px]" placeholder="Все фильмы вселенной Star Wars" filter
    emptyFilterMessage="Ничего не найдено" :emptyMessage="error ?? 'Тут пока что пусто'"
    filterPlaceholder="Поиск по списку" :options="films" :optionLabel="formatLabel" :loading="loading" @show="loadFilms"
    @change="onSelectFilm">
    <template #option="slotProps">
      <span class="flex items-center h-10 pl-4 py-3 leading-4 cursor-pointer rounded-lg hover:bg-gray-200">
        {{ formatLabel(slotProps.option) }}
      </span>
    </template>
  </CustomSelect>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useFilmStore } from '@/stores/films';
import { useFilmSelection } from '@/composable/useFilmSelection';
import type { Film } from '@/types';

const filmStore = useFilmStore();
const { films, loading, error } = storeToRefs(filmStore);

const { selectFilm, formatLabel } = useFilmSelection();

const loadFilms = async () => {
  await filmStore.loadFilms();
}

const onSelectFilm = async (event: { value: object }) => {
  await selectFilm(event.value as Film);
}
</script>
