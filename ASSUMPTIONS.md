# Hypothèses et limites du MVP

- **Stockage:** le prototype utilise `localStorage` plutôt qu’un serveur et une base de données. Il est donc mono-utilisateur sur un navigateur.
- **Authentification:** l’écran d’authentification n’est pas inclus dans cette première tranche locale; aucun compte réel ne doit être déduit de ce prototype.
- **Carte:** la zone cartographique est un repère visuel; les coordonnées GPS sont saisies directement. Une carte Leaflet et le géocodage seront intégrés avec le fournisseur choisi.
- **Cultures:** les valeurs de [`src/data.ts`](./src/data.ts) sont des placeholders et ne constituent pas un conseil agronomique.
- **NASA:** la série mensuelle des dix dernières années est utilisée. Le score SPI affiché est une approximation documentée par l’interface et devra être remplacé par le calcul statistique validé lors de la réception des données.
- **Analyse:** une indisponibilité de NASA est signalée à l’utilisateur; aucune donnée synthétique ne remplace silencieusement la réponse API.
