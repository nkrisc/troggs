const ACTION = {};
ACTION[MOVE] = function(actor, data) {
    //Check for obstacles, that the actor can actually move that far in this move
    if (data.direction instanceof Vec === false) throw Error('Pass a vec for data.direction');
    let newPos = actor.pos.add(data.direction);

    let bump = Game.find(Game.entities, newPos);
    if (!bump) {
        //Logger.write(MESSAGE_ACTION_MOVE, actor.name)
        //actor.pos = newPos;
        Game.moveActor(actor, newPos);
    } else if (actor.type === HERO || actor.behavior.willSeek(bump.type)) {
        Game.dispatch(actor, {type: 'action', name: ATTACK, data: {target: bump}});
        //Logger.write(`${actor.name} couldn't move to ${desiredX}, ${desiredY}`)
        //future: attack instead
    } else {
        //friendly in the way
    }
    //actor.nextAction = null;
};
ACTION[ATTACK] = function(actor, data) {
    let target = data.target;
    //First ensure the target is in range of the actor when performed.
    if (actor.pos.kingDistance(target.pos) === 1) {
        //Dispatch the attack event to the target to get their reaction.
        let result = Game.dispatch(target, {type: 'reaction', name: ATTACK, data: {initiator: actor}});

        let hit = false;
        result.forEach(i => {
            if (i.outcome === 'hit') hit = true;
        })
        if (hit) {
            target.modifyHP(-actor.strength)
            Logger.write(MESSAGE_ACTION_ATTACK_TARGET, actor.name, target.name)
        };
    } else {
        Logger.write(MESSAGE_ACTION_ATTACK_MISS, actor.name, target.name)
    }

};
ACTION[REST] = function(actor, data) {
    actor.modifyHP(10);
}
ACTION[FLEE] = function(actor, data) {
    //data.repeat ? Logger.write(MESSAGE_ACTION_FLEE_CONTINUE, actor.name) : Logger.write(MESSAGE_ACTION_FLEE, actor.name);

    if(Math.random() > 0.6) Game.dispatch(actor, {type: 'action', name: FLEE, data: {repeat: true}});
};/**
 * Created by Nathan on 2/4/2018.
 */
