import Rect from './utils/rect.js';
import Vec from './utils/vec.js';

export default class Scene {
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
                var tile = stage.getTile(new Vec(x, y));
                this._drawTile(tile, x, y);
            }
        }
    }

    _drawRect(color, rect) {
        if (rect instanceof Rect === false) throw new Error('Must pass Rect to draw Rect');

        let x = this.x(rect.pos.x);
        let y = this.y(rect.pos.y);
        let w = this.x(rect.size.x);
        let h = this.y(rect.size.y);

        this.ctx.fillStyle = color;
        //this.ctx.fillRect(this.x(rect.pos.x), this.y(rect.pos.y), this.x(rect.size.x), this.y(rect.size.y));
        this.ctx.fillRect(x, y, w, h);
    }

    _drawLine(color, ...points) {
        if (!(from instanceof Vec) || !(to instanceof Vec)) throw new Error('Pass a vec to drawLine');

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

        var rect =  new Rect(new Vec(x, y), new Vec(this._gx, this._gy))
        this._drawRect(tile.bgColor, rect)
        this._drawText(tile.glyph, tile.color, x, y)

        if (tile.name === 'wall') {
            this._drawRect('#000', rect);
            this._drawRect('#333', new Rect(new Vec(x, y), new Vec(this._gx, this._gy / 2)))
        }

    }
}

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
