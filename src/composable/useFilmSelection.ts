import { useEntitiesStore } from '@/stores/entities';
import { useChartStore } from '@/stores/charts';
import { useWidgetsStore } from '@/stores/widgets';
import type { Film } from '@/types';
import { convertToRoman } from '@/utils/convertToRoman';
import { OPTION_LABELS } from '@/constants';
import { storeToRefs } from 'pinia';

export function useFilmSelection() {
  const entitiesStore = useEntitiesStore();
  const chartStore = useChartStore();
  const widgetStore = useWidgetsStore();

  const { horizontalStackChartData, horizontalChartData } = storeToRefs(chartStore)

  const round = (v: number, digits = 1) => Math.round(v * 10 ** digits) / 10;

  const selectFilm = async (film: Film) => {
    await entitiesStore.loadForFilm(film);

    const stats = entitiesStore.lastStarshipStats;

    const sfPctFilm = stats?.pctFilmStarfighter ?? 0;
    const sfPctTotal = stats?.pctTotalStarfighter ?? 0;
    const othersPctFilm = round(100 - sfPctFilm);
    const othersPctTotal = round(100 - sfPctTotal);

    const percentArrays = [
      [round(sfPctTotal), round(sfPctFilm)],
      [round(othersPctTotal), round(othersPctFilm)],
    ];

    const sfInFilm = stats?.inFilmStarfighters ?? 0;
    const sfTotal = stats?.totalStarfighters ?? 0;
    const otherInFilm = stats?.otherInFilm ?? 0;
    const otherTotal = stats?.otherTotal ?? 0;

    const countArrays = [
      [sfTotal, sfInFilm],
      [otherTotal, otherInFilm],
    ];

    chartStore.updateChart(horizontalStackChartData, percentArrays, countArrays);

    const entries: [string, number][] = Object.entries(stats?.byClassInFilm ?? {});
    entries.sort((a, b) => b[1] - a[1]);

    const labels = entries.map(e => e[0]);
    const values = entries.map(e => e[1]);

    chartStore.updateChart(horizontalChartData, [values], countArrays, labels);

    widgetStore.init();
  };

  const formatLabel = (label: { episode_id: number; title: string }) => {
    return `${convertToRoman(label.episode_id)}: ${OPTION_LABELS[label.title]}`;
  };

  return { selectFilm, formatLabel };
}
