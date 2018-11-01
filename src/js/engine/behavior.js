class Base {
    constructor() {

    }
    _register(collection, action, name, func) {
        if (!collection.has(action)) {
            let register = {};
            register[name] = func;
            collection.set(action, register);
        } else {
            let register = collection.get(action);
            if (register[name]) throw new Error('Something tried to register an action that already exists');
            register[name] = func;
            collection.set(action, register)
        }
    }

    _unregister(collection, action, name) {
        if (collection.has(action)) {
            let register = collection.get(action);
            delete register[name];
        }
    }
}

export default class Behavior extends Base{
    constructor(self) {
        super();
        this.self = self;
        this.seekList = [];
        this.avoidList = [];
        this.path = [];
    }

    seeks(...e) {
        for (let i in e) {
            this.seekList.push(e[i]);
        }
        return this.self;
    }

    willSeek(e) {
        return this.seekList.indexOf(e) >= 0;
    }

//changed to seek a specific target. range and target determined by monster logic
    seek(target) {
        //futre: a way to know what to prefer
        let self = this.self;

        //If an attack is next, let it happen.
        if (self.actionReady()) {
            if (self.nextAction.name === ATTACK) return;
        }
        /*if (self.pos.kingDistance(target.pos) == 1) {
         Game.dispatch(self, {type: 'action', name: ATTACK, data: {target: target}});
         return;
         }*/

        //If actor has 'determined' flag we'll ignore interest.
        let determined;
        if (self.flags){
            self.flags.indexOf('determined') >= 0 ? determined = true : determined = false;
        }

        //If this is the first time seeking this target or had no target
        if (self.focus.target === null || self.focus.target != target) {
            //New target so we're very interested
            self.interest = 100;
        } else if (self.interest < 20 && !determined) {
            //No longer interested in this target
            self.focus.target = null;
            self.focus.attitude = null;
            return;
        }

        //Decay focus by an amount scaled by distance
        self.interest -= Math.min(2.5 * self.pos.kingDistance(target.pos), 0);
        //let direction = self.pos.relativeDirectionTo(target.pos);
        let path = pathFinder(self.pos, target.pos);
        if (!path) return;
        let direction = self.pos.relativeDirectionTo(path[1]);

        this.path = path;

        self.focus.target = target;
        self.focus.attitude = 'aggressive';
        Game.dispatch(self, {type: 'action', name:MOVE, data:{direction}});

    }

    avoids(...e) {
        for (let i in e) {
            this.avoidList.push(e[i]);
        }
        return this.self;
    }

    willAvoid(e) {
        return this.avoidList.indexOf(e) >= 0;
    }

//changed to avoid a specific target. range and target determined by monster logic
    avoid(target) {
        let self = this.self;
        let direction = self.pos.relativeDirectionTo(target.pos)
        direction.x *= -1;
        direction.y *= -1;

        self.focus.target = target;
        self.focus.attitude = 'fearful';
        Game.dispatch(self, {type: 'action', name:MOVE, data:{direction, steps:1}})
    }

    wander() {
        let self = this.self;
        let direction = Direction.all;
        this.path = [];

        if (self.actionReady()) return;

        if (Math.random() > 0.55) {
            let chosenDirection = direction[Math.floor(Math.random() * direction.length)];
            Game.dispatch(self, {type: 'action', name: MOVE, data: {direction: chosenDirection}})
        } else {
            Game.dispatch(self, {type: 'action', name: MOVE, data: {direction: Direction.NONE}})
        }
    }

    do () {
        //preferentially avoid

    }

}
