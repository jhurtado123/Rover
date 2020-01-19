class Rover {
  constructor(posX, posY, direction, ID) {
    this.id = ID;
    this.direction = direction;
    this.position = {
      x: posX,
      y: posY,
    };
    this.travelLog = [];
  }

  turnLeft() {
    switch (this.direction) {
      case 'N':
        this.direction = 'W';
        break;
      case 'E':
        this.direction = 'N';
        break;
      case 'S':
        this.direction = 'E';
        break;
      case 'W':
        this.direction = 'S';
        break;
      default:
        break;
    }
  }

  turnRight() {
    switch (this.direction) {
      case 'N':
        this.direction = 'E';
        break;
      case 'E':
        this.direction = 'S';
        break;
      case 'S':
        this.direction = 'W';
        break;
      case 'W':
        this.direction = 'N';
        break;
      default:
        break;
    }
  }

  moveForward() {
    switch (this.direction) {
      case 'N':
        this.position.y = this.position.y - 1;
        break;
      case 'E':
        this.position.x++;
        break;
      case 'S':
        this.position.y++;
        break;
      case 'W':
        this.position.x--;
        break;
      default:
        break;
    }
  }

  _canMoveNextPosition() {
    let actualPosition = this.position;
    switch (this.direction) {
      case 'N':
        return !(actualPosition.y - 1 <= -1);
        break;
      case 'E':
        return !(actualPosition.x + 1 >= 10);
        break;
      case 'S':
        return !(actualPosition.y + 1 >= 10);
        break;
      case 'W':
        return !(actualPosition.x - 1 <= -1);
        break;
      default:
        console.log('Incorrect Move!')
        break;
    }
  }

  isThereAnObstacle(obstacles) {
    let actualPosition = this.position;
    switch (this.direction) {
      case 'N':
        return this.checkPositionInObstacle({ x: this.position.x, y: this.position.y - 1 }, obstacles);
        break;
      case 'E':
        return this.checkPositionInObstacle({ x: this.position.x + 1, y: this.position.y }, obstacles);;
        break;
      case 'S':
        return this.checkPositionInObstacle({ x: this.position.x, y: this.position.y + 1 }, obstacles);;
        break;
      case 'W':
        return this.checkPositionInObstacle({ x: this.position.x - 1, y: this.position.y }, obstacles);;
        break;
      default:
        console.log('Incorrect direcction!')
        break;
    }
  }

  registerLog(position) {
    this.travelLog.push(position)
  }

  showRoverPosition() {
    console.log(`Rover in position x: ${this.position.x} position y: ${this.position.y} direction: ${rover.direction}`)
  }

  checkPositionInObstacle(position, obstacles) {
    let found = false
    for (let index = 0; index < obstacles.length; index++) {
      if (!found) {
        found = obstacles[index].x === position.x && obstacles[index].y === position.y;
      }
    }
    return found;
  }
}

/**
const rover = new Rover('E');
const rover2 = new Rover('E');

function commands(listOfCommands, rover, obstacles) {
  for (let i = 0; i < listOfCommands.length; i++) {
    switch (listOfCommands[i]) {
      case 'f':
        if (rover.canMoveNextPosition(rover) && !rover.isThereAnObstacle(obstacles)) {
          rover.moveForward(rover);
          // showRoverPosition(rover);
        }
        rover.registerLog(rover, rover.position);
        break;
      case 'l':
        rover.turnLeft(rover);
        // showRoverPosition(rover);
        break;
      case 'r':
        rover.turnRight(rover);
        // showRoverPosition(rover);
        break;
      default:
        break;
    }
    rover.showRoverPosition(rover);
  }
}

commands('fffrf', rover2, [{ x: 3, y: 3 }]);
commands('fffff', rover, [{ x: 3, y: 3 }]);
 **/