import {GameBoard} from "./components/GameBoard";
import {ScoreBoard} from "./components/ui/ScoreBoard";
import {RenderableElement} from "./utilities/RenderableElement";
import {Player} from "./utilities/Player";
export class Game {
    private readonly renderer:PIXI.CanvasRenderer | PIXI.WebGLRenderer;

    private readonly gameBoard:GameBoard;
    private readonly scoreBoard:ScoreBoard;

    private playerWhoIsActiveFirst = Player.Blue;
    private activePlayer = this.playerWhoIsActiveFirst;

    constructor(rendered: PIXI.CanvasRenderer | PIXI.WebGLRenderer){
        this.renderer = rendered;
        this.scoreBoard = new ScoreBoard();
        this.gameBoard = new GameBoard(
            this.activePlayer,
            (player) => this.scoreBoard.playerWon(player));
    }

    public update(): void {
        this.gameBoard.update();
    }
    public render(): void {
        let rootStage = new PIXI.Container();
        ([
            this.gameBoard,
            this.scoreBoard,
        ] as Array<RenderableElement>)
            .map(element => element.getStage())
            .forEach(stage => rootStage.addChild(stage));
        this.renderer.render(rootStage);
    }
}