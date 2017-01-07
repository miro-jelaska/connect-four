import 'pixi.js';
import Sprite = PIXI.Sprite;
import {GameBoard} from "./Components/GameBoard";
import {ScoreBoard} from "./Components/ScoreBoard";
import {RenderableElement} from "./Utilities/RenderableElement";
import {Setting} from "./Settings";


function onLoad():void {
    let imageName = "./app/images/coin-red.png";
    let renderer = PIXI.autoDetectRenderer(
            Setting.CANVAS_WIDTH, Setting.CANVAS_HEIGHT,
            {antialias: true, transparent: true, resolution: 1});

    document.body.appendChild(renderer.view);

    PIXI.loader
        .add(imageName)
        .load(setup);

    let tmpCoin:Sprite;

    function setup():void {
        tmpCoin = new PIXI.Sprite(PIXI.loader.resources["./app/images/coin-red.png"].texture);
        tmpCoin.position.set(10, -30);
        tmpCoin.width = 50;
        tmpCoin.height = 50;
        gameLoop();
    }

    function gameLoop():void {
        requestAnimationFrame(gameLoop);
        tmpCoin.position.y = tmpCoin.position.y + 5;
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
