const canvas = document.getElementById("canvas");
const canvasContext = canvas.getContext("2d");
const pacmanFrames = document.getElementById("animations");
const ghostFrames = document.getElementById("ghosts");
const focusModeButton = document.querySelector(".focus-button");
const stopFocusModeButton = document.querySelector(".stop-focus-mode-button");
const body = document.body;
// Objectives for game : 
// 1. Add ability to change game setting s.a speed , fps , number of ghosts..
// 2. Add more sound effects for ex(eating an energizer , when clicking a menu button exct..) -- needs fixing
// 3. Fix the frightened mode for ghosts 
// 4. fix spawn offsets for different maps
// 5. seperate files 
// 6. Don't forget to remove focus mode 



// Game Maps

let Maps = [
   [
    [1,1,1,1,1, 1,1,1,1,1, 1,1,1,1,1 ,1,1,1,1,1  ,1],
    [1,2,2,2,2, 2,2,2,2,2, 1,2,2,2,2 ,2,2,2,2,2  ,1],
    [1,2,1,1,1, 2,1,1,1,2, 1,2,1,1,1 ,2,1,1,1,2  ,1],
    [1,2,1,1,1, 2,1,1,1,2, 1,2,1,1,1 ,2,1,1,1,2  ,1],
    [1,2,2,2,2, 2,2,2,2,2, 2,2,2,2,2 ,2,2,2,2,2  ,1],
    [1,2,1,1,1, 2,1,2,1,1, 1,1,1,2,1 ,2,1,1,1,2  ,1],
    [1,2,2,2,2, 2,1,2,2,2, 1,2,2,2,1 ,2,2,2,2,2  ,1],
    [1,1,1,1,1, 2,1,1,1,2, 1,2,1,1,1 ,2,1,1,1,1  ,1],
    [0,0,0,0,1, 2,1,2,2,2, 2,2,2,2,1 ,2,1,0,0,0  ,0],
    [1,1,1,1,1, 2,1,2,1,1, 2,1,1,2,1 ,2,1,1,1,1  ,1],
    [1,5,2,2,2, 2,2,2,1,2, 2,2,1,2,2 ,2,2,2,2,5  ,1],
    [1,1,1,1,1, 2,1,2,1,2, 2,2,1,2,1 ,2,1,1,1,1  ,1],
    [0,0,0,0,1, 2,1,2,1,1, 1,1,1,2,1 ,2,1,0,0,0  ,0],
    [0,0,0,0,1, 2,1,2,2,2, 2,2,2,2,1 ,2,1,0,0,0  ,0],
    [1,1,1,1,1, 2,2,2,1,1, 1,1,1,2,2 ,2,1,1,1,1  ,1],
    [1,2,2,2,2, 2,2,2,2,2, 1,2,2,2,2 ,2,2,2,2,2  ,1],
    [1,2,1,1,1, 2,1,1,1,2, 1,2,1,1,1 ,2,1,1,1,2  ,1],
    [1,2,2,5,1, 2,2,2,2,2, 2,2,2,2,2 ,2,1,5,2,2  ,1],
    [1,1,2,2,1, 2,1,2,1,1, 1,1,1,2,1 ,2,1,2,2,1  ,1],
    [1,2,2,2,2, 2,1,2,2,2, 1,2,2,2,1 ,2,2,2,2,2  ,1],
    [1,2,1,1,1, 1,1,1,1,2, 1,2,1,1,1 ,1,1,1,1,2  ,1],
    [1,2,2,2,2, 2,2,2,2,2, 2,2,2,2,2 ,2,2,2,2,2  ,1],
    [1,1,1,1,1, 1,1,1,1,1, 1,1,1,1,1 ,1,1,1,1,1  ,1],
], 
[
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,2,2,2,2,2,2,1,2,2,2,2,2,1,2,2,2,2,2,2,1],
  [1,2,1,1,1,1,2,1,1,1,2,1,1,1,2,1,1,1,1,2,1],
  [1,5,1,0,0,1,2,2,2,1,2,1,2,2,2,1,0,0,1,5,1],
  [1,2,1,1,0,1,1,1,2,1,2,1,2,1,1,1,0,1,1,2,1],
  [1,2,2,2,2,2,2,1,2,2,2,2,2,1,2,2,2,2,2,2,1],
  [1,2,1,1,1,1,2,1,1,1,1,1,1,1,2,1,1,1,1,2,1],
  [1,2,2,2,2,1,2,2,2,2,2,2,2,2,2,1,2,2,2,2,1],
  [1,1,1,1,2,1,1,1,2,1,2,1,2,1,1,1,2,1,1,1,1],
  [3,3,3,1,2,2,2,1,2,1,2,1,2,1,2,2,2,1,3,3,3],
  [1,1,1,1,1,1,2,1,2,1,5,1,2,1,2,1,1,1,1,1,1],
  [1,2,2,2,2,2,2,2,2,1,1,1,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,1,1,2,1,1,1,1,1,1,1,2,1,1,1,1,2,1],
  [1,5,1,0,0,1,2,2,2,2,2,2,2,2,2,1,0,0,1,5,1],
  [1,2,1,1,0,1,2,1,1,1,1,1,1,1,2,1,0,1,1,2,1],
  [1,2,2,2,2,2,2,1,2,2,2,2,2,1,2,2,2,2,2,2,1],
  [1,2,1,1,1,1,2,1,1,1,2,1,1,1,2,1,1,1,1,2,1],
  [1,2,2,2,2,1,2,2,2,2,2,2,2,2,2,1,2,2,2,2,1],
  [1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
],
[
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,2,2,2,2,1,2,2,2,2,2,2,2,2,2,1,2,2,2,2,1],
  [1,2,1,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,1,2,1],
  [1,2,1,5,2,1,2,1,5,1,2,1,5,1,2,1,2,1,5,2,1],
  [1,2,1,1,2,1,2,1,1,1,2,1,1,1,2,1,2,1,1,2,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,1,1,2,1,1,1,2,1,1,1,2,1,1,1,1,2,1],
  [1,2,1,0,0,1,2,1,0,0,0,0,0,1,2,1,0,0,1,2,1],
  [1,2,1,0,0,1,2,1,0,1,2,1,0,1,2,1,0,0,1,2,1],
  [1,2,1,1,1,1,2,1,1,1,5,1,1,1,2,1,1,1,1,2,1],
  [1,2,2,2,2,2,2,2,2,1,1,1,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,1,1,2,1,1,1,1,1,1,1,2,1,1,1,1,2,1],
  [1,2,1,0,0,1,2,1,0,0,0,0,0,1,2,1,0,0,1,2,1],
  [1,2,1,0,0,1,2,1,0,1,1,1,0,1,2,1,0,0,1,2,1],
  [1,2,1,1,1,1,2,1,1,1,1,1,1,1,2,1,1,1,1,2,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,1,1,2,1,1,1,2,1,1,1,2,1,1,1,1,2,1],
  [1,2,1,5,1,1,2,1,5,1,2,1,5,1,2,1,1,1,5,2,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
]
];

// get the correct map to play from url
const urlParams = new URLSearchParams(window.location.search);
const mapIndex = urlParams.get('map');
console.log("Map index:", mapIndex);



// game map
let map = Maps[mapIndex];

// game state
let gameState = 'start';


// building blocks
let createRect = (x,y,width,height,color) =>{
    canvasContext.fillStyle = color;
    canvasContext.fillRect(x , y , width , height)
}
let createCircle = (x, y, radius, color) => {
    canvasContext.beginPath();
    canvasContext.fillStyle = color;
    canvasContext.arc(x, y, radius, 0, Math.PI * 2);
    canvasContext.fill();
    canvasContext.closePath();
};
let createCircleForPowerPelets = (x, y, radius, color, opacity = 1) => {
    canvasContext.save();
    canvasContext.globalAlpha = opacity;
    canvasContext.shadowBlur = 15;
    canvasContext.shadowColor = color;
    canvasContext.beginPath();
    canvasContext.fillStyle = color;
    canvasContext.arc(x, y, radius, 0, Math.PI * 2);
    canvasContext.fill();
    canvasContext.closePath();

    canvasContext.restore();
};

// end of building blocks

// game's fps (how many times update is called)
let fps = 30;
// game in hard mode 
let gameInHardMode = false;

// Sounds Preloader
function preloadSounds() {
    const sounds = [
        'sounds/start_up_music.mp3',
        'sounds/eating_energizer.mp3',
        'sounds/eating_ghost.mp3',
        'sounds/game-over.mp3',
        'sounds/pacman_eating_sound.mp3',
        'sounds/winner_winner.mp3'
    ];
    
    sounds.forEach(sound => {
        new Audio(sound).load();
    });
}
// wall's settings
let oneBlockSize = 20;
let wallColor = "#342DCA";
let wallSpaceWidth = oneBlockSize / 1.5;
let wallOffset = (oneBlockSize - wallSpaceWidth) / 2;
let wallInnerColor = "black";

// food's settings 
    // get food count
let getFoodCount = () =>{
    let counter = 0;
    for (let i = 0; i < map.length; i++){
        for (let j = 0; j < map[0].length; j++){
            if (map[i][j] === 2){
                counter++;
            }
        }
    }
    console.log(counter)
    return counter;
}
let foodColor = "#FEB897";
let score = 0;
let eating = false;
let foodCount = getFoodCount();
let eatingTimer = 10;

//Power pelets 
const powerPeletColor = "#FFFFFF";
let powerPelletOpacity = 1;
let opacityDirection = -1;
let frameCount = 0;
let eatenPowerPelet = 0;

// ghost's Settings 
const ghostSpawnPoints = [
  { x: 9, y: 10 },  
  { x: 10, y: 2 }, 
  { x: 10, y: 7 } 
];
let ghostCount = 4;
const spriteWidth = 176;// width of each ghost
const spriteHeight = 121;// height of each ghost
let speedIncreased = false;
let ghosts = [];
let ghostLocations = [
    {x : 0,y : 0},
    {x : 176,y : 0},
    {x : 0, y: 121},
    {x : 176, y: 121},
];
let randomTargetsGhosts = [
    {x : 1 * oneBlockSize , y: 1 * oneBlockSize },
    {x : 1 * oneBlockSize , y: (map.length - 2) * oneBlockSize},
    {x : (map[0].length - 2) * oneBlockSize, y: oneBlockSize },
    {x : (map[0].length - 2) * oneBlockSize, y: (map.length - 2) * oneBlockSize },
];
// Directions
const DIRECTION_RIGHT = 4;
const DIRECTION_UP = 3;
const DIRECTION_LEFT = 2;
const DIRECTION_BOTTOM = 1;

// pacman's Settings
let lives = 3
let isDying = false


// game sounds 
let gameOverSound = new Audio('sounds/game-over.mp3');
const eatingSound = new Audio('sounds/pacman_eating_sound.mp3');
const winSound = new Audio('sounds/winner_winner.mp3');

// focus Mode 
let currentSoundIndex= 0;
let currentAudio = null;
// focus mode songs
const focusSounds = [
    new Audio('sounds/latmeyet_1.mp4'),
    new Audio('sounds/latmeyet_2.mp4'),
    new Audio('sounds/latmeyet_3.mp4'),
    new Audio('sounds/latmeyet_4.mp4'),
];

focusModeButton.addEventListener("click" , () =>{
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }
    
    currentAudio = focusSounds[currentSoundIndex];
    currentAudio.loop = true;
    currentAudio.play();
    currentSoundIndex = (currentSoundIndex + 1) % focusSounds.length;
    
});

stopFocusModeButton.addEventListener("click" , () =>{
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }
});
// end of focus Mode

// play game sounds
let playStartUpSound = () =>{
    startUpSound.play();
}

let playGhostSounds = () =>{
    ghostsSound.play();
}


let playEatingEnergizerSound = () =>{
    eatingEnergizerSound.currentTime = 0
    eatingEnergizerSound.play();
}

let playEatingGhostSound = () =>{
    eatingGhostSound.currentTime = 0;
    eatingGhostSound.play();
}


// game loop
let gamelooop = () =>{
    draw()
    update()
}
let gameInterval = setInterval(gamelooop , 1000 / fps);// game loop called every 1000/fps milliseconds



let update = () =>{
    if (!isDying){// while pacman is still alive
        let sentFromUpdate = 0;
        pacman.moveProcess();
        pacman.eat();
        makeGameHarder(sentFromUpdate);
       if (eatingTimer > 0) {
        eatingTimer--;
        if (eatingSound.paused) {
            eatingSound.currentTime = 0;
            eatingSound.loop = true;
            eatingSound.volume = 0.1;
            eatingSound.play().catch(() => {});
        }
        } else {
            if (!eatingSound.paused) {
                eatingSound.pause();
            }
        }
        for (let i = 0;i < ghosts.length; i++){
            ghosts[i].moveProcess();
        }

    }
    if(!isDying && pacman.checkGhostCollision()){// if pacman was alive and got hit with a ghost
       if (eatenPowerPelet) {
            let ghostsToRemove = [];

            for (let i = 0; i < ghosts.length; i++) {
                let ghost = ghosts[i];
                if (ghost.getMapX() == pacman.getMapX() &&
                    ghost.getMapY() == pacman.getMapY()) {
                    ghostsToRemove.push(ghost.id);
                    playEatingGhostSound();
                }
            }

            ghostsToRemove.forEach((id) => {
                let index = ghosts.findIndex(g => g.id === id);
                if (index !== -1) ghosts.splice(index, 1);
                reCreateGhost(id);
            });
        }else{
            eatingSound.pause();
            handleDeath()
        }
        return
    }

    if (score == foodCount * 2){
        eatingSound.pause();
        gameWon()
    }
}
let restartGame = () =>{
    createNewPacman()
    createGhosts()
    lives--;

    if (lives == 0){
        return gameOver();
    }

    if (gameInHardMode){
        let sentFromRestart = 1;
        makeGameHarder(sentFromRestart)
    }
   
}
// end of game loop

let glowYellow = () =>{
    if (eatenPowerPelet){
        body.classList.add("glow-background-yellow");
        setTimeout(() => {
            const glowLayer = document.querySelector('body.glow-background-yellow::before');
            body.classList.add("fade-glow");
        }, 6000);
        
        setTimeout(() => {
            body.classList.remove("glow-background-yellow");
            body.classList.remove("fade-glow");
        }, 7000);
    }
}

// death functions
let handleDeath = () =>{
    isDying = true;
        gameOverSound.currentTime = 0
        gameOverSound.play();
        gameOverSound.onended = () => {
            restartGame();  
            isDying = false;
        };
}
let gameOver = () =>{
    drawGameOver();
    body.classList.remove("glow-background-red");
    clearInterval(gameInterval);
    setTimeout(() => {
        location.reload();
    }, 3000);
}
// end of death functions



// gam won 
let gameWon = () =>{
    drawWin();
    body.classList.remove("glow-background-red");
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }
    clearInterval(gameInterval);
    winSound.play();
    winSound.onended = () => {
            location.reload();   
        };
}
// end of game won

// Draw
let drawGameOver = () =>{
    canvasContext.font = "20px Emulogic";
    canvasContext.fillStyle = "white"
    canvasContext.fillText("Game Over!" , 120 , 220);
}
let drawWin = () =>{
    canvasContext.font = "20px Emulogic";
    canvasContext.fillStyle = "white"
    canvasContext.fillText("You Won!" , 120 , 220);
}
let drawLives = () =>{
canvasContext.font = "20px Emulogic";
canvasContext.fillStyle = "white"
canvasContext.fillText("Lives: " , 200 , oneBlockSize * (map.length + 1) + 10)

for (let i = 0 ; i < lives; i++){
    canvasContext.drawImage(
        pacmanFrames , 
        2 * oneBlockSize,
        0,
        oneBlockSize,
        oneBlockSize,
        320 + i * oneBlockSize,
        oneBlockSize * map.length + 10,
        oneBlockSize,
        oneBlockSize
    );
}
}
let drawFoods = () =>{
    for (let i = 0; i < map.length; i++){
        for (let j = 0 ; j < map[0].length ; j++){
            if (map[i][j] == 2){
                  createCircle(
                    j * oneBlockSize + oneBlockSize / 2,  
                    i * oneBlockSize + oneBlockSize / 2,  
                    oneBlockSize / 6,                     
                    foodColor
                );
            }
        }
    }
}
let drawPowerPelets = () =>{
    updatePowerPelletOpacity();
    for (let i = 0; i < map.length; i++){
        for (let j = 0; j < map[0].length; j++){
            if (map[i][j] === 5){
                createCircleForPowerPelets(
                    j * oneBlockSize + oneBlockSize / 2,
                    i * oneBlockSize + oneBlockSize / 2,
                    oneBlockSize / 3,
                    powerPeletColor,
                    powerPelletOpacity // pass the current opacity
                );
            }
        }
    }
}
let updatePowerPelletOpacity = () => {
    frameCount++;
    powerPelletOpacity = 0.5 + 0.5 * Math.sin(frameCount * 0.1);
}
let drawScore = () =>{
    canvasContext.font = "20px Emulogic"
    canvasContext.fillStyle = "white"
    canvasContext.fillText (
        "Score " + score ,
         0 ,
         oneBlockSize * (map.length + 1) + 10)
}
let drawGhosts = () =>{
    for (let i = 0 ; i < ghosts.length; i++){
        ghosts[i].draw();
    }
} 
let draw = () =>{
    if (gameState === 'start'){
        canvasContext.font = "20px Emulogic";
        canvasContext.fillStyle = "white";
        canvasContext.fillText("Press Enter To Start", 10, 220);
        return;
    }
    createRect(0 , 0 , canvas.width , canvas.height , "black")
    drawWalls();
    drawFoods();
    drawScore();
    pacman.draw();
    drawLives();
    drawPowerPelets();
    drawGhosts();
}
let drawWalls = () =>{
    for (let i = 0; i < map.length ; i++){
        for (let j = 0 ; j < map[i].length ; j++){
            if (map[i][j] === 1){
                    createRect(j * oneBlockSize ,
                    i * oneBlockSize ,
                    oneBlockSize ,
                    oneBlockSize ,
                    wallColor
                );
                if (j > 0 && map[i][j - 1] == 1){
                    createRect(
                        j * oneBlockSize ,
                        i * oneBlockSize + wallOffset ,
                        wallSpaceWidth + wallOffset , 
                        wallSpaceWidth ,
                        wallInnerColor
                    )
                }
                if (j < map[0].length - 1 && map[i][j + 1] == 1){
                     createRect(
                        j * oneBlockSize + wallOffset ,
                        i * oneBlockSize + wallOffset ,
                        wallSpaceWidth + wallOffset , 
                        wallSpaceWidth ,
                        wallInnerColor
                    );
                }
                 if (i > 0 && map[i - 1][j] == 1){
                    createRect(
                        j * oneBlockSize + wallOffset ,
                        i * oneBlockSize  ,
                        wallSpaceWidth  , 
                        wallSpaceWidth  + wallOffset,
                        wallInnerColor
                    )
                }
                if (i < map[0].length - 1 && map[i + 1][j] == 1){
                     createRect(
                        j * oneBlockSize + wallOffset ,
                        i * oneBlockSize + wallOffset ,
                        wallSpaceWidth , 
                        wallSpaceWidth + wallOffset ,
                        wallInnerColor
                    );
                }
            }
        }
    }
}
// end of draw


// make game harder
let makeGameHarder = (sentFromRestart) =>{
    let threshold = foodCount * 2 - 40; 
    const snapToGrid = g => {
        g.x = Math.floor(g.x / oneBlockSize) * oneBlockSize;
        g.y = Math.floor(g.y / oneBlockSize) * oneBlockSize;
    };

    if (!isDying && score >= threshold && !speedIncreased) {
        hardModeSound.play();
        ghostsSound.pause();
        ghosts.forEach(g => {
            g.speed = pacman.speed;
            snapToGrid(g);
        });
        speedIncreased = true;
        gameInHardMode = true;
        body.classList.add("glow-background-red");
    }else if (sentFromRestart &&  score >= threshold){
          ghosts.forEach(g => {
            g.speed = pacman.speed;
            snapToGrid(g);
        });
        speedIncreased = true;
        gameInHardMode = true;
        body.classList.add("glow-background-red");
    }
}

// Creation
let createNewPacman = () =>{
    pacman = new Pacman(
        oneBlockSize,
        oneBlockSize,
        oneBlockSize,
        oneBlockSize,
        oneBlockSize /8
    );
};


let createGhosts = () =>{
    ghosts = [];

        
    const spawnX = ghostSpawnPoints[mapIndex].x;
    const spawnY = ghostSpawnPoints[mapIndex].y;

    for (let i = 0 ; i < ghostCount; i++){
        let newGhost = new Ghost(
            i,
            spawnX * oneBlockSize,
            spawnY * oneBlockSize ,
            oneBlockSize,
            oneBlockSize,
            pacman.speed / 2,
            ghostLocations[ i % 4].y,
            ghostLocations[ i % 4].x,
            spriteWidth , spriteHeight,
            6 + i
        )
        ghosts.push(newGhost);
    }
}
let reCreateGhost = (id) =>{
        
    const spawnX = ghostSpawnPoints[mapIndex].x;
    const spawnY = ghostSpawnPoints[mapIndex].y;

       let newGhost = new Ghost(
            id,
            spawnX * oneBlockSize ,
            spawnY * oneBlockSize,
            oneBlockSize,
            oneBlockSize,
            pacman.speed / 2,
            ghostLocations[ id % 4].y,
            ghostLocations[ id % 4].x,
            spriteWidth , spriteHeight,
            6 + id
        )
        ghosts.splice(id , 0 , newGhost);
}
// end of Creation

// input scan
window.addEventListener("keydown" , (event) =>{
    let k = event.keyCode;
        if (k == 37 || k == 65){ // left arrow or A
            pacman.nextDirection = DIRECTION_LEFT;
        } else if (k == 38 || k == 87){ // up arrow or W
            pacman.nextDirection = DIRECTION_UP;
        } else if (k == 39 || k == 68){ // right arrow or D
            pacman.nextDirection = DIRECTION_RIGHT;
        } else if (k == 40 || k == 83){ // down arrow or S
            pacman.nextDirection = DIRECTION_BOTTOM;
        }
    
})
// end of input scan


document.addEventListener("keydown", function(event) {
  if (gameState === 'start' && (event.key === "Enter" || event.key === " ")) {
    gameState = 'playing';
    preloadSounds();
    playStartUpSound();
    createNewPacman();
    createGhosts();
  }
});
gamelooop();
