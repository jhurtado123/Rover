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
    return this.direction;
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
    return this.direction;
  }

  nextPositionIfMoves() {
    switch (this.direction) {
      case 'N':
        return [this.position.x, this.position.y - 1];
      case 'E':
        return [this.position.x + 1, this.position.y];
      case 'S':
        return [this.position.x, this.position.y + 1 ];
      case 'W':
        return [this.position.x - 1, this.position.y];
    }
  }

  moveForward() {
    switch (this.direction) {
      case 'N':
        this.position.y--;
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
    }
  }

  registerLog(position) {
    this.travelLog.push(position)
  }
}
