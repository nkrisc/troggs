

export default class Font {
    constructor(image) {
        this.source = image;
        this.colors = {};
    }

    getColor(color) {
        if (this.colors[color]) return this.colors[color];

        var tint = document.createElement('canvas');
        var _ctx = tint.getContext('2d');
        var _src = this.source;

        _ctx.drawImage(_src, 0, 0);
        _ctx.globalCompositeOperation = 'source-atop';
        _ctx.fillStyle = color;
        _ctx.fillRect(0, 0, _src.width, _src.height)

        this.colors[color] = tint;

        return tint;
    }
}

const glyph = {};
glyph.space = 1;
glyph.faceLine = 2;
glyph.faceFill = 3;
glyph.heart = 4;
glyph.diamond = 5;
glyph.club = 6;
glyph.spade = 7;
glyph.fatDot = 8;
//9
glyph.doorOutline = 10;
glyph.doorFill = 11;
//12
//13
//14
//15
//16

glyph.rightTriangle = 17;
glyph.leftTriangle = 18;
glyph.doubleVerticalArrow = 19;
glyph.doubleExclamation = 20;
//21
//22
//23
//24
glyph.upArrow = 25;
glyph.downArrow = 26;
glyph.rightArrow = 27;
glyph.leftArrow = 28;
glyph.carriageReturn = 29;
glyph.doubleHorizontalArrow = 30;
glyph.upTriangle = 31;
glyph.downTriangle = 32;

//33
glyph.exclamation = 34;
glyph.umlaut = 35;
glyph.hash = 36;
glyph.dollar = 37;
glyph.percent = 38;
glyph.ampersand = 39;
glyph.topDot = 40;
glyph.leftParens = 41;
glyph.rightParens = 42;
glyph.asterisk = 43;
glyph.plus = 44;
glyph.comma = 45;
glyph.hyphen = 46;
glyph.period = 47;
glyph.forwardSlash = 48;

glyph.zero = 49;
glyph.one = 50;
glyph.two = 51;
glyph.three = 52;
glyph.four = 53;
glyph.five = 54;
glyph.six = 55;
glyph.seven = 56;
glyph.eight = 57;
glyph.nine = 58;
glyph.colon = 59;
glyph.semicolon = 60;
glyph.lt = 61;
glyph.equals = 62;
glyph.gt = 63;
glyph.question = 64;

glyph.at = 65;
glyph.A = 66;
glyph.B = 67;
glyph.C = 68;
glyph.D = 69;
glyph.E = 70;
glyph.F = 71;
glyph.G = 72;
glyph.H = 73;
glyph.I = 74;
glyph.J = 75;
glyph.K = 76;
glyph.L = 77;
glyph.M = 78;
glyph.N = 79;
glyph.O = 80;

glyph.P = 81;
glyph.Q = 82;
glyph.R = 83;
