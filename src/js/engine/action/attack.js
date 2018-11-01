export default class AttackAction extends Action {
    constructor(target) {
        this.target = target;
    }

    onPerform() {
        var actor = this.actor;
        var target = this.target;

        var attack = actor.createAttack();
        var defense = target.createDefense(attack);

        return defense;
    }
}
