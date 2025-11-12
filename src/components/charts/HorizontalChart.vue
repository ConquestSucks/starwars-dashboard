<template>
  <CustomChart type="bar" :data="horizontalChartData" :options="chartOptions" class="h-[300px] w-full" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useChartStore } from '@/stores/charts';
import { horizontalChartOptions } from '@/config/chartsOptions';

const chartStore = useChartStore()

const { horizontalChartData } = storeToRefs(chartStore)

const chartOptions = ref(horizontalChartOptions);

</script>
