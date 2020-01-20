class View {

    constructor(args) {
        this.buildMap(args);
    }

    buildMap(builderArgs) {

        if (builderArgs === undefined) return false;

        const WRAPPER_CONTAINER = document.querySelector('#wrapper');
        for (let y = 0; y < builderArgs.y; y++) {
            for (let x = 0; x < builderArgs.x; x++) {
                let classList = 'portion';
                let htmlData = '';
                if (this._isObstaclePortion(builderArgs.obstacles, [x, y])) classList += ' obstacle';
                if (this._isRoverPortion(builderArgs.rovers, [x, y])) {
                    const ROVER = this._whatRoverIsInXY(builderArgs.rovers, [x, y]);
                    classList +=  ` rover ${ROVER.direction}`;
                    htmlData = `data-rover='${ROVER.id}'`;
                }

                WRAPPER_CONTAINER.insertAdjacentHTML('beforeend', `<div class='${classList}' ${htmlData} data-row='${y}' data-column='${x}'></div>`);
            }
        }
        this._resizeMap(builderArgs.x);
    }

    addMoveListener(callback) {
        document.addEventListener('keydown', callback);
    }
    addSelectListener(callback) {
        document.querySelectorAll('.portion').forEach( portion => {
            portion.addEventListener('click', callback);
        })
    }

    _isObstaclePortion(obstacles, portionCoors) {
        let response = false;
        obstacles.forEach( obstacle => {
            if (this._isSameCoor(obstacle, portionCoors)) {
                response = true;
            }
        });
        return response;
    }
    _isRoverPortion(rovers, portionCoors) {
        let response = false;
        rovers.forEach( rover => {
            if (this._isSameCoor([rover.position.x, rover.position.y], portionCoors)) {
                response = true;
            }
        });
        return response;
    }
    _whatRoverIsInXY(rovers, coors) {
        let response = false;
        rovers.forEach( rover => {
            if (this._isSameCoor([rover.position.x, rover.position.y], coors)) {
                response = rover;
            }
        });
        return response;
    }
    _isSameCoor(coorOne, coorTwo) {
       return  JSON.stringify(coorOne) === JSON.stringify(coorTwo);
    }

    _resizeMap(blockXRow) {
        document.querySelectorAll('#wrapper .portion').forEach(portion => portion.style.width = `${blockXRow}%`);
        document.querySelectorAll('#wrapper .portion').forEach(portion => portion.style.height = `${portion.clientWidth}px`);
    }
}