import AbstractState from "./states/AbstractState";
import Idle1 from "./states/Idle1";
import Idle2 from "./states/Idle2";
import Idle3 from "./states/Idle3";
import Rotate from "./states/Rotate";
import Tween from "./Tween";
import { Howl, Howler } from 'howler';
import { Spine } from 'pixi-spine';

export default class Demo {
    private _currentState: AbstractState;

    public idle1: AbstractState;
    public idle2: AbstractState;
    public idle3: AbstractState;
    public rotate: AbstractState;

    public sounds: Howl;

    public background: PIXI.Sprite;
    public anim: PIXI.Sprite;
    public editButton: PIXI.Sprite;
    public spineAnim: Spine;

    public tweens: Tween[];

    constructor() {
        this.idle1 = new Idle1(this);
        this.idle2 = new Idle2(this);
        this.idle3 = new Idle3(this);
        this.rotate = new Rotate(this);

        this.tweens = [];

        this.background = this.makeBg();

        this.editButton = this.makeEditBtn();


        //this.addFighter();
        this.addSpineBoy();
    }

    set currentState(state: AbstractState) {
        if (this._currentState !== undefined) {
            this._currentState.end();
            console.log(`${this._currentState.name()} ==> ${state.name()}`);
        } else {
            console.log(` ==> ${state.name()}`);
        }
        this._currentState = state;
        this._currentState.start();
    }

    get currentState() {
        return this._currentState;
    }

    // buttonClick(): void {
    //     if (this.currentState === this.rotate) {
    //         this.currentState = this.idle1
    //     } else {
    //         this.currentState = this.rotate;
    //     }

    //     if (this.sounds) {
    //         this.sounds.play('click');
    //     }
    // }

    start() {
        this.currentState = this.idle1;

        window.app.ticker.add(() => {
            this.update();
        });
    }

    update() {
        if (this.currentState) {
            this.currentState.update();
            for (let i = 0; i < this.tweens.length; i++) {
                this.tweens[i].update(window.app.ticker.elapsedMS);
            }
        }

        if (this.spineAnim) {
            this.spineAnim.update(window.app.ticker.elapsedMS / 1000)
        }
    }

    makeBg(): PIXI.Sprite {
        const bg = new PIXI.Sprite(PIXI.Texture.EMPTY);
        bg.width = window.sceneWidth;
        bg.height = window.sceneHeight;
        bg.buttonMode = true;
        bg.interactive = true;
        // bg.on('pointerdown', this.onClick.bind(this));
        this.addToStage(bg);
        return bg;
    }

    makeEditBtn(): PIXI.Sprite {
        const btn = new PIXI.Sprite(PIXI.Texture.WHITE);
        btn.width = 100;
        btn.height = 100;
        btn.buttonMode = true;
        btn.interactive = true;
        // btn.on('pointerdown', this.buttonClick.bind(this));
        this.addToStage(btn);
        return btn;
    }

    addTween(): Tween {
        const tween = new Tween();
        this.tweens.push(tween);
        return tween;
    }

    buttonClick(): void {
        this.spineAnim.state.setAnimation(0, 'run', true);
    }

    onClick(e: KeyboardEvent): void {
        this.spineAnim.state.setAnimation(0, 'jump', false);
        this.spineAnim.state.addAnimation(0, 'run', true, 0);


        // if (this.spineAnim && e.code === 'Space') {
        //     this.spineAnim.state.setAnimation(0, 'jump', false);
        //     this.spineAnim.state.addAnimation(0, 'run', true, 0);
        //     return
        // }
        // if (this.spineAnim && e.code === 'KeyQ') {
        //     this.shoot();
        //     return
        // }

        // if (this.spineAnim && e.code === 'KeyW') {
        //     this.spineAnim.state.setAnimation(2, 'aim', false);
        //     this.spineAnim.state.setAnimation(1, 'shoot', false);

        //     this.spineAnim.state.addEmptyAnimation(2, 1, 0)
        //     this.spineAnim.state.addAnimation(0, 'run', true, 0);
        //     return
        // }

    }

    shoot() {
        if (this.spineAnim) {
            this.spineAnim.state.setAnimation(0, 'run-to-idle', false);
            this.spineAnim.state.setAnimation(1, 'shoot', false);


            // this.spineAnim.state.addEmptyAnimation(2, 1, 0)
            this.spineAnim.state.addAnimation(0, 'run', true, 0);
        }

    }

    addSpineBoy(): void {
        var spineLoaderOptions = { metadata: { spineSkeletonScale: 0.6 } };
        window.app.loader
            .add('spineCharacter', 'assets/spineboy-pro.json', spineLoaderOptions)
            .load((loader, resources) => {
                const animation = new Spine(resources.spineCharacter.spineData);
                animation.x = window.app.screen.width / 2;
                animation.y = window.app.screen.height / 3 * 2 + 100;
                // add the animation to the scene and render...
                // this.addToStage(animation);
                window.app.stage.addChild(animation)
                if (animation.state.hasAnimation('aim') &&
                    animation.state.hasAnimation('run')) {
                    animation.state.setAnimation(0, 'aim', true);
                    const ikCross = this.spineAnim.skeleton.ikConstraints[0].target;
                    ikCross.y = 100;
                    // this.addTween().addControl(ikCross)
                    //     .do({ y: [100, 400] }).start(3000, undefined, -1);
                    // run forever, little boy!
                    // animation.state.setAnimation(0, 'run-to-idle', true);
                    // animation.state.setAnimation(1, 'shoot', true);
                    //animation.state.setAnimation(1, 'run', true);
                    // animation.state.setAnimation(3, 'hoverboard', true);

                    // jump
                    // portal
                    // run-to-idle
                    // shoot
                    // walk
                    // death
                    // shoot
                    // hoverboard
                    // run
                    // aim

                    // dont run too fast



                    //                     animation.state.setAnimation(0, 'portal', false);
                    // animation.tr

                    //                     animation.state.addAnimation(0, 'walk', true, 0);
                    //                     document.addEventListener('keydown', (e) => this.onClick.bind(this, e).call());
                    //                     // 

                    animation.state.timeScale = 0.5;
                    console.warn(animation);
                    this.spineAnim = animation;
                }
            });
    }

    addFighter(): void {
        window.app.loader
            .add('assets/fighter.json')
            .load(() => {
                // load sounds after main resources
                this.loadSounds();

                // create an array of textures from an image path
                const frames = [];

                for (let i = 0; i < 30; i++) {
                    const val = i < 10 ? `0${i}` : i;

                    // magically works since the spritesheet was loaded with the pixi loader
                    frames.push(PIXI.Texture.from(`rollSequence00${val}.png`));
                }

                // create an AnimatedSprite (brings back memories from the days of Flash, right ?)
                const anim = new PIXI.AnimatedSprite(frames);

                /*
                 * An AnimatedSprite inherits all the properties of a PIXI sprite
                 * so you can change its position, its anchor, mask it, etc
                 */
                anim.x = window.app.screen.width / 2;
                anim.y = window.app.screen.height / 2;
                anim.anchor.set(0.5);
                anim.animationSpeed = 0.5;
                anim.play();

                this.addToStage(anim);
                this.anim = anim;

                this.addTween().addControl(anim).do({ x: [50, 1500] }).start(1000, undefined, -1);
            });
    }

    loadSounds() {
        const sounds = 'assets/allsounds.json';
        window.app.loader
            .add(sounds)
            .load((loader, resources) => {
                this.sounds = new Howl(resources[sounds].data);
            });
    }

    addToStage(element: PIXIElement) {
        window.app.stage.addChild(element);
    }
}