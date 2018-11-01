export default class Action {

    set actor(actor) {
        if (!actor) {
            throw new Error('Actor must be set for action');
        }
        this.actor = actor;
    }

    get actor() {
        if (!actor) {
            throw new Error('Actor must be set for action');
        }
        return this.actor;
    }

    perform() {
        if (!actor) {
            throw new Error('No actor defined for action');
        }
        return this.onPerform();
    }

    onPerform() {
        throw new Error('Must overwrite onPerform on subclass');
    }
}
