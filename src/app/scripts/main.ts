import 'pixi.js';
import Sprite = PIXI.Sprite;
import {GameBoard} from "./GameBoard";
import {ScoreBoard} from "./ScoreBoard";

function onLoad():void {
    let imageName = "./app/images/coin-red.png";

    let renderer = PIXI.autoDetectRenderer(300, 300);


    console.log(renderer.view);
    document.body.appendChild(renderer.view);

    PIXI.loader
        .add(imageName)
        .load(setup);

    function setup():void {
        gameLoop();
    }

    function gameLoop():void {
        requestAnimationFrame(gameLoop);

        let rootStage = new PIXI.Container();
        rootStage.addChild((new GameBoard()).getStage());
        rootStage.addChild((new ScoreBoard()).getStage());
        renderer.render(rootStage);
    }
}

window.onload = () => onLoad();
