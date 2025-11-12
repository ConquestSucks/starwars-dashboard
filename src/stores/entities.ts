import { ref } from 'vue';
import { defineStore } from 'pinia';
import { computeStarshipStats } from '@/utils/stats';
import { fetchAllPages, fetchCount } from '@/api';
import type { Film, Starship } from '@/types';

export interface FilmCounts {
  planets: number;
  people: number;
  vehicles: number;
  species: number;
}

export interface StarshipStats {
  total: number;
  inFilm: number;
  totalStarfighters: number;
  inFilmStarfighters: number;
  otherTotal: number;
  otherInFilm: number;
  pctTotalStarfighter: number;
  pctFilmStarfighter: number;
  byClassInFilm: Record<string, number>;
  filmCounts: FilmCounts
}

export const useEntitiesStore = defineStore('entities', () => {
  const totalPlanetsCount = ref(0);
  const totalPeopleCount = ref(0);
  const totalVehiclesCount = ref(0);
  const totalSpeciesCount = ref(0);
  const totalStarshipsCount = ref(0);

  const allStarships = ref<Starship[]>([]);
  const lastStarshipStats = ref<StarshipStats | null>(null);

  const loading = ref(false);
  const error = ref<string | null>(null);

  async function loadForFilm(film: Film) {
    if (!film) return;
    loading.value = true;
    error.value = null;

    try {
      const filmPlanetsCount = (film.planets || []).length;
      const filmPeopleCount = (film.characters || []).length;
      const filmVehiclesCount = (film.vehicles || []).length;
      const filmSpeciesCount = (film.species || []).length;

      const [
        planetsCount,
        peopleCount,
        vehiclesCount,
        speciesCount,
        starshipsCount,
      ] = await Promise.all([
        totalPlanetsCount.value === 0 ? fetchCount('planets') : Promise.resolve(totalPlanetsCount.value),
        totalPeopleCount.value === 0 ? fetchCount('people') : Promise.resolve(totalPeopleCount.value),
        totalVehiclesCount.value === 0 ? fetchCount('vehicles') : Promise.resolve(totalVehiclesCount.value),
        totalSpeciesCount.value === 0 ? fetchCount('species') : Promise.resolve(totalSpeciesCount.value),
        totalStarshipsCount.value === 0 ? fetchCount('starships') : Promise.resolve(totalStarshipsCount.value),
      ]);

      totalPlanetsCount.value = planetsCount;
      totalPeopleCount.value = peopleCount;
      totalVehiclesCount.value = vehiclesCount;
      totalSpeciesCount.value = speciesCount;
      totalStarshipsCount.value = starshipsCount;

      if (allStarships.value.length === 0) {
        allStarships.value = await fetchAllPages('starships');
      }

      const stats = computeStarshipStats(allStarships.value, film.starships || []);

      lastStarshipStats.value = {
        ...stats,
        filmCounts: {
          planets: filmPlanetsCount,
          people: filmPeopleCount,
          vehicles: filmVehiclesCount,
          species: filmSpeciesCount,
        },
      };

    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
      } else {
        console.error("An unknown error occurred:", error);
      }
    } finally {
      loading.value = false;
    }
  }

  return {
    totalPlanetsCount,
    totalPeopleCount,
    totalVehiclesCount,
    totalSpeciesCount,
    totalStarshipsCount,
    allStarships,
    lastStarshipStats,
    loading,
    error,
    loadForFilm,
  };
});
