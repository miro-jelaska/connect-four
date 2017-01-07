import 'pixi.js';
import {RenderableElement} from "../Utilities/RenderableElement";

export class ScoreBoard implements RenderableElement{
    public getStage(): PIXI.Container{
        let stage = new PIXI.Container();

        let graphics = new PIXI.Graphics();
        graphics.beginFill(0xBEDB39, 0.01);
        graphics.drawRect(0, 0, 50, 50);
        graphics.endFill();
        graphics.interactive = true;

        graphics.on("mouseover", () => {
            console.log('success');
            graphics.scale.set(2, 2);
        });
        graphics.on("mouseout", () => {
            console.log('out');
            graphics.scale.set(1, 1);
        });

        stage.addChild(graphics);

        return stage;
    }
}