import 'pixi.js';

import Texture = PIXI.Texture;
import DisplayObject = PIXI.DisplayObject;
import Container = PIXI.Container;
import Graphics = PIXI.Graphics;
import {SelectionStripe} from "./SelectionStripe";
import {RenderableElement} from "../Utilities/RenderableElement";
import {SelectionPointer} from "./SelectionPointer";
import {Player} from "../Utilities/Player";
import {Coin} from "./Coin";
import {UpdateableElement} from "../Utilities/UpdateableElement";
import {CoinsTracker} from "../Utilities/CoinsTracker";
import {Debug} from "../Debug/Debug";

export class GameBoard implements RenderableElement, UpdateableElement{
    public static readonly ROWxCOLUMN:[number, number] = [6, 7];
    public static readonly COIN_MARGIN = 20;
    public static readonly BOARD_PADDING = 20;
    public static readonly BOARD_WIDTH = 580;
    public static readonly BOARD_HEIGHT = 500;
    public static readonly BOARD_MARGIN_TOP = 50;

    private readonly boardSprite: PIXI.Sprite;
    private readonly coinsTracker: CoinsTracker;
    private readonly selectionStripes: SelectionStripe[] = [];
    private readonly selectionPointers: SelectionPointer[] = [];
    private readonly allCoins: Coin[] = [];

    private activePlayer: Player;

    constructor(activePlayer: Player){
        this.activePlayer = activePlayer;
        this.coinsTracker = new CoinsTracker(GameBoard.ROWxCOLUMN);

        for(var columnIndex = 0; columnIndex < GameBoard.ROWxCOLUMN[1]; columnIndex++){
            let selectionStripe = new SelectionStripe(columnIndex);
            selectionStripe.subscribeTo_onMouseOver((stripeIndex:number) => this.onSelectionStripeMouseOver(stripeIndex));
            selectionStripe.subscribeTo_onMouseOut((stripeIndex:number) => this.onSelectionStripeMouseOut(stripeIndex));
            selectionStripe.subscribeTo_onMouseClick((stripeIndex:number) => this.onSelectionStripeMouseClick(stripeIndex));
            this.selectionStripes.push(selectionStripe);
            let immutableColumnIndex = columnIndex;
            this.selectionPointers.push(new SelectionPointer(columnIndex, () => this.coinsTracker.isEmptySlotAvailable(immutableColumnIndex) && !this.coinsTracker.isGameOver()));
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

    private dropCoin(columnIndex: number): void {
        let rowAndColumnIndex = this.coinsTracker.addCoin(this.activePlayer, columnIndex);
        let coin = new Coin(this.activePlayer, GameBoard.getCenter(rowAndColumnIndex[0], rowAndColumnIndex[1]));
        this.allCoins.push(coin);
    }

    private onSelectionStripeMouseOver(stripeIndex: number): void {
        this.selectionStripes
            .filter((stripe: SelectionStripe) => stripe.index !== stripeIndex)
            .forEach((stripe: SelectionStripe) => stripe.setFocus(false));
        this.selectionPointers
            .find((pointer: SelectionPointer) => pointer.stripeIndex === stripeIndex)
            .show(this.activePlayer);
    }

    private onSelectionStripeMouseOut(stripeIndex: number): void {
        this.selectionPointers
            .find((pointer: SelectionPointer) => pointer.stripeIndex === stripeIndex)
            .hide();
    }

    private onSelectionStripeMouseClick(stripeIndex: number): void {
        if(this.coinsTracker.isEmptySlotAvailable(stripeIndex) && !this.coinsTracker.isGameOver()) {
            this.dropCoin(stripeIndex);
            this.switchActivePlayer();
        }
    }


    private switchActivePlayer(): void {
        this.activePlayer =
            this.activePlayer === Player.Blue
            ? Player.Red
            : Player.Blue;
    }

    public update(): void {
        this.allCoins.forEach(coin => coin.update());
    }

    public getStage():PIXI.Container {
        let stage = new PIXI.Container();

        this.allCoins.forEach(coin => stage.addChild(coin.getStage()));
        stage.addChild(this.boardSprite);
        this.selectionStripes.forEach(stripe => stage.addChild(stripe.getStage()));
        this.selectionPointers.forEach(pointer => stage.addChild(pointer.getStage()));

        return stage;
    }


    public static getCenter(column: number, row: number): PIXI.Point{
        let x = this.getColumnCenter(column);
        let y = this.getRowCenter(row);
        return new PIXI.Point(x, y);
    }
    public static getColumnCenter(column: number): number{
        return GameBoard.BOARD_PADDING
            + Coin.DIAMETER/2
            + column * (GameBoard.COIN_MARGIN + Coin.DIAMETER);
    }
    public static getRowCenter(row: number): number{
        return GameBoard.BOARD_MARGIN_TOP
            + GameBoard.BOARD_PADDING
            + Coin.DIAMETER/2
            + (GameBoard.ROWxCOLUMN[0] - 1 - row)*(Coin.DIAMETER + GameBoard.COIN_MARGIN);
    }
}