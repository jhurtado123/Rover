class Controller {

    constructor(mapWidth, mapHeight, numberOfObstacles, rovers) {
        this.board = new Board(mapWidth, mapHeight, rovers);
        this.board.obstacles = this.generateObstacles(mapWidth, mapHeight, numberOfObstacles);

        this.view = new View({
            'x' : mapWidth,
            'y' : mapHeight,
            'obstacles': this.board.obstacles,
            'rovers': this.board.rovers,
        });
        this.view.buildMap();
        this.addViewListeners();
    }

    addViewListeners() {
        this.view.addMoveListener(function (event) {
            console.log(event);
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
        rovers.forEach( rover => {
            if (this._isSameCoor([rover.position.x, rover.position.y], obstacleCoors)) {
                response = true;
            }
        });
        return response;
    }
    _isSameCoor(coorOne, coorTwo) {
        return  JSON.stringify(coorOne) === JSON.stringify(coorTwo);
    }

    _getRandomNumber(max) {
        return Math.floor(Math.random() * max);
    }

}