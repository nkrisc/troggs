import Vec from './vec.js';
import Rect from './rect.js';

export default class Array2D {
    constructor(width, height, value) {
        this._w = width;
        this._h = height;
        this.bounds = new Rect(new Vec(0, 0), new Vec(width, height));

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
        if (!(vec instanceof Vec)) throw new Error('Pass a vec');

        return this._elements[vec.y * this._w + vec.x];
    }

    update(vec, value) {
        this._elements[vec.y * this._w + vec.x] = value;
    }

    fill(value) {221
        for (var x = 0; x < this._w; x++) {
            for (var y = 0; y < this._h; y++) {
                this._elements[y * this._w + x] = value;
            }
        }
    }

}
