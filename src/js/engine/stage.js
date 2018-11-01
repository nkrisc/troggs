import Vec from './utils/vec.js';
import Rect from './utils/rect.js';
import Direction from './utils/direction.js';
import Array2D from './utils/array2d.js';
import Font from './utils/font.js';
import VecMap from './utils/VecMap.js';
import Tile from '../content/tile.js';
import PathFinder from './pathfinder.js';

export default class Stage {
    constructor(width, height) {
        this.w = width;
        this.h = height;


        //this._tiles = [];

        /*
        for (var x = 0; x < width; x++) {
            this._tiles[x] = [];

            for (var y = 0; y < height; y++) {
                this._tiles[x][y] = null;
            }
        }

        */


        this.rooms = [];
        this.actors = [];
        this.actorsByPos = new VecMap();


        this.path = new PathFinder(this);

        this._tiles = new Array2D(width, height);

        this.initialized = false;

    }

    inBounds(vec) {
        if (vec instanceof Vec === false) throw new Error('Pass a Vec to Stage.inBounds');

        //Outside of stage
        if (vec.x < 0 || vec.y < 0 || vec.x >= this.w || vec.y >= this.h) return false;
        return true;
    };

    static findNear(list, vec, range) {
        var results = [];
        list.forEach(function(v) {
            if ((Math.abs(vec.x - v.pos.x) <= range && Math.abs(vec.y - v.pos.y) <= range) && (v.pos.x != vec.x || v.pos.y != vec.y)) {
                results.push(v)
            }
        });

        results.sort(function(a, b){
            if ((Math.abs(vec.x - a.pos.x) + Math.abs(vec.y - a.pos.y)) < (Math.abs(vec.x - b.pos.x) + Math.abs(vec.y - b.pos.y))) {
                return -1;
            }

            if ((Math.abs(vec.x - a.pos.x) + Math.abs(vec.y - a.pos.y)) > (Math.abs(vec.x - b.pos.x) + Math.abs(vec.y - b.pos.y))) {
                return 1;
            }
            return 0;
        });
        return results;
    }

    static findNearest(list, vec, range) {
        let nearest = this.findNear(list, vec.x, vec.y, range);
        return nearest[0]
    }

    static find(list, vec) {
        let candidate = null;
        list.forEach(v => {
            if (vec.x === v.pos.x && vec.y === v.pos.y) candidate = v;
        });
        return candidate;
    }

    removeEntity(entity) {
        this.actors = this.actors.filter(e => {return e !== entity});
    }

    moveActor(actor, newPos) {
        if (newPos instanceof Vec === false) throw Error('Second argument to moveActor must be Vec');
        if (this.inBounds(newPos) && this.getTile(new Vec(newPos.x, newPos.y).passable)) {
            let currentPos = actor.pos;
            game.entitiesByPos.set(`${newPos.x},${newPos.y}`, actor);
            game.entitiesByPos.delete(`${currentPos.x},${currentPos.y}`);
            actor.pos = newPos;
        }
    }

    get tiles() {
        return this._tiles;
    }

    get tile() {
        return this._tile;
    }

    _generateTiles() {
        this._tiles.fill(Tile.stone);

    };

    _addTile(tile, vec) {
        this._tiles.update(vec, tile);
    };

    getTile(vec) {
        return this._tiles.find(vec);
    };

    _generateRooms(attempts) {

        let rooms = [];
        while (attempts > 0) {
            var x = Math.floor(Math.random() * this.w);
            var y = Math.floor(Math.random() * this.h);
            var rh = (Math.floor(Math.random() * 2) + 2) * 2 + 1;
            //Make the width the same as the height +/- a random amount
            var rw = (Math.floor(Math.random() * 2) + 3) * 2 + 1;
            /*var rw = Math.random() > 0.2 ?
             rh - Math.floor((Math.random() * 3 + 1) * 2 + 1) :
             rh + Math.floor((Math.random() * 2 + 1) * 2 + 1) ;*/

            //var rw = 5;
            //var rh = 5;

            var attemptedRoom = new Rect(new Vec(x, y), new Vec(rw, rh));
            var valid = true;

            //Keep all rooms at odd coordinates
            if (attemptedRoom.pos.x % 2 === 0 || attemptedRoom.pos.y % 2 === 0) {
                valid = false;
            }


            //Make sure rooms don't overlap
            rooms.forEach(v => {
                if (attemptedRoom.distanceTo(v) <= 0) valid = false;
            });

            //Make sure rooms don't go outside scene
            if (!this.inBounds(attemptedRoom.pos.add(attemptedRoom.size))) valid = false;

            //Make sure rooms are at least 1 from the edge
            let top = 0;
            let left = 0;
            let right = this.w;
            let bottom = this.h;

            if (attemptedRoom.top <= top + 1) valid = false;
            if (attemptedRoom.left <= left + 1) valid = false;
            if (attemptedRoom.bottom >= bottom - 2) valid = false;
            if (attemptedRoom.right >= right - 2) valid = false;

            //We have a valid room
            if (valid) {
                rooms.push(attemptedRoom)
            }
            attempts--;
        }

        rooms.forEach(r => {
            r.tiles.forEach(t => {
                this._addTile(Tile.floor, t);
            })
        });

        this.rooms = rooms;
        return rooms;
    };

    //Unused, can probably ditch
    _getRandomStart() {
        //Pick a random tile at an odd coordinate
        let startx = 0;
        let starty = 0;
        let validStart = false;
        let attemptedStart;


        while (!validStart) {
            startx = Math.floor((this.w / 2) * Math.random()) * 2 + 1;
            starty = Math.floor((this.h / 2) * Math.random()) * 2 + 1;
            attemptedStart = new Vec(startx, starty);

            validStart = true;
            Direction.cardinal.forEach(d => {
                if (this.getTile(attemptedStart.add(d)) === Tile.floor) validStart = false;
                if (!this.inBounds(attemptedStart.add(d))) validStart = false;
            })
        }

        return attemptedStart;
    };

    _generateCorridors(start) {
        var lastDir = null;

        let tiles = [];

        this._carve(start);
        tiles.push(start);

        while (tiles.length > 0) {
            var tile = tiles[tiles.length - 1];

            var uncarvedTiles = [];

            Direction.cardinal.forEach(d => {
                if (this._canCarve(tile, d)) uncarvedTiles.push(d);
                //console.log(this._canCarve(tile, d), tile, d)
            });

            if (uncarvedTiles.length > 0) {

                var dir;
                //Can we continue in same direction?
                var lastDirPossible = false;
                if (lastDir) {
                    uncarvedTiles.forEach(u => {
                        if (u.is(lastDir)) lastDirPossible = true;
                    });
                }

                if (lastDirPossible && Math.random() > 0.8) {
                    dir = lastDir;
                } else {
                    dir = uncarvedTiles[Math.floor(Math.random() * uncarvedTiles.length)];
                }

                if (this._canCarve(tile, dir)) {
                    this._carve(tile.add(dir));
                    this._carve(tile.add(dir.scale(2)));

                    tiles.push(tile.add(dir.scale(2)));
                    lastDir = dir;
                }
            } else {
                //No uncarved tiles
                tiles.pop();
            }
        }
    };

    _addWallDecorators() {
        let all = new Rect(
            new Vec(0,0),
            new Vec(this.w, this.h)
        );
        all.tiles.forEach(t => {
            if (this.getTile(t) === Tile.stone &&
                this.getTile(t.add(Direction.S)) === Tile.floor) {
                this._addTile(Tile.wall, t);
            }
        });
    };

    _carve(vec) {
        this._addTile(Tile.floor, vec);
    };

    _canCarve(vec, dir) {
        //if (!this.inBounds(vec.add(dir))) return false;
        if (!this._tiles.bounds.contains(vec.add(dir))) return false;
        if (this.getTile(vec.add(dir)) === Tile.floor) return false;

        let check = vec.add(dir.scale(2));
        //if (!this.inBounds(check)) return false;
        if (!this._tiles.bounds.contains(check)) return false;
        return this.getTile(check) !== Tile.floor;
    };

    _pruneDeadEnds() {
        var all = new Rect(new Vec(1, 1), new Vec(this.w - 1, this.h - 1)).tiles;
        var done = false;

        while (!done) {
            done = true;
            var test = 0;

            all.forEach(v => {
                if (this.getTile(v) !== Tile.floor) return;
                test++;
                var open = 0;
                Direction.cardinal.forEach(d => {
                    if (this.getTile(v.add(d)) === Tile.floor) open++;
                });

                if (open != 1) return;

                done = false;
                this._addTile(Tile.stone, v);
            });
        }
    };

    _addConnectors() {
        let rooms = this.rooms;

        rooms.forEach(r => {
            var candidates = [];
            var y = r.pos.y - 1;
            var x;
            for (x = r.pos.x; x < r.size.x + r.pos.x; x++) {
                candidates.push(new Vec(x, y));
            }

            y = r.pos.y + r.size.y;
            for (x = r.pos.x; x < r.size.x + r.pos.x; x++) {
                candidates.push(new Vec(x, y))
            }

            x = r.pos.x - 1;
            for (y = r.pos.y; y < r.size.y + r.pos.y; y++) {
                candidates.push(new Vec(x, y));
            }

            x = r.pos.x + r.size.x;
            for (y = r.pos.y; y < r.size.y + r.pos.y; y++) {
                candidates.push(new Vec(x, y))
            }

            candidates.forEach(v => {
                var open = 0;
                Direction.cardinal.forEach(d => {
                    if (this.getTile(v.add(d)) === Tile.floor) open++;
                });

                if (open < 2) candidates.splice(candidates.indexOf(v), 1);
            });

            var random = Math.floor(Math.random() * candidates.length);

            //Carve 1 random connector to ensure every room has at least one entrance.
            //TODO: This does not ensure all rooms are reachable. Two rooms could be connected only to each other.
            this._carve(candidates[random]);
            candidates.splice(candidates.indexOf(candidates[random]), 1);

            candidates.forEach(v => {
                if (Math.random() < 0.02) this._carve(v);
            });
        });
    };

    generate() {
        this._generateTiles();
        this._generateRooms(1000);

        for (var x = 1; x < this.w; x += 2) {
            for (var y = 1; y < this.h; y += 2) {
                var tile = new Vec(x, y);

                if (this.getTile(tile) === Tile.stone) this._generateCorridors(tile);
            }
        }

        this._addConnectors();
        this._pruneDeadEnds();
        this._addWallDecorators();

        return true;
    };

    initialize() {
        this.generate();
        this.initialized = true;
    };
}
