import {RenderableElement} from "../Utilities/RenderableElement";
import {Player} from "../Utilities/Player";
import {UpdateableElement} from "../Utilities/UpdateableElement";
import Sprite = PIXI.Sprite;
import Container = PIXI.Container;
import {Debug} from "../Debug/Debug";

export class Coin implements RenderableElement, UpdateableElement{
    public static readonly DROP_VELOCITY = 6;
    public static readonly DIAMETER = 60;
    public static readonly DROP_START_Y = 20;

    private readonly player: Player;
    private readonly finalPosition: PIXI.Point;
    private readonly sprite: Sprite;
    private readonly stage: Container;

    private isAtFinalPosition: boolean = false;

    constructor(player: Player, finalPosition: PIXI.Point) {
        this.player = player;
        this.finalPosition = finalPosition;
        let texture =
            player === Player.Blue
            ? PIXI.loader.resources["./app/images/coin-blue.png"].texture
            : PIXI.loader.resources["./app/images/coin-red.png"].texture;
        let sprite = new PIXI.Sprite(texture);
        sprite.width = Coin.DIAMETER;
        sprite.height = Coin.DIAMETER;
        sprite.anchor.set(0.5, 0.5);
        sprite.position.x = finalPosition.x;
        sprite.position.y = Coin.DROP_START_Y;
        this.sprite = sprite;

        let stage = new PIXI.Container();
        stage.addChild(sprite);
        this.stage = stage;
    }

    public update(): void {
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