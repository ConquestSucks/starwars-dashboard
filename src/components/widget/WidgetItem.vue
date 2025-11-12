<template>
  <CustomCard v-if="item.visibility" class="min-h-[216px]" :class="styles">
    <template #title>
      <div class="flex items-center gap-[17.5px]">
        <ToggleIcon class="text-blue-100 cursor-pointer" />
        <div class="flex items-center gap-1.5">
          {{ item.label }}
          <InfoIcon v-if="item.infoIcon" class="text-blue-100 cursor-pointer" />
        </div>
      </div>
      <CustomButton @click="toggle" aria-haspopup="true" aria-controls="overlay_menu">
        <MoreIcon class="text-blue-100 active:text-gray-600 cursor-pointer" />
      </CustomButton>
      <CustomMenu ref="menu" class="w-[166px] h-12 text-sm font-normal leading-3.5" pt:list="p-0 h-full"
        pt:item="h-full!" :popup="true" :model="items">
        <template #item="{ item }">
          <div
            class="flex items-center justify-center gap-2 h-12 w-full rounded-lg cursor-pointer hover:bg-gray-200 active:bg-blue-50">
            <EyeIcon class="text-blue-100" />
            <span>{{ item.label }}</span>
          </div>
        </template>
      </CustomMenu>
    </template>

    <template #content>
      <div v-if="loading">Загрузка данных</div>
      <div v-if="!loading && (item.data || item.chartType === 'part')" class="flex flex-col gap-4 mt-4">
        <WidgetColumnItem :key="index" v-for="(wi, index) in item.data" :item="wi" :moreGap="item.moreGap ?? false" />
      </div>
      <div v-if="!loading && item.chartType === 'part'" class="w-[calc(1074/1270*100%)]">
        <HorizontalStackChart />
      </div>
      <div v-if="!loading && !item.data && item.chartType === 'full'" class="w-[calc(1074/1270*100%)] grow">
        <HorizontalChart />
      </div>
    </template>
  </CustomCard>
</template>

<script setup lang="ts">
import ToggleIcon from '../icons/ToggleIcon.vue';
import InfoIcon from '../icons/InfoIcon.vue';
import MoreIcon from '../icons/MoreIcon.vue';
import EyeIcon from '../icons/EyeIcon.vue';
import WidgetColumnItem from './WidgetColumnItem.vue';
import HorizontalStackChart from '../charts/HorizontalStackChart.vue';
import HorizontalChart from '../charts/HorizontalChart.vue';

import { computed, ref, type VNodeRef } from 'vue';
import type { WidgetData } from '@/types';
import { useWidgetsStore } from '@/stores/widgets';

const props = defineProps<{ item: WidgetData, loading: boolean }>();

const widgetStore = useWidgetsStore()

const menu = ref<VNodeRef | undefined>(undefined);

const items = ref([
  {
    label: 'Скрыть виджет',
    command: () => {
      widgetStore.toggleVisibility(props.item.id)
    }
  }
]);

const styles = computed(() => {
  const t = props.item.chartType;
  if (!t) return '';
  if (t === 'part') return 'w-full min-h-[210px]';
  if (t === 'full') return 'w-full mb-[118px]';
  return '';
});

const toggle = (e: PointerEvent) => {
  menu.value.toggle(e)
}

</script>

<style scoped></style>
