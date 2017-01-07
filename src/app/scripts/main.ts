import 'pixi.js';
import Sprite = PIXI.Sprite;
import {GameBoard} from "./Components/GameBoard";
import {ScoreBoard} from "./Components/ScoreBoard";
import {RenderableElement} from "./Utilities/RenderableElement";
import {Setting} from "./Settings";


function onLoad():void {
    let renderer = PIXI.autoDetectRenderer(
            Setting.CANVAS_WIDTH, Setting.CANVAS_HEIGHT,
            {antialias: true, transparent: true, resolution: 1});

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

    let tmpCoin:Sprite;

    function setup():void {
        tmpCoin = new PIXI.Sprite(PIXI.loader.resources["./app/images/coin-red.png"].texture);
        tmpCoin.anchor.x = 0.5;
        tmpCoin.anchor.y = 0.5;

        tmpCoin.width = 60;
        tmpCoin.height = 60;
        tmpCoin.position.set(
            GameBoard.getCenter(2,0).x,
            GameBoard.getCenter(2,4).y);
        gameLoop();
    }

    function gameLoop():void {
        requestAnimationFrame(gameLoop);
        render();
    }
    function render():void{
        let rootStage = new PIXI.Container();
        rootStage.addChild(tmpCoin);
        ([
            new GameBoard(),
            new ScoreBoard()
        ] as Array<RenderableElement>)
            .map(element => element.getStage())
            .forEach(stage => rootStage.addChild(stage));
        renderer.render(rootStage);
    }
}

window.onload = () => onLoad();
