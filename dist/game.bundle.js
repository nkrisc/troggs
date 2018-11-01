/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Vec {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    static equal(vec1, vec2) {
        if (!vec1 || !vec2) throw new Error('Missing argument');

        return vec1.x === vec2.x && vec1.y === vec2.y;
    }

    add(vec) {
        if (vec instanceof Vec === false) throw Error('Pass a Vec');
        return new Vec(vec.x + this.x, vec.y + this.y);
    }

    sub(vec) {
        if (vec instanceof Vec === false) throw Error('Pass a Vec');
        return new Vec(vec.x - this.x, vec.y - this.y);
    }

    scale(val) {
        return new Vec(this.x * val, this.y * val);
    }

    is(candidate) {
        if (this.x === candidate.x && this.y === candidate.y) return true;
        return false;
    }

    kingDistance(vec) {
        if (vec instanceof Vec === false) throw Error('Pass a Vec');
        return Math.max(Math.abs(vec.x - this.x), Math.abs(vec.y - this.y));
    }

    relativeDirectionTo(to) {
        if (to instanceof Vec === false) throw Error('Pass a vec');
        let direction;
        switch(true) {
            case (to.x === this.x && to.y < this.y):     direction = Direction.N; break;
            case (to.x > this.x && to.y < this.y):       direction =  Direction.NE; break;
            case (to.x > this.x && to.y === this.y):     direction =  Direction.E; break;
            case (to.x > this.x && to.y > this.y):       direction =  Direction.SE; break;
            case (to.x === this.x && to.y > this.y):     direction =  Direction.S; break;
            case (to.x < this.x && to.y > this.y):       direction =  Direction.SW; break;
            case (to.x < this.x && to.y === this.y):     direction =  Direction.W; break;
            case (to.x < this.x && to.y < this.y):       direction =  Direction.NW; break;
        }
        return direction;
    }

    get neighbors() {
        let n = new Vec(this.x, this.y - 1);
        let ne = new Vec(this.x + 1, this.y - 1);
        let e = new Vec(this.x + 1, this.y);
        let se = new Vec(this.x + 1, this.y + 1);
        let s = new Vec(this.x, this.y + 1);
        let sw = new Vec(this.x - 1, this.y + 1);
        let w = new Vec(this.x - 1, this.y)
        let nw = new Vec(this.x - 1, this.y - 1);

        let neighborhood = new Map();
        neighborhood.set(n.string, n);
        neighborhood.set(ne.string, ne);
        neighborhood.set(e.string, e);
        neighborhood.set(se.string, se);
        neighborhood.set(s.string, s);
        neighborhood.set(sw.string, sw);
        neighborhood.set(w.string, w);
        neighborhood.set(nw.string, nw);

        return neighborhood;
    }

    get string() {
        return `${this.x},${this.y}`;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Vec;



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vec_js__ = __webpack_require__(0);


class Rect {
    constructor(pos, size) {
        if (pos instanceof __WEBPACK_IMPORTED_MODULE_0__vec_js__["a" /* default */] === false) throw new Error('Expected Vec for pos');
        if (size instanceof __WEBPACK_IMPORTED_MODULE_0__vec_js__["a" /* default */] === false) throw new Error('Expected Vec for size');

        this._pos = pos;
        this._size = size;

        let _tiles = [];
        for (let x = this._pos.x; x < this._pos.x + this._size.x; x++) {
            for (let y = this._pos.y; y < this._pos.y + this._size.y; y++) {
                _tiles.push(new __WEBPACK_IMPORTED_MODULE_0__vec_js__["a" /* default */](x, y))
            }
        }

        this._tiles = _tiles;
    }

    get pos() {
        return this._pos;
    }

    get size() {
        return this._size;
    }

    get tiles() {
        return this._tiles;
    }

    get top() {
        return this._pos.y;
    }

    get right() {
        return this._pos.x + this._size.x;
    }

    get bottom() {
        return this._pos.y + this._size.y;
    }

    get left() {
        return this._pos.x;
    }

    get width() {
        return this._size.x;
    }

    get height() {
        return this._size.y;
    }

    get x() {
        return this._pos.x;
    }

    get y() {
        return this._pos.y;
    }

    distanceTo(rect) {
        let vertical;
        if (this.top >= rect.bottom) {
            vertical = this.top - rect.bottom;
        } else if (this.bottom <= rect.top) {
            vertical = rect.top - this.bottom;
        } else {
            vertical = -1;
        }

        let horizontal;
        if (this.left >= rect.right) {
            horizontal = this.left - rect.right;
        } else if (this.right <= rect.left) {
            horizontal = rect.left - this.right;
        } else {
            horizontal = -1;
        }

        if ((vertical == -1) && (horizontal == -1)) return -1;
        if (vertical == -1) return horizontal;
        if (horizontal == -1) return vertical;
        return horizontal + vertical;
    }

    inflate(value) {
        var _pos = this.pos.add(new __WEBPACK_IMPORTED_MODULE_0__vec_js__["a" /* default */](-value, -value));
        var _size = this.size.add(new __WEBPACK_IMPORTED_MODULE_0__vec_js__["a" /* default */](value, value));
        return new Rect(_pos, _size);
    }

    contains(vec) {
        return (vec.x >= this.x && vec.x < this.width) && (vec.y >= this.y && vec.y < this.height)
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Rect;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_vec_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_rect_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_direction_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_array2d_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__tile_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pathfinder_js__ = __webpack_require__(9);







class Stage {
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


        this.path = new __WEBPACK_IMPORTED_MODULE_5__pathfinder_js__["a" /* default */](this);

        this._tile = {
            wall: new __WEBPACK_IMPORTED_MODULE_4__tile_js__["a" /* default */]('wall', '#', '#666', '#333', false),
            stone: new __WEBPACK_IMPORTED_MODULE_4__tile_js__["a" /* default */]('stone', '', '#000', '#000', false),
            floor: new __WEBPACK_IMPORTED_MODULE_4__tile_js__["a" /* default */]('floor', ' .', '#999', '#666', true)
        };

        this._tiles = new __WEBPACK_IMPORTED_MODULE_3__utils_array2d_js__["a" /* default */](width, height)

        this.initialized = false;

    }

    inBounds(vec) {
        if (vec instanceof __WEBPACK_IMPORTED_MODULE_0__utils_vec_js__["a" /* default */] === false) throw new Error('Pass a Vec to Stage.inBounds');

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
        if (newPos instanceof __WEBPACK_IMPORTED_MODULE_0__utils_vec_js__["a" /* default */] === false) throw Error('Second argument to moveActor must be Vec');
        if (this.inBounds(newPos) && this.getTile(new __WEBPACK_IMPORTED_MODULE_0__utils_vec_js__["a" /* default */](newPos.x, newPos.y).passable)) {
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
        /*
        for (var x = 0; x < this.w; x++) {
            this.tiles[x] = new Array(this.h);
        }

        for (var x = 0; x < this.w; x++) {
            for (var y = 0; y < this.h; y++) {
                this.tiles[x][y] = this.tile.stone;
                //console.log(this.tile.stone);
                //this.tiles[x][y] = new Tile('stone', '', '#000', '#000', false)
            }
        }
        */


        this._tiles.fill(this.tile.stone);

    };

    _addTile(tile, vec) {
        //this.tiles[vec.x][vec.y] = tile;
        this._tiles.update(vec, tile);
    };

    getTile(vec) {
        //return this.tiles[vec.x][vec.y];
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

            var attemptedRoom = new __WEBPACK_IMPORTED_MODULE_1__utils_rect_js__["a" /* default */](new __WEBPACK_IMPORTED_MODULE_0__utils_vec_js__["a" /* default */](x, y), new __WEBPACK_IMPORTED_MODULE_0__utils_vec_js__["a" /* default */](rw, rh));
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
                this._addTile(this.tile.floor, t);
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
            attemptedStart = new __WEBPACK_IMPORTED_MODULE_0__utils_vec_js__["a" /* default */](startx, starty);

            validStart = true;
            __WEBPACK_IMPORTED_MODULE_2__utils_direction_js__["a" /* default */].cardinal.forEach(d => {
                if (this.getTile(attemptedStart.add(d)) === this.tile.floor) validStart = false;
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

            __WEBPACK_IMPORTED_MODULE_2__utils_direction_js__["a" /* default */].cardinal.forEach(d => {
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
        let all = new __WEBPACK_IMPORTED_MODULE_1__utils_rect_js__["a" /* default */](
            new __WEBPACK_IMPORTED_MODULE_0__utils_vec_js__["a" /* default */](0,0),
            new __WEBPACK_IMPORTED_MODULE_0__utils_vec_js__["a" /* default */](this.w, this.h)
        );
        all.tiles.forEach(t => {
            if (this.getTile(t) === this.tile.stone &&
                this.getTile(t.add(__WEBPACK_IMPORTED_MODULE_2__utils_direction_js__["a" /* default */].S)) === this.tile.floor) {
                this._addTile(this.tile.wall, t);
            }
        });
    };

    _carve(vec) {
        this._addTile(this.tile.floor, vec);
    };

    _canCarve(vec, dir) {
        //if (!this.inBounds(vec.add(dir))) return false;
        if (!this._tiles.bounds.contains(vec.add(dir))) return false;
        if (this.getTile(vec.add(dir)) === this.tile.floor) return false;

        let check = vec.add(dir.scale(2));
        //if (!this.inBounds(check)) return false;
        if (!this._tiles.bounds.contains(check)) return false;
        return this.getTile(check) !== this.tile.floor;
    };

    _pruneDeadEnds() {
        var all = new __WEBPACK_IMPORTED_MODULE_1__utils_rect_js__["a" /* default */](new __WEBPACK_IMPORTED_MODULE_0__utils_vec_js__["a" /* default */](1, 1), new __WEBPACK_IMPORTED_MODULE_0__utils_vec_js__["a" /* default */](this.w - 1, this.h - 1)).tiles;
        var done = false;

        while (!done) {
            done = true;
            var test = 0;

            all.forEach(v => {
                if (this.getTile(v) !== this.tile.floor) return;
                test++;
                var open = 0;
                __WEBPACK_IMPORTED_MODULE_2__utils_direction_js__["a" /* default */].cardinal.forEach(d => {
                    if (this.getTile(v.add(d)) === this.tile.floor) open++;
                });

                if (open != 1) return;

                done = false;
                this._addTile(this.tile.stone, v);
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
                candidates.push(new __WEBPACK_IMPORTED_MODULE_0__utils_vec_js__["a" /* default */](x, y));
            }

            y = r.pos.y + r.size.y;
            for (x = r.pos.x; x < r.size.x + r.pos.x; x++) {
                candidates.push(new __WEBPACK_IMPORTED_MODULE_0__utils_vec_js__["a" /* default */](x, y))
            }

            x = r.pos.x - 1;
            for (y = r.pos.y; y < r.size.y + r.pos.y; y++) {
                candidates.push(new __WEBPACK_IMPORTED_MODULE_0__utils_vec_js__["a" /* default */](x, y));
            }

            x = r.pos.x + r.size.x;
            for (y = r.pos.y; y < r.size.y + r.pos.y; y++) {
                candidates.push(new __WEBPACK_IMPORTED_MODULE_0__utils_vec_js__["a" /* default */](x, y))
            }

            candidates.forEach(v => {
                var open = 0;
                __WEBPACK_IMPORTED_MODULE_2__utils_direction_js__["a" /* default */].cardinal.forEach(d => {
                    if (this.getTile(v.add(d)) === this.tile.floor) open++;
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
                var tile = new __WEBPACK_IMPORTED_MODULE_0__utils_vec_js__["a" /* default */](x, y);

                if (this.getTile(tile) === this.tile.stone) this._generateCorridors(tile);
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
/* harmony export (immutable) */ __webpack_exports__["a"] = Stage;



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__engine_game__ = __webpack_require__(4);


document.addEventListener('DOMContentLoaded', function(){
    window.addEventListener('keydown', function(e) {
        e.preventDefault();
        switch (e.keyCode) {
            case 40:
                __WEBPACK_IMPORTED_MODULE_0__engine_game__["a" /* default */].dispatch(hero, {type:'action',name:MOVE,data:{direction:Direction.S,steps:1}});__WEBPACK_IMPORTED_MODULE_0__engine_game__["a" /* default */].update();
                break;
            case 39:
                __WEBPACK_IMPORTED_MODULE_0__engine_game__["a" /* default */].dispatch(hero, {type:'action',name:MOVE,data:{direction:Direction.E,steps:1}});__WEBPACK_IMPORTED_MODULE_0__engine_game__["a" /* default */].update();
                break;
            case 38:
                __WEBPACK_IMPORTED_MODULE_0__engine_game__["a" /* default */].dispatch(hero, {type:'action',name:MOVE,data:{direction:Direction.N,steps:1}});__WEBPACK_IMPORTED_MODULE_0__engine_game__["a" /* default */].update();
                break;
            case 37:
                __WEBPACK_IMPORTED_MODULE_0__engine_game__["a" /* default */].dispatch(hero, {type:'action',name:MOVE,data:{direction:Direction.W,steps:1}});__WEBPACK_IMPORTED_MODULE_0__engine_game__["a" /* default */].update();
                break;
        }
        switch(e.key) {
            case 'i': __WEBPACK_IMPORTED_MODULE_0__engine_game__["a" /* default */].dispatch(hero, {type:'action',name:MOVE,data:{direction:Direction.NW,steps:1}});__WEBPACK_IMPORTED_MODULE_0__engine_game__["a" /* default */].update(); break;
            case 'o': __WEBPACK_IMPORTED_MODULE_0__engine_game__["a" /* default */].dispatch(hero, {type:'action',name:MOVE,data:{direction:Direction.N,steps:1}});__WEBPACK_IMPORTED_MODULE_0__engine_game__["a" /* default */].update(); break;
            case 'p': __WEBPACK_IMPORTED_MODULE_0__engine_game__["a" /* default */].dispatch(hero, {type:'action',name:MOVE,data:{direction:Direction.NE,steps:1}});__WEBPACK_IMPORTED_MODULE_0__engine_game__["a" /* default */].update(); break;
            case 'k': __WEBPACK_IMPORTED_MODULE_0__engine_game__["a" /* default */].dispatch(hero, {type:'action',name:MOVE,data:{direction:Direction.W,steps:1}});__WEBPACK_IMPORTED_MODULE_0__engine_game__["a" /* default */].update(); break;
            case ';': __WEBPACK_IMPORTED_MODULE_0__engine_game__["a" /* default */].dispatch(hero, {type:'action',name:MOVE,data:{direction:Direction.E,steps:1}});__WEBPACK_IMPORTED_MODULE_0__engine_game__["a" /* default */].update(); break;
            case ',': __WEBPACK_IMPORTED_MODULE_0__engine_game__["a" /* default */].dispatch(hero, {type:'action',name:MOVE,data:{direction:Direction.SW,steps:1}});__WEBPACK_IMPORTED_MODULE_0__engine_game__["a" /* default */].update(); break;
            case '.': __WEBPACK_IMPORTED_MODULE_0__engine_game__["a" /* default */].dispatch(hero, {type:'action',name:MOVE,data:{direction:Direction.S,steps:1}});__WEBPACK_IMPORTED_MODULE_0__engine_game__["a" /* default */].update(); break;
            case '/': __WEBPACK_IMPORTED_MODULE_0__engine_game__["a" /* default */].dispatch(hero, {type:'action',name:MOVE,data:{direction:Direction.SE,steps:1}});__WEBPACK_IMPORTED_MODULE_0__engine_game__["a" /* default */].update(); break;
            case 'l': __WEBPACK_IMPORTED_MODULE_0__engine_game__["a" /* default */].dispatch(hero, {type:'action',name:REST}); break;

        }
        __WEBPACK_IMPORTED_MODULE_0__engine_game__["a" /* default */].wait = false;
    });
    window.addEventListener('click', function(e) {
        if (e.target.id === 'canvas') {
            let x = Math.floor(e.offsetX / __WEBPACK_IMPORTED_MODULE_0__engine_game__["a" /* default */].scene.gridSizeX);
            let y = Math.floor(e.offsetY / __WEBPACK_IMPORTED_MODULE_0__engine_game__["a" /* default */].scene.gridSizeY);

            if (e.button === 0 && !__WEBPACK_IMPORTED_MODULE_0__engine_game__["a" /* default */].find(__WEBPACK_IMPORTED_MODULE_0__engine_game__["a" /* default */].entities, new Vec(x, y))) {
                Stage.addTile(Stage.tile.wall, new Vec(x, y));
                __WEBPACK_IMPORTED_MODULE_0__engine_game__["a" /* default */].scene.draw();
            }

            if (e.button === 0 && e.shiftKey === true) {
                Stage.addTile(Stage.tile.floor, new Vec(x, y));
                __WEBPACK_IMPORTED_MODULE_0__engine_game__["a" /* default */].scene.draw();
            }
        }

        return false;
    });


    const SCALE_FACTOR = 2;
    var canvas = document.getElementById('canvas');

    window.game = new __WEBPACK_IMPORTED_MODULE_0__engine_game__["a" /* default */](canvas);
    game.initialize();

    document.getElementById('curtain').style.display = 'none';

    function loop() {
        game.update();
    }

    window.requestAnimationFrame(loop);
});


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__content_monster_defs_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__stage_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__scene_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__entity_js__ = __webpack_require__(11);





//TODO: Move monster definitions and actions out of here

class Game {
    constructor(canvas) {
        this.scene = new __WEBPACK_IMPORTED_MODULE_2__scene_js__["a" /* default */](canvas, 9, 14);
        this.scene.initialize();

        this._currentStage = 0;
        this.stages = [];

        //In the future, can make new stages for new levels
        this.stages.push(new __WEBPACK_IMPORTED_MODULE_1__stage_js__["a" /* default */](142, 62));



    }
    //Based on some input, dispatch actions. Could be user input or game logic.
    static dispatch(entity, event) {
        //Maybe this logic should really be on the entity. Just send the event?
        if(event.type === 'action') return entity.setAction(event.name, event.data);
        if(event.type === 'reaction') return entity.react(event.name, event.data);
    }

    get stage() {
        return this.stages[this._currentStage];
    }

    spawnActors(stage) {
        if (!stage.initialized) throw new Error('Initialize stage before spawning actors');
        //TEMPORARY
        function Trogg(x, y) {
            function troggBehavior(self) {
                let targets = Game.findNear(Game.entities, self.pos, 4),
                    seekCandidates,
                    behavior = self.behavior;

                //If we already have an attack queued, return and let it happen next;
                if (self.nextAction && self.nextAction.name === ATTACK) return;

                seekCandidates = targets.filter(t => {
                    return self.behavior.willSeek(t.type) === true;
                })

                //Troggs don't avoid anything. They're not too bright.
                if (seekCandidates.length > 0) {
                    self.behavior.seek(seekCandidates[0])
                    return
                }

                self.focus.target = null;
                self.focus.attitude = null;
                self.behavior.wander();
                //return

            }
            return new __WEBPACK_IMPORTED_MODULE_3__entity_js__["a" /* default */]({
                name: 'Trogg',
                type: TROGG,
                hp: 50,
                recovery: 20,
                x: x,
                y: y,
                strength: 10,
                fortitude: 20,
                flags: 'reckless',
                size: 1,
                isAI: true,
                logic: troggBehavior})
                .addActions(MOVE, ATTACK)
                .reactsTo(ATTACK, [TANK])
                .behavior.seeks(HERO);
        }
        function Kobold(x, y){
            function koboldBehavior(self) {
                let //targets = Game.findNear(Game.entities, self.x, self.y, 6),
                    seekCandidates = Game.findNear(Game.entities, self.pos, 4),
                    avoidCandidates = Game.findNear(Game.entities, self.pos, 3),
                    behavior = self.behavior;

                seekCandidates = seekCandidates.filter(t => {
                    return self.behavior.willSeek(t.type) == true;
                })

                avoidCandidates = avoidCandidates.filter(t => {
                    return self.behavior.willAvoid(t.type) == true;
                })

                //Preferentially avoid. Kobolds are fearful and opportunistic.
                if (avoidCandidates.length > 0) {
                    self.behavior.avoid(avoidCandidates[0])
                    return
                }

                if (seekCandidates.length > 0) {
                    self.behavior.seek(seekCandidates[0])
                    return
                }

                self.focus.target = null;
                self.focus.attitude = null;

                self.behavior.wander();
                //return

            }
            return new __WEBPACK_IMPORTED_MODULE_3__entity_js__["a" /* default */]({
                name: 'Kobold',
                type: KOBOLD,
                hp: 20,
                recovery: 100/3,
                x: x,
                y: y,
                strength: 5,
                fortitude: 10,
                size: 0,
                isAI: true,
                logic: koboldBehavior})
                .addActions(ATTACK, MOVE, FLEE)
                .reactsTo(ATTACK, [DODGE, COWER])
                .behavior.seeks(HERO)
                .behavior.avoids(TROGG);
        }
        function GreenSlime(x, y) {
            function slimeBehavior(self) {
                let behavior = self.behavior;

                if (self.focus.target && self.focus.attitude == 'aggressive') {
                    behavior.seek(self.focus.target)
                    return;
                }

                let nearest = Game.findNearest(Game.entities, self.pos, 3);
                if (nearest) {
                    if (behavior.willAvoid(nearest.type)) {
                        behavior.avoid(nearest);
                        return;
                    }
                }

                behavior.wander();
            }
            return new __WEBPACK_IMPORTED_MODULE_3__entity_js__["a" /* default */]({
                name: 'Green Slime',
                type: SLIME,
                hp: 40,
                recovery: 25,
                x: x,
                y: y,
                strength: 5,
                fortitude: 10,
                flags: 'determined',
                size: 0,
                isAI: true,
                logic: slimeBehavior})
                .addActions(MOVE, ATTACK)
                .reactsTo(ATTACK, [DODGE, REVENGE])
                .behavior.avoids(TROGG)
            /*.onDie = function(self) {
             new GreenSlime(this.pos.x + 1, this.pos.y);
             new GreenSlime(this.pos.x - 1, this.pos.y);
             }*/
        }
        window.hero = new __WEBPACK_IMPORTED_MODULE_3__entity_js__["a" /* default */]({
            name: 'Hero',
            type: HERO,
            hp: 100,
            recovery: 100/3,
            x: 8,
            y: 4,
            strength: 15,
            fortitude: 50,
            size: 1})
            .addActions(MOVE, ATTACK, REST)
            .reactsTo(ATTACK, [DODGE]);

        //Randomly place troggs
        for (var i = 0; i < 5; i++) {
            let roomIndex = Math.floor(Math.random() * stage.rooms.length);
            let room = stage.rooms[roomIndex]
            let tileIndex = Math.floor(Math.random() * room.tiles.length);
            let tile = room.tiles[tileIndex];
            Trogg(tile.x, tile.y);
        }

        //Randomly place kobolds
        for (var i = 0; i < 10; i++) {
            let roomIndex = Math.floor(Math.random() * stage.rooms.length);
            let room = stage.rooms[roomIndex]
            let tileIndex = Math.floor(Math.random() * room.tiles.length);
            let tile = room.tiles[tileIndex];
            Kobold(tile.x, tile.y);
        }

        //Randomly place slimes
        for (var i = 0; i < 3; i++) {
            let roomIndex = Math.floor(Math.random() * stage.rooms.length);
            let room = stage.rooms[roomIndex]
            let tileIndex = Math.floor(Math.random() * room.tiles.length);
            let tile = room.tiles[tileIndex];
            GreenSlime(tile.x, tile.y);
        }
    };

    newStage() {
        //this.stages.push(new Stage);
    }

    update() {
        this.stage.actors.forEach(actor => {
            if (actor.isAI) actor.logic(actor);
            actor.act();
        });

        this.scene.draw(this.stage);
    }

    initialize() {
        this.stage.initialize();
        //this.stage.actors = this.spawnActors(this.stage);
        this.scene.draw(this.stage);

        window.update = this.update;
        window.update.bind(this);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Game;
;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Monsters */
/**
 * Created by Nathan on 2/4/2018.
 */
const Monsters = {};




/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Direction */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vec_js__ = __webpack_require__(0);


class Direction {
    static get N()    { return new __WEBPACK_IMPORTED_MODULE_0__vec_js__["a" /* default */](0, -1);}
    static get NE()   { return new __WEBPACK_IMPORTED_MODULE_0__vec_js__["a" /* default */](1, -1);}
    static get E()    { return new __WEBPACK_IMPORTED_MODULE_0__vec_js__["a" /* default */](1, 0);}
    static get SE()   { return new __WEBPACK_IMPORTED_MODULE_0__vec_js__["a" /* default */](1, 1);}
    static get S()    { return new __WEBPACK_IMPORTED_MODULE_0__vec_js__["a" /* default */](0, 1)}
    static get SW()   { return new __WEBPACK_IMPORTED_MODULE_0__vec_js__["a" /* default */](-1, 1);}
    static get W()    { return new __WEBPACK_IMPORTED_MODULE_0__vec_js__["a" /* default */](-1, 0);}
    static get NW()   { return new __WEBPACK_IMPORTED_MODULE_0__vec_js__["a" /* default */](-1, -1);}
    static get NONE() { return new __WEBPACK_IMPORTED_MODULE_0__vec_js__["a" /* default */](0,  0);}

    static get all() {
        return [this.N, this.NE, this.E, this.SE, this.S, this.SW, this.W, this.NW];
    }

    static get cardinal() {
        return [this.N, this.E, this.S, this.W];
    }

    static get cardinal45() {
        return [this.NE, this.SE, this.SW, this.NW];
    }

    static reverse(direction) {
        return new __WEBPACK_IMPORTED_MODULE_0__vec_js__["a" /* default */](direction.x * -1, direction.y * -1);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Direction;
;




/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vec_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__rect_js__ = __webpack_require__(1);



class Array2D {
    constructor(width, height, value) {
        this._w = width;
        this._h = height;
        this.bounds = new __WEBPACK_IMPORTED_MODULE_1__rect_js__["a" /* default */](new __WEBPACK_IMPORTED_MODULE_0__vec_js__["a" /* default */](0, 0), new __WEBPACK_IMPORTED_MODULE_0__vec_js__["a" /* default */](width, height));

        this._elements = new Array(width * height);
        for (var i = 0; i < this._elements.length; i++) {
            this._elements[i] = value || null;
        }
    }

    get width() {
        return this.bounds.width;
    }

    get height() {
        return this.bounds.height;
    }

    find(vec) {
        if (!(vec instanceof __WEBPACK_IMPORTED_MODULE_0__vec_js__["a" /* default */])) throw new Error('Pass a vec');

        return this._elements[vec.y * this._w + vec.x];
    }

    update(vec, value) {
        this._elements[vec.y * this._w + vec.x] = value;
    }

    fill(value) {
        for (var x = 0; x < this._w; x++) {
            for (var y = 0; y < this._h; y++) {
                this._elements[y * this._w + x] = value;
            }
        }
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Array2D;



/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Tile {
    constructor(name, glyph, color, bgColor, passable) {
        this.color = color;
        this.glyph = glyph;
        this.bgColor = bgColor;
        this.passable = passable;
        this.name = name;
        this.explored = false;
        this.visible = true;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Tile;
;


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stage_js__ = __webpack_require__(2);


class PathFinder {
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
                if (__WEBPACK_IMPORTED_MODULE_0__stage_js__["a" /* default */].getTile(new Vec(x, y)).passable === false) return;
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
            if (__WEBPACK_IMPORTED_MODULE_0__stage_js__["a" /* default */].find(stage.actors, current)) weight = 80;
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
/* harmony export (immutable) */ __webpack_exports__["a"] = PathFinder;




/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_rect_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_vec_js__ = __webpack_require__(0);



class Scene {
    constructor(canvas, gx, gy) {
        if (!canvas instanceof HTMLCanvasElement) throw new Error('Must pass HTMLCanvasElement to scene');
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this._gx = gx;
        this._gy = gy;

    }

    initialize() {
        this.ctx.font = `bold ${this._gy}px "8bitoperator"`;
        this.ctx.textBaseline = 'top';
        this.ctx.scale(2, 2);
    }

    get w() {
        return Math.floor(canvas.width / this._gx);
    }

    get h() {
        return Math.floor(canvas.height/ this._gy);
    }

    get gx() {
        return this._gx;
    }

    get gy() {
        return this._gy;
    }

    x(val) {
        return val * this._gx;
    }

    y(val) {
        return val * this._gy;
    }

    draw(stage) {
        this.canvas.width = stage.w * this.gx;
        this.canvas.height = stage.h * this.gy;
        this.canvas.style.width = `${this.canvas.width}px`;
        this.canvas.style.height = `${this.canvas.height}px`
        for (let x = 0; x < stage.w; x++) {
            for (let y = 0; y < stage.h; y++) {
                var tile = stage.getTile(new __WEBPACK_IMPORTED_MODULE_1__utils_vec_js__["a" /* default */](x, y));
                this._drawTile(tile, x, y);
            }
        }
    }

    _drawRect(color, rect) {
        if (rect instanceof __WEBPACK_IMPORTED_MODULE_0__utils_rect_js__["a" /* default */] === false) throw new Error('Must pass Rect to draw Rect');

        let x = this.x(rect.pos.x);
        let y = this.y(rect.pos.y);
        let w = this.x(rect.size.x);
        let h = this.y(rect.size.y);

        this.ctx.fillStyle = color;
        //this.ctx.fillRect(this.x(rect.pos.x), this.y(rect.pos.y), this.x(rect.size.x), this.y(rect.size.y));
        this.ctx.fillRect(x, y, w, h);
    }

    _drawLine(color, ...points) {
        if (!(from instanceof __WEBPACK_IMPORTED_MODULE_1__utils_vec_js__["a" /* default */]) || !(to instanceof __WEBPACK_IMPORTED_MODULE_1__utils_vec_js__["a" /* default */])) throw new Error('Pass a vec to drawLine');

        this.ctx.beginPath();
        this.ctx.strokeStyle = color;
        this.ctx.moveTo(this.x(points[0].x), this.y(points[0].y));

        for (var i = 1; i < points.length; i++) {
            this.ctx.lineTo(this.x(points[i].x), this.y(points[i].y));
        }

        this.ctx.stroke();

    }

    _drawText(string, color, x, y) {
        this.ctx.textBaseline = 'top';
        this.ctx.fillStyle = color;
        this.ctx.fillText(string, this.x(x), this.y(y));
    }

    _drawTile(tile, x, y) {
        //x = this.x(x);
        //y = this.y(y)

        var rect =  new __WEBPACK_IMPORTED_MODULE_0__utils_rect_js__["a" /* default */](new __WEBPACK_IMPORTED_MODULE_1__utils_vec_js__["a" /* default */](x, y), new __WEBPACK_IMPORTED_MODULE_1__utils_vec_js__["a" /* default */](this._gx, this._gy))
        this._drawRect(tile.bgColor, rect)
        this._drawText(tile.glyph, tile.color, x, y)

        if (tile.name === 'wall') {
            this._drawRect('#000', rect);
            this._drawRect('#333', new __WEBPACK_IMPORTED_MODULE_0__utils_rect_js__["a" /* default */](new __WEBPACK_IMPORTED_MODULE_1__utils_vec_js__["a" /* default */](x, y + (this._gy / 2)), new __WEBPACK_IMPORTED_MODULE_1__utils_vec_js__["a" /* default */](this._gx, this._gy / 2)))
        }

    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Scene;


/*
for (let x = 0; x < Math.floor(canvas.width / gx); x++) {
    for (let y = 0; y < Math.floor(canvas.height / gy); y++) {

        let tile = Stage.tiles[x][y];


        ctx.fillStyle = tile.bgColor;
        ctx.fillRect(x * gx, y * gy, gx, gy);
        ctx.fillStyle = tile.color;
        ctx.fillText(tile.glyph, x * gx, y * gy);

        if (tile === Stage.tile.wall) {
            ctx.fillStyle = '#000';
            ctx.fillRect(x * gx, y * gy, gx, gy);
            ctx.fillStyle = '#3a3a3a';
            ctx.fillRect(x * gx, y * gy + gy / 2, gx, gy / 2)
        }
    }
}
*/


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__behavior_js__ = __webpack_require__(12);


class Entity {
    constructor(properties) {
        this.pos = new Vec(properties.x || 0, properties.y || 0);
        this.direction = properties.direction || 0;

        this.name = properties.name || 'DefaultName';
        this.type = properties.type || undefined;
        this.maxHP = properties.hp || 50;
        this.currentHP = this.maxHP;
        this.strength = properties.strength || 0;
        this.fortitude = properties.fortitude || 0;
        this.size = properties.size || 0;
        if (properties.flags) this.flags = properties.flags.split(' ');

        this.energy = 0;
        this.maxEnergy = 100;
        this.recovery = properties.recovery || 50;

        this.nextAction = null;
        //this.actions = {};
        this.actions = new Map();
        this.reactions = new Map();
        this.reactionTo = {};
        this.before = new Map();
        this.after = new Map();
        this.focus  = {
            target: null,
            attitude: null
        }
        this.interest = 0;
        this.onDie = null;

        this.isAI = properties.isAI || false;
        if (this.isAI === true) {
            this.logic = properties.logic;
            this.behavior = new __WEBPACK_IMPORTED_MODULE_0__behavior_js__["a" /* default */](this);
        }

        Game.entities.push(this);
        Game.entitiesByPos.set(`${this.pos.x},${this.pos.y}`, this);
        return this;
    }

    modifyHP(value) {
        if (this.currentHP + value > 0) {
            if (this.maxHP - this.currentHP > value) {
                this.currentHP += value
            } else {
                this.currentHP = this.maxHP;
            }
        } else {
            this.die();
        }
    }

    die() {
        stage.removeEntity(this);
        if (this.onDie) {
            this.onDie(this);
        }
    }

    _register(collection, key, name, value) {
        if (!collection.has(key)) {
            let register = {};
            register[name] = value;
            collection.set(key, register);
        } else {
            let register = collection.get(key);
            if (register[name]) throw new Error('Something tried to register an action that already exists');
            register[name] = value;
            collection.set(key, register)
        }
    }

    _unregister(collection, action, name) {
        if (collection.has(action)) {
            let register = collection.get(action);
            delete register[name];
        }
    }
    setAction(action, data) {
        if (this.actions.has(action)) {
            this.nextAction = {name: action, action: this.actions.get(action), data};
            return true;
        } else {
            Logger.warn(`${this.name} doesn't know how to ${Symbol.keyFor(action)}.`)
            return false;
        }
    }

    actionReady() {
        return this.nextAction ? true : false;
    }

    beforeAction(action, name, func) {
        this._register(this.before, action, name, func)
        return this;
    }

    unregisterBeforeAction(action, name) {
        this._unregisterAction(this.before, action, name)
        return this;
    }

    afterAction(action, name, func) {
        this._register(this.after, action, name, func)
        return this;
    }

    unregisterAfterAction(action, name) {
        this._unregister(this.after, action, name)
        return this;
    }

    addActions(...actions) {
        for (let i in actions) {
            this.actions.set(actions[i], ACTION[actions[i]]);
        }
        return this;
    }

    removeActions(actions) {
        for (let i in actions) {
            this.actions.delete(actions[i]);
        }
        return this;
    }
    ready() {
        return this.energy >= 100;
    }
    act() {
        if (!this.ready()) {
            this.rest();
        } else {
            if (this.nextAction) {
                let currentAction = this.nextAction.action;
                let currentActionName = this.nextAction.name;
                let currentActionData = this.nextAction.data;

                /*  Reset next action and energy before doing anything. We're committed now.
                 *  One of the actions below might set a new action or refund energy
                 */
                this.nextAction = null;
                this.energy = 0;

                //Before action
                if (this.before.has(currentActionName)) {
                    let beforeActions = this.before.get(currentActionName);
                    for (let i in beforeActions) {
                        beforeActions[i](this, currentActionData)
                    }
                }
                //Do the action
                let result = currentAction(this, currentActionData);

                //After action - this also happens after the target's reactions to the action
                if (this.after.has(currentActionName)) {
                    let afterActions = this.after.get(currentActionName);
                    for (let i in afterActions) {
                        afterActions[i](this, currentActionData)
                    }
                }
            } else {
                //Logger.write(MESSAGE_READY_WAITING, this.name);
            }
        }
    }
    rest() {
        this.energy = Math.min(this.energy += this.recovery, this.maxEnergy);
        //this.energy >= 100 ? Logger.write(MESSAGE_READY, this.name) : Logger.write(MESSAGE_RESTING, this.name);
    }

    reactsTo(action, reactions) {
        if (!this.reactions.has(action)) {
            this.reactions.set(action, reactions)
        } else {
            let existingReactions = this.reactions.get(action);
            reactions.forEach(i => {
                existingReactions.push(reactions[i])
            })
        }
        return this;
    }

    react(action, data) {
        //let reactions = this.reactionTo[action];
        if (!this.reactions.has(action)) return [{outcome: null}];
        let reactions = this.reactions.get(action);
        let result = [];
        reactions.forEach(name => {
            result.push(REACTION[name](this, data))
        })
        return result;
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Entity;
/**
 * Created by Nathan on 2/4/2018.
 */


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Base {
    constructor() {

    }
    _register(collection, action, name, func) {
        if (!collection.has(action)) {
            let register = {};
            register[name] = func;
            collection.set(action, register);
        } else {
            let register = collection.get(action);
            if (register[name]) throw new Error('Something tried to register an action that already exists');
            register[name] = func;
            collection.set(action, register)
        }
    }

    _unregister(collection, action, name) {
        if (collection.has(action)) {
            let register = collection.get(action);
            delete register[name];
        }
    }
}

class Behavior extends Base{
    constructor(self) {
        super();
        this.self = self;
        this.seekList = [];
        this.avoidList = [];
        this.path = [];
    }

    seeks(...e) {
        for (let i in e) {
            this.seekList.push(e[i]);
        }
        return this.self;
    }

    willSeek(e) {
        return this.seekList.indexOf(e) >= 0;
    }

//changed to seek a specific target. range and target determined by monster logic
    seek(target) {
        //futre: a way to know what to prefer
        let self = this.self;

        //If an attack is next, let it happen.
        if (self.actionReady()) {
            if (self.nextAction.name === ATTACK) return;
        }
        /*if (self.pos.kingDistance(target.pos) == 1) {
         Game.dispatch(self, {type: 'action', name: ATTACK, data: {target: target}});
         return;
         }*/

        //If actor has 'determined' flag we'll ignore interest.
        let determined;
        if (self.flags){
            self.flags.indexOf('determined') >= 0 ? determined = true : determined = false;
        }

        //If this is the first time seeking this target or had no target
        if (self.focus.target === null || self.focus.target != target) {
            //New target so we're very interested
            self.interest = 100;
        } else if (self.interest < 20 && !determined) {
            //No longer interested in this target
            self.focus.target = null;
            self.focus.attitude = null;
            return;
        }

        //Decay focus by an amount scaled by distance
        self.interest -= Math.min(2.5 * self.pos.kingDistance(target.pos), 0);
        //let direction = self.pos.relativeDirectionTo(target.pos);
        let path = pathFinder(self.pos, target.pos);
        if (!path) return;
        let direction = self.pos.relativeDirectionTo(path[1]);

        this.path = path;

        self.focus.target = target;
        self.focus.attitude = 'aggressive';
        Game.dispatch(self, {type: 'action', name:MOVE, data:{direction}});

    }

    avoids(...e) {
        for (let i in e) {
            this.avoidList.push(e[i]);
        }
        return this.self;
    }

    willAvoid(e) {
        return this.avoidList.indexOf(e) >= 0;
    }

//changed to avoid a specific target. range and target determined by monster logic
    avoid(target) {
        let self = this.self;
        let direction = self.pos.relativeDirectionTo(target.pos)
        direction.x *= -1;
        direction.y *= -1;

        self.focus.target = target;
        self.focus.attitude = 'fearful';
        Game.dispatch(self, {type: 'action', name:MOVE, data:{direction, steps:1}})
    }

    wander() {
        let self = this.self;
        let direction = Direction.all;
        this.path = [];

        if (self.actionReady()) return;

        if (Math.random() > 0.55) {
            let chosenDirection = direction[Math.floor(Math.random() * direction.length)];
            Game.dispatch(self, {type: 'action', name: MOVE, data: {direction: chosenDirection}})
        } else {
            Game.dispatch(self, {type: 'action', name: MOVE, data: {direction: Direction.NONE}})
        }
    }

    do () {
        //preferentially avoid

    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Behavior;



/***/ })
/******/ ]);