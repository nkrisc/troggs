import RNG from '../utils/random.js';

export default class Hit {
    constructor() {
        this.element = null;
        this.power = 0;
    }

    static rollDamage(power) {
        return Math.max(0, RNG.range(power - 3, power + 3))
    }
}
