import { Spine } from 'pixi-spine';

export default class Player {

    public player: Spine;
    public hitbox: PIXI.Sprite;
    public lives: PIXI.Sprite[] = [];
    public livesCont: PIXI.Container = new PIXI.Container()
    public livesNumber: number = 5;

    constructor(player: Spine) {
        this.player = player;
        window.app.stage.addChild(player);
        this.player.visible = false
        this.makeHitbox();
        this.makeLives();
        this.livesCont.visible = false;
    }

    makeHitbox() {
        let hitbox = new PIXI.Sprite(PIXI.Texture.EMPTY);

        //хитбок немного сдвинут влево, но так и должно быть, чтобы сократь число неправильных коллизий с камнем
        hitbox.x = this.player.x - this.player.width / 2;
        hitbox.y = 364 //подобрано,  не нашла как его посчитать
        hitbox.width = this.player.width - 100;
        hitbox.height = this.player.height - 150;
        this.hitbox = hitbox
        window.app.stage.addChild(hitbox)
    }

    makeLives() {
        for (let i = 0; i < 5; i++) {
            let t = PIXI.Texture.from('assets/сердце.png');
            let r = new PIXI.Sprite(t);
            r.width = 50;
            r.height = 50;
            r.x = i * 55
            this.lives.push(r);
            this.livesCont.addChild(r);
            window.app.stage.addChild(this.livesCont);
        }
    }
}