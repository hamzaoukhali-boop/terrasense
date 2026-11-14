export type Crop = {
  name: string; family: string; seasons: string[]; water: number; tolerance: number
  soils: string[]; cost: number; legume?: boolean; root: string
}

// PLACEHOLDER — replace values with the crop database provided by the project owner.
export const crops: Crop[] = [
  { name: 'Orge', family: 'Céréales', seasons: ['Automne', 'Hiver'], water: 350, tolerance: 5, soils: ['Argileux', 'Limoneux'], cost: 2200, root: 'superficiel' },
  { name: 'Blé dur', family: 'Céréales', seasons: ['Automne', 'Hiver'], water: 450, tolerance: 3, soils: ['Argileux', 'Limoneux'], cost: 2800, root: 'moyen' },
  { name: 'Pois chiche', family: 'Légumineuses', seasons: ['Hiver', 'Printemps'], water: 250, tolerance: 5, soils: ['Sableux', 'Limoneux'], cost: 1900, legume: true, root: 'profond' },
  { name: 'Fève', family: 'Légumineuses', seasons: ['Automne', 'Hiver'], water: 400, tolerance: 4, soils: ['Argileux', 'Limoneux'], cost: 2400, legume: true, root: 'profond' },
  { name: 'Lentille', family: 'Légumineuses', seasons: ['Automne', 'Hiver'], water: 300, tolerance: 5, soils: ['Sableux', 'Limoneux'], cost: 1800, legume: true, root: 'moyen' },
  { name: 'Tournesol', family: 'Oléagineux', seasons: ['Printemps', 'Été'], water: 500, tolerance: 4, soils: ['Argileux', 'Limoneux'], cost: 2600, root: 'profond' },
  { name: 'Maïs', family: 'Céréales', seasons: ['Printemps', 'Été'], water: 750, tolerance: 1, soils: ['Limoneux', 'Argileux'], cost: 5200, root: 'moyen' },
  { name: 'Tomate', family: 'Maraîchage', seasons: ['Printemps', 'Été'], water: 650, tolerance: 2, soils: ['Sableux', 'Limoneux'], cost: 7000, root: 'superficiel' },
  { name: 'Pomme de terre', family: 'Maraîchage', seasons: ['Automne', 'Printemps'], water: 550, tolerance: 3, soils: ['Sableux', 'Limoneux'], cost: 4500, root: 'superficiel' },
  { name: 'Luzerne', family: 'Légumineuses', seasons: ['Printemps', 'Été'], water: 600, tolerance: 4, soils: ['Limoneux'], cost: 3000, legume: true, root: 'profond' },
]
