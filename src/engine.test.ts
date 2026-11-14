import { describe, expect, it } from 'vitest'
import { getRecommendations, scoreCrop } from './engine'
import { crops } from './data'
import type { Land } from './types'

const land: Land = {
  id: 'test', name: 'Parcelle test', area: 2, soil: 'Limoneux', latitude: 31, longitude: -8,
  commune: 'Marrakech', region: 'Marrakech-Safi', waterMode: 'Agriculture pluviale',
  waterSource: 'Eau de pluie', waterQuantity: 'Moins de 500 m³', history: [{ year: 2025, crop: 'Blé dur', quantity: 800, unit: 'kg', area: 2 }],
  losses: true, budget: 5000, season: 'Hiver', objective: 'Réduire la consommation d’eau',
}

describe('moteur de recommandation', () => {
  it('favorise une légumineuse tolérante en situation sèche', () => {
    const chickpea = crops.find((crop) => crop.name === 'Pois chiche')!
    const maize = crops.find((crop) => crop.name === 'Maïs')!
    expect(scoreCrop(chickpea, land, 'Sévère')).toBeGreaterThan(scoreCrop(maize, land, 'Sévère'))
  })

  it('retourne un classement limité aux cultures de la saison', () => {
    const recommendations = getRecommendations(land, 'Modéré')
    expect(recommendations.length).toBeLessThanOrEqual(4)
    expect(recommendations.every(({ crop }) => crop.seasons.includes('Hiver'))).toBe(true)
  })
})
