import 'pixi.js';

import Texture = PIXI.Texture;
import DisplayObject = PIXI.DisplayObject;
import Container = PIXI.Container;
import Graphics = PIXI.Graphics;
import {SelectionStripe} from "./SelectionStripe";
import {RenderableElement} from "../Utilities/RenderableElement";

export class GameBoard implements RenderableElement{
    public static readonly ROWxCOLUMN:[number, number] = [7, 6];
    public static readonly COIN_MARGIN = 20;
    public static readonly COIN_DIAMETER = 60;
    public static readonly BOARD_PADDING = 20;
    public static readonly BOARD_WIDTH = 580;
    public static readonly BOARD_HEIGHT = 500;
    public static readonly BOARD_MARGIN_TOP = 50;

    private readonly selectionStripes: SelectionStripe[] = [];

    constructor(){
        let widthOfStripe = GameBoard.COIN_DIAMETER + GameBoard.COIN_MARGIN;
        for(var column = 0; column < GameBoard.ROWxCOLUMN[0]; column++){
            let boardPadding = column == 0 ? 0: GameBoard.BOARD_PADDING - GameBoard.COIN_MARGIN/2;
            let isFirstOrLast = column == 0 || column == (GameBoard.ROWxCOLUMN[0] - 1);
            let selectionStripe = new SelectionStripe(
                column,
                boardPadding + column*widthOfStripe, GameBoard.BOARD_MARGIN_TOP,
                widthOfStripe + (isFirstOrLast ? GameBoard.COIN_MARGIN/2 : 0), GameBoard.BOARD_HEIGHT
            );
            selectionStripe.subscribeTo_onMouseOver(this.onSelectionStripeMouseOver);
            selectionStripe.subscribeTo_onMouseOut(this.onSelectionStripeMouseOut);
            this.selectionStripes.push(selectionStripe);
        }
    }

    // Board sprite doesn't change thus Lazy pattern.
    private _boardSprite:PIXI.Sprite;
    private get boardSprite(): PIXI.Sprite {
        if(this._boardSprite)
            return this._boardSprite;

        let texture = PIXI.loader.resources["./app/images/board.png"].texture;
        let sprite = new PIXI.Sprite(texture);
        sprite.width = GameBoard.BOARD_WIDTH;
        sprite.height = GameBoard.BOARD_HEIGHT;
        sprite.position.y = GameBoard.BOARD_MARGIN_TOP;

        this._boardSprite = sprite;
        return sprite;
    }

    private onSelectionStripeMouseOver(stripeIndex: number){
        console.log('MouseOver, I got it! index >> ' + stripeIndex);
    }

    private onSelectionStripeMouseOut(stripeIndex: number){
        console.log('MouseOut, I got it! index >> ' + stripeIndex);
    }


    public getStage():PIXI.Container{
        let stage = new PIXI.Container();
        stage.addChild(this.boardSprite);
        this.selectionStripes.forEach(stripe => stage.addChild(stripe.getStage()));
        return stage;
    }

    public static getCenter(row: number, column: number): PIXI.Point{
        // The bottom row has index of 0
        let x =
            GameBoard.BOARD_PADDING
            + GameBoard.COIN_DIAMETER/2
            + row * (GameBoard.COIN_MARGIN + GameBoard.COIN_DIAMETER);
        let y =
            GameBoard.BOARD_MARGIN_TOP
            + GameBoard.BOARD_PADDING
            + GameBoard.COIN_DIAMETER/2
            + (GameBoard.ROWxCOLUMN[0] - column)*(GameBoard.COIN_DIAMETER + GameBoard.COIN_MARGIN);

        return new PIXI.Point(x, y);
    }
}