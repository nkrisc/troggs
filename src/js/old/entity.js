import Behavior from './../engine/behavior.js';

export default class Entity {
    constructor(properties) {
        this.pos = new Vec(properties.x || 0, properties.y || 0);
        this.direction = properties.direction || 0;

        this.name = properties.name || 'DefaultName';
        this.type = properties.type || undefined;
        this.maxHP = properties.hp || 50;
        this.currentHP = this.maxHP;
        this.strength = properties.strength || 0;
        this.fortitude = properties.fortitude || 0;
        this.size = properties.size || 0;
        if (properties.flags) this.flags = properties.flags.split(' ');

        this.energy = 0;
        this.maxEnergy = 100;
        this.recovery = properties.recovery || 50;

        this.nextAction = null;
        //this.actions = {};
        this.actions = new Map();
        this.reactions = new Map();
        this.reactionTo = {};
        this.before = new Map();
        this.after = new Map();
        this.focus  = {
            target: null,
            attitude: null
        }
        this.interest = 0;
        this.onDie = null;

        this.isAI = properties.isAI || false;
        if (this.isAI === true) {
            this.logic = properties.logic;
            this.behavior = new Behavior(this);
        }

        Game.entities.push(this);
        Game.entitiesByPos.set(`${this.pos.x},${this.pos.y}`, this);
        return this;
    }

    modifyHP(value) {
        if (this.currentHP + value > 0) {
            if (this.maxHP - this.currentHP > value) {
                this.currentHP += value
            } else {
                this.currentHP = this.maxHP;
            }
        } else {
            this.die();
        }
    }

    die() {
        stage.removeEntity(this);
        if (this.onDie) {
            this.onDie(this);
        }
    }

    _register(collection, key, name, value) {
        if (!collection.has(key)) {
            let register = {};
            register[name] = value;
            collection.set(key, register);
        } else {
            let register = collection.get(key);
            if (register[name]) throw new Error('Something tried to register an action that already exists');
            register[name] = value;
            collection.set(key, register)
        }
    }

    _unregister(collection, action, name) {
        if (collection.has(action)) {
            let register = collection.get(action);
            delete register[name];
        }
    }
    setAction(action, data) {
        if (this.actions.has(action)) {
            this.nextAction = {name: action, action: this.actions.get(action), data};
            return true;
        } else {
            Logger.warn(`${this.name} doesn't know how to ${Symbol.keyFor(action)}.`)
            return false;
        }
    }

    actionReady() {
        return this.nextAction ? true : false;
    }

    beforeAction(action, name, func) {
        this._register(this.before, action, name, func)
        return this;
    }

    unregisterBeforeAction(action, name) {
        this._unregisterAction(this.before, action, name)
        return this;
    }

    afterAction(action, name, func) {
        this._register(this.after, action, name, func)
        return this;
    }

    unregisterAfterAction(action, name) {
        this._unregister(this.after, action, name)
        return this;
    }

    addActions(...actions) {
        for (let i in actions) {
            this.actions.set(actions[i], ACTION[actions[i]]);
        }
        return this;
    }

    removeActions(actions) {
        for (let i in actions) {
            this.actions.delete(actions[i]);
        }
        return this;
    }
    ready() {
        return this.energy >= 100;
    }
    act() {
        if (!this.ready()) {
            this.rest();
        } else {
            if (this.nextAction) {
                let currentAction = this.nextAction.action;
                let currentActionName = this.nextAction.name;
                let currentActionData = this.nextAction.data;

                /*  Reset next action and energy before doing anything. We're committed now.
                 *  One of the actions below might set a new action or refund energy
                 */
                this.nextAction = null;
                this.energy = 0;

                //Before action
                if (this.before.has(currentActionName)) {
                    let beforeActions = this.before.get(currentActionName);
                    for (let i in beforeActions) {
                        beforeActions[i](this, currentActionData)
                    }
                }
                //Do the action
                let result = currentAction(this, currentActionData);

                //After action - this also happens after the target's reactions to the action
                if (this.after.has(currentActionName)) {
                    let afterActions = this.after.get(currentActionName);
                    for (let i in afterActions) {
                        afterActions[i](this, currentActionData)
                    }
                }
            } else {
                //Logger.write(MESSAGE_READY_WAITING, this.name);
            }
        }
    }
    rest() {
        this.energy = Math.min(this.energy += this.recovery, this.maxEnergy);
        //this.energy >= 100 ? Logger.write(MESSAGE_READY, this.name) : Logger.write(MESSAGE_RESTING, this.name);
    }

    reactsTo(action, reactions) {
        if (!this.reactions.has(action)) {
            this.reactions.set(action, reactions)
        } else {
            let existingReactions = this.reactions.get(action);
            reactions.forEach(i => {
                existingReactions.push(reactions[i])
            })
        }
        return this;
    }

    react(action, data) {
        //let reactions = this.reactionTo[action];
        if (!this.reactions.has(action)) return [{outcome: null}];
        let reactions = this.reactions.get(action);
        let result = [];
        reactions.forEach(name => {
            result.push(REACTION[name](this, data))
        })
        return result;
    }

}/**
 * Created by Nathan on 2/4/2018.
 */
