import Player from './player';
import Boxes from './boxes';
import Bullets from './bullets';
import Enemies from './enemies';
import Collisions from "./collisions";
import Tween from "../Demo/Tween";

export default class Game {
    public player: Player;

    public tweenBox: Tween
    public tweenEnemies: Tween
    public boxes: Boxes;
    public bullets: Bullets;
    public enemies: Enemies;
    public background: PIXI.TilingSprite;
    public tweens: Tween[];
    private isdeath: boolean = false;
    public isBul: boolean = false;

    constructor() {
        this.tweens = [];

        this.background = this.makeBackground();
        this.player = new Player();
        this.boxes = new Boxes(this);
        this.bullets = new Bullets(this);
        this.enemies = new Enemies(this);
        this.new();

        window.app.ticker.add(() => {
            if (this.boxes.currentBox() && this.player.rect && this.boxes.currentBox().x + this.boxes.currentBox().width < this.player.rect.x) {
                this.boxes.currentBox()
                this.boxes.boxesInField.shift()
            }
            if (!this.isdeath) {
                if (this.player.livesNumber === 0) {
                    this.isdeath = true
                    this.player.player.state.setAnimation(0, 'death', false);
                }
                if (this.player.player && this.boxes.boxesInField.length && Collisions.checkCollision(this.player.rect, this.boxes.currentBox())) {
                    this.boxes.currentBox().visible = false;
                    this.boxes.currentBox().x = 0;
                    this.boxes.boxesInField.shift();
                    this.player.lives[this.player.livesNumber - 1].visible = false;
                    this.player.livesNumber--;

                }
                if (this.player.player && this.enemies.enemiesInField.length && Collisions.checkCollision(this.player.rect, this.enemies.currentBox())) {
                    this.enemies.currentBox().visible = false;
                    this.enemies.currentBox().x = 0;
                    this.enemies.enemiesInField.shift();
                    this.player.lives[this.player.livesNumber - 1].visible = false;
                    this.player.livesNumber--;
                    // this.isdeath = true
                    // this.player.player.state.setAnimation(0, 'death', false);
                }
                if (this.isBul && this.player.player && Collisions.checkCollision(this.enemies.currentBox(), this.bullets.currentBul())) {
                    this.isBul = false;
                    this.bullets.currentBul().visible = false;
                    this.enemies.currentBox().visible = false;

                    this.enemies.currentBox().x = 0;
                    this.bullets.currentBul().x = 0;
                    this.enemies.enemiesInField.shift();
                }
                for (let i = 0; i < this.tweens.length; i++) {
                    if (this.tweens[i].controls[0].visible)
                        this.tweens[i].update(window.app.ticker.elapsedMS);
                }
                this.background.tilePosition.x -= window.app.ticker.elapsedMS / 1000 * 450;
                if (this.player.player) {
                    this.player.player.update(window.app.ticker.elapsedMS / 1000)
                }
            }

        })
        document.addEventListener('keydown', (e) => this.click(e))
    }

    new() {
        if (!this.isdeath) {
            if (Math.random() > 0.4) {
                this.boxes.newBox()
            } else {
                this.enemies.newEnen()
            }
            setTimeout(() => {
                this.new();

            }, Math.random() * (4000 - 1500) + 1500)
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
            this.isBul = true;
            const ikCross = this.player.player.skeleton.ikConstraints[0].target;
            ikCross.y = this.player.player.y - this.player.rect.y - this.player.rect.width / 2 - 20;
            this.player.player.state.setAnimation(1, 'aim', false);
            // this.player.player.state.setAnimation(2, 'shoot', false);
            this.player.player.state.addEmptyAnimation(1, 1, 0)
            this.bullets.newBullet();
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
