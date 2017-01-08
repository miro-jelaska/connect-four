import {RenderableElement} from "../Utilities/RenderableElement";
import Graphics = PIXI.Graphics;
import Rectangle = PIXI.Rectangle;
import Sprite = PIXI.Sprite;
import Container = PIXI.Container;

enum VisibilityLevel{
    Low = 0.01,
    High = 0.2
}

export class SelectionStripe implements RenderableElement{
    stripeGraphics: Graphics;
    stripeRectangleParameters: number[];

    constructor(x: number, y: number, width: number, height: number){
        this.stripeRectangleParameters = [x, y, width, height];
        this.setStripe(VisibilityLevel.Low);
    }

    private setStripe(visibilityLevel: VisibilityLevel): void{
        let stripe = new Graphics();
        stripe.beginFill(0x000000);
        stripe.alpha = visibilityLevel;
        stripe.drawRect.apply(stripe, this.stripeRectangleParameters);
        stripe.endFill();
        stripe.interactive = true;

        stripe.on('mouseover', () => this.onMouseOver());
        stripe.on('mouseout', () => this.onMouseOut());
        stripe.on('click', () => this.onMouseClick());

        this.stripeGraphics = stripe;
    }

    private onMouseOver(): void{
        if(this.stripeGraphics.alpha != VisibilityLevel.High)
            this.setStripe(VisibilityLevel.High);
    }

    private onMouseOut(): void{
        if(this.stripeGraphics.alpha != VisibilityLevel.Low)
            this.setStripe(VisibilityLevel.Low);
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