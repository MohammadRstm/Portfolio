class Ghost {
    constructor(id, x, y, width, height, speed, imageY, imageX, imageWidth, imageHeight, range) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.direction = DIRECTION_RIGHT;
        this.nextDirection = this.direction;
        this.currentFrame = 1;
        this.frameCount = 7;
        this.imageX = imageX;
        this.imageHeight = imageHeight;
        this.imageWidth = imageWidth;
        this.imageY = imageY;
        this.range = range;
        this.randomTargetIndex = parseInt(Math.random() * randomTargetsGhosts.length);
        
        // Only set random direction change interval for non-red ghosts
        if (id !== 0) {
            setInterval(() => {
                this.changeRandomeDirection();
            }, 10000);
        }
    }
    

changeRandomeDirection() {
        this.randomTargetIndex += 1;
        this.randomTargetIndex = this.randomTargetIndex % 4;
}

moveProcess() {
        // if pacman ate a pelet enter firghtened mode
        if (eatenPowerPelet){
            const pacmanX = pacman.getMapX();
            const pacmanY = pacman.getMapY();
            const ghostX = this.getMapX();
            const ghostY = this.getMapY();
            
            let targetX, targetY;
            const tilesAhead = 4;
            
               
                switch(pacman.direction) {// move with the direction of pacman therefore moving away
                    case DIRECTION_LEFT:
                        targetX = this.calculateSafePosition(pacmanX, pacmanY, +tilesAhead, 0);
                        targetY = pacmanY;
                        break;
                    case DIRECTION_RIGHT:
                        targetX = this.calculateSafePosition(pacmanX, pacmanY, -tilesAhead, 0);
                        targetY = pacmanY;
                        break;
                    case DIRECTION_UP:
                        // Original game bug behavior (4 up and 4 left)
                        targetX = this.calculateSafePosition(pacmanX, pacmanY, +tilesAhead, +tilesAhead);
                        targetY = this.calculateSafePosition(pacmanY, pacmanX, +tilesAhead, +tilesAhead, true);
                        break;
                    case DIRECTION_BOTTOM:
                        targetY = this.calculateSafePosition(pacmanY, pacmanX, -tilesAhead, -tilesAhead, true);
                        targetX = pacmanX;
                        break;
                    default:
                        targetX = pacmanX;
                        targetY = pacmanY;
                }
          
            this.target = this.validateTargetPosition(targetX, targetY, pacmanX, pacmanY);
            
            // Find path with fallback logic
            this.calculateFrightenedModeMovement();
        }
        else if (this.id === 0) { // Red ghost (Blinky) - always chases directly
            this.target = pacman;
            const path = this.findPathToTarget(pacman.getMapX(), pacman.getMapY());
            if (path && path.length > 0) {
                this.nextDirection = path[0];
            }
        }else if (this.id === 1) { // Orange ghost (Clyde) - hybrid behavior
            const distance = Math.abs(pacman.getMapX() - this.getMapX()) + 
                            Math.abs(pacman.getMapY() - this.getMapY());
            
            if (distance > 8) {
                // Chase mode
                this.target = pacman;
                const path = this.findPathToTarget(pacman.getMapX(), pacman.getMapY());
                if (path && path.length > 0) {
                    this.nextDirection = path[0];
                }
            } else {
                // Scatter mode - bottom left corner
                const scatterTarget = { x: 0, y: map.length - 1 };
                const path = this.findPathToTarget(scatterTarget.x, scatterTarget.y);
                if (path && path.length > 0) {
                    this.nextDirection = path[0];
                } else {
                    // If no path to corner, choose random direction
                    const directions = this.getPossibleDirections();
                    if (directions.length > 0) {
                        this.nextDirection = directions[Math.floor(Math.random() * directions.length)];
                    }
                }
            }
        }else if (this.id === 2) { // Pink ghost (Pinky)
            const pacmanX = pacman.getMapX();
            const pacmanY = pacman.getMapY();
            const ghostX = this.getMapX();
            const ghostY = this.getMapY();
            
            // Calculate Manhattan distance
            const distance = Math.abs(pacmanX - ghostX) + Math.abs(pacmanY - ghostY);
            
            // Determine target based on distance
            let targetX, targetY;
            const tilesAhead = 4;
            
            if (distance < 5 || this.isPacmanAgainstWall()) {
                // Chase directly when close OR when Pac-Man is against a wall
                targetX = pacmanX;
                targetY = pacmanY;
            } else {
                // Calculate ambush position with enhanced boundary checks
                switch(pacman.direction) {
                    case DIRECTION_LEFT:
                        targetX = this.calculateSafePosition(pacmanX, pacmanY, -tilesAhead, 0);
                        targetY = pacmanY;
                        break;
                    case DIRECTION_RIGHT:
                        targetX = this.calculateSafePosition(pacmanX, pacmanY, tilesAhead, 0);
                        targetY = pacmanY;
                        break;
                    case DIRECTION_UP:
                        // Original game bug behavior (4 up and 4 left)
                        targetX = this.calculateSafePosition(pacmanX, pacmanY, -tilesAhead, -tilesAhead);
                        targetY = this.calculateSafePosition(pacmanY, pacmanX, -tilesAhead, -tilesAhead, true);
                        break;
                    case DIRECTION_BOTTOM:
                        targetY = this.calculateSafePosition(pacmanY, pacmanX, tilesAhead, tilesAhead, true);
                        targetX = pacmanX;
                        break;
                    default:
                        targetX = pacmanX;
                        targetY = pacmanY;
                }
            }
            
            // Create target object with path validation
            this.target = this.validateTargetPosition(targetX, targetY, pacmanX, pacmanY);
            
            // Find path with fallback logic
            this.calculatePinkyMovement();
        }else if (this.id === 3) { // Blue ghost (Inky)
            const pacmanX = pacman.getMapX();
            const pacmanY = pacman.getMapY();
            const blinky = ghosts[0]; // Blinky is always ghost[0]
            
            // 1. Calculate point 2 tiles ahead of Pac-Man (considering direction)
            let targetAheadX = pacmanX;
            let targetAheadY = pacmanY;
            const tilesAhead = 2;
            
            switch(pacman.direction) {
                case DIRECTION_LEFT:
                    targetAheadX = Math.max(0, pacmanX - tilesAhead);
                    break;
                case DIRECTION_RIGHT:
                    targetAheadX = Math.min(map[0].length - 1, pacmanX + tilesAhead);
                    break;
                case DIRECTION_UP:
                    // Original game behavior: up also moves left
                    targetAheadX = Math.max(0, pacmanX - tilesAhead);
                    targetAheadY = Math.max(0, pacmanY - tilesAhead);
                    break;
                case DIRECTION_BOTTOM:
                    targetAheadY = Math.min(map.length - 1, pacmanY + tilesAhead);
                    break;
            }
            
            // 2. Calculate vector from Blinky to the point ahead of Pac-Man
            const vectorX = targetAheadX - blinky.getMapX();
            const vectorY = targetAheadY - blinky.getMapY();
            
            // 3. Double the vector length (classic Inky behavior)
            const targetX = targetAheadX + vectorX;
            const targetY = targetAheadY + vectorY;
            
            // 4. Create validated target
            this.target = this.validateTargetPosition(
                Math.max(0, Math.min(map[0].length - 1, targetX)),
                Math.max(0, Math.min(map.length - 1, targetY)),
                pacmanX,
                pacmanY
            );
           
            this.calculateInkyMovement();
        }
        this.changeDirectionIfPossible();
        this.moveForwards();
        if (this.checkCollisions()) {
            this.moveBackwords();
        }
}

isPacmanAgainstWall() {
    // Check if Pac-Man is currently colliding with a wall
    const nextX = pacman.x + (pacman.direction === DIRECTION_LEFT ? -1 : 
                  pacman.direction === DIRECTION_RIGHT ? 1 : 0) * pacman.speed;
    const nextY = pacman.y + (pacman.direction === DIRECTION_UP ? -1 : 
                  pacman.direction === DIRECTION_BOTTOM ? 1 : 0) * pacman.speed;
    
    const mapX = Math.floor(nextX / oneBlockSize);
    const mapY = Math.floor(nextY / oneBlockSize);
    
    return map[mapY][mapX] === 1;
}

calculateSafePosition(baseCoord, otherCoord, offset, otherOffset, isY = false) {
    let newCoord = baseCoord + offset;
    const maxCoord = isY ? map.length - 1 : map[0].length - 1;
    
    // If would go beyond boundaries
    if (newCoord < 0 || newCoord > maxCoord) {
        // Check if path to Pac-Man is blocked
        const step = offset > 0 ? 1 : -1;
        let blocked = false;
        for (let i = 0; i < Math.abs(offset); i++) {
            const testCoord = baseCoord + (i * step);
            if (isY) {
                if (map[testCoord][otherCoord] === 1) {
                    blocked = true;
                    break;
                }
            } else {
                if (map[otherCoord][testCoord] === 1) {
                    blocked = true;
                    break;
                }
            }
        }
        
        if (blocked) {
            // If path is blocked, stay closer to Pac-Man
            return baseCoord + (offset > 0 ? 1 : -1);
        } else {
            // If path is clear but would wrap, allow it
            return (newCoord < 0) ? maxCoord : 0;
        }
    }
    return newCoord;
}

validateTargetPosition(targetX, targetY, pacmanX, pacmanY) {
    // Ensure target is walkable
    if (map[targetY][targetX] !== 1) {
        return { 
            x: targetX * oneBlockSize,
            y: targetY * oneBlockSize,
            getMapX: () => targetX,
            getMapY: () => targetY
        };
    }
    
    const directions = [
        {dx: 0, dy: 0},   
        {dx: 1, dy: 0},   
        {dx: -1, dy: 0},  
        {dx: 0, dy: 1},   
        {dx: 0, dy: -1}   
    ];
    
    for (const dir of directions) {
        const testX = targetX + dir.dx;
        const testY = targetY + dir.dy;
        if (testX >= 0 && testX < map[0].length &&
            testY >= 0 && testY < map.length &&
            map[testY][testX] !== 1) {
            return { 
                x: testX * oneBlockSize,
                y: testY * oneBlockSize,
                getMapX: () => testX,
                getMapY: () => testY
            };
        }
    }
    
    // Default to Pac-Man's position if no valid target found
    return { 
        x: pacmanX * oneBlockSize,
        y: pacmanY * oneBlockSize,
        getMapX: () => pacmanX,
        getMapY: () => pacmanY
    };
}

calculatePinkyMovement() {
    const path = this.findPathToTarget(
        Math.floor(this.target.x / oneBlockSize),
        Math.floor(this.target.y / oneBlockSize)
    );
    
    if (path && path.length > 0) {
        this.nextDirection = path[0];
    } else {
        // Fallback to chasing Pac-Man directly
        const fallbackPath = this.findPathToTarget(
            pacman.getMapX(),
            pacman.getMapY()
        );
        this.nextDirection = fallbackPath && fallbackPath.length > 0 
            ? fallbackPath[0] 
            : this.getRandomValidDirection();
    }
}

calculateFrightenedModeMovement() {
    const path = this.findPathToTarget(
        Math.floor(this.target.x / oneBlockSize),
        Math.floor(this.target.y / oneBlockSize)
    );
    
    if (path && path.length > 0) {
        this.nextDirection = path[0];
    } else {
        // fallback to moving randomely
        this.nextDirection =this.getRandomValidDirection();
    }
}


calculateInkyMovement() {
    const targetX = Math.floor(this.target.x / oneBlockSize);
    const targetY = Math.floor(this.target.y / oneBlockSize);
    const pacmanX = pacman.getMapX();
    const pacmanY = pacman.getMapY();
    
    // Try primary target first
    let path = this.findPathToTarget(targetX, targetY);
    
    if (!path || path.length === 0) {
        // Fallback 1: Try point ahead of Pac-Man
        let aheadX, aheadY;
        const tilesAhead = 2;
        
        switch(pacman.direction) {
            case DIRECTION_LEFT: 
                aheadX = pacmanX - tilesAhead; 
                aheadY = pacmanY;
                break;
            case DIRECTION_RIGHT: 
                aheadX = pacmanX + tilesAhead; 
                aheadY = pacmanY;
                break;
            case DIRECTION_UP: 
                aheadX = pacmanX - tilesAhead; // Classic bug
                aheadY = pacmanY - tilesAhead;
                break;
            case DIRECTION_BOTTOM: 
                aheadX = pacmanX;
                aheadY = pacmanY + tilesAhead;
                break;
        }
        
        path = this.findPathToTarget(
            Math.max(0, Math.min(map[0].length - 1, aheadX)),
            Math.max(0, Math.min(map.length - 1, aheadY))
        );
    }
    
    if (!path || path.length === 0) {
        // Fallback 2: Chase Pac-Man directly
        path = this.findPathToTarget(pacmanX, pacmanY);
    }
    
    if (path && path.length > 0) {
        this.nextDirection = path[0];
    } else {
        // Final fallback: Random valid direction
        const directions = this.getPossibleDirections();
        if (directions.length > 0) {
            this.nextDirection = directions[Math.floor(Math.random() * directions.length)];
        }
    }
}

getRandomValidDirection() {
    const directions = this.getPossibleDirections();
    return directions.length > 0 
        ? directions[Math.floor(Math.random() * directions.length)]
        : this.direction; // Default to current direction if no options
}

    // Unified pathfinding method
    findPathToTarget(targetX, targetY) {
        const start = { x: this.getMapX(), y: this.getMapY() };
        
        // If already at target
        if (start.x === targetX && start.y === targetY) return null;
        
        const queue = [{ x: start.x, y: start.y, path: [] }];
        const visited = new Set();
        visited.add(`${start.x},${start.y}`);
        
        while (queue.length > 0) {
            const current = queue.shift();
            
            const directions = [
                { dx: 1, dy: 0, dir: DIRECTION_RIGHT },
                { dx: -1, dy: 0, dir: DIRECTION_LEFT },
                { dx: 0, dy: 1, dir: DIRECTION_BOTTOM },
                { dx: 0, dy: -1, dir: DIRECTION_UP }
            ];
            
            for (const {dx, dy, dir} of directions) {
                const nx = current.x + dx;
                const ny = current.y + dy;
                const key = `${nx},${ny}`;
                
                if (nx >= 0 && nx < map[0].length &&
                    ny >= 0 && ny < map.length &&
                    map[ny][nx] !== 1 &&
                    !visited.has(key)) {
                    
                    if (nx === targetX && ny === targetY) {
                        return [...current.path, dir];
                    }
                    
                    visited.add(key);
                    queue.push({ 
                        x: nx, 
                        y: ny, 
                        path: [...current.path, dir] 
                    });
                }
            }
        }
        return null;
    }

    getPossibleDirections() {
        const directions = [];
        const x = this.getMapX();
        const y = this.getMapY();
        
        // Check possible directions (no 180-degree turns)
        if (x < map[0].length - 1 && map[y][x + 1] !== 1 && this.direction !== DIRECTION_LEFT) {
            directions.push(DIRECTION_RIGHT);
        }
        if (x > 0 && map[y][x - 1] !== 1 && this.direction !== DIRECTION_RIGHT) {
            directions.push(DIRECTION_LEFT);
        }
        if (y < map.length - 1 && map[y + 1][x] !== 1 && this.direction !== DIRECTION_UP) {
            directions.push(DIRECTION_BOTTOM);
        }
        if (y > 0 && map[y - 1][x] !== 1 && this.direction !== DIRECTION_BOTTOM) {
            directions.push(DIRECTION_UP);
        }
        
        return directions.length > 0 ? directions : [this.direction];
    }

    moveBackwords() {
        switch (this.direction) {
            case DIRECTION_RIGHT: this.x -= this.speed; break;
            case DIRECTION_LEFT: this.x += this.speed; break;
            case DIRECTION_BOTTOM: this.y -= this.speed; break;
            case DIRECTION_UP: this.y += this.speed; break;
        }
    }

    moveForwards() {
        switch (this.direction) {
            case DIRECTION_RIGHT: this.x += this.speed; break;
            case DIRECTION_LEFT: this.x -= this.speed; break;
            case DIRECTION_BOTTOM: this.y += this.speed; break;
            case DIRECTION_UP: this.y -= this.speed; break;
        }
    }

    checkCollisions() {
        return (
            map[this.getMapY()][this.getMapX()] == 1 ||
            map[this.getMapYRightSide()][this.getMapX()] == 1 ||
            map[this.getMapY()][this.getMapXRightSide()] == 1 ||
            map[this.getMapYRightSide()][this.getMapXRightSide()] == 1
        );
    }

    isInRangePacman() {
        const xDist = Math.abs(pacman.getMapX() - this.getMapX());
        const yDist = Math.abs(pacman.getMapY() - this.getMapY());
        return Math.sqrt(xDist * xDist + yDist * yDist) <= this.range;
    }

    changeDirectionIfPossible() {
        // Only change direction at grid intersections
        if (this.x % oneBlockSize !== 0 || this.y % oneBlockSize !== 0) {
            return;
        }

        const tempDirection = this.direction;
        
        // For red/orange ghosts, use pre-calculated nextDirection
        if (this.id === 0 || this.id === 1) {
            this.direction = this.nextDirection || tempDirection;
        } 
        // Other ghosts use original targeting
        else {
            this.direction = this.calculateNewDirection(
                map,
                Math.floor(this.target.x / oneBlockSize),
                Math.floor(this.target.y / oneBlockSize)
            ) || tempDirection;
        }

        // Validate the direction change
        this.moveForwards();
        if (this.checkCollisions()) {
            this.moveBackwords();
            this.direction = tempDirection;
        } else {
            this.moveBackwords();
        }
    }

    calculateNewDirection(map, destX, destY) {
        let mp = [];
        for (let i = 0; i < map.length; i++) mp[i] = map[i].slice();
        
        let queue = [{
            x: this.getMapX(),
            y: this.getMapY(),
            moves: []
        }];

        while (queue.length > 0) {
            let current = queue.shift();
            if (current.x == destX && current.y == destY) {
                return current.moves[0];
            }
            
            mp[current.y][current.x] = 1;
            let neighbors = this.addNeighbors(current, mp);
            queue.push(...neighbors);
        }
        return DIRECTION_UP;
    }

    addNeighbors(poped, mp) {
        let queue = [];
        const {x, y} = poped;

        if (x - 1 >= 0 && mp[y][x - 1] != 1) {
            queue.push({
                x: x - 1, y,
                moves: [...poped.moves, DIRECTION_LEFT]
            });
        }
        if (x + 1 < map[0].length && mp[y][x + 1] != 1) {
            queue.push({
                x: x + 1, y,
                moves: [...poped.moves, DIRECTION_RIGHT]
            });
        }
        if (y - 1 >= 0 && mp[y - 1][x] != 1) {
            queue.push({
                x, y: y - 1,
                moves: [...poped.moves, DIRECTION_UP]
            });
        }
        if (y + 1 < map.length && mp[y + 1][x] != 1) {
            queue.push({
                x, y: y + 1,
                moves: [...poped.moves, DIRECTION_BOTTOM]
            });
        }

        return queue;
    }

    changeAnimmation() {
        this.currentFrame = this.currentFrame == this.frameCount ? 1 : this.currentFrame + 1;
    }

    draw() {
        canvasContext.save();
        canvasContext.drawImage(
            ghostFrames,
            this.imageX,
            this.imageY,
            this.imageWidth,
            this.imageHeight,
            this.x,
            this.y,
            this.width,
            this.height
        );
        canvasContext.restore();
    }

    getMapX() {
        return Math.floor(this.x / oneBlockSize);
    }

    getMapY() {
        return Math.floor(this.y / oneBlockSize);
    }

    getMapXRightSide() {
        return Math.floor((this.x + 0.999 * oneBlockSize) / oneBlockSize);
    }

    getMapYRightSide() {
        return Math.floor((this.y + 0.999 * oneBlockSize) / oneBlockSize);
    }
}