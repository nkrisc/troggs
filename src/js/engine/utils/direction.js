import Vec from './vec.js';

export default class Direction {
    static get N()    { return new Vec(0, -1);}
    static get NE()   { return new Vec(1, -1);}
    static get E()    { return new Vec(1, 0);}
    static get SE()   { return new Vec(1, 1);}
    static get S()    { return new Vec(0, 1)}
    static get SW()   { return new Vec(-1, 1);}
    static get W()    { return new Vec(-1, 0);}
    static get NW()   { return new Vec(-1, -1);}
    static get NONE() { return new Vec(0,  0);}

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
        return new Vec(direction.x * -1, direction.y * -1);
    }
};

export { Direction };
