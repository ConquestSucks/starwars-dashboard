<template>
  <div
    class="w-full flex items-center justify-between border-b border-gray-400 px-4 h-12 select-none cursor-pointer hover:bg-blue-50 active:bg-gray-200"
    :class="bgClass" @click.stop="handleClick">
    <div class="flex gap-1 items-center">
      <span>{{ item.label }}</span>
      <InfoIcon v-if="item.infoIcon" />
    </div>
    <EyeIcon :class="iconClass" />
  </div>
</template>

<script setup lang="ts">
import InfoIcon from '@/components/icons/InfoIcon.vue';
import EyeIcon from '@/components/icons/EyeIcon.vue';
import { computed } from 'vue';
import type { WidgetData } from '@/types';

const props = defineProps<{
  item: WidgetData,
  checked: boolean
}>();

const emits = defineEmits<{
  (e: 'toggle', id: number): void
}>();

const bgClass = computed(() => props.checked ? '' : 'bg-gray-200');
const iconClass = computed(() => props.checked ? 'text-blue-100' : 'text-gray-600');

const handleClick = () => {
  emits('toggle', props.item.id);
}
</script>

<style scoped></style>
