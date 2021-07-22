import { Sprite } from "pixi.js-legacy";
import Game from "./game";

export default class Boxes {

    public boxes: PIXI.Sprite[] = [];
    public boxesInField: PIXI.Sprite[] = [];
    public ind: number = -1;
    public game: Game;

    constructor(game: Game) {
        this.game = game;
        for (let i = 0; i < 3; i++) {
            let t = PIXI.Texture.from('assets/камень.png');
            let e = new PIXI.Sprite(t);
            e.width = 190;
            e.height = 190;
            e.y = 580
            e.visible = false;
            window.app.stage.addChild(e);
            this.boxes.push(e);

        }
    }
    currentBox(): PIXI.Sprite {
        return this.boxesInField[0];
    }

    newBox() {
        this.ind = this.ind === 2 ? 0 : this.ind + 1;
        this.boxes[this.ind].visible = true;
        this.boxes[this.ind].x = window.sceneWidth
        this.boxesInField.push(this.boxes[this.ind]);
        this.game.addTween().addControl(this.boxes[this.ind])
            .do({ x: [window.sceneWidth, 0 - this.boxes[this.ind].width] }).start(3000,
                this.boxesInField.shift, 1);

    }


}