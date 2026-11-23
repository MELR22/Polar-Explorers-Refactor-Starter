// The original expedition codes, presented as a shorter drag-to-order demo.
// In chronological order, the code pairs form the safety-depot coordinates.
export const compassRiddle = {
  title: "A route hidden in the expeditions.",
  prompt: "Put Amundsen’s four expeditions in the order they happened. The number on each card will reveal a location.",
  instruction: "Drag the expedition cards into chronological order, earliest first.",
  startingOrder: ["norge", "maud", "gjoa", "fram"],
  correctOrder: ["gjoa", "fram", "maud", "norge"],
  cards: [
    { id: "norge", title: "North Pole", ship: "Norge", route: "Airship expedition to the North Pole", code: "15", image: "assets/images/Norge.jfif" },
    { id: "fram", title: "South Pole", ship: "Fram", route: "Expedition to the South Pole", code: "22", image: "assets/images/Fram.jfif" },
    { id: "maud", title: "North-East Passage", ship: "Maud", route: "Expedition through the North-East Passage", code: "11", image: "assets/images/Maud.jfif" },
    { id: "gjoa", title: "North-West Passage", ship: "Gjøa", route: "Expedition through the North-West Passage", code: "71", image: "assets/images/Gjoa.jfif" }
  ]
};
