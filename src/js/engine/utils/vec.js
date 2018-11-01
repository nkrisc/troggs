export default class Vec {
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
