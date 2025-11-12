import type { COLOR_TEXT_TW_KEYS } from "@/constants";

type ColorKey = keyof typeof COLOR_TEXT_TW_KEYS;

type WidgetColumnItemData = {
  label: string;
  value: number;
  percantage?: {
    value: number;
    color: ColorKey;
  };
};

type MyChart = {
  labels: string[];
  datasets: Dataset[]
}

type Dataset = {
  data: number[];
  counts?: number[];
  label: string;
  [key: string]: unknown;
}

type WidgetData = {
  id: number;
  label: string;
  infoIcon: boolean;
  data?: WidgetColumnItemData[];
  moreGap?: boolean;
  chartType?: "none" | "part" | "full" | undefined;
  visibility: boolean;
};

type SWAPIResponse<T = unknown> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

type Film = {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  created: string;
  edited: string;
  url: string;
}

type Starship = {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  hyperdrive_rating: string;
  MGLT: string;
  starship_class: string;
  pilots: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
};

export type { WidgetColumnItemData, WidgetData, ColorKey, Film, Starship, SWAPIResponse, Dataset, MyChart };
