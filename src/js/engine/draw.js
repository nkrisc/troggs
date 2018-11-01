Game.scene.initialDraw = function() {
    let ctx = Game.scene.ctx;
    let gx = Game.scene.gridSizeX;
    let gy = Game.scene.gridSizeY;
    let canvas = Game.scene.canvas;
    //ctx.font = `normal ${gy}px "8bitoperator"`;

    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let x = 0; x < Math.floor(canvas.width / gx); x++) {
        for (let y = 0; y < Math.floor(canvas.height / gy); y++) {

            let tile = Stage.tiles[x][y];


            ctx.fillStyle = tile.bgColor;
            ctx.fillRect(x * gx, y * gy, gx, gy);
            ctx.fillStyle = tile.color;
            ctx.fillText(tile.Glyph, x * gx, y * gy);

            if (tile === Stage.tile.wall) {
                ctx.fillStyle = '#000';
                ctx.fillRect(x * gx, y * gy, gx, gy);
                ctx.fillStyle = '#3a3a3a';
                ctx.fillRect(x * gx, y * gy + gy / 2, gx, gy / 2)
            }
        }
    }

}

Game.scene.draw = function() {
    let ctx = Game.scene.ctx;
    let canvas = Game.scene.canvas;
    let gx = Game.scene.gridSizeX;
    let gy = Game.scene.gridSizeY;

    Game.scene.initialDraw();

    Game.entities.forEach(e => {

        ctx.fillStyle = '#000';
        //ctx.fillRect(e.pos.x * gx, e.pos.y * gy, gx, gy);
        if (e.type == TROGG) {
            ctx.font = `${gy}px "8bitoperator"`;
            ctx.fillStyle = '#FF0000';
            //ctx.fillRect(e.x * Game.scene.gridSize, e.y * Game.scene.gridSize, 10, 10)
            ctx.fillText('T', e.pos.x * gx + gx / 4, e.pos.y * gy)
        }
        if (e.type == KOBOLD) {
            ctx.font = `${gy}px "8bitoperator"`;
            ctx.fillStyle = '#DD6633';
            //ctx.fillRect(e.x * Game.scene.gridSize, e.y * Game.scene.gridSize, 10, 10)
            ctx.fillText('K', e.pos.x * gx + gx / 4, e.pos.y * gy)
        }
        if (e.type === HERO) {
            ctx.font = `${gy}px "8bitoperator"`;
            ctx.fillStyle = '#FFFFFF';
            ctx.fillText('@', e.pos.x * gx + gx / 4, e.pos.y * gy)
        }
        if (e.type === SLIME) {
            ctx.font = `${gy}px "8bitoperator"`;
            ctx.fillStyle = '#00FF00';
            ctx.fillText('S', e.pos.x * gx + gx / 4, e.pos.y * gy)
        }
        if (e.currentHP / e.maxHP > 0.2) ctx.fillStyle = '#FF0000';
        if (e.currentHP / e.maxHP > 0.4) ctx.fillStyle = '#DFA20B';
        if (e.currentHP / e.maxHP > 0.8) ctx.fillStyle = '#00FF00';

        let hpBarHeight = 2;
        let hpBarWidth = Math.max(gx * (e.currentHP / e.maxHP), 0);
        ctx.fillRect(e.pos.x * gx, e.pos.y * gy + gy - 2, hpBarWidth, hpBarHeight);
    });
}

function loop() {
    if (hero.actionReady()) {
        Game.update();
        Game.scene.draw();
        if (DEBUG === true) debugDraw();
    }

    window.requestAnimationFrame(loop);
}

Game.scene.draw.arrow = function(fromx, fromy, tox, toy, color) {
    //figure out arrow to/from offsets based on relative positions
    if (fromy > toy) {
        //Top quadrants.
        if (fromx < tox) {
            //TO is in top right quadrant.
            //   T
            //  /
            // F
            //fromx += Game.scene.gridSizeX;
            toy += Game.scene.gridSizeY;
        } else if (fromx > tox){
            //Top left quadrant.
            // T
            //  \
            //   F
            toy += Game.scene.gridSizeY;
            tox += Game.scene.gridSizeX;
        } else {
            //fromx += Game.scene.gridSizeX / 2;
            tox += Game.scene.gridSizeX / 2;
            toy += Game.scene.gridSizeY;
        }
    } else if (fromy < toy){
        //Bottom quadrants.
        if (fromx < tox) {
            //TO is in bottom right quadrant.
            // F
            //  \
            //   T
            //fromx += Game.scene.gridSizeX;
            //fromy += Game.scene.gridSizeY;
        } else if (fromx > tox){
            //TO is in bottom left quadrant.
            //   F
            //  /
            // T
            //fromy += Game.scene.gridSizeY;
            tox += Game.scene.gridSizeX;
        } else {
            //fromx += Game.scene.gridSizeX / 2;
            tox += Game.scene.gridSizeX / 2;
            //fromy += Game.scene.gridSizeY;
        }
    } else {
        //Same Y value
        if (fromx < tox) {
            // F->T
            //fromy += Game.scene.gridSizeY / 2;
            toy += Game.scene.gridSizeY / 2;
            //fromx += Game.scene.gridSizeX;
        } else {
            //T<-F
            //fromy += Game.scene.gridSizeY / 2;
            toy += Game.scene.gridSizeY / 2;
            tox += Game.scene.gridSizeX;
        }
    }

    fromx += Game.scene.gridSizeX / 2;
    fromy += Game.scene.gridSizeY / 2;



    //https://stackoverflow.com/a/6333775/5941574
    var headlen = 5;
    var angle = Math.atan2(toy - fromy, tox - fromx);
    Game.scene.ctx.beginPath();
    Game.scene.ctx.strokeStyle = color;
    Game.scene.ctx.moveTo(fromx, fromy);
    Game.scene.ctx.lineTo(tox, toy);
    Game.scene.ctx.lineTo(tox-headlen * Math.cos(angle - Math.PI / 6), toy-headlen * Math.sin(angle - Math.PI / 6));
    Game.scene.ctx.moveTo(tox, toy);
    Game.scene.ctx.lineTo(tox-headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
    Game.scene.ctx.stroke();
}

function debugDraw() {
    let gx = Game.scene.gridSizeX;
    let gy = Game.scene.gridSizeY;
    Game.entities.forEach(e => {
        if (e.focus.target) {
            let fromx = e.pos.x * gx;
            let fromy = e.pos.y * gy;
            let tox = e.focus.target.pos.x * gx;
            let toy = e.focus.target.pos.y * gy;
            if (e.focus.attitude == 'fearful') {
                Game.scene.draw.arrow(fromx,
                    fromy,
                    tox,
                    toy,
                    '#00F')
            }
            if (e.focus.attitude == 'aggressive') {
                Game.scene.draw.arrow(fromx,
                    fromy,
                    tox,
                    toy,
                    '#F00')
            }
            if (e.focus.attitude == 'vengeful') {
                Game.scene.draw.arrow(fromx,
                    fromy,
                    tox,
                    toy,
                    '#600')
            }
            Game.scene.ctx.stroke()
        }

        if (e.actionReady()) {
            Game.scene.ctx.font = `normal 14px "8bitoperator"`;
            Game.scene.ctx.fillStyle = '#fff';
            Game.scene.ctx.fillText(`${e.actionReady() ? Symbol.keyFor(e.nextAction.name) : 'Wait'}`, (e.pos.x + 1) * Game.scene.gridSizeX, (e.pos.y + 1) * Game.scene.gridSizeY);

            if (e.behavior && e.behavior.path.length > 0) {
                let path = e.behavior.path;

                Game.scene.ctx.beginPath();
                Game.scene.ctx.strokeStyle = '#F00';
                Game.scene.ctx.moveTo(path[0].x * gx + gx / 2, path[0].y * gy + gx / 2);
                for (let i = 0; i < path.length - 1; i++) {
                    Game.scene.ctx.lineTo(path[i].x * gx + gx / 2, path[i].y * gy + gy / 2);
                }
                Game.scene.ctx.stroke();
                Game.scene.draw.arrow(path[path.length - 2].x * gx, path[path.length - 2].y * gy, path[path.length - 1].x * gx, path[path.length - 1].y * gy, '#F00')
            }
        }
    })
}/**
 * Created by Nathan on 2/4/2018.
 */
