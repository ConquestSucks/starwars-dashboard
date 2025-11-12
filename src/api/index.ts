import type { Film, SWAPIResponse } from "@/types";
import { api } from "./baseApi";

export async function fetchAllPages<T>(path: string): Promise<T[]> {
  const all: T[] = [];
  let next: string | null = path;

  while (next) {
    const data: SWAPIResponse<T> = await api.get<SWAPIResponse<T>>(next);
    all.push(...(data.results || []));
    next = data.next ? data.next.replace('https://swapi.dev/api/', '') : null;
  }

  return all;
}

export async function fetchCount(path: string): Promise<number> {
  const data = await api.get<SWAPIResponse>(path);
  return data.count;
}

export async function fetchFilms(): Promise<Film[]> {
  const data = await api.get<SWAPIResponse<Film>>('films');
  return (data.results || []).sort((a, b) => (a.episode_id ?? 0) - (b.episode_id ?? 0));
}

