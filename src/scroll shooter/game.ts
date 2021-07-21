import Player from './player';
import Boxes from './boxes';
import Bullets from './bullets';
import Enemies from './enemies';
import Tween from "../Demo/Tween";

export default class Game {
    public player: Player;
    public boxes: Boxes;
    public bullets: Bullets;
    public enemies: Enemies;
    public background: PIXI.TilingSprite;
    public tweens: Tween[];


    constructor() {
        this.tweens = [];
        this.player = new Player();
        this.boxes = new Boxes();
        this.bullets = new Bullets();
        this.enemies = new Enemies();
        this.background = this.makeBackground();
        window.app.ticker.add(() => {
            for (let i = 0; i < this.tweens.length; i++) {
                this.tweens[i].update(window.app.ticker.elapsedMS);
            }
            this.background.tilePosition.x -= window.app.ticker.elapsedMS / 1000 * 450;
            if (this.player.player) {
                this.player.player.update(window.app.ticker.elapsedMS / 1000)
            }
        })
        document.addEventListener('keydown', (e) => this.click(e))
    }

    click(e: KeyboardEvent) {
        if (this.player.player && e.code === 'Space') {
            this.player.player.state.setAnimation(0, 'jump', false);
            this.player.player.state.addAnimation(0, 'run', true, 0);
        }
    }

    addTween(): Tween {
        const tween = new Tween();
        this.tweens.push(tween);
        return tween;
    }


    click(e: KeyboardEvent) {
        if (this.player.player && e.code === 'Space') {
            this.player.rect.y -= this.player.rect.height - 50;
            this.player.isJumping = true;
            this.player.player.state.setAnimation(0, 'jump', false);
            this.player.player.state.addAnimation(0, 'run', true, 0);
            this.addTween().addControl(this.player.rect)
                .do({ y: [this.player.rect.y + this.player.rect.height - 50, this.player.rect.y] }, Tween.LinearBack).start(1700, () => this.player.isJumping = false), 1);
            // this.player.player.state.tracks[0].listener = {
            //     complete: function (trackEntry, count) {
            //         if ('jump' === trackEntry.animation.name) {
            //             this.started = false;
            //             e();
            //         }
            //     }
            // };

        }
        if (this.player.player && e.code === 'KeyQ') {
            const ikCross = this.player.player.skeleton.ikConstraints[0].target;
            ikCross.y = this.player.player.y - this.player.rect.y - this.player.rect.width / 2 - 20;
            this.player.player.state.setAnimation(1, 'aim', false);
            // this.player.player.state.setAnimation(2, 'shoot', false);
            this.player.player.state.addEmptyAnimation(1, 1, 0)
            this.addTween().addControl(this.bullets[this.bullets.ind])
            this.player.player.state.addAnimation(0, 'run', true, 0);
        }
    }

    makeBackground(): PIXI.TilingSprite {
        let t = PIXI.Texture.from('assets/back.jpg');
        let r = new PIXI.TilingSprite(t, window.sceneWidth, window.sceneHeight);
        r.scale.set(1.2, 1.2);
        window.app.stage.addChild(r);
        return r;

    }
}
