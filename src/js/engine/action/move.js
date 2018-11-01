import Game from '../game.js';
import ActionResult from './actionresult.js';

export default class MoveAction {
    constructor(direction) {
        this.direction = direction;
    }

    onPerform() {
        var actor = this.actor;

        if (!actor.canOccupy(actor.pos.add(direction))) return ActionResult.failure;

        Game.moveActor(actor.pos.add(direction));

        return ActionResult.success;
    }
}
