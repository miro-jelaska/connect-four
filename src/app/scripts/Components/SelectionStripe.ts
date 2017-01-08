import {RenderableElement} from "../Utilities/RenderableElement";
import Graphics = PIXI.Graphics;
import Rectangle = PIXI.Rectangle;
import Sprite = PIXI.Sprite;
import Container = PIXI.Container;
export class SelectionStripe implements RenderableElement{
    stripeGraphics: Graphics;

    constructor(x: number, y: number, width: number, height: number){
        let stripe = new Graphics();
        stripe.beginFill(0x000000, 0.5);
        stripe.drawRect(x, y, width, height);
        stripe.endFill();
        stripe.interactive = true;

        stripe.on('mouseover', () => this.onMouseOver());
        stripe.on('mouseout', () => this.onMouseOut());
        stripe.on('click', () => this.onMouseClick());

        this.stripeGraphics = stripe;
    }

    private onMouseOver(): void{
        console.log('over');
    }

    private onMouseOut(): void{
        console.log('out');
    }

    private onMouseClick(): void{
        console.log('click');
    }

    public getStage(): PIXI.Container {
        let stage = new Container();
        stage.addChild(this.stripeGraphics);
        return stage;
    }
}