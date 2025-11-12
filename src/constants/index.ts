import type { MyChart } from "@/types";

const COLOR_TEXT_TW_KEYS = {
  "orange-70": "text-orange-70",
  "green-70": "text-green-70",
  "blue-70": "text-blue-70",
  "yellow-70": "text-yellow-70",
} as const;

const COLOR_BG_KEYS_TW = {
  "orange-70": "bg-orange-70",
  "yellow-70": "bg-yellow-70",
} as const;

const COLOR_KEYS_CSS = {
  "orange-70": "#F96E1A",
  "yellow-70": "#F7BC19",
  "blue-80": "#3379E2",
  "black": "#121216",
  'white': "#FAFAFA",
  "gray-600": "#8E8E93"
} as const;

const OPTION_LABELS: Record<string, string> = {
  "A New Hope": "Новая надежда",
  "The Empire Strikes Back": "Империя наносит ответный удар",
  "Return of the Jedi": "Возвращение Джедая",
  "The Phantom Menace": "Скрытая угроза",
  "Attack of the Clones": "Атака клонов",
  "Revenge of the Sith": "Месть ситхов"
};

const HORIZONTAL_STACK_CHART_DATA_PART = {
  stack: 'Stack 0',
  barThickness: 48,
  maxBarThickness: 48,
  datalabels: {
    anchor: 'start',
    align: 'end',
    offset: 16,
    color: COLOR_KEYS_CSS['black'],
    font: {
      family: "MuseoSansCyrl",
      size: 16,
      weight: 600
    },
    formatter: (value: number) => `${value}%`
  },
}

const HORIZONTAL_STACK_CHART_DATA: MyChart = {
  labels: ['Всего', 'В фильме'],
  datasets: [
    {
      label: 'Кораблей класса Starfighter',
      backgroundColor: COLOR_KEYS_CSS['orange-70'],
      data: [],
      counts: [],
      backgroundColorClass: COLOR_BG_KEYS_TW['orange-70'],
      ...HORIZONTAL_STACK_CHART_DATA_PART
    },
    {
      label: 'Остальных',
      backgroundColor: COLOR_KEYS_CSS['yellow-70'],
      data: [],
      counts: [],
      backgroundColorClass: COLOR_BG_KEYS_TW['yellow-70'],
      ...HORIZONTAL_STACK_CHART_DATA_PART
    }
  ]
}

const HORIZONTAL_CHART_DATA_PART = {
  datalabels: {
    anchor: 'end',
    align: 'right',
    offset: 4,
    color: COLOR_KEYS_CSS['black'],
    font: {
      family: "MuseoSansCyrl",
      size: 14,
      weight: 600
    },
  },
}

const HORIZONTAL_CHART_DATA: MyChart = {
  labels: ['Starfighter', 'Yacht'],
  datasets: [
    {
      label: 'Кораблей класса',
      backgroundColor: COLOR_KEYS_CSS['blue-80'],
      data: [],
      counts: [],
      backgroundColorClass: COLOR_BG_KEYS_TW['orange-70'],
      barThickness: 12,
      maxBarThickness: 12,
      ...HORIZONTAL_CHART_DATA_PART
    }
  ]
}

export { COLOR_TEXT_TW_KEYS, COLOR_BG_KEYS_TW, COLOR_KEYS_CSS, OPTION_LABELS, HORIZONTAL_STACK_CHART_DATA, HORIZONTAL_CHART_DATA }
