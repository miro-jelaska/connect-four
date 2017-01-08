import {RenderableElement} from "../Utilities/RenderableElement";
import {Player} from "../Utilities/Player";
import {UpdateableElement} from "../Utilities/UpdateableElement";
import Sprite = PIXI.Sprite;
import Container = PIXI.Container;

export class Coin implements RenderableElement, UpdateableElement{
    public static readonly DROP_VELOCITY = 2;
    public static readonly DIAMETER = 60;

    private readonly player: Player;
    private readonly sprite: Sprite;
    private readonly stage: Container;
    constructor(player: Player, x: number) {
        this.player = player;
        console.log('new coin');
        let texture =
            player == Player.Blue
            ? PIXI.loader.resources["./app/images/coin-blue.png"].texture
            : PIXI.loader.resources["./app/images/coin-red.png"].texture;
        let sprite = new PIXI.Sprite(texture);
        sprite.width = Coin.DIAMETER;
        sprite.height = Coin.DIAMETER;
        sprite.anchor.set(0.5, 0.5);
        sprite.position.x = x;
        sprite.position.y = 30;
        this.sprite = sprite;

        let stage = new PIXI.Container();
        stage.addChild(sprite);
        this.stage = stage;
    }

    public update(): void {
        this.sprite.position.y = this.sprite.position.y + Coin.DROP_VELOCITY;
    }
    public getStage(): PIXI.Container {
        return this.stage;
    }
}