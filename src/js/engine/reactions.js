const REACTION = {}
REACTION[DODGE] = function(actor, data) {
    let self = actor;
    let initiator = data.initiator;
    if (Math.random() < 0.2) {
        Logger.write(MESSAGE_REACTION_ATTACK_DODGE, actor.name, initiator.name)
        //process dodging, apply to self then return result to attack to process
        return {outcome: 'dodge'}
    } else {
        Logger.write(MESSAGE_REACTION_ATTACK_STRUCK, actor.name, initiator.name)
        //process getting struck, apply to self then return result to attacker to process
        return {outcome: 'hit'}
    }
}
REACTION[TANK] = function(actor, data) {
    let self = actor;
    let initiator = data.initiator;
    return {outcome: 'hit'}
};
REACTION[REVENGE] = function(actor, data) {
    actor.focus.target = data.initiator;
    actor.focus.attitude = 'aggressive';
    return {outcome: 'revenge'}
};
REACTION[COWER] = function(actor, data) {
    let self = actor;
    let initiator = data.initiator;

    if (Math.random() > 0.5) Game.dispatch(actor, {type: 'action', name: FLEE, data: {test:'test'}});

    //Logger.write(MESSAGE_REACTION_COWER, actor.name, initiator.name);
    return {outcome: 'cower', /*message: `${actor.name} cowers in fear from ${data.initiator.name}`*/}
};/**
 * Created by Nathan on 2/4/2018.
 */
