import Game from "./game";

export default class Bullets {
    public inField: PIXI.Sprite[] = [];

    private bulletsArr: PIXI.Sprite[] = [];
    private ind: number = -1;
    private game: Game;

    constructor(game: Game) {
        this.game = game;
        this.createBoxesArr();
    }

    createBoxesArr() {
        for (let i = 0; i < 5; i++) {
            let t = PIXI.Texture.from('assets/пуля.png');
            let e = new PIXI.Sprite(t);
            e.width = 30;
            e.height = 30;
            e.y = this.game.player.player.y - this.game.player.player.width / 2 - 100
            e.x = 0;
            e.visible = false;
            window.app.stage.addChild(e);
            this.bulletsArr.push(e);
        }
    }

    current(): PIXI.Sprite {
        return this.inField[0];
    }

    newBullet() {
        this.ind = this.ind === 4 ? 0 : this.ind + 1;
        this.bulletsArr[this.ind].visible = true
        this.inField.push(this.bulletsArr[this.ind]);
        this.game.addTween().addControl(this.bulletsArr[this.ind])
            .do({ x: [this.game.player.player.x + 130, window.sceneWidth] }).start(1000, this.inField.shift, 1);
    }
}