/* Stories of Messages */
export const STORIES = {
    dispatch_intro: {
        title: "Dispatcher Team",
        status: "Online",
        steps: [
            {
                type: "text",
                sender: "Dispatch",
                text: "Dear field team, great to have on board for this mission!"
            },
            {
                type: "text",
                sender: "Dispatch",
                text: "We just received this SOS-call, along with their last position: 74.50845°N, 45.01421°E"
            },
            {
                type: "file",
                sender: "Dispatch",
                name: "SOS_Echo1.mp3",
                action: "sosSignal"
            },

            {
                type: "text",
                sender: "Dispatch",
                text: "We haven't been able to reestablish the contact, so that will be your first mission!"
            },
            {
                type: "text",
                sender: "Dispatch",
                text: "Great thing you're Tromsø. That city is full with people that now the Arctic inside out."
            },
            {
                type: "text",
                sender: "Dispatch",
                text: "But before you continue, how should we refer to you?"
            },
            {
                type: "text",
                sender: "Dispatch",
                text: "Understood, Team {teamName}! we believe its probably Wanny Wolstad that can help to restore communication."
            },
            {
                type: "input",
                variable: "teamName",
                question: "Send us your team name.",
                placeholder: "Team name"
            },
            {
                type: "text",
                sender: "Dispatch",
                text: "As the first femal trapper on Svalbard, and mutlitple radio performances, she know the importance of good commincation."
            },
            {
                type: "text",
                sender: "Dispatch",
                text: "Unforutnelty, we have lost contact with here. This is the last image we received from here."
            },
            {
                type: "upload",
                question: "it too vague, for us, but we believe it shows an artwork of her, and might contain a hidden code to establish contact with here."
            },
            {
                type: "text",
                sender: "Dispatch",
                text: "Use this radio once you're there."
            },
            {
                type: "text",
                sender: "Dispatch",
                text: "We've managed to establish a weak connection with the crew: we can hear them, but we can't send them the information they need."
            },
            {
                type: "text",
                sender: "Dispatch",
                text: "There are three things we need to find:"
            },
            {
                type: "text",
                sender: "Dispatch",
                text: "1. They need a safe route out of their current location."
            },
            {
                type: "text",
                sender: "Dispatch",
                text: "2. We need a safe radio frequency so we can establish a reliable connection with them."
            },
            {
                type: "text",
                sender: "Dispatch",
                text: "3. They need to know where they can find food and emergency supplies."
            },
            {
                type: "text",
                sender: "Dispatch",
                text: "Tromsø is an excellent place to begin, so we're glad you're there. Many great historic expeditions started in Tromsø"
            },
            {
                type: "text",
                sender: "Dispatch",
                text: "We believe the explorers behind these expeditions may hold the answers we need. Unfortunately, it won't be easy to find them."
            },
            {
                type: "text",
                sender: "Dispatch",
                text: "But we've found these files. They should lead you to your first location. Good luck, Team {teamName}!"
            },
            {
                type: "file",
                name: "map_to_next_station.jpg",
                image: "../../../../assets/images/station_1_test.jpg"
            },
            {
                type: "file",
                name: "handwritten_note.pdf",
                action: "station1SignalLetter"
            },
            {
                type: "text",
                sender: "Dispatch",
                text: "Send us: OKAY, when you've reached the next location."
            },
            {
                type: "input",
                variable: "stationReady",
                question: "",
                placeholder: "Write OKAY",
                correctAnswer: "okay",
                wrongAnswer: "Are you there? Write OKAY when you have reached the next location."
            },
            {
                type: "link",
                sender: "Dispatch",
                text: "check_location.html",
                href: "../riddle/riddle_1_2_destination.html"
            }
        ]
    },
    nansen_dispatch: {
        title: "Dispatcher Team",
        status: "Online",
        steps: [
            {
                type: "text",
                sender: "Dispatch",
                text: "Yes. Nansen! Of course!"
            },
            {
                type: "text",
                sender: "Dispatch",
                text: "He will help."
            },
            {
                type: "input",
                question: "Do you have his phone number?",
                placeholder: "Write your answer...",
                variable: "nansen_phone_answer"
            },
            {
                type: "text",
                sender: "Dispatch",
                text: "No?"
            },
            {
                type: "text",
                sender: "Dispatch",
                text: "We found some old notes."
            },
            {
                type: "text",
                sender: "Dispatch",
                text: "See if you can figure it out."
            },
            {
                type: "link",
                sender: "Dispatch",
                text: "Files",
                href: "../riddle/riddle_2_1_phone.html"
            }
        ]
    },
    wanny_dispatch: {
        title: "Dispatcher Team",
        status: "Online",
        steps: [
            {
                type: "text",
                sender: "Dispatch",
                text: "There's another person who may be able to help you: Wanny Wolstad."
            },
            {
                type: "text",
                sender: "Dispatch",
                text: "As Svalbard's first female hunter in 1932, she mastered the skills needed to survive the Arctic. She even invented a mechanical alarm system to warn her of approaching polar bears. Later in life, she appeared on radio programmes across Northern Norway, sharing stories from her years in the Arctic."
            },
            {
                type: "text",
                sender: "Dispatch",
                text: "Before we lost contact, she shared this photo with us. We believe it depicts an artwork of Wanny somewhere in Tromsø."
            },
            {
                type: "file",
                name: "undefined.png",
                sender: "Dispatch",
                image: "../../../../assets/images/Wanny_Painting_Old.png"
            },
            {
                type: "text",
                sender: "Dispatch",
                text: "We believe it may contain a clue to get in touch with her."
            },
            {
                type: "text",
                sender: "Dispatch",
                text: "Unfortunately, the image we received is too vague for us to make out the details. You need to take a closer look."
            },
            {
                type: "text",
                sender: "Dispatch",
                text: "Once you're there, use this radio-tool to see if you can pick up her radio signal."
            },
            {
                type: "link",
                sender: "Dispatch",
                text: "Wanny_Radio_Connection.hpf",
                href: "../riddle/riddle_3_1_frequency.html"
            }
        ]
    },
    signal_intercepted: {
        title: "Dispatcher Team",
        status: "Online",

        steps: [
            {
                type: "text",
                sender: "Dispatch",
                text: "Okay, great work!"
            },
            {
                type: "text",
                sender: "Dispatch",
                text: "Next, we have to find a route out of the ice."
            },
            {
                type: "text",
                sender: "Dispatch",
                text: "Hold on. Something is happeni"
            },
            {
                type: "action",
                action: "signalInterceptAttack"
            },
            {
                type: "link",
                sender: "Dispatch",
                text: "Riddle_Hacker.png",
                href: "../riddle/riddle_4_2_fish.html"
            }
        ]
    },
    dispatch_henry_intro: {
        title: "Dispatcher Team",
        status: "Online",
        steps: [
            {
                type: "text",
                sender: "Dispatch",
                text: "Good work, Team {teamName}. You reached the next station."
            },
            {
                type: "text",
                sender: "Dispatch",
                text: "For the next part of the rescue mission, you need help from someone who knows the Arctic very well."
            },
            {
                type: "text",
                sender: "Dispatch",
                text: "His name is Henry Rudi. Watch this video first."
            },
            {
                type: "file",
                name: "henry_rudi_information.mp4",
                action: "dispatchHenryVideo",
                video: "../../../../assets/animation/HenriRudi.mp4"
            },
            {
                type: "text",
                sender: "Dispatch",
                text: "We also found his contact. Send him a friend request so he can help you."
            },
            {
                type: "file",
                name: "Henry Rudi Contact",
                action: "henryRudiContactRequest",
                avatar: "../../../../assets/images/rudi.jpg",
                redirect: "../riddle/riddle_6_2_chat.html"
            }
        ]
    },
    henry_rudi: {
        title: "Henry Rudi",
        status: "Online",
        steps: [
            {
                type: "text",
                sender: "Henry Rudi",
                text: "Hello?"
            },
            {
                type: "text",
                sender: "Henry Rudi",
                text: "Oslo people wrote me that someone will contact me, because they need help."
            },
            {
                type: "input",
                question: "Is this someone you?",
                placeholder: "Write your answer...",
                variable: "henry_answer"
            },
            {
                type: "text",
                sender: "Henry Rudi",
                text: "Great!"
            },
            {
                type: "text",
                sender: "Henry Rudi",
                text: "Then I am writing to the right people."
            },
            {
                type: "text",
                sender: "Henry Rudi",
                text: "I think I can help."
            },
            {
                type: "text",
                sender: "Henry Rudi",
                text: "We're looking for the departure date, right?."
            },
            {
                type: "text",
                sender: "Henry Rudi",
                text: "Found these in my archive."
            },
            {
                type: "text",
                sender: "Henry Rudi",
                text: "See if one looks familiar to my favourite place \"&#248lhallen\".."
            },
            {
                type: "file",
                name: "observatory_images.zip",
                action: "henryRudiGallery"
            },
            {
                type: "input",
                variable: "henryRudiPeople",
                question: "Which number  do you see?", /* CHANGE IT LATER BACK TO WHAT DO YOU SEE */
                placeholder: "Type your answer...",
                acceptedAnswers: ["2", "two", "two.", "2.", "two people", "2 people"],
                wrongAnswer: "Look carefully at the movement in the window."
            },
            {
                type: "text",
                sender: "Henry Rudi",
                text: "YES, I remember. That is correct!"
            },
            {
                type: "text",
                sender: "Henry Rudi",
                text: "I don't remember the month. Check my profile. It should be around the time when I shot the polar bear."
            },
            {
                type: "text",
                sender: "Henry Rudi",
                text: "Write the month here in the chat."
            },
            {
                type: "input",
                variable: "henryRudiMonth",
                question: "In which month was it?",
                placeholder: "Write the month...",
                acceptedAnswers: [
                    "june",
                    "june.",
                    "jun",
                    "jun.",
                    "6",
                    "06"
                ],
                wrongAnswer: "Ahh, I don't think that is correct. Check my profile again."
            },
            {
                type: "text",
                sender: "Henry Rudi",
                text: "Yes, June! Now I remember. That was the month."
            },
            {
                type: "text",
                sender: "Henry Rudi",
                text: "Take care."
            },
            {
                type: "link",
                sender: "Henry Rudi",
                text: "Next_Station.html",
                href: "riddle_6_3_location.html"
            }

        ]
    },
    dispatch_final: {
        title: "Dispatcher Team",
        status: "Online",
        steps: [
            {
                type: "text",
                sender: "Dispatch",
                text: "Nice job! We would love to meet you! "
            },
            {
                type: "text",
                sender: "Dispatch",
                text: "You have all the information ready for the crew now. Send them this information using the following link."
            },
            {
                type: "text",
                sender: "Dispatch",
                text: "Good bye!!"
            },
            {
                type: "link",
                sender: "Dispatch",
                text: "Upload_Important_files.com",
                href: "final_page.html"
            }
        ]
    }
};