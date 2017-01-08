import 'pixi.js';
import Sprite = PIXI.Sprite;

import {Setting} from "./Settings";
import {Game} from "./Game";


function onLoad():void {
    let renderer = PIXI.autoDetectRenderer(
            Setting.CANVAS_WIDTH, Setting.CANVAS_HEIGHT,
            { antialias: true, transparent: true, resolution: 1 });
    let game: Game = new Game(renderer);
    document.body.appendChild(renderer.view);

    PIXI.loader
        .add([
            "./app/images/board.png",
            "./app/images/coin-red.png",
            "./app/images/coin-blue.png",
            "./app/images/pointer-blue.png",
            "./app/images/pointer-red.png",
        ])
        .load(setup);

    function setup():void {
        gameLoop();
    }

    function gameLoop():void {
        requestAnimationFrame(gameLoop);
        game.update();
        game.render();
    }
}

window.onload = () => onLoad();
