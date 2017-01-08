import 'pixi.js';
import {RenderableElement} from "../../utilities/RenderableElement";
import {GameBoard} from "../GameBoard";
import {Setting} from "../../Settings";
import {ColorScheme} from "../../utilities/ColorScheme";
import {Player} from "../../utilities/Player";

export class ScoreBoard implements RenderableElement{
    public static readonly CANVAS_MARGIN_TOP = GameBoard.BOARD_MARGIN_TOP + GameBoard.BOARD_HEIGHT;
    public static readonly HEIGHT = 70;
    public static readonly WIDTH = Setting.CANVAS_WIDTH;

    private scoreBlueText: PIXI.Text;
    private scoreRedText: PIXI.Text;
    private stage: PIXI.Container;
    constructor(){
        this.scoreBlueText = this.buildScoreText(Player.Blue, 0);
        this.scoreRedText = this.buildScoreText(Player.Red, 0);
        this.stage = this.buildStage(this.scoreBlueText, this.scoreRedText);
    }
    private buildStage(scoreBlueText: PIXI.Text, scoreRedText: PIXI.Text): PIXI.Container{
        let stage = new PIXI.Container();

        stage.addChild(this.buildBackground());
        stage.addChild(this.buildScoreCricle(Player.Blue));
        stage.addChild(this.scoreBlueText);
        stage.addChild(this.buildScoreCricle(Player.Red));
        stage.addChild(this.scoreRedText);

        return stage;
    }
    private buildBackground(): PIXI.Graphics {
        let background = new PIXI.Graphics();
        background.beginFill(ColorScheme.LightGray);
        background.drawRect(
            0, ScoreBoard.CANVAS_MARGIN_TOP,
            Setting.CANVAS_WIDTH, ScoreBoard.HEIGHT);
        background.endFill();
        return background;
    }
    private buildScoreCricle(player: Player): PIXI.Graphics {
        let scoreCircle = new PIXI.Graphics();
        let circleColor =
            player === Player.Blue
                ? ColorScheme.DarkBlue
                : ColorScheme.DarkRed;
        scoreCircle.beginFill(circleColor);
        let xPosition =
            player === Player.Blue
                ? 50
                : ScoreBoard.WIDTH - 50;
        scoreCircle.drawCircle(xPosition, ScoreBoard.CANVAS_MARGIN_TOP + ScoreBoard.HEIGHT/2, 20);
        return scoreCircle;
    }
    private buildScoreText(player: Player, score: number): PIXI.Text {
        let xPosition =
            player === Player.Blue
                ? 50
                : ScoreBoard.WIDTH - 50;
        let scoreText = new PIXI.Text(score.toString(), {
            fontFamily : 'Arial',
            fontSize : '20px',
            fill : '#FFFFFF'
        });
        scoreText.x = xPosition - 5;
        scoreText.y = ScoreBoard.CANVAS_MARGIN_TOP + 23;
        return scoreText;
    }

    public playerWon(player: Player): void {
        if(player === Player.Blue){
            let currentScoreBlue = Number(this.scoreBlueText.text);
            this.scoreBlueText.text = (currentScoreBlue + 1).toString();
        }else {
            let currentScoreRed = Number(this.scoreRedText.text);
            this.scoreRedText.text = (currentScoreRed + 1).toString();
        }
    }

    public getStage(): PIXI.Container{
        return this.stage;
    }
}