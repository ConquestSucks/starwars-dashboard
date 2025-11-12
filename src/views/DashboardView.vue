<template>
  <div class="flex flex-col gap-4 h-screen px-14 py-14.5 ">
    <Toolbar :items />
    <div v-if="isInitialized" class="flex gap-1 flex-wrap">
      <WidgetItem :key="index" v-for="(item, index) in items" :item :loading />
    </div>
    <div v-else class="flex grow items-center justify-center text-4xl">
      <h1 v-if="loading">Загрузка</h1>
      <h1 v-else>Выберите фильм</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import Toolbar from '@/components/toolbar/ToolBar.vue';
import WidgetItem from '@/components/widget/WidgetItem.vue';

import { useEntitiesStore } from '@/stores/entities';
import { useWidgetsStore } from '@/stores/widgets';

import { storeToRefs } from 'pinia';

const entitiesStore = useEntitiesStore()
const widgetStore = useWidgetsStore()

const { loading } = storeToRefs(entitiesStore);
const { items, isInitialized } = storeToRefs(widgetStore)

</script>

<style scoped></style>
