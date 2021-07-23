import Player from './player';
import Boxes from './boxes';
import Bullets from './bullets';
import Enemies from './enemies';
import Loader from './Loader';
import Collisions from "./collisions";
import Tween from "../Demo/Tween";
import { Spine } from 'pixi-spine';

export default class Game {
    public player: Player;
    public boxes: Boxes;
    public bullets: Bullets;
    public enemies: Enemies;
    public background: PIXI.TilingSprite;
    public tweens: Tween[];
    public isBul: boolean = false;
    public loader: Loader;

    private backgroundTween: Tween;
    private btn: PIXI.Sprite;
    private isGameStart: boolean = false;
    private timerCollisions: NodeJS.Timer;
    private sTimeout: NodeJS.Timeout;
    private playerJumping: boolean = false;

    constructor() {
        this.tweens = [];

        this.background = this.makeBackground();


        this.btn = this.makeStartBtn();

        this.loader = new Loader();
        window.app.loader.onComplete.add(() => {
            this.player = new Player(this.loader.player);
            this.boxes = new Boxes(this);
            this.bullets = new Bullets(this);
            this.enemies = new Enemies(this, this.loader.dragon);
        });

        this.makeTicker();

        document.addEventListener('keydown', (e) => this.click(e));
    }

    makeTicker() {
        window.app.ticker.add(() => {
            if (this.isGameStart) {
                this.backgroundTween.update(window.app.ticker.elapsedMS)
                for (let i = 0; i < this.tweens.length; i++) {
                    if (this.tweens[i].controls[0].visible && !this.tweens[i].finished)
                        this.tweens[i].update(window.app.ticker.elapsedMS);
                    else {
                        this.tweens.splice(i, 1);
                    }
                    if (this.isGameStart) {
                        this.checkСollision();
                    }
                };
            }

        })
    }

    makeStartBtn(): PIXI.Sprite {
        let t = PIXI.Texture.from('assets/btn.png')
        let btn = new PIXI.Sprite(t);
        btn.x = window.sceneWidth / 2 - 75
        btn.y = 50
        btn.width = 150;
        btn.height = 70;
        btn.buttonMode = true;
        btn.interactive = true;
        btn.on('pointerdown', this.startButtonClick.bind(this));
        window.app.stage.addChild(btn);
        return btn;
    }

    startButtonClick() {
        if (!this.isGameStart) {
            this.backgroundTween = new Tween().addControl(this.background.tilePosition)
                .do({ x: [this.background.tilePosition.x, this.background.tilePosition.x - 1000] })
            this.isGameStart = true;
            this.player.livesCont.visible = true;
            this.playerJumping = false;
            this.player.lives.forEach((e) => e.visible = true);
            this.player.player.visible = true;
            this.player.player.state.setAnimation(0, 'portal', false).mixDuration = 0.2;
            this.player.player.state.timeScale = 0.8;

            let callback = this.newGame.bind(this)

            this.player.player.state.tracks[0].listener = {
                complete: function (trackEntry, count) {
                    if ('portal' === trackEntry.animation.name) {
                        this.started = false;
                        if (this.callback) {
                            this.callback();
                        }
                    }
                },
                callback: callback
            };
        } else {
            this.gameOver();
            this.startButtonClick();
        }
    }

    gameOver() {
        this.player.player.state.setAnimation(0, 'death', false);
        this.player.hitbox.y = this.player.player.y - this.player.player.height;

        //потом придумаю, как переделать
        this.enemies.inField.forEach((e) => e.enemy.visible = false)
        this.enemies.inField = [];
        this.boxes.inField.forEach((e) => e.visible = false)
        this.boxes.inField = [];
        this.bullets.inField.forEach((e) => e.visible = false)
        this.bullets.inField = [];

        this.tweens = [];
        this.isGameStart = false;
        this.backgroundTween.stop();
        this.player.livesNumber = 5
        clearInterval(this.timerCollisions);
        clearTimeout(this.sTimeout);
    }

    newGame() {
        this.player.player.state.timeScale = 0.7;
        this.player.player.state.setAnimation(0, 'run', true);
        this.startGeneratingObstacles();
        this.backgroundTween.start(2000, undefined, -1);
    }

    checkСollision() {
        if (this.isGameStart) {
            if (this.boxes.current() && this.boxes.current().x + this.boxes.current().width < this.player.hitbox.x) {
                this.boxes.inField.shift()
            }
            if (this.player.livesNumber === 0) {
                this.gameOver();
            }
            else {
                if (this.boxes.inField.length && Collisions.checkCollision(this.player.hitbox, this.boxes.current())) {
                    this.сollision(this.boxes);
                }
                if (this.enemies.inField.length && Collisions.checkCollision(this.player.hitbox, this.enemies.current().hitbox)) {
                    this.enemies.current().enemy.visible = false;
                    this.сollision(this.enemies);
                }
                if (this.bullets.inField.length && this.enemies.inField.length && Collisions.checkCollision(this.enemies.current().hitbox, this.bullets.current())) {
                    this.enemies.current().enemy.visible = false;
                    this.сollision(this.enemies, this.bullets);

                }
            }
        }
    }

    сollision(obj1: Boxes | Enemies, obj2: Bullets | null = null) {
        obj1.current().visible = false;
        obj1.inField.shift();
        if (obj2) {
            obj2.current().visible = false;
            obj2.inField.shift();
        } else {
            this.player.lives[this.player.livesNumber - 1].visible = false;
            this.player.livesNumber--;
        }
    }

    startGeneratingObstacles() {
        if (Math.random() > 0.5) {
            this.boxes.newBox()
        } else {
            this.enemies.newEnen()
        }
        this.sTimeout = setTimeout(() => {
            this.startGeneratingObstacles();

        }, Math.random() * (4000 - 1500) + 1500)
    }

    addTween(): Tween {
        const tween = new Tween();
        this.tweens.push(tween);
        return tween;
    }

    click(e: KeyboardEvent) {
        if (this.player.player && e.code === 'Space' && !this.playerJumping) {
            this.playerJumping = true;
            this.playerJump();
        }
        else if (this.player.player && e.code === 'KeyQ' && !this.playerJumping) {
            this.shoot();
        }
    }

    shoot() {
        const ikCross = this.player.player.skeleton.ikConstraints[0].target;
        ikCross.y = this.player.player.y - this.player.hitbox.y - this.player.hitbox.width / 2 - 20 - 100;
        ikCross.x = window.sceneWidth
        this.player.player.state.setAnimation(1, 'aim', false);
        this.player.player.state.addEmptyAnimation(1, 1, 0)
        this.bullets.newBullet();
        this.player.player.state.addAnimation(0, 'run', true, 0);
    }

    playerJump() {
        this.player.hitbox.y -= this.player.hitbox.height - 50;
        this.player.player.state.setAnimation(0, 'jump', false).mixDuration = 0.2;
        this.player.player.state.addAnimation(0, 'run', true, 0);
        this.addTween().addControl(this.player.hitbox)
            .do({ y: [364, 100] }, Tween.Pipe(Tween.QuadraticInOut, Tween.LinearBack))
            .start(2000, () => this.playerJumping = false, 1);
    }

    makeBackground(): PIXI.TilingSprite {
        let t = PIXI.Texture.from('assets/back.jpg');
        let r = new PIXI.TilingSprite(t, window.sceneWidth, window.sceneHeight);
        r.scale.set(1.2, 1.2);
        window.app.stage.addChild(r);
        return r;

    }
}
