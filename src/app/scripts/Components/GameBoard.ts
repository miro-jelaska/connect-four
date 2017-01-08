import 'pixi.js';

import Texture = PIXI.Texture;
import DisplayObject = PIXI.DisplayObject;
import Container = PIXI.Container;
import Graphics = PIXI.Graphics;
import {SelectionStripe} from "./SelectionStripe";
import {RenderableElement} from "../Utilities/RenderableElement";
import {SelectionPointer} from "./SelectionPointer";
import {Player} from "../Utilities/Player";

export class GameBoard implements RenderableElement{
    public static readonly ROWxCOLUMN:[number, number] = [6, 7];
    public static readonly COIN_MARGIN = 20;
    public static readonly COIN_DIAMETER = 60;
    public static readonly BOARD_PADDING = 20;
    public static readonly BOARD_WIDTH = 580;
    public static readonly BOARD_HEIGHT = 500;
    public static readonly BOARD_MARGIN_TOP = 50;

    private readonly boardSprite: PIXI.Sprite;
    private readonly selectionStripes: SelectionStripe[] = [];
    private readonly selectionPointers: Array<SelectionPointer> = [];

    private activePlayer: Player;

    constructor(activePlayer: Player){
        this.activePlayer = activePlayer;
        for(var columnIndex = 0; columnIndex < GameBoard.ROWxCOLUMN[1]; columnIndex++){
            let selectionStripe = new SelectionStripe(columnIndex);
            selectionStripe.subscribeTo_onMouseOver((stripeIndex:number) => this.onSelectionStripeMouseOver(stripeIndex));
            selectionStripe.subscribeTo_onMouseOut((stripeIndex:number) => this.onSelectionStripeMouseOut(stripeIndex));
            selectionStripe.subscribeTo_onMouseClick((stripeIndex:number) => this.onSelectionStripeMouseClick(stripeIndex));
            this.selectionStripes.push(selectionStripe);

            this.selectionPointers.push(new SelectionPointer(columnIndex));
            console.log(this.selectionPointers);
        }

        this.boardSprite = this.buildBoardSprite();
    }
    private buildBoardSprite(): PIXI.Sprite {
        let texture = PIXI.loader.resources["./app/images/board.png"].texture;
        let sprite = new PIXI.Sprite(texture);
        sprite.width = GameBoard.BOARD_WIDTH;
        sprite.height = GameBoard.BOARD_HEIGHT;
        sprite.position.y = GameBoard.BOARD_MARGIN_TOP;
        return sprite;
    }

    private setActivePlayer(player: Player) {
        this.activePlayer = player;
    }

    private onSelectionStripeMouseOver(stripeIndex: number): void {
        this.selectionPointers
            .find((pointer: SelectionPointer) => pointer.stripeIndex == stripeIndex)
            .show(this.activePlayer);
    }

    private onSelectionStripeMouseOut(stripeIndex: number): void {
        this.selectionPointers
            .find((pointer: SelectionPointer) => pointer.stripeIndex == stripeIndex)
            .hide();
    }

    private onSelectionStripeMouseClick(stripeIndex: number): void {
        this.setActivePlayer(this.activePlayer == Player.Blue ? Player.Red : Player.Blue);
    }


    public getStage():PIXI.Container {
        let stage = new PIXI.Container();
        stage.addChild(this.boardSprite);
        this.selectionStripes.forEach(stripe => stage.addChild(stripe.getStage()));
        this.selectionPointers.forEach(pointer => stage.addChild(pointer.getStage()));
        return stage;
    }


    public static getCenter(row: number, column: number): PIXI.Point{
        let x = this.getColumnCenter(column);
        let y = this.getRowCenter(row);
        return new PIXI.Point(x, y);
    }
    public static getColumnCenter(column: number): number{
        return GameBoard.BOARD_PADDING
            + GameBoard.COIN_DIAMETER/2
            + column * (GameBoard.COIN_MARGIN + GameBoard.COIN_DIAMETER);
    }
    public static getRowCenter(row: number): number{
        return GameBoard.BOARD_MARGIN_TOP
            + GameBoard.BOARD_PADDING
            + GameBoard.COIN_DIAMETER/2
            + (GameBoard.ROWxCOLUMN[0] - row)*(GameBoard.COIN_DIAMETER + GameBoard.COIN_MARGIN);
    }
}