import Vec from './../utils/vec.js';
import Game from './../game.js';
import Hit from './../combat/hit.js';

export default class Actor {
    constructor(stage, x, y, stats) {
        this.pos = new Vec(x, y);
        this.speed = stats.speed || 12;
        this.power = stats.power || 1;
        this.defense = stats.defense || 1;

        this.action = null;

        stage.actorsByPos.set(this.pos, this);
    }

    get x() {
        return this.pos.x;
    }

    get y() {
        return this.pos.y;
    }

    get needsInput() {
        return false;
    }

    set nextAction(action) {
        this.action = action;
    }

    get nextAction() {
        return this.action;
    }

    createAttack() {
        var attack = new Hit();

        attack.element = this.imbue || null;
        attack.power = Hit.rollDamage(this.power);
        return attack;
    }
}
