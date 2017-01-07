import 'pixi.js';

export class GameBoard{
    private toggle:boolean = false;
    public getStage():PIXI.Container{
        let stage = new PIXI.Container();
        let coin = new PIXI.Sprite(
            PIXI.loader.resources["./app/images/coin-red.png"].texture
        );
        coin.anchor.x = 0.5;
        coin.anchor.y = 0.5;
        coin.position.set(150, 150);
        coin.interactive = true;

        coin.on("mousedown", () => {
            console.log('mousedown');
            this.toggle = !this.toggle;
            if(this.toggle)
                coin.scale.set(3, 3);
            else
                coin.scale.set(1, 1);
        });

        stage.addChild(coin);
        return stage;
    }
}