let rover = {
  position: {
    x: 0,
    y: 0
  },
  direction: 'E',
  travelLog: [],
}

function moveForward(rover) {
  // hace referencia a la variable de la linea 9
  switch (rover.direction) {
    case 'N':
      rover.position.y = rover.position.y - 1;
      // rover.position.y--;
      break;
    case 'E':
      rover.position.x++;
      break;
    case 'S':
      rover.position.y++;
      break;
    case 'W':
      rover.position.x--;
      break;
    default:
      console.log('dirección desconocida');
      break;
  }
}

function turnLeft(rover) {
  switch (rover.direction) {
    case 'N':
      rover.direction = 'W'
      break;
    case 'E':
      rover.direction = 'N'
      break;
    case 'S':
      rover.direction = 'E'
      break;
    case 'W':
      rover.direction = 'S'
      break;
    default:
      console.log('dirección desconocida');
      break;
  }
}

function turnRight(rover) {
  switch (rover.direction) {
    case 'N':
      rover.direction = 'E'
      break;
    case 'E':
      rover.direction = 'S'
      break;
    case 'S':
      rover.direction = 'W'
      break;
    case 'W':
      rover.direction = 'N'
      break;
    default:
      console.log('dirección desconocida');
      break;
  }
}

function registerLog(rover, position) {
  rover.travelLog.push(position);
}

// function canIMoveForward(rover) {

// }

function command(listOfCommands, rover) {
  for (let index = 0; index < listOfCommands.length; index++) {
    switch (listOfCommands[index]) {
      case 'f':
        // if (canIMoveForward(rover)) {
        moveForward(rover);
        registerLog(rover, { x: rover.position.x, y: rover.position.y });
        // }
        break;
      case 'l':
        turnLeft(rover);
        break;
      case 'r':
        turnRight(rover);
        break;
      default:
        console.log('command not found');
        break;
    }

  }
}

command('ffflfff', rover);

console.log(`el rover esta en position x: ${rover.position.x} y: ${rover.position.y} travelLog:`, rover.travelLog);