class Pacman{
    constructor(x , y ,width , height , speed){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.direction = DIRECTION_RIGHT
        this.nextDirection = this.direction;
        this.currentFrame = 1
        this.frameCount = 7;
        this.powerMode = 7000

        setInterval(()=>{
            this.changeAnimmation()
        } , 100)
    }


    moveProcess(){
        this.changeDirectionIfPossible();
        this.moveForwards();
        if (this.checkCollisions()){
            this.moveBackwords()
        }
    }

    

    eat(){
        let ate = false;
        for (let i = 0 ; i < map.length; i++){
            for (let j = 0 ; j < map[0].length; j++){
                if (map[i][j] == 2 &&
                    this.getMapX() == j && this.getMapY() == i
                ){
                    map[i][j] = 3;
                    score += 2;
                    ate = true;
                    eatingTimer = 10;
                }else if (
                    map[i][j] === 5 &&
                    this.getMapX() == j &&
                    this.getMapY() == i
                ){
                    if (!eatenPowerPelet){// need to change implementation to use frightened timer not
                        map[i][j] = 3;
                        eatenPowerPelet = 1;
                        playEatingEnergizerSound();
                        glowYellow();
                        setTimeout( () =>{
                            eatenPowerPelet = 0;
                        } , this.powerMode);
                    }else{
                        eatenPowerPelet = 1;
                        // can't eat unless the previously eaten power pelet is done 
                    }
                }
            }
        }
        eating = ate;
    }


    moveBackwords(){
           switch(this.direction){
        case DIRECTION_RIGHT :
            this.x -= this.speed;
            break;  
        case DIRECTION_LEFT :
            this.x += this.speed;
            break;  
        case DIRECTION_BOTTOM :
            this.y -= this.speed;
            break;  
        case DIRECTION_UP :
            this.y += this.speed;
            break;
    }
    }

    moveForwards(){
        switch(this.direction){
            case DIRECTION_RIGHT :
                this.x += this.speed;
                break;  
                case DIRECTION_LEFT :
                this.x -= this.speed;
                break;  
                case DIRECTION_BOTTOM :
                this.y += this.speed;
                break;  
                case DIRECTION_UP :
                this.y -= this.speed;
                break;
        }
    }

   checkCollisions(){
        if(map[this.getMapY()][this.getMapX()] == 1
        || map[this.getMapYRightSide()][this.getMapX()] == 1
        || map[this.getMapY()][this.getMapXRightSide()] == 1
        || map[this.getMapYRightSide()][this.getMapXRightSide()] == 1){
            return true;
        }
        return false;
    }

    checkGhostCollision(){
       for (let i = 0; i < ghosts.length; i++){
        let ghost = ghosts[i];
        if (ghost.getMapX() == this.getMapX() &&
            ghost.getMapY() == this.getMapY()){
                return true;
            }
       }
       return false;
    }

  changeDirectionIfPossible(){
    if (this.direction == this.nextDirection) return;

    if (
        this.x % oneBlockSize !== 0 ||
        this.y % oneBlockSize !== 0
    ) {
        return;
    }

    let tempDirection = this.direction;
    this.direction = this.nextDirection;
    this.moveForwards();

    if (this.checkCollisions()) {
        this.moveBackwords();
        this.direction = tempDirection;
    } else {
        this.moveBackwords(); // Reset position, keep new direction
    }
}



    changeAnimmation(){
        this.currentFrame = this.currentFrame == this.frameCount ? 1 : this.currentFrame + 1;
    }

    draw(){
        canvasContext.save()
        canvasContext.translate(
            this.x + oneBlockSize / 2 ,
            this.y + oneBlockSize / 2
        );
           let angle = 0;
    switch (this.direction) {
        case DIRECTION_RIGHT:
            angle = 0;
            break;
        case DIRECTION_LEFT:
            angle = Math.PI;
            break;
        case DIRECTION_UP:
            angle = 3 * Math.PI / 2;
            break;
        case DIRECTION_BOTTOM:
            angle = Math.PI / 2;
            break;
    }
        canvasContext.rotate(angle);
         canvasContext.translate(
            -this.x - oneBlockSize / 2 ,
            -this.y - oneBlockSize / 2
        );
        canvasContext.drawImage(
            pacmanFrames , 
            (this.currentFrame - 1) * oneBlockSize,
            0,
            oneBlockSize ,
            oneBlockSize ,
            this.x ,
            this.y ,
            this.width,
            this.height
        );
        canvasContext.restore();
    }

    getMapX(){
        return parseInt(this.x / oneBlockSize);
    } 
    getMapY(){
        return parseInt(this.y / oneBlockSize);
    }

    getMapXRightSide(){
        return parseInt((this.x + 0.999 *  oneBlockSize) / oneBlockSize);
    }
    getMapYRightSide(){
        return parseInt((this.y + 0.999 *  oneBlockSize) / oneBlockSize);
    }
}