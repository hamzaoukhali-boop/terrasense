# TerraSense

MVP mobile-first en français pour enregistrer des parcelles, interroger NASA POWER et proposer une rotation de cultures explicable.

## Démarrer

```bash
npm install
npm run dev
```

Les terrains sont persistés localement dans `localStorage`. L'analyse utilise l'API publique NASA POWER et nécessite une connexion réseau. `npm run build` valide la production.

## Flux MVP

Tableau de bord → ajouter un terrain (assistant en 6 étapes) → Mes terrains → détail → analyse NASA → risque et recommandations.

## Données

Les cultures et leurs valeurs agronomiques sont dans [`src/data.ts`](./src/data.ts), avec un marqueur `PLACEHOLDER`. Le moteur transparent est dans [`src/engine.ts`](./src/engine.ts). Remplacez ces valeurs avec la base fournie avant usage agronomique réel.
