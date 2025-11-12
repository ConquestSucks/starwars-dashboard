<template>
  <div>
    <CustomButton type="button" icon="pi pi-cog" aria-haspopup="true" @click="toggle"
      :disabled="widgetStore.isInitialized ? false : true" aria-controls="overlay_menu"
      class="w-[150px] h-11 px-5 text-blue-100 font-semibold bg-white rounded-lg active:text-gray-600 disabled:text-gray-200 ">
      <GearIcon />
      Настройки
    </CustomButton>
    <CustomMenu ref="menu" :model="items" :popup="true" class="w-75.5 bg-white top-27.5!">
      <template #item="{ item }">
        <SettingsMenuItem :item :checked="localVisibility[item.id] ?? false" @toggle="handleItemToggle" />
      </template>
      <template #end>
        <div class="px-3 pb-4">
          <CustomButton label="Применить" class="w-[278px] h-13 bg-blue-100 rounded-lg text-white font-semibold"
            @click="applyAndClose" />
        </div>
      </template>
    </CustomMenu>
  </div>
</template>

<script setup lang="ts">
import GearIcon from '@/components/icons/GearIcon.vue';
import SettingsMenuItem from './SettingsMenuItem.vue';

import { ref, type VNodeRef } from 'vue';
import { useWidgetsStore } from '@/stores/widgets';
import type { WidgetData } from '@/types';

const widgetStore = useWidgetsStore()

const props = defineProps<{ items: WidgetData[] }>()
const menu = ref<VNodeRef | undefined>(undefined);

const localVisibility = ref<Record<number, boolean>>({});

const initLocalVisibility = () => {
  const map: Record<number, boolean> = {};
  props.items.forEach(it => {
    const storeItem = widgetStore.items.find(w => w.id === it.id);
    map[it.id] = storeItem ? !!storeItem.visibility : !!it.visibility;
  });
  localVisibility.value = map;
};

const toggle = (e: PointerEvent) => {
  initLocalVisibility();
  menu.value.toggle(e);
};

const handleItemToggle = (id: number) => {
  localVisibility.value = { ...localVisibility.value, [id]: !localVisibility.value[id] };
};

const applyAndClose = (e: PointerEvent) => {
  props.items.forEach(item => {
    const widgetStoreItem = widgetStore.items.find(w => w.id === item.id);
    if (widgetStoreItem) {
      widgetStoreItem.visibility = !!localVisibility.value[item.id];
    }
  });
  if (menu.value) menu.value.hide(e);
};

</script>

<style scoped></style>
