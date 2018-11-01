import Vec from './vec.js';

export default class Rect {
    constructor(pos, size) {
        if (pos instanceof Vec === false) throw new Error('Expected Vec for pos');
        if (size instanceof Vec === false) throw new Error('Expected Vec for size');

        this._pos = pos;
        this._size = size;

        let _tiles = [];
        for (let x = this._pos.x; x < this._pos.x + this._size.x; x++) {
            for (let y = this._pos.y; y < this._pos.y + this._size.y; y++) {
                _tiles.push(new Vec(x, y))
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
        var _pos = this.pos.add(new Vec(-value, -value));
        var _size = this.size.add(new Vec(value, value));
        return new Rect(_pos, _size);
    }

    contains(vec) {
        return (vec.x >= this.x && vec.x < this.width) && (vec.y >= this.y && vec.y < this.height)
    }
}
