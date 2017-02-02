import {RenderableElement} from "../../utilities/RenderableElement";
import {Player} from "../../utilities/Player";
import {UpdateableElement} from "../../utilities/UpdateableElement";
import Sprite = PIXI.Sprite;
import Container = PIXI.Container;

export class Coin implements RenderableElement, UpdateableElement{
    public static readonly DROP_VELOCITY = 6;
    public static readonly DIAMETER = 60;
    public static readonly DROP_START_Y = 20;
    public static readonly WINNING_COIN_ROTATION_ACCELERATION = 0.001;
    public static readonly WINNING_COIN_MAX_ROTATION_SPEED = 0.10;

    public rowAndColumnIndex: [number, number];

    private readonly player: Player;
    private readonly finalPosition: PIXI.Point;
    private readonly sprite: Sprite;
    private readonly stage: Container;

    private isAtFinalPosition: boolean = false;
    private isWinningCoin: boolean = false;
    private rotationSpeed: number = 0;

    constructor(player: Player, rowAndColumnIndex: [number, number], finalPosition: PIXI.Point) {
        this.player = player;
        this.rowAndColumnIndex = rowAndColumnIndex;
        this.finalPosition = finalPosition;
        let texture =
            player === Player.Blue
            ? PIXI.loader.resources["./images/coin-blue.png"].texture
            : PIXI.loader.resources["./images/coin-red.png"].texture;
        let sprite = new PIXI.Sprite(texture);

        // HACK: Added 2 to width and height to fill empty space between game board and coin.
        sprite.width = Coin.DIAMETER + 2;
        sprite.height = Coin.DIAMETER + 2;

        sprite.anchor.set(0.5, 0.5);
        sprite.position.x = finalPosition.x;
        sprite.position.y = Coin.DROP_START_Y;
        this.sprite = sprite;

        let stage = new PIXI.Container();
        stage.addChild(sprite);
        this.stage = stage;
    }


    public markAsWinningCoin(): void {
        this.isWinningCoin = true;
    }

    private updateRotationOfWinningCoin() {
        if(this.rotationSpeed < Coin.WINNING_COIN_MAX_ROTATION_SPEED) {
            this.rotationSpeed = this.rotationSpeed + Coin.WINNING_COIN_ROTATION_ACCELERATION;
        }
        this.sprite.rotation = this.sprite.rotation + this.rotationSpeed;
    }

    public update(): void {
        if(this.isAtFinalPosition && this.isWinningCoin){
            this.updateRotationOfWinningCoin();
        }
        if(this.isAtFinalPosition) return;

        this.sprite.position.y = this.sprite.position.y + Coin.DROP_VELOCITY;
        if(this.sprite.position.y >= this.finalPosition.y) {
            this.sprite.position.y = this.finalPosition.y;
            this.isAtFinalPosition = true;
        }
    }
    public getStage(): PIXI.Container {
        return this.stage;
    }
}