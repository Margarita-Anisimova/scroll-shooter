import Game from "./game";
import { Spine } from 'pixi-spine';

export default class Enemy {
    public rect: PIXI.Sprite;
    public enem: Spine;
    public game: Game;


    constructor(game: Game, wq: Spine) {
        this.game = game;
        let e = new PIXI.Sprite(PIXI.Texture.EMPTY);
        e.width = 200;
        e.y = 430
        e.visible = false;
        e.height = 200;
        this.rect = e;
        window.app.stage.addChild(e);

        const animation1 = new Spine(wq.spineData);
        animation1.x = window.sceneWidth
        animation1.y = 580
        animation1.visible = false;
        animation1.width = -animation1.width
        animation1.state.setAnimation(0, 'flying', true);
        animation1.state.timeScale = 0.4;
        this.enem = animation1
        window.app.stage.addChild(animation1);
    }

    new() {
        this.enem.visible = true;
        this.rect.visible = true;
        let r = this.game.addTween().addControl(this.rect)
            .do({ x: [window.sceneWidth, 0 - this.rect.width] }).start(3000, this.game.enemies.enemiesInField.shift, 1);
        this.game.addTween().addControl(this.enem)
            .do({ x: [window.sceneWidth - this.enem.width / 2, 0 - this.rect.width] }).start(3000, undefined, 1);

    }

}