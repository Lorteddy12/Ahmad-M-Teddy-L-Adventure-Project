const player = document.getElementById("player");
const enemy = document.getElementById("enemy");
const Esheild = document.getElementById("Shield");
const PHealth = document.getElementById("player-inner-Line");
const EHealth = document.getElementById("enemy-inner-Line");

//Main vars //
let playerHP = 100;
let enemyHP = 100;

// player start point //
let playerX = 0

// enemy movement vars //
let enemyX = window.innerWidth - 200;
let enemySpeed = 5;
let isShieldActive = false;
// start positions styling // 
player.style.left = playerX + "px";
enemy.style.left = enemyX + "px";

// enemy movement fuction //
let traget = 0;
let moving = false; 
let max = 800;
let min = 100;
const Emoving = () => {
    let des = Math.floor(Math.random() *(max - min) + min)
    if (Math.abs(enemyX - des) < 200) {
       Emoving();
    } else {
        traget = des;
    }   
    moving = true;
}
const Efacing = () => {
    if (enemyX < traget) {
        let Lposition = enemyX + enemySpeed
        enemyX = Lposition
        enemy.style.left = Lposition + "px";
        enemy.style.transform = "scaleX(-1)";
    } else if (enemyX > traget) {
        let Rposition = enemyX - enemySpeed
        enemyX = Rposition
        enemy.style.left = Rposition + "px";
        enemy.style.transform = "scaleX(1)";
    }  
    if (Math.abs(enemyX - traget) < enemySpeed) {
        enemyX = traget
        moving = "waiting"
    }  
    if (moving === "waiting") {
        setTimeout( () => Emoving(), 1000) 
    }
    requestAnimationFrame(Efacing);
}

Emoving();
Efacing();