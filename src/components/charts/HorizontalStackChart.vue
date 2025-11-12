<template>
  <div v-if="horizontalStackChartData" class="flex flex-col">
    <CustomChart ref="chartRef" type="bar" :data="horizontalStackChartData" :options="chartOptions"
      class="h-36 w-full" />
    <div class="flex gap-8 justify-center">
      <div v-for="dataset in horizontalStackChartData.datasets" :key="dataset.label" class="flex items-center gap-2">
        <div class="rounded-full w-2.5 h-2.5" :class="dataset.backgroundColorClass"></div>
        <span class="text-base font-normal">{{ dataset.label }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useChartStore } from '@/stores/charts';
import { Chart } from 'chart.js';
import { horizontalStackChartOptions } from '@/config/chartsOptions';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(ChartDataLabels);

const chartStore = useChartStore()

const { horizontalStackChartData } = storeToRefs(chartStore)

const chartOptions = ref(horizontalStackChartOptions);

const chartRef = ref(null);

</script>
