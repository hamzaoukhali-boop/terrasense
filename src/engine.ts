import { crops, type Crop } from './data'
import type { Land, Risk } from './types'

export function scoreCrop(crop: Crop, land: Land, risk: Risk): number {
  const water = land.waterQuantity === 'Moins de 500 m³' ? 350 : land.waterQuantity === 'Entre 500 et 1 000 m³' ? 650 : 1000
  let score = 45 + crop.tolerance * 7
  score += Math.max(-20, 20 - Math.abs(crop.water - water) / 20)
  if (crop.seasons.includes(land.season)) score += 12
  if (land.soil === 'Je ne sais pas' || land.soil === 'Autre') score -= 4
  else if (crop.soils.includes(land.soil)) score += 10
  if (crop.cost * land.area <= land.budget) score += 8
  else score -= 15
  if (risk === 'Élevé' || risk === 'Sévère') score += crop.tolerance * 2
  if (land.objective.includes('eau')) score += Math.max(0, 12 - crop.water / 100)
  const recent = land.history.slice(-2).map((item) => item.crop.toLowerCase())
  if (recent.includes(crop.name.toLowerCase())) score -= 18
  if (crop.legume && recent.some((name) => ['blé', 'orge', 'maïs'].some((grain) => name.includes(grain)))) score += 8
  return Math.max(0, Math.min(100, Math.round(score)))
}

export function getRecommendations(land: Land, risk: Risk) {
  return crops.filter((crop) => crop.seasons.includes(land.season)).map((crop) => ({
    crop, score: scoreCrop(crop, land, risk),
    why: crop.tolerance >= 4 ? 'Bonne tolérance au stress hydrique.' : 'À privilégier si l’eau est disponible.',
    warning: crop.cost * land.area > land.budget ? 'Budget estimé dépassé.' : undefined,
  })).sort((a, b) => b.score - a.score).slice(0, 4)
}
