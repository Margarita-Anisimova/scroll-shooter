import Game from "./game";
export default class Enemies {

    public enemies: PIXI.Sprite[] = [];
    public enemiesInField: PIXI.Sprite[] = [];
    public ind: number = -1;
    public game: Game;

    constructor(game: Game) {
        this.game = game;
        for (let i = 0; i < 3; i++) {
            let e = new PIXI.Sprite(PIXI.Texture.WHITE);
            e.width = 200;
            e.height = 200;
            e.y = 430
            e.visible = false;
            window.app.stage.addChild(e);
            this.enemies.push(e);

        }
    }
    currentBox(): PIXI.Sprite {
        return this.enemiesInField[0];
    }
    newEnen() {
        this.ind = this.ind === 2 ? 0 : this.ind + 1;
        this.enemies[this.ind].visible = true;
        this.enemiesInField.push(this.enemies[this.ind]);
        if (!this.game.tweenEnemies) {
            this.game.addTween().addControl(this.enemies[this.ind])
                .do({ x: [window.sceneWidth, 0 - this.enemies[this.ind].width] }).start(3000, this.enemiesInField.shift, 1);
        } else {
            this.game.tweenEnemies.addControl(this.enemies[this.ind])
        }
    }
}