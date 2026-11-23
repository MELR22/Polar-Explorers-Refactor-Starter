// Amundsen atlas content: expedition overview, route overlay, and timeline stops.
export const expeditions = {
  gjoa: {
    name: "Gjøa",
    overlay: "gjoa",
    dates: "1903–1906",
    pin: [22, 25],
    introTitle: "Northwest Passage",
    intro: "Amundsen together with only six crew members set out aboard the small *Gjøa* on a mission to demonstrate the shift of the magnetic North. Navigating the Northwest Passage, his boyhood dream, was only a secondary goal.",
    stops: [
      { name: "Kristiania", x: 52.44, y: 30.9, text: "On 16 June 1903, Amundsen and his crew secretly left Kristiania (now Oslo) at midnight, as Amundsen had not managed to completely pay off the Gjøa." },
      { name: "Godhavn, Greenland", x: 34.14, y: 24.66, text: "At Godhavn (now Qeqertarsuaq), the expedition’s first stop after Norway, the crew took 20 sled dogs aboard for the expedition ahead." },
      { name: "Gjøa Haven, Canada", x: 22.07, y: 25.15, text: "The *Gjøa* spent two years in this sheltered bay. Here they built a magnetic observatory, while Amundsen learned Arctic clothing and survival skills from local Netsilik Inuit." },
      { name: "King Point, Canada", x: 9.86, y: 24.62, text: "When they were finally released by the ice in August 1905, they almost completed the passage but were soon stopped by it again near King Point, making another overwintering unavoidable." },
      { name: "Nome, Alaska", x: 2.19, y: 28.04, text: "On 31 August 1906, the *Gjøa* reached Nome, as the first ship to navigate the Northwest Passage in a single voyage." }
    ]
  },

  norge: {
    name: "Norge",
    overlay: "norge",
    dates: "1926",
    pin: [53, 10],
    introTitle: "North Pole",
    intro: "After several failed attempts by both ship and plane, in 1926 Roald Amundsen joined forces with the American Lincoln Ellsworth and the Italian Umberto Nobile, trying to cross the Arctic Ocean with a zeppelin.",
    stops: [
      { name: "Ny-Ålesund, Svalbard", x: 52.84, y: 14.54, text: "On 11 May, the zeppelin *Norge* lifted off from Ny-Ålesund with 16 people aboard." },
      { name: "North Pole", x: 52.63, y: 2.5, zoom: 3.2, text: "Just after 1 a.m. on 12 May, *Norge* passed over the North Pole. The crew dropped Norwegian, American and Italian flags onto the ice, then continued west." },
      { name: "Teller, Alaska", x: 1.5, y: 27.3, text: "After 72 hours in the air, *Norge* landed near Teller on 14 May, completing the first crossing of the Arctic Ocean." }
    ]
  },

  fram: {
    name: "Fram",
    overlay: "fram",
    dates: "1910–1912",
    pin: [28, 94],
    introTitle: "South Pole",
    intro: "Aboard *Fram*, Amundsen secretly changed the expedition’s destination from the Arctic to the South Pole, joining Robert Scott in the race for the South Pole.",
    stops: [
      { name: "Framheim, Bay of Whales", x: 2.7, y: 88.43, text: "On 14 January 1911, the Fram arrived at the Bay of Whales, where they set up their base, Framheim. Following months of preparation and stocking supply depots along the route, five men and 52 dogs left for the South Pole on 20 October." },
      { name: "The Polar Plateau", x: 4.67, y: 96.39, text: "At about 85° south, the team climbed the Axel Heiberg Glacier from the Ice Shelf onto the polar plateau. Here, they shot 24 of their dogs, providing provisions for the crew and the remaining dogs." },
      { name: "South Pole", x: 51.62, y: 98.54, text: "On 14 December 1911, the crew reached the geographical South Pole. They spent three days taking measurements and circling the area to exactly pinpoint the pole, leaving a tent and the Norwegian flag behind." },
      { name: "Return to Framheim", x: 2.7, y: 88.43, text: "The party returned to Framheim on 26 January 1912, after 99 days away. They came back with only 11 dogs." }
    ]
  },

  maud: {
    name: "Maud",
    overlay: "maud",
    dates: "1918–1925",
    pin: [79, 19],
    introTitle: "Northeast Passage",
    intro: "Amundsen set out aboard *Maud* to repeat Nansen’s drift across the Arctic Ocean, hoping to reach the North Pole.",
    stops: [
      { name: "Oslo", x: 52.48, y: 30.77, text: "Built for the expedition, the polar ship *Maud* left Oslo in June 1918." },
      { name: "Tromsø", x: 54.84, y: 24.33, text: "Amundsen joined the ship in Tromsø, where five tons of dried fish and reindeer-skin clothing were loaded. *Maud* left Norway from Vardø on 18 July." },
      { name: "Dikson Island, Russia", x: 72.37, y: 20.94, text: "After more than six weeks at sea, *Maud* reached this last telegraph station on 31 August. The crew took on ten dogs and oil before continuing east." },
      { name: "Cape Chelyuskin, Russia", x: 79.19, y: 16.22, text: "On 9 September 1918, *Maud* reached this cape, matching Nansen’s schedule of 1893. However, the ice conditions were much worse and forced them to overwinter just east of this cape." },
      { name: "Ayon Island, Russia", x: 97.57, y: 24.14, text: "The ice released *Maud* on 12 September 1919, but after just 11 days the ship was trapped again. The crew spent a second winter near Ayon Island." },
      { name: "Nome, Alaska", x: 2.19, y: 28, text: "Freed from the ice on 8 July 1920 and after two years delayed by ice, Amundsen decided to head straight for Nome. Maud completed the Northeast Passage and reached Nome on 25 July." }
    ]
  }
};