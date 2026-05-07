const charc = document.getElementById("player");
const bubbles = document.getElementById("bubbles");
const text = document.getElementById("text-content");
const npcbubbles = document.getElementById("npc-bubbles");
const npctext = document.getElementById("npctext");
const Arrow = document.getElementById("Background");
const choiceBox = document.getElementById("choices");
let D = false;
let A = false;
let speed = 15;
let posX = 0;
let count = 0;
let isTalking = false;
let hasTalked = false;
let currentSceneID = "Home";
let currentLevel = [
    {
        sceneID: "Home",
        triggerPoint: 1200,
        hasdialague: true,
        dialague: [
            {
                name: "TV",
                text: "AI robots are taking over the world."
            },
            {
                name: "Hero",
                text: "Its 7:55 I should head to college."
            }
        ],
        nextScene: "way-college",
        background: "img/Medium-start.png"
    },
    {
        sceneID: "way-college",
        triggerPoint: 1300,
        hasdialague: false,
        nextScene: "classroom",
        background: "scene/1.png"
    },
    {
        sceneID: "classroom",
        triggerPoint: 700,
        hasdialague: true,
        dialague: [
            {
                name: "Teacher",
                text: "AI is taking over the world."
            },
            {
                name: "Teacher",
                text: "Will you help stop the AI?"
            },
            {
                name: "Teacher",
                text: "Choose your path.",
                choices: [
                    {
                        text: "Yes I will help",
                        nextScene: "heroPath"
                    },
                    {
                        text: "No thanks",
                        nextScene: "cowardPath"
                    }
                ]
            }
        ],
        background: "scene/2.png"
    },
    {
        sceneID: "heroPath",
        triggerPoint: 700,
        hasdialague: true,
        dialague: [
            {               
                name: "Teacher",
                text: "Good. Head home and prepare."
               
            },
            {
                name: "Hero",
                text: "I will save the world."
            }
        ],
        nextScene: "heroHome",
        background: "scene/2.png"
    },
    {
        sceneID: "heroHome",
        triggerPoint: 800,
        hasdialague: true,
        dialague: [
            {
                name: "TV",

                text: "Military forces are losing against the AI."
            },

            {
                name: "Hero",
                text: "I need stronger weapons."
            }
        ],
        nextScene: "militaryBase",
        background: "img/Medium-start.png"
    },
    {
        sceneID: "militaryBase",
        triggerPoint: 700,
        hasdialague: true,
        dialague: [
            {
                name: "soldier",
                text: "Follow me. We have a secret weapon."
            },
            {
                name: "Hero",
                text: "This place is huge."
            },
            {
                name: "soldier",
                text: "The ENERGY SWORD can destroy the AI core."
            }
        ],
        nextScene: "warehouse",
        background: "scene/8.png"
    },
    {
        sceneID: "warehouse",
        triggerPoint: 700,
        hasdialague: true,
        dialague: [
            {
                name: "soldier",
                text: "The sword was split into two pieces."
            },
            {
                name: "Hero",
                text: "Great..."
            },
            {
                name: "soldier",
                text: "You must recover both."
            }
        ],
        nextScene: "finalBattle",
        background: "scene/14.png"
    },
    {
        sceneID: "finalBattle",
        triggerPoint: 700,
        hasdialague: true,
        dialague: [
            {
                name: "AI",
                text: "Human resistance is pointless."
            },
            {
                name: "Hero",
                text: "Not today."
            },
            {
                name: "AI",
                text: "SYSTEM FAILURE..."
            },
            {
                name: "Hero",
                text: "The world is finally safe."
            }
        ],
        background: "scene/20.png"
    },
    {
        sceneID: "cowardPath",
        triggerPoint: 700,
        hasdialague: true,
        dialague: [
            {
                name: "Hero",
                text: "Nah im going home."
            },
            {
                name: "TV",
                text: "BREAKING NEWS: AI has taken over the city."
            },
            {
                name: "Hero",
                text: "...maybe I should have helped."
            }
        ],
        background: "scene/bad.png"
    }
];
//find scene
const getScene = () => {
    return currentLevel.find(
        scene => scene.sceneID === currentSceneID
    );
};
//update background
const updateScene = () => {
    const scene = getScene();
    if (!scene) return;
    count = 0;
    isTalking = false;
    hasTalked = false;
    A = false;
    D = false;
    posX = 0;
    charc.style.left = posX + "px";
    bubbles.style.display = "none";
    npcbubbles.style.display = "none";
    choiceBox.innerHTML = "";
    Arrow.style.display = "none";
    document.body.style.backgroundImage =
        `url('${scene.background}')`;
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.backgroundSize = "cover";
    document.body.className = scene.sceneID;
};
// character movement
const moving = () => {

    if (A && posX > 0 && !isTalking) {
        posX -= speed;
        charc.style.left = posX + "px";
        charc.style.transform = "scaleX(-1)";
    }
    else if (D && posX < window.innerWidth - 245 && !isTalking) {
        posX += speed;
        charc.style.left = posX + "px";
        charc.style.transform = "scaleX(1)";
    }
    requestAnimationFrame(moving);
};
//movement
const e = (event) => {
    if ((event.code === 'KeyA' || event.code === 'ArrowLeft') && !isTalking) {
        A = true;
    }
    else if ((event.code === 'KeyD' || event.code === 'ArrowRight') && !isTalking) {
        D = true;
    }
    else if (event.code === 'Enter' && isTalking) {
        nextDialogue();
    }
};
// movement
const Stopmoving = () => {
    A = false;
    D = false;
};
//start conversation
const GateKeeper = () => {
    const scene = getScene();
    if (!scene) return;
    if (
        scene.hasdialague &&
        posX > scene.triggerPoint &&
        !isTalking &&
        !hasTalked
    ) {
        isTalking = true;
        count = 0;
        hasTalked = true;
       textswap();
    }
    else if (!scene.hasdialague) {
        if (posX > window.innerWidth - 275) {
            Arrow.style.display = "block";
        }
    }
    requestAnimationFrame(GateKeeper);
};
// Show dialogue

const textswap = () => {
    const scene = getScene();
    const dialogue = scene.dialague[count];
    if (!dialogue) return;
    if (dialogue.choices) {
        showChoices(dialogue.choices);
    }
    if (dialogue.name === "Hero") {
        bubbles.style.display = "block";
        npcbubbles.style.display = "none";
        text.innerText = dialogue.text;
    }
    else {
        npcbubbles.style.display = "block";
        bubbles.style.display = "none";
        npctext.innerText = dialogue.text;
    }
};
// next dialogue
const nextDialogue = () => {
    const scene = getScene();
    const dialogue = scene.dialague[count];
    if (dialogue.choices) return;
    count++;
    if (count >= scene.dialague.length) {
        cleanup();
        Arrow.style.display = "block";
        return;
    }
    textswap();
};
// choices
const showChoices = (choices) => {
    choiceBox.innerHTML = "";
    choices.forEach(choice => {
        const btn = document.createElement("button");
        btn.innerText = choice.text;
        btn.onclick = () => {
            currentSceneID = choice.nextScene;
            updateScene();
        };
        choiceBox.appendChild(btn);
    });
};
// cleanup text
const cleanup = () => {
    bubbles.style.display = "none";
    npcbubbles.style.display = "none";
    isTalking = false;
    count = 0;
    A = false;
    D = false;
};
// change scenes
function changeBackground() {
    Arrow.addEventListener('click', () => {
        const scene = getScene();
        if (scene.nextScene) {
            currentSceneID = scene.nextScene;
            updateScene();
        }
    });
}
// Inventory
const inventory = document.getElementById('inventory-overlay');

document.addEventListener('keydown', (event) => {

    if (event.key === 'm' || event.key === 'M') {

        inventory.classList.toggle('hidden');
    }
});
updateScene();
changeBackground();
GateKeeper();
moving();
window.addEventListener('keydown', e);
window.addEventListener('keyup', Stopmoving);