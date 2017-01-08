import {RenderableElement} from "../Utilities/RenderableElement";
import Graphics = PIXI.Graphics;
import Rectangle = PIXI.Rectangle;
import Sprite = PIXI.Sprite;
import Container = PIXI.Container;
import Texture = PIXI.Texture;

export class SelectionPointer implements RenderableElement{
    private readonly sprite:Sprite;
    private readonly stage:Container;
    constructor(stripeIndex: number){
        this.sprite = this.build();
        let stage = new Container();
        stage.addChild(this.sprite);
        this.stage = stage;
    }

    private build():PIXI.Sprite {
        let texture = PIXI.loader.resources["./app/images/pointer-red.png"].texture;
        console.log('texture');let sprite = new PIXI.Sprite(texture);
        sprite.width = 25;
        sprite.height = 20;
        sprite.position.x = 30;
        sprite.position.y = 30;
        return sprite;
    }

    public getStage(): PIXI.Container {
        return this.stage;
    }
}