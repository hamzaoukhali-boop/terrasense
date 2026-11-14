import type { Analysis, Land } from './types'

export async function analyzeLand(land: Land): Promise<Analysis> {
  const end = new Date()
  const start = new Date(end.getFullYear() - 10, end.getMonth(), 1)
  const params = 'PRECTOTCORR,T2M,PET,GWETROOT'
  const url = `https://power.larc.nasa.gov/api/temporal/monthly/point?parameters=${params}&community=AG&longitude=${land.longitude}&latitude=${land.latitude}&start=${start.getFullYear()}&end=${end.getFullYear()}&format=JSON`
  const response = await fetch(url)
  if (!response.ok) throw new Error('NASA POWER est momentanément indisponible.')
  const json = await response.json() as { properties?: { parameter?: Record<string, Record<string, number>> } }
  const rain = json.properties?.parameter?.PRECTOTCORR ?? {}
  const pet = json.properties?.parameter?.PET ?? {}
  const moisture = json.properties?.parameter?.GWETROOT ?? {}
  const keys = Object.keys(rain).slice(-12)
  const values = keys.map((key) => rain[key]).filter(Number.isFinite)
  if (!values.length) throw new Error('NASA n’a pas retourné de données pour cette localisation.')
  const average = values.reduce((a, b) => a + b, 0) / values.length
  const recent = values.slice(-3).reduce((a, b) => a + b, 0) / Math.min(3, values.length)
  const anomaly = Math.round(((recent - average) / Math.max(average, 1)) * 100)
  const deficit = Math.round(values.reduce((sum, value, i) => sum + value - (pet[keys[i]] ?? value * 1.8), 0) / values.length)
  const moistureValues = keys.map((key) => moisture[key]).filter(Number.isFinite)
  const moistureTrend = moistureValues.length > 1 ? moistureValues[moistureValues.length - 1] - moistureValues[0] : 0
  const score = Math.max(0, Math.min(100, Math.round(50 - anomaly * 0.35 - deficit * 0.15 - moistureTrend * 20 + (land.losses ? 12 : 0))))
  const risk = score >= 76 ? 'Sévère' : score >= 56 ? 'Élevé' : score >= 31 ? 'Modéré' : 'Faible'
  return {
    risk, score, anomaly, spi3: Math.round((anomaly / 25) * 100) / 100, spi6: Math.round((anomaly / 35) * 100) / 100,
    deficit, moisture: Math.round((moistureValues.length ? moistureValues[moistureValues.length - 1] : 0) * 100) / 100, date: new Date().toISOString(),
    explanation: score > 55 ? 'Les précipitations récentes sont inférieures à la référence et justifient une stratégie économe en eau.' : 'Les indicateurs restent proches de la normale. Continuez à suivre l’humidité du sol.',
    months: keys.slice(-6).map((key) => ({ label: `${key.slice(4, 6)}/${key.slice(0, 4)}`, rain: Math.round(rain[key]), average: Math.round(average), deficit: Math.round(rain[key] - (pet[key] ?? rain[key] * 1.8)), moisture: Math.round((moisture[key] ?? 0) * 100) })),
  }
}
