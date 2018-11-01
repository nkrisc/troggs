import Actor from './actor.js';
import Game from '../game.js';

export default class Hero {
    constructor(stage, x, y) {
        super(stage, x, y);
    }

    get needsInput() {
        return this.action === null;
    }
}
