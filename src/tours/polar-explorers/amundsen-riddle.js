// The original expedition codes, presented as a shorter drag-to-order demo.
// In chronological order, the code pairs form the safety-depot coordinates.
export const compassRiddle = {
  title: "A location hidden in the expeditions.",
  prompt: "In this simplified version of a riddle from the original game, players must put Amundsen’s four expeditions in the order they happened. They need to have studied the atlas to solve it. Once the cards are in the correct order, they reveal a location. Give it a try, the correct order is Gjøa, Fram, Maud & Norge",
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
