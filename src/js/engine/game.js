import { Monsters } from '../content/monster_defs.js';
import Stage from './stage.js';
import Scene from './scene.js';
import Entity from './entity.js';

//TODO: Move monster definitions and actions out of here

export default class Game {
    constructor(canvas) {
        this.scene = new Scene(canvas, 9, 14);
        this.scene.initialize();

        this._currentStage = 0;
        this.stages = [];

        //In the future, can make new stages for new levels
        this.stages.push(new Stage(142, 62));



    }
    //Based on some input, dispatch actions. Could be user input or game logic.
    static dispatch(entity, event) {
        //Maybe this logic should really be on the entity. Just send the event?
        if(event.type === 'action') return entity.setAction(event.name, event.data);
        if(event.type === 'reaction') return entity.react(event.name, event.data);
    }

    get stage() {
        return this.stages[this._currentStage];
    }

    spawnActors(stage) {
        if (!stage.initialized) throw new Error('Initialize stage before spawning actors');
        //TEMPORARY
        function Trogg(x, y) {
            function troggBehavior(self) {
                let targets = Game.findNear(Game.entities, self.pos, 4),
                    seekCandidates,
                    behavior = self.behavior;

                //If we already have an attack queued, return and let it happen next;
                if (self.nextAction && self.nextAction.name === ATTACK) return;

                seekCandidates = targets.filter(t => {
                    return self.behavior.willSeek(t.type) === true;
                })

                //Troggs don't avoid anything. They're not too bright.
                if (seekCandidates.length > 0) {
                    self.behavior.seek(seekCandidates[0])
                    return
                }

                self.focus.target = null;
                self.focus.attitude = null;
                self.behavior.wander();
                //return

            }
            return new Entity({
                name: 'Trogg',
                type: TROGG,
                hp: 50,
                recovery: 20,
                x: x,
                y: y,
                strength: 10,
                fortitude: 20,
                flags: 'reckless',
                size: 1,
                isAI: true,
                logic: troggBehavior})
                .addActions(MOVE, ATTACK)
                .reactsTo(ATTACK, [TANK])
                .behavior.seeks(HERO);
        }
        function Kobold(x, y){
            function koboldBehavior(self) {
                let //targets = Game.findNear(Game.entities, self.x, self.y, 6),
                    seekCandidates = Game.findNear(Game.entities, self.pos, 4),
                    avoidCandidates = Game.findNear(Game.entities, self.pos, 3),
                    behavior = self.behavior;

                seekCandidates = seekCandidates.filter(t => {
                    return self.behavior.willSeek(t.type) == true;
                })

                avoidCandidates = avoidCandidates.filter(t => {
                    return self.behavior.willAvoid(t.type) == true;
                })

                //Preferentially avoid. Kobolds are fearful and opportunistic.
                if (avoidCandidates.length > 0) {
                    self.behavior.avoid(avoidCandidates[0])
                    return
                }

                if (seekCandidates.length > 0) {
                    self.behavior.seek(seekCandidates[0])
                    return
                }

                self.focus.target = null;
                self.focus.attitude = null;

                self.behavior.wander();
                //return

            }
            return new Entity({
                name: 'Kobold',
                type: KOBOLD,
                hp: 20,
                recovery: 100/3,
                x: x,
                y: y,
                strength: 5,
                fortitude: 10,
                size: 0,
                isAI: true,
                logic: koboldBehavior})
                .addActions(ATTACK, MOVE, FLEE)
                .reactsTo(ATTACK, [DODGE, COWER])
                .behavior.seeks(HERO)
                .behavior.avoids(TROGG);
        }
        function GreenSlime(x, y) {
            function slimeBehavior(self) {
                let behavior = self.behavior;

                if (self.focus.target && self.focus.attitude == 'aggressive') {
                    behavior.seek(self.focus.target)
                    return;
                }

                let nearest = Game.findNearest(Game.entities, self.pos, 3);
                if (nearest) {
                    if (behavior.willAvoid(nearest.type)) {
                        behavior.avoid(nearest);
                        return;
                    }
                }

                behavior.wander();
            }
            return new Entity({
                name: 'Green Slime',
                type: SLIME,
                hp: 40,
                recovery: 25,
                x: x,
                y: y,
                strength: 5,
                fortitude: 10,
                flags: 'determined',
                size: 0,
                isAI: true,
                logic: slimeBehavior})
                .addActions(MOVE, ATTACK)
                .reactsTo(ATTACK, [DODGE, REVENGE])
                .behavior.avoids(TROGG)
            /*.onDie = function(self) {
             new GreenSlime(this.pos.x + 1, this.pos.y);
             new GreenSlime(this.pos.x - 1, this.pos.y);
             }*/
        }
        window.hero = new Entity({
            name: 'Hero',
            type: HERO,
            hp: 100,
            recovery: 100/3,
            x: 8,
            y: 4,
            strength: 15,
            fortitude: 50,
            size: 1})
            .addActions(MOVE, ATTACK, REST)
            .reactsTo(ATTACK, [DODGE]);

        //Randomly place troggs
        for (var i = 0; i < 5; i++) {
            let roomIndex = Math.floor(Math.random() * stage.rooms.length);
            let room = stage.rooms[roomIndex]
            let tileIndex = Math.floor(Math.random() * room.tiles.length);
            let tile = room.tiles[tileIndex];
            Trogg(tile.x, tile.y);
        }

        //Randomly place kobolds
        for (var i = 0; i < 10; i++) {
            let roomIndex = Math.floor(Math.random() * stage.rooms.length);
            let room = stage.rooms[roomIndex]
            let tileIndex = Math.floor(Math.random() * room.tiles.length);
            let tile = room.tiles[tileIndex];
            Kobold(tile.x, tile.y);
        }

        //Randomly place slimes
        for (var i = 0; i < 3; i++) {
            let roomIndex = Math.floor(Math.random() * stage.rooms.length);
            let room = stage.rooms[roomIndex]
            let tileIndex = Math.floor(Math.random() * room.tiles.length);
            let tile = room.tiles[tileIndex];
            GreenSlime(tile.x, tile.y);
        }
    };

    newStage() {
        //this.stages.push(new Stage);
    }

    update() {
        this.stage.actors.forEach(actor => {
            if (actor.isAI) actor.logic(actor);
            actor.act();
        });

        this.scene.draw(this.stage);
    }

    initialize() {
        this.stage.initialize();
        //this.stage.actors = this.spawnActors(this.stage);
        this.scene.draw(this.stage);

        window.update = this.update;
        window.update.bind(this);
    }
};
