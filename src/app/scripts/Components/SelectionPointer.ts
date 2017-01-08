import {RenderableElement} from "../Utilities/RenderableElement";
import Graphics = PIXI.Graphics;
import Rectangle = PIXI.Rectangle;
import Sprite = PIXI.Sprite;
import Container = PIXI.Container;
import Texture = PIXI.Texture;
import {Player} from "../Utilities/Player";
import {GameBoard} from "./GameBoard";

export class SelectionPointer implements RenderableElement{
    public static readonly POINTER_MARGIN_TOP = 20;
    private readonly sprite_blue: Sprite;
    private readonly sprite_red: Sprite;
    private readonly stage: Container;
    private readonly stripeIndex: number;
    constructor(stripeIndex: number){
        this.stripeIndex = stripeIndex;
        this.sprite_blue = this.buildSprite(stripeIndex, Player.Blue);
        this.sprite_red = this.buildSprite(stripeIndex, Player.Red);

        let stage = new Container();
        stage.addChild(this.sprite_blue);
        // stage.addChild(this.sprite_red);
        this.stage = stage;
    }

    private buildSprite(stripeIndex: number, pointerType: Player):PIXI.Sprite {
        let texture =
            pointerType == Player.Blue
            ? PIXI.loader.resources["./app/images/pointer-blue.png"].texture
            : PIXI.loader.resources["./app/images/pointer-red.png"].texture;
        let sprite = new PIXI.Sprite(texture);
        sprite.width = 25;
        sprite.height = 20;
        sprite.anchor.set(0.5, 0.5);
        sprite.position.x = GameBoard.getColumnCenter(stripeIndex);
        sprite.position.y = SelectionPointer.POINTER_MARGIN_TOP;
        return sprite;
    }

    public getStage(): PIXI.Container {
        return this.stage;
    }
}