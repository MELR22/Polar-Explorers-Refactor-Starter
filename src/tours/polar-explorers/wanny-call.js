// Original Wanny call subtitles, branch responses and voice clips from station_3_2.
export const wannyCallTracks = {
  intro: {
    file: "assets/audio/Wanny/Wanny_1.mp3",
    lines: ["Hello?", "Is there someone?", "Here is Wanny Woldstad."]
  },
  rescue: {
    file: "assets/audio/Wanny/Wanny_2.mp3",
    lines: [
      "Ok! There is no time to waste!",
      "During my years on Svalbard, I learned how important good communication can be.",
      "Let's see. Where they are...",
      "Take these!",
      "These notes, I will put them in your inventory.",
      "They might help you to find the right frequency to contact the crew."
    ]
  },
  goodbye: {
    file: "assets/audio/Wanny/Wanny_3_B.mp3",
    lines: ["Goodbye, and good luck."]
  },
  svalbardQuestion: {
    file: "assets/audio/Wanny/Wanny_3_C.mp3",
    lines: ["Yes!", "I overwintered there five times.", "Have you ever been to Svalbard?"]
  },
  beenThere: {
    file: "assets/audio/Wanny/Wanny_4_D.mp3",
    lines: ["Then you know how beautiful it is — But I guess also, how harsh it can be."]
  },
  notBeenThere: {
    file: "assets/audio/Wanny/Wanny_4_E.mp3",
    lines: ["Not yet, hmm?", "So you are more of a beach type?", "*small laugh*"]
  },
  svalbardStory: {
    file: "assets/audio/Wanny/Wanny_4.mp3",
    lines: [
      "But yes, Svalbard is not an easy place.",
      "There are long months of darkness. It is cold. There are storms. You are isolated.",
      "I was the first female trapper on Svalbard.",
      "I hunted, trapped, repaired things, kept the hut going, and yes, I shot my first polar bear there.",
      "That was really something I never forgot.",
      "Before I went on these adventures, I drove a taxi in Tromsø.",
      "Oh man, I met so many people who were crazy about going to the north.",
      "Speaking of that, I was actually also the first female taxi driver in the north.",
      "*laugh*"
    ]
  },
  missionGoodbye: {
    file: "assets/audio/Wanny/Wanny_5_F.mp3",
    lines: ["Selvfølgelig — of course.", "Go on.", "Your crew is waiting.", "Good luck, my friends!"]
  },
  familyStory: {
    file: "assets/audio/Wanny/Wanny_5_G.mp3",
    lines: [
      "My first husband died early, unfortunately.",
      "I had two sons, Alf and Bjørvik.",
      "The first time I overwintered, they stayed on the mainland.",
      "But later, they came with me to Svalbard and became trappers themselves.",
      "A family holiday, a little different.",
      "*laugh*",
      "I wrote a book about my experiences, if you ever want to read more.",
      "But now you need to continue your rescue mission.",
      "Good luck, my friends!"
    ]
  }
};

export const wannyCallChoices = {
  A: "Yes! We need your help. A crew is trapped in the Arctic.",
  B: "Thank you! Goodbye.",
  C: "Thanks a lot! So you have also been on Svalbard?",
  D: "Yes.",
  E: "No.",
  F: "Wow, that sounds impressive. We must continue with the rescue mission.",
  G: "Wow! What about your family? Did they overwinter too?"
};
