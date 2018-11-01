export default class Font {
    constructor(image, glyphSize) {
        this.source = image;
        this.size = glyphSize;
        this.colors = {};
    }

    _getColor(color) {
        if (this.colors[color]) return this.colors[color];

        var tint = document.createElement('canvas');
        var _ctx = tint.getContext('2d');
        var _src = this.source;

        tint.width = this.source.width;
        tint.height = this.source.height;
        _ctx.drawImage(_src, 0, 0);
        _ctx.globalCompositeOperation = 'source-atop';
        _ctx.fillStyle = color;
        _ctx.fillRect(0, 0, _src.width, _src.height);

        this.colors[color] = tint;

        return tint;
    }

    _getGlyphPos(code) {
        var y = Math.floor(code / 32);
        var x = code - (32 * y);

        return {x, y};
    }

    getGlyph(code, color) {
        var _font = this._getColor(color);
        var _glyph = document.createElement('canvas');
        var _ctx = _glyph.getContext('2d');
        var _pos = this._getGlyphPos(code);

        var sx = _pos.x * this.size;
        var sy = _pos.y * this.size;
        var sw = this.size;
        var sh = this.size;

        var dx = 0;
        var dy = 0;
        var dw = this.size;
        var dh = this.size;

        _ctx.drawImage(_font, sx, sy, sw, sh, dx, dy, dw, dh);

        return _glyph;

    }
}
