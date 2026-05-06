const charc = document.getElementById("player");
const bubbles = document.getElementById("bubbles");
const text =  document.getElementById("text-content");
const npcbubbles = document.getElementById("npc-bubbles");
const npctext = document.getElementById("npctext"); 
const Arrow = document.getElementById("Background");

/* Globle Varables*/ 
let D = false;
let A = false;
let speed = 5;
let posX = 0;
let posY = 0;
let count = 0;
let isTalking = false;
let hasTalked = false;
let levelIndex = 0;

// Keys Function //
const e = (event) => {

    if ((event.code === 'KeyA' || event.code === 'ArrowLeft') && isTalking === false) {
        A = true
    } else if ((event.code === 'KeyD' || event.code === 'ArrowRight') && isTalking === false) {
        D = true
    } else if (event.code === 'Enter' && isTalking === true) {
        if (count >= currentLevel[levelIndex].dialague.length - 1) {
            cleanup();
        }
         else {
            count++;
            textswap();
        }
    }
}

const cleanup = () => {
    bubbles.style.display = "none";
    npcbubbles.style.display = "none";
    Arrow.style.display = "block";
    isTalking = false;
    count = 0
    A = false;
    D = false;
    hasTalked = true; 
    
}    
// Stop moving function // 
const Stopmoving = () => {
        A = false
        D = false
}
// Moving function //
const moving = () => {
    if (A === true && posX > 0 && isTalking === false) {
        charc.style.left = (posX = posX - speed) + "px";
        charc.style.transform = "scaleX(-1)";
    } else if (D === true && posX < window.innerWidth - 245 && isTalking === false) {
        charc.style.left = (posX = posX + speed) + "px"; 
        charc.style.transform = "scaleX(1)";
    }

    requestAnimationFrame(moving);
}

const GateKeeper = () => {
    requestAnimationFrame(GateKeeper);

    if (levelIndex >= currentLevel.length) {
        return;
    } 
    if(currentLevel[levelIndex].hasdialague === true) {
    if (posX > currentLevel[levelIndex].triggerPoint && isTalking === false && hasTalked === false) {
        isTalking = true;
        A = false;
        D = false;
        text.innerText = currentLevel[levelIndex].dialague[count].text;
        hasTalked = true;
        count = 0;
        textswap();  
    }    
   } else if (currentLevel[levelIndex].hasdialague === false){
        if (posX > window.innerWidth - 275) {
           Arrow.style.display = "block";
        }
    }
    
}
let currentSceneID = "Home";
// let count = 0;

const getScene = () => currentLevel.find(scene => scene.sceneID === currentSceneID);

const textswap = () => {
    const scene = getScene();
    const dialogue = scene.dialague[count];

    if (!dialogue) return;

    // Handle choices
    if (dialogue.choices) {
        showChoices(dialogue.choices);
        return;
    }

    if (dialogue.name === "Hero") {
        bubbles.style.display = "block";
        npcbubbles.style.display = "none";
        text.innerText = dialogue.text;
    } else {
        npcbubbles.style.display = "block";
        bubbles.style.display = "none";
        npctext.innerText = dialogue.text;
    }
};

const nextDialogue = () => {
    const scene = getScene();
    count++;

    if (count >= scene.dialague.length) {
        if (scene.nextScene) {
            currentSceneID = scene.nextScene;
            count = 0;
        }
    }

    textswap();
};

const showChoices = (choices) => {
    const container = document.getElementById("choices");
    container.innerHTML = "";

    choices.forEach(choice => {
        const btn = document.createElement("button");
        btn.innerText = choice.text;

        btn.onclick = () => {
            currentSceneID = choice.nextScene;
            count = 0;
            container.innerHTML = "";
            textswap();
        };

        container.appendChild(btn);
    });
};

let currentLevel = [

    {
        sceneID: "Home",
        nextScene: "walk",
        dialague: [
            { name: "TV", text: "AI robots are taking over the world." },
            { name: "Hero", text: "Its 7:55 I should head to college." },
            {
                name: "Hero",
                text: "What should I do?",
                choices: [
                    { text: "Go to college", nextScene: "classroom" },
                    { text: "Stay home", nextScene: "badEnding1" }
                ]
            }
        ],
        background: 'img/Medium-start.png'
    },

    {
        sceneID: "walk",
        nextScene: "classroom",
        dialague: [
            { name: "Hero", text: "Walking to school..." }
        ],
        background: 'scene/1.png'
    },

    {
        sceneID: "classroom",
        nextScene: "goHomePrep",
        dialague: [
            { name: "Teacher", text: "AI is taking over the world!" },
            { name: "Teacher", text: "I send you on a quest for extra credit!" },
            { name: "Hero", text:"Extra credit? I'll do anything!" },
            {
                name: "Teacher",
                text: "Will you accept?",
                choices: [
                    { text: "Accept quest", nextScene: "goHomePrep" },
                    { text: "Refuse", nextScene: "badEnding2" }
                ]
            }
        ],
        background: 'scene/2.png'
    },

    {
        sceneID: "goHomePrep",
        nextScene: "airplaneIntro",
        dialague: [
            { name: "TV", text: "Air Line (67 + 67)/67 to AI military base." }
        ],
        background: 'img/Medium-start.png'
    },

    {
        sceneID: "airplaneIntro",
        nextScene: "warehouse1",
        dialague: [
            { name: "soldier", text: "Follow me to base, there's incoming fire." }
        ],
        background: 'scene/8.png'
    },

    {
        sceneID: "warehouse1",
        dialague: [
            { name: "soldier", text: "We need the secret weapon." },
            { name: "Hero", text: "No it’s too dangerous." },
            { name: "soldier", text: "The ENERGY SWORD." },
            {
                name: "Hero",
                text: "Should I help?",
                choices: [
                    { text: "Help", nextScene: "warehouse2" },
                    { text: "Refuse", nextScene: "badEnding3" }
                ]
            }
        ],
        background: 'scene/14.png'
    },

    {
        sceneID: "warehouse2",
        nextScene: "codingMission",
        dialague: [
            { name: "soldier", text: "Retrieve the second piece!" },
            { name: "Hero", text: "Got it." }
        ],
        background: 'scene/17.png'
    },

    {
        sceneID: "codingMission",
        dialague: [
            {
                name: "soldier",
                text: "Final step: do some coding to stop AI.",
                choices: [
                    { text: "Hack the AI", nextScene: "goodEnding" },
                    { text: "Shut everything down", nextScene: "neutralEnding" }
                ]
            }
        ],
        background: 'scene/20.png'
    },

    // ===== ENDINGS =====

    {
        sceneID: "goodEnding",
        dialague: [
            { name: "Hero", text: "I hacked the AI and saved the world!" }
        ],
        background: 'scene/21.png'
    },

    {
        sceneID: "neutralEnding",
        dialague: [
            { name: "Hero", text: "I shut everything down... the world is quiet now." }
        ],
        background: 'scene/21.png'
    },

    {
        sceneID: "badEnding1",
        dialague: [
            { name: "TV", text: "You stayed home. AI took over everything." }
        ],
        background: 'scene/3.png'
    },

    {
        sceneID: "badEnding2",
        dialague: [
            { name: "Teacher", text: "You failed... no extra credit." }
        ],
        background: 'scene/3.png'
    },

    {
        sceneID: "badEnding3",
        dialague: [
            { name: "soldier", text: "Without you, we lost the war." }
        ],
        background: 'scene/3.png'
    }
];
function changeBackground() {
    document.getElementById("Background").addEventListener('click', function() {
        levelIndex++;
        posX = 0;
        charc.style.left = posX + "px"; 
        document.body.style.backgroundImage = "url('" + currentLevel[levelIndex].background + "')";
        document.body.style.backgroundPosition = "center";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundAttachment = "fixed";
        document.body.style.backgroundSize = "cover";
        document.body.className = currentLevel[levelIndex].sceneID;
        Arrow.style.display = "none";
        hasTalked = false;
    });
}
const inventory = document.getElementById('inventory-overlay');

document.addEventListener('keydown', (event) => {
    if (event.key === 'm' || event.key === 'M') {
        inventory.classList.toggle('hidden');
    }
});


changeBackground();
GateKeeper();
moving();
window.addEventListener('keydown', e); 
window.addEventListener('keyup', Stopmoving);