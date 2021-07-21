export default class Bullets {

    public bulletsArr: PIXI.Sprite[] = [];
    public ind: number = 0;

    constructor() {
        for (let i = 0; i < 5; i++) {
            let e = new PIXI.Sprite(PIXI.Texture.WHITE);
            e.width = 50;
            e.height = 50;
            e.visible = false;
            window.app.stage.addChild(e);
            this.bulletsArr.push();
        }
    }
}