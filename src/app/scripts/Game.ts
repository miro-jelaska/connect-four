import {GameBoard} from "./components/GameBoard";
import {ScoreBoard} from "./components/ui/ScoreBoard";
import {RenderableElement} from "./utilities/RenderableElement";
import {Player} from "./utilities/Player";
import {ActivityBar} from "./components/ui/ActivityBar";
export class Game {
    private readonly renderer: PIXI.CanvasRenderer | PIXI.WebGLRenderer;

    private readonly gameBoard: GameBoard;
    private readonly scoreBoard: ScoreBoard;
    private readonly activityBar: ActivityBar;

    private playerWhoIsActiveFirst = Player.Blue;
    private activePlayer = this.playerWhoIsActiveFirst;

    constructor(rendered: PIXI.CanvasRenderer | PIXI.WebGLRenderer){
        this.renderer = rendered;
        this.scoreBoard = new ScoreBoard();
        this.gameBoard = new GameBoard(
            this.activePlayer,
            (player) => this.onGameOver(player),
            (player) => this.onActivePlayerChange(player)
        );
        this.activityBar = new ActivityBar(this.activePlayer, () => this.onNewGameRequest())
    }

    public update(): void {
        this.gameBoard.update();
    }
    public render(): void {
        let rootStage = new PIXI.Container();
        ([
            this.gameBoard,
            this.scoreBoard,
            this.activityBar
        ] as Array<RenderableElement>)
            .map(element => element.getStage())
            .forEach(stage => rootStage.addChild(stage));
        this.renderer.render(rootStage);
    }

    private onGameOver(playerThatWon?: Player): void {
        if(playerThatWon !== null){
            this.scoreBoard.playerWon(playerThatWon);
        }
        this.activityBar.onGameOver();
    }

    private onActivePlayerChange(player: Player): void {
        this.activityBar.onActivePlayerChange(player);
    }

    private onNewGameRequest(): void {
        console.log('Start new game.');
    }
}