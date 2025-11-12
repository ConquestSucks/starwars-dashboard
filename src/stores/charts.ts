import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { HORIZONTAL_CHART_DATA, HORIZONTAL_STACK_CHART_DATA } from '@/constants';
import type { Dataset, MyChart } from '@/types';

export const useChartStore = defineStore('charts', () => {
  const horizontalStackChartData = ref<MyChart>(HORIZONTAL_STACK_CHART_DATA);
  const horizontalChartData = ref<MyChart>(HORIZONTAL_CHART_DATA);

  const updateChart = (chartData: Ref<MyChart>, data: Array<number[]>, counts: Array<number[]>, labels?: string[]) => {
    chartData.value = {
      ...chartData.value,
      labels: labels ?? [...chartData.value.labels],
      datasets:
        updateDataSets(chartData.value.datasets, data, counts)
    }
  }

  const updateDataSets = (oldDatasets: Dataset[], data: Array<number[]>, counts: Array<number[]>) => {
    return oldDatasets.map((dataset: Dataset, index) => {
      if (data[index]) {
        return { ...dataset, data: data[index], counts: counts[index] };
      }
      return dataset;
    })
  }
  return { horizontalStackChartData, horizontalChartData, updateChart }
})
