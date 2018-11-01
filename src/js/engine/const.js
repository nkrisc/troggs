var DEBUG = false;
var PATH_DEBUG = false;

//CREATURE TYPES
const KOBOLD = Symbol.for('kobold');
const TROGG = Symbol.for('trogg');
const HERO = Symbol.for('hero');
const SLIME = Symbol.for('slime');

class Type {
    constructor() {

    }
}

//ACTIONS
const MOVE = Symbol.for('move');
const ATTACK = Symbol.for('attack');
const REST = Symbol.for('rest');
const LEAP = Symbol.for('leap');
const FLEE = Symbol.for('flee');

//REACTIONS
const DODGE = Symbol.for('dodge');
const COWER = Symbol.for('cower');
const REVENGE = Symbol.for('revenge');
const TANK = Symbol.for('tank');

//MESSAGE STRINGS
const MESSAGE_RESTING = '%ACTOR% is resting.';
const MESSAGE_READY = '%ACTOR% is ready.';
const MESSAGE_READY_WAITING = '%ACTOR% is ready but does nothing.';
const MESSAGE_ACTION_MOVE = '%ACTOR% moved.';
const MESSAGE_ACTION_ATTACK_TARGET = '%ACTOR% attacked %OTHER%.';
const MESSAGE_ACTION_ATTACK_MISS = '%ACTOR% attacked %OTHER% but missed.';
const MESSAGE_ACTION_FLEE = '%ACTOR% fled.';
const MESSAGE_ACTION_FLEE_CONTINUE = '%ACTOR% is still fleeing.';

const MESSAGE_REACTION_ATTACK_STRUCK = '%ACTOR% was struck by an attack from %OTHER%.';
const MESSAGE_REACTION_ATTACK_DODGE = '%ACTOR% dodged an attack from %OTHER%.';
const MESSAGE_REACTION_COWER = '%ACTOR% cowers in fear from %OTHER%.';
/**
 * Created by Nathan on 2/4/2018.
 */
