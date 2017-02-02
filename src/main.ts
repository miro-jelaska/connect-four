import 'pixi.js';
import Sprite = PIXI.Sprite;

import {Setting} from "./Settings";
import {Game} from "./Game";
import IRendererOptions = PIXI.IRendererOptions;

function onLoad(): void {
    PIXI.loader
        .add([
            "./images/board.png",
            "./images/coin-red.png",
            "./images/coin-blue.png",
            "./images/new-game.png",
            "./images/pointer-blue.png",
            "./images/pointer-red.png",
            "./images/turn-blue.png",
            "./images/turn-red.png"
        ])
        .load(setup);

    function setup(): void {
        let rendererOptions: IRendererOptions = {
            antialias: true,
            transparent: true,
            resolution: 1
        };
        let renderer = PIXI.autoDetectRenderer(
            Setting.CANVAS_WIDTH,
            Setting.CANVAS_HEIGHT,
            rendererOptions);

        document.body.appendChild(renderer.view);

        gameLoop(new Game(renderer));
    }

    function gameLoop(game: Game): void {
        requestAnimationFrame(() => gameLoop(game));
        game.update();
        game.render();
    }
}

window.onload = () => onLoad();
