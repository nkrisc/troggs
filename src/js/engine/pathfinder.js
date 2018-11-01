import Stage from './stage.js';

export default class PathFinder {
    constructor(stage) {
        this.stage = stage;
    }

    _aStar(start, goal) {
        let closedSet = new Map();
        let openSet = new Map();
        let gScore = new Map();
        let fScore = new Map();
        let cameFrom = new Map();

        gScore.set(start.string, 0);
        fScore.set(start.string, this._heuristic(start, goal));
        openSet.set(start.string, start);

        while (openSet.size > 0) {

            //Get the member of openSet with the lowest fScore
            let candidate = null;
            let candidate_score = 1000;
            let current;
            openSet.forEach(function(v, k) {
                let score = fScore.get(k);
                if (score < candidate_score) {
                    candidate = v;
                    candidate_score = score;
                }
            });
            current = candidate;

            //Is the current node the goal?
            if (current && current.is(goal)) {
                let path = this._reconstructPath(cameFrom, current).reverse();
                return path;
            }

            openSet.delete(current.string);
            closedSet.set(current.string, current);

            var tentative_gscore = 1000;
            current.neighbors.forEach(function(n, k) {
                if (closedSet.has(k)) return;
                if (Stage.getTile(new Vec(x, y)).passable === false) return;
                openSet.set(k, n);

                tentative_gscore = gScore.get(current.string) + 1;
                if (tentative_gscore >= gScore.get(n.string)) return;

                gScore.set(n.string, tentative_gscore)
                fScore.set(n.string, tentative_gscore + this._heuristic(n, goal, start))
                cameFrom.set(n.string, current);
            });
        }

        //No path
        return false;
    };
    _heuristic(current, goal) {
        //In the future, add weights based on looking up what's at current
        //Golf scoring
        let weight = 0;
        let diagonalCost = 1;
        let straightCost = 1;
        if (!current.is(goal)) {
            if (Stage.find(stage.actors, current)) weight = 80;
        }


        let xdiff = Math.abs(current.x - goal.x);
        let ydiff = Math.abs(current.y - goal.y);
        let diagonal = Math.min(xdiff, ydiff);
        let straight = Math.max(xdiff, ydiff);

        return (straight * straightCost) + (diagonal * diagonalCost) + weight;
    };

    _reconstructPath(cameFrom, current) {
        let path = [current];

        while (cameFrom.has(current.string)) {
            current = cameFrom.get(current.string);
            path.push(current);
        }

        return path;
    }

    path(start, goal) {
        var _path = this._aStar(start, goal);
        return _path ? _path : false;
    }
}

