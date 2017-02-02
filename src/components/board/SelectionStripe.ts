import {RenderableElement} from "../../utilities/RenderableElement";
import Graphics = PIXI.Graphics;
import Rectangle = PIXI.Rectangle;
import Sprite = PIXI.Sprite;
import Container = PIXI.Container;
import {GameBoard} from "./GameBoard";
import {Coin} from "./Coin";

enum VisibilityLevel{
    Low = 0.01,
    High = 0.15
}

export class SelectionStripe implements RenderableElement{
    public readonly index: number;

    private stripeGraphics: Graphics;
    private readonly stripeRectangleParameters: number[];
    private readonly mouseOverEventListeners: Array<(stripeIndex:number) => void> = [];
    private readonly mouseOutEventListeners: Array<(stripeIndex:number) => void> = [];
    private readonly mouseClickEventListeners: Array<(stripeIndex:number) => void> = [];

    constructor(columnIndex: number){
        this.index = columnIndex;
        this.stripeRectangleParameters = SelectionStripe.getStripeRectangleParameters(columnIndex);
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

    public setFocus(isInFocus: boolean): void {
        if(isInFocus){
            this.setStripe(VisibilityLevel.High);
            this.mouseOverEventListeners.forEach(listener => listener(this.index));
        } else {
            this.setStripe(VisibilityLevel.Low);
            this.mouseOutEventListeners.forEach(listener => listener(this.index));
        }
    }

    public subscribeTo_onMouseOver(eventListener: (stripeIndex:number) => void){
        this.mouseOverEventListeners.push(eventListener);
    }
    private onMouseOver(): void{
        if(this.stripeGraphics.alpha != VisibilityLevel.High) {
            this.setFocus(true);
        }
    }

    public subscribeTo_onMouseOut(eventListener: (stripeIndex:number) => void){
        this.mouseOutEventListeners.push(eventListener);
    }
    private onMouseOut(): void{
        if(this.stripeGraphics.alpha != VisibilityLevel.Low){
            this.setFocus(false);
        }
    }

    public subscribeTo_onMouseClick(eventListener: (stripeIndex:number) => void){
        this.mouseClickEventListeners.push(eventListener);
    }
    private onMouseClick(): void{
        this.mouseClickEventListeners.forEach(listener => listener(this.index));

        // HACK: To force refresh if cursor stays on same stripe.
        this.mouseOverEventListeners.forEach(listener => listener(this.index));
    }

    public getStage(): PIXI.Container {
        let stage = new Container();
        stage.addChild(this.stripeGraphics);
        return stage;
    }

    private static get width(): number{
        return Coin.DIAMETER + GameBoard.COIN_MARGIN;
    }
    private static getStripeRectangleParameters(columnIndex: number): number[]{
        let boardPadding = columnIndex == 0 ? 0: GameBoard.BOARD_PADDING - GameBoard.COIN_MARGIN/2;
        let isFirstOrLast = columnIndex == 0 || columnIndex == (GameBoard.ROWxCOLUMN[1] - 1);
        return [
            boardPadding + columnIndex * SelectionStripe.width,
            GameBoard.BOARD_MARGIN_TOP,
            SelectionStripe.width + (isFirstOrLast ? GameBoard.COIN_MARGIN/2 : 0),
            GameBoard.BOARD_HEIGHT
        ];
    }
}