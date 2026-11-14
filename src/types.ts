export type Soil = 'Argileux' | 'Sableux' | 'Limoneux' | 'Autre' | 'Je ne sais pas'
export type Risk = 'Faible' | 'Modéré' | 'Élevé' | 'Sévère'
export type Analysis = {
  risk: Risk
  score: number
  anomaly: number
  spi3: number
  spi6: number
  deficit: number
  moisture: number
  months: { label: string; rain: number; average: number; deficit: number; moisture: number }[]
  explanation: string
  date: string
}
export type Land = {
  id: string
  name: string
  area: number
  soil: Soil
  latitude: number
  longitude: number
  commune: string
  region: string
  waterMode: string
  waterSource: string
  waterQuantity: string
  history: { year: number; crop: string; quantity: number; unit: string; area: number }[]
  losses: boolean
  budget: number
  season: string
  objective: string
  analysis?: Analysis
}
