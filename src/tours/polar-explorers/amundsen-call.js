// Transcript captions and branch choices copied from the original Station 5 call.
export const callTracks = {
  voice1: {
    file: "assets/audio/Amundsen/Amundsen_1.mp3",
    lines: ["Hello?", "Can you hear me?", "This is Roald Amundsen speaking."]
  },
  voice2: {
    file: "assets/audio/Amundsen/Amundsen_2.mp3",
    lines: [
      "No, I believe it is the other way around.",
      "I heard from my colleagues that you are on a rescue mission.",
      "During my expeditions, I had several safety depots.",
      "I will send you some notes to help you find the coordinates.",
      "These depots will help your crew.",
      "You will find the notes in your inventory."
    ]
  },
  voice2B: {
    file: "assets/audio/Amundsen/Amundsen_2_B.mp3",
    lines: ["No problem.", "I would go myself if I could.", "Good luck, explorers."]
  },
  voice2C: {
    file: "assets/audio/Amundsen/Amundsen_2_C.mp3",
    lines: ["I heard about it from my old friend Fridtjof.", "Do you know who?"]
  },
  voice3D: {
    file: "assets/audio/Amundsen/Amundsen_3_D.mp3",
    lines: [
      "Then you have already spoken with a wise man.",
      "Nansen advised me before my Northwest Passage expedition.",
      "Later, I was allowed to use the Fram for an expedition that was meant to go north.",
      "Small laugh.", "But plans can change.",
      "I took the Fram south instead — and reached the South Pole."
    ]
  },
  voice3E: {
    file: "assets/audio/Amundsen/Amundsen_3_E.mp3",
    lines: [
      "Ah, my friends!", "You know him properly as Nansen.",
      "He was one of Norway's great polar explorers.",
      "He advised me before my Northwest Passage expedition.",
      "Later, I was allowed to use the Fram for an expedition that was meant to go north.",
      "Small laugh.", "But plans can change.",
      "I took the Fram south instead — and reached the South Pole."
    ]
  },
  voice3: {
    file: "assets/audio/Amundsen/Amundsen_3.mp3",
    lines: [
      "The crew you are searching for is trapped in the north.",
      "I never reached the North Pole by ship.",
      "But later, I crossed the Arctic Ocean by airship.",
      "It was called Norge.",
      "You understand the name, yes?",
      "Norge — Norway.",
      "But enough history.",
      "Your friends need you.",
      "Use my depot notes.",
      "Find the coordinates."
    ]
  }
};

export const callChoices = {
  A: "Yes! How can we help you?",
  B: "Thanks a lot! Good bye!",
  C: "Thanks a lot! How did you know about it?",
  D: "Yes, of course. We talked with him in the beginning. Why do you know him?",
  E: "No, who is that?"
};
