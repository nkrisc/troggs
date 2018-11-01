import Vec from './vec.js';

export default class VecMap {
    constructor() {
        this._map = new Map();
    }

    _hash(vec) {
        if (vec instanceof Vec === false) throw 'VecMap can only map Vec';

        return `${vec.x},${vec.y}`;
    }

    set(vec, value) {
        var key = this._hash(vec);
        return this._map.set(key, value);
    }

    get(vec) {
        var key = this._hash(vec);
        return this._map.get(key);
    }

    remove(vec) {
        var key = this._hash(vec);
        return this._map.delete(key);
    }

    entries() {
        return this._map.entries();
    }
}
