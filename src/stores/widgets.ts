import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { useEntitiesStore } from "@/stores/entities";
import type { WidgetData } from "@/types";
import { getPercantage } from "@/utils/getPercantage";

export const useWidgetsStore = defineStore("widgets", () => {
  const entitiesStore = useEntitiesStore();

  const items = ref<WidgetData[]>([]);
  const isInitialized = ref(false)

  const buildItems = (): WidgetData[] => {
    const filmCounts = entitiesStore.lastStarshipStats?.filmCounts ?? {
      planets: 0,
      people: 0,
      vehicles: 0,
      species: 0,
    };

    const oldVisibilityMap = items.value.reduce<Record<number, boolean>>((acc, w) => {
      acc[w.id] = w.visibility;
      return acc;
    }, {});

    const newItems: WidgetData[] = [
      {
        id: 0,
        label: "Планеты",
        infoIcon: true,
        data: [
          { label: "Всего планет", value: entitiesStore.totalPlanetsCount },
          {
            label: "Планет в фильме",
            value: filmCounts.planets ?? 0,
            percantage: {
              value: getPercantage(filmCounts.planets ?? 0, entitiesStore.totalPlanetsCount),
              color: "orange-70",
            },
          },
        ],
        moreGap: true,
        visibility: oldVisibilityMap[0] ?? true,
      },
      {
        id: 1,
        label: "Персонажей",
        infoIcon: true,
        data: [
          { label: "Всего персонажей", value: entitiesStore.totalPeopleCount },
          {
            label: "Персонажей в фильме",
            value: filmCounts.people ?? 0,
            percantage: {
              value: getPercantage(filmCounts.people ?? 0, entitiesStore.totalPeopleCount),
              color: "green-70",
            },
          },
        ],
        moreGap: true,
        visibility: oldVisibilityMap[1] ?? true,
      },
      {
        id: 2,
        label: "Транспортные средства",
        infoIcon: true,
        data: [
          { label: "Всего транспортных средств", value: entitiesStore.totalVehiclesCount },
          {
            label: "Транспортных средств в фильме",
            value: filmCounts.vehicles ?? 0,
            percantage: {
              value: getPercantage(filmCounts.vehicles ?? 0, entitiesStore.totalVehiclesCount),
              color: "yellow-70",
            },
          },
        ],
        moreGap: true,
        visibility: oldVisibilityMap[2] ?? true,
      },
      {
        id: 3,
        label: "Видов существ",
        infoIcon: true,
        data: [
          { label: "Всего видов существ", value: entitiesStore.totalSpeciesCount },
          {
            label: "Видов существ в фильме",
            value: filmCounts.species ?? 0,
            percantage: {
              value: getPercantage(filmCounts.species ?? 0, entitiesStore.totalSpeciesCount),
              color: "blue-70",
            },
          },
        ],
        moreGap: true,
        visibility: oldVisibilityMap[3] ?? true,
      },
      {
        id: 4,
        label: "Корабли",
        infoIcon: true,
        data: [
          { label: "Всего", value: entitiesStore.totalStarshipsCount },
          { label: "В фильме", value: entitiesStore.lastStarshipStats?.inFilm ?? 0 },
        ],
        chartType: "part",
        visibility: oldVisibilityMap[4] ?? true,
      },
      {
        id: 5,
        label: "Корабли по классам",
        infoIcon: true,
        visibility: oldVisibilityMap[5] ?? true,
        chartType: "full",
      },
    ];

    return newItems;
  };

  const init = () => {
    items.value = buildItems();
    isInitialized.value = true;
  };

  watch(
    () => [
      entitiesStore.lastStarshipStats,
      entitiesStore.totalPlanetsCount,
      entitiesStore.totalPeopleCount,
      entitiesStore.totalVehiclesCount,
      entitiesStore.totalSpeciesCount,
      entitiesStore.totalStarshipsCount,
    ],
    () => {
      items.value = buildItems();
    },
    { immediate: true }
  );

  const toggleVisibility = (id: number) => {
    const widget = items.value.find((w) => w.id === id);
    if (widget) {
      widget.visibility = !widget.visibility;
    }
  };

  return { init, items, isInitialized, toggleVisibility };
});
