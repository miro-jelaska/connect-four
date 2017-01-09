import {RenderableElement} from "../../utilities/RenderableElement";
import {Player} from "../../utilities/Player";
import {GameBoard} from "../GameBoard";
import {ScoreBoard} from "./ScoreBoard";

export class ActivityBar implements RenderableElement {
    public static readonly CANVAS_MARGIN_TOP = GameBoard.BOARD_MARGIN_TOP + GameBoard.BOARD_HEIGHT + ScoreBoard.HEIGHT;
    private readonly onNewGameRequest: () => void;

    private readonly bluePlayerTurnStatus: PIXI.Container;
    private readonly redPlayerTurnStatus: PIXI.Container;
    private readonly newGameButton: PIXI.Container;

    private activeStage: PIXI.Container;
    constructor(initialTurn: Player, onNewGameRequest: () => void){
        this.onNewGameRequest = onNewGameRequest;

        this.bluePlayerTurnStatus = new PIXI.Container();
        let bluePlayerRTurnSprite = new PIXI.Sprite(
            PIXI.loader.resources["./app/images/turn-blue.png"].texture
        );
        bluePlayerRTurnSprite.position.y = ActivityBar.CANVAS_MARGIN_TOP;
        this.bluePlayerTurnStatus.addChild(bluePlayerRTurnSprite);

        this.redPlayerTurnStatus = new PIXI.Container();
        let redPlayerRTurnSprite = new PIXI.Sprite(
            PIXI.loader.resources["./app/images/turn-red.png"].texture
        );
        redPlayerRTurnSprite.position.y = ActivityBar.CANVAS_MARGIN_TOP;
        this.redPlayerTurnStatus.addChild(redPlayerRTurnSprite);

        this.newGameButton = new PIXI.Container();
        let newGameButtonSprite = new PIXI.Sprite(
            PIXI.loader.resources["./app/images/new-game.png"].texture
        );
        newGameButtonSprite.position.y = ActivityBar.CANVAS_MARGIN_TOP;
        newGameButtonSprite.interactive = true;
        newGameButtonSprite.on('click', () => this.onNewGameRequest());
        this.newGameButton.addChild(newGameButtonSprite);

        this.onActivePlayerChange(initialTurn);
    }

    public onActivePlayerChange(player: Player): void {
        if(player === Player.Blue)
            this.activeStage = this.bluePlayerTurnStatus;
        else
            this.activeStage = this.redPlayerTurnStatus;
    }

    public onGameOver(): void {
        this.activeStage = this.newGameButton;
    }


    public getStage(): PIXI.Container{
        return this.activeStage;
    }
}