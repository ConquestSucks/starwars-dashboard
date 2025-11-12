<template>
  <div :class="['flex flex-col min-h-14', moreGap ? 'gap-2' : 'gap-1']">
    <span class="text-gray-600 leading-4">{{ item.label }}</span>
    <div class="flex gap-2">
      <span v-if="item.value" class="text-[32px] leading-8">{{ item.value }}</span>
      <span v-if="item.percantage" :class="['font-semibold', COLOR_TEXT_TW_KEYS[item.percantage.color]]">{{
        item.percantage.value }}
        %</span>
    </div>
  </div>
</template>

<script setup lang="ts">

import { COLOR_TEXT_TW_KEYS } from '@/constants';
import type { WidgetColumnItemData } from '@/types';

defineProps<{
  item: WidgetColumnItemData;
  moreGap: boolean;
}>();

</script>

<style scoped></style>
