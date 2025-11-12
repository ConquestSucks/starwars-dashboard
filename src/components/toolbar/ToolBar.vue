<template>
  <div class="flex gap-3">
    <FilmSelect />
    <SettingsMenu :items />
  </div>
</template>

<script setup lang="ts">
import SettingsMenu from './settings/SettingsMenu.vue';
import type { WidgetData } from '@/types';
import FilmSelect from './FilmSelect.vue';

defineProps<{ items: WidgetData[] }>()
</script>

<style scoped></style>
