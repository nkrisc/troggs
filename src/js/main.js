import Game from './engine/game';

document.addEventListener('DOMContentLoaded', function(){
    window.addEventListener('keydown', function(e) {
        e.preventDefault();
        switch (e.keyCode) {
            case 40:
                Game.dispatch(hero, {type:'action',name:MOVE,data:{direction:Direction.S,steps:1}});Game.update();
                break;
            case 39:
                Game.dispatch(hero, {type:'action',name:MOVE,data:{direction:Direction.E,steps:1}});Game.update();
                break;
            case 38:
                Game.dispatch(hero, {type:'action',name:MOVE,data:{direction:Direction.N,steps:1}});Game.update();
                break;
            case 37:
                Game.dispatch(hero, {type:'action',name:MOVE,data:{direction:Direction.W,steps:1}});Game.update();
                break;
        }
        switch(e.key) {
            case 'i': Game.dispatch(hero, {type:'action',name:MOVE,data:{direction:Direction.NW,steps:1}});Game.update(); break;
            case 'o': Game.dispatch(hero, {type:'action',name:MOVE,data:{direction:Direction.N,steps:1}});Game.update(); break;
            case 'p': Game.dispatch(hero, {type:'action',name:MOVE,data:{direction:Direction.NE,steps:1}});Game.update(); break;
            case 'k': Game.dispatch(hero, {type:'action',name:MOVE,data:{direction:Direction.W,steps:1}});Game.update(); break;
            case ';': Game.dispatch(hero, {type:'action',name:MOVE,data:{direction:Direction.E,steps:1}});Game.update(); break;
            case ',': Game.dispatch(hero, {type:'action',name:MOVE,data:{direction:Direction.SW,steps:1}});Game.update(); break;
            case '.': Game.dispatch(hero, {type:'action',name:MOVE,data:{direction:Direction.S,steps:1}});Game.update(); break;
            case '/': Game.dispatch(hero, {type:'action',name:MOVE,data:{direction:Direction.SE,steps:1}});Game.update(); break;
            case 'l': Game.dispatch(hero, {type:'action',name:REST}); break;

        }
        Game.wait = false;
    });
    window.addEventListener('click', function(e) {
        if (e.target.id === 'canvas') {
            let x = Math.floor(e.offsetX / Game.scene.gridSizeX);
            let y = Math.floor(e.offsetY / Game.scene.gridSizeY);

            if (e.button === 0 && !Game.find(Game.entities, new Vec(x, y))) {
                Stage.addTile(Stage.tile.wall, new Vec(x, y));
                Game.scene.draw();
            }

            if (e.button === 0 && e.shiftKey === true) {
                Stage.addTile(Stage.tile.floor, new Vec(x, y));
                Game.scene.draw();
            }
        }

        return false;
    });


    const SCALE_FACTOR = 2;
    var canvas = document.getElementById('canvas');

    window.game = new Game(canvas);
    game.initialize();

    document.getElementById('curtain').style.display = 'none';

    function loop() {
        //Check if we're in the middle of a turn.
        if (game.turnComplete) {
            //The turn is finished so draw the result.
            game.scene.draw(game.stage);

            //Start a new turn
            console.log('Starting new turn.');
            game.turn = game.update();
            game.turn.next();
        } else {
            if (!game.needsInput) {
                //We're not waiting on user input and in the middle of a turn.
                //Iterate the update function to continue processing the turn.
                game.turn.next();
            }
        }

        window.requestAnimationFrame(loop);
    }

    window.requestAnimationFrame(loop);
});
