import type { Starship } from "@/types";

const norm = (s: unknown) => String(s ?? '').toLowerCase();

export function computeSimpleEntityCounts(filmUrls: string[] | undefined, totalCount: number) {
  const inFilm = Array.isArray(filmUrls) ? filmUrls.length : 0;
  const percent = totalCount ? (inFilm / totalCount) * 100 : 0;
  return { total: totalCount, inFilm, percent };
}

export function computeStarshipStats(allStarships: Starship[], filmStarshipUrls: string[] | undefined) {
  const filmSet = new Set(filmStarshipUrls || []);
  const total = allStarships.length;
  const inFilmArray = allStarships.filter(s => filmSet.has(s.url));
  const inFilm = inFilmArray.length;

  const isStarfighter = (s: Starship) => norm(s.starship_class).includes('starfighter');

  const totalStarfighters = allStarships.reduce((acc, s) => acc + (isStarfighter(s) ? 1 : 0), 0);
  const inFilmStarfighters = inFilmArray.reduce((acc, s) => acc + (isStarfighter(s) ? 1 : 0), 0);

  const byClassInFilm: Record<string, number> = {};
  inFilmArray.forEach(s => {
    const cls = s.starship_class.charAt(0).toUpperCase() + s.starship_class.slice(1);
    byClassInFilm[cls] = (byClassInFilm[cls] || 0) + 1;
  });

  const pctTotalStarfighter = total ? (totalStarfighters / total) * 100 : 0;
  const pctFilmStarfighter = inFilm ? (inFilmStarfighters / inFilm) * 100 : 0;

  return {
    total,
    inFilm,
    totalStarfighters,
    inFilmStarfighters,
    otherTotal: total - totalStarfighters,
    otherInFilm: inFilm - inFilmStarfighters,
    pctTotalStarfighter,
    pctFilmStarfighter,
    byClassInFilm
  };
}
