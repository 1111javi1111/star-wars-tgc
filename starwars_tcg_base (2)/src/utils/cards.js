export const allCards = [
  { name: "Fanático", type: "Unidad", cost: 1 },
  { name: "Descarga Carmesí", type: "Hechizo", cost: 2 },
  { name: "Tropa Sith", type: "Unidad", cost: 1 },
  { name: "Señor del Núcleo", type: "Héroe", cost: 4 },
  { name: "Láser Oscuro", type: "Hechizo", cost: 3 }
];

export const getStarterDeck = () => [
  allCards[0],
  allCards[1],
  allCards[2],
  allCards[3],
  allCards[4]
];