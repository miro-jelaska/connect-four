import 'pixi.js';
import Sprite = PIXI.Sprite;

import {Setting} from "./Settings";
import {Game} from "./Game";
import IRendererOptions = PIXI.IRendererOptions;


function onLoad():void {
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
        let rendererOptions:IRendererOptions = {
            antialias: true,
            transparent: true,
            resolution: 1
        };
        let renderer = PIXI.autoDetectRenderer(
            Setting.CANVAS_WIDTH, Setting.CANVAS_HEIGHT,
            rendererOptions);
        document.body.appendChild(renderer.view);

        let game: Game = new Game(renderer);
        gameLoop(game);
    }

    function gameLoop(game: Game):void {
        requestAnimationFrame(() => gameLoop(game));
        game.update();
        game.render();
    }
}

window.onload = () => onLoad();
