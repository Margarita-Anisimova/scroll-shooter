import Game from "./game";

export default class Bullets {

    public bulletsArr: PIXI.Sprite[] = [];
    public ind: number = -1;
    public game: Game;

    constructor(game: Game) {
        this.game = game;
        for (let i = 0; i < 5; i++) {
            let t = PIXI.Texture.from('assets/пуля.png');
            let e = new PIXI.Sprite(t);
            e.width = 50;
            e.height = 50;
            e.x = 0;
            e.visible = false;
            window.app.stage.addChild(e);
            this.bulletsArr.push(e);
        }
    }

    currentBul(): PIXI.Sprite {
        let r = this.bulletsArr.slice().sort((a, b) => a.x - b.x);
        return r[4]
    }

    newBullet() {
        this.ind = this.ind === 4 ? 0 : this.ind + 1;
        this.bulletsArr[this.ind].y = this.game.player.rect.y + this.game.player.rect.width / 2
        this.bulletsArr[this.ind].visible = true
        this.game.addTween().addControl(this.bulletsArr[this.ind])
            .do({ x: [this.game.player.rect.x + this.game.player.rect.width, window.sceneWidth] }).start(1000, () => this.game.isBul = false, 1);
    }
}