class Controller {

    constructor(mapWidth, mapHeight, numberOfObstacles, rovers) {
        this.board = new Board(mapWidth, mapHeight, rovers);
        this.board.obstacles = this.generateObstacles(mapWidth, mapHeight, numberOfObstacles);

        this.view = new View({
            'x': mapWidth,
            'y': mapHeight,
            'obstacles': this.board.obstacles,
            'rovers': this.board.rovers,
        });
        this.view.buildMap();

        this.addViewListeners();
        this.addSelectRoverListeners();

        this.selectedRover = '';
    }

    addViewListeners() {
        this.view.addMoveListener((event) => {
            if (this.selectedRover) {
                const SELECTED_ROVER = document.querySelector(`.portion[data-rover=${this.selectedRover}]`);
                const ROVER_OBJECT = this.board.getRoverById(this.selectedRover);
                switch (event.key) {
                    case "w":
                        //move forward
                        if (this.board.isPosibleToMove(ROVER_OBJECT.nextPositionIfMoves())) {
                            ROVER_OBJECT.moveForward();
                            SELECTED_ROVER.classList.remove('rover', 'selected', 'N', 'S', 'W', 'E');
                            SELECTED_ROVER.removeAttribute('data-rover');
                            const NEXT_POSITION = document.querySelector(`.portion[data-row='${ROVER_OBJECT.position.y}'][data-column='${ROVER_OBJECT.position.x}']`);
                            NEXT_POSITION.classList.add('rover', 'selected', ROVER_OBJECT.direction);
                            NEXT_POSITION.setAttribute('data-rover', ROVER_OBJECT.id);
                        }
                        break;
                    case "a":
                        //turn right
                        SELECTED_ROVER.classList.remove(ROVER_OBJECT.direction);
                        SELECTED_ROVER.classList.add(ROVER_OBJECT.turnLeft());
                        break;
                    case "d":
                        //turn left
                        SELECTED_ROVER.classList.remove(ROVER_OBJECT.direction);
                        SELECTED_ROVER.classList.add(ROVER_OBJECT.turnRight());
                        break;
                }
                this.view.buildMap();
            }
        });
    }


    addSelectRoverListeners() {
        this.view.addSelectListener((event) => {
            if (event.target.classList.contains('rover')) {
                this.selectedRover = event.target.getAttribute('data-rover');
                if (document.querySelector('.selected')) {
                    document.querySelector('.selected').classList.remove('selected');
                }
                document.querySelector('.selected-rover span').innerText = this.selectedRover.toUpperCase();
                event.target.classList.add('selected');
            }
        });
    }

    generateObstacles(mapWidth, mapHeight, numberOfObstacles) {
        let OBSTACLES = [];
        for (let i = 0; i < numberOfObstacles; i++) {
            const RANDOM_X = this._getRandomNumber(mapWidth);
            const RANDOM_Y = this._getRandomNumber(mapHeight);
            if (!this._isARoverPosition(this.board.rovers, [RANDOM_X, RANDOM_Y])) {
                OBSTACLES.push([RANDOM_X, RANDOM_Y]);
            } else {
                i--;
            }
        }
        return OBSTACLES;
    }

    _isARoverPosition(rovers, obstacleCoors) {
        let response = false;
        rovers.forEach(rover => {
            if (this._isSameCoor([rover.position.x, rover.position.y], obstacleCoors)) {
                response = true;
            }
        });
        return response;
    }

    _isSameCoor(coorOne, coorTwo) {
        return JSON.stringify(coorOne) === JSON.stringify(coorTwo);
    }

    _getRandomNumber(max) {
        return Math.floor(Math.random() * max);
    }

}