import Game from "./game";

export default class Boxes {
    public inField: PIXI.Sprite[] = [];

    private boxes: PIXI.Sprite[] = [];
    private ind: number = -1;
    private game: Game;

    constructor(game: Game) {
        this.game = game;
        this.createBoxesArr();
    }

    createBoxesArr() {
        for (let i = 0; i < 3; i++) {
            let t = PIXI.Texture.from('assets/камень.png');
            let e = new PIXI.Sprite(t);
            e.width = 190;
            e.height = 190;
            e.x = window.sceneWidth;
            e.y = 580
            e.visible = false;
            window.app.stage.addChild(e);
            this.boxes.push(e);
        }
    }

    current(): PIXI.Sprite {
        return this.inField[0];
    }

    newBox() {
        this.ind = this.ind === 2 ? 0 : this.ind + 1;
        this.boxes[this.ind].visible = true;
        this.inField.push(this.boxes[this.ind]);
        this.game.addTween().addControl(this.boxes[this.ind])
            .do({ x: [window.sceneWidth, 0 - 190] }).start(2900,
                () => {
                    this.inField.shift()
                }, 1);
    }


}