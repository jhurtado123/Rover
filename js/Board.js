class Board {

    constructor(width, height, rovers) {
        this.widthX = width;
        this.heightY = height;
        this.rovers = rovers;
        this.obstacles = [];
    }

    getRoverById(id) {
        let response = '';
        this.rovers.forEach(rover => {
            if (rover.id === id) response = rover;
        });

        return response;
    }

    isPosibleToMove(coords) {
        const x = coords[0];
        const y = coords[1];
        if (x >= 0 && x < this.widthX && y >= 0 && y < this.heightY ) {
           if (!this.isThereARover(x, y) && !this.isThereAnObstacle(x, y)) {
               return true;
           }
        }
        return false;
    }

    isThereARover(x, y) {
        let response = false;
        this.rovers.forEach(rover => {
           if (this._isSameCoor([rover.position.x, rover.position.y], [x, y])) {
               response = true;
           }

        });

        return response;
    }

    isThereAnObstacle(x, y) {
        let response = false;
        this.obstacles.forEach(obstacle => {
            if (this._isSameCoor([obstacle[0], obstacle[1]], [x, y])) {
                response = true;
            }

        });

        return response;
    }

    _isSameCoor(coorOne, coorTwo) {
        return JSON.stringify(coorOne) === JSON.stringify(coorTwo);
    }


}