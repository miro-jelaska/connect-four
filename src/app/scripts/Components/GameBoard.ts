import 'pixi.js';
import {RenderableElement} from "../Utilities/RenderableElement";
import Texture = PIXI.Texture;
import {ColorScheme} from "../Utilities/ColorScheme";
import {Setting} from "../Settings";
import DisplayObject = PIXI.DisplayObject;
import Container = PIXI.Container;


export class GameBoard implements RenderableElement{
    public static readonly ROWxCOLUMN:[number, number] = [7, 6];
    public static readonly COIN_MARGIN = 10;
    public static readonly COIN_DIAMETER = 50;
    public static readonly BOARD_PADDING = 15;
    public static readonly BOARD_WIDTH = Setting.CANVAS_WIDTH;
    public static readonly BOARD_HEIGHT = 385;
    public static readonly BOARD_MARGIN_TOP = 50;

    private get coinTexture(): Texture {
        return PIXI.loader.resources["./app/images/coin-red.png"].texture;
    }


    public getStage():PIXI.Container{
        let stage = new PIXI.Container();
        this.getBoardGrid(stage);

        /*for (var row = 0;row < GameBoard.ROWxCOLUMN[0]; row++)
            for (var column = 0; column < GameBoard.ROWxCOLUMN[1]; column++)*/

        stage.addChild(this.getCoin(4, 5));
        return stage;
    }
    private getBoardGrid(stage:Container) {

        let grid = new PIXI.Graphics();
        grid.beginFill(ColorScheme.Brown, 1);
        //grid.drawRect(0, GameBoard.BOARD_MARGIN_TOP, GameBoard.BOARD_WIDTH, GameBoard.BOARD_HEIGHT);
        grid.drawRect(0, 0, 500, 500);
        grid.endFill();
        stage.addChild(grid);

        let circle = new PIXI.Graphics();
        circle.beginFill(0xffffff, 1);
        circle.drawCircle(35, 40, 25);
        circle.drawRect(0, 10, 70, 70);
        circle.endFill();
        stage.addChild(circle);

        grid.mask = circle;
    }
    private getCoin(row: number, column: number):PIXI.Sprite {
        let coin = new PIXI.Sprite(this.coinTexture);
        coin.width = GameBoard.COIN_DIAMETER;
        coin.height = GameBoard.COIN_DIAMETER;
        coin.position.set(
            GameBoard.BOARD_PADDING + row * (GameBoard.COIN_DIAMETER + GameBoard.COIN_MARGIN),
            GameBoard.BOARD_MARGIN_TOP + GameBoard.BOARD_PADDING + column * (GameBoard.COIN_DIAMETER + GameBoard.COIN_MARGIN));

        return coin;
    }
}