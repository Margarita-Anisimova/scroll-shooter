import { Spine } from 'pixi-spine';

export default class Player {

    public player: Spine;
    public isJumping: boolean;
    public rect: PIXI.Sprite;
    public lives: PIXI.Sprite[] = [];
    public livesNumber: number = 5;

    constructor() {
        this.createBoy();
        this.isJumping = false;
        for (let i = 0; i < 5; i++) {
            let r = new PIXI.Sprite(PIXI.Texture.WHITE);
            r.width = 50;
            r.height = 50;
            r.x = i * 52
            this.lives.push(r);
            window.app.stage.addChild(r);
        }

    }

    createBoy() {
        var spineLoaderOptions = { metadata: { spineSkeletonScale: 0.6 } };
        window.app.loader
            .add('spineCharacter', 'assets/spineboy-pro.json', spineLoaderOptions)
            .load((loader, resources) => {
                const animation = new Spine(resources.spineCharacter.spineData);
                animation.x = window.app.screen.width / 2 - 300;
                animation.y = window.app.screen.height / 3 * 2 + 200;

                if (animation.state.hasAnimation('aim') &&
                    animation.state.hasAnimation('run')) {
                    animation.state.setAnimation(0, 'run', true);
                    animation.state.timeScale = 0.4;
                    console.warn(animation);
                    this.player = animation;
                }

                let rect = new PIXI.Sprite(PIXI.Texture.WHITE);
                rect.x = this.player.x - this.player.width / 2 + 50;
                rect.y = this.player.y - this.player.height;
                rect.width = this.player.width - 100;
                rect.height = this.player.height - 150;
                this.rect = rect
                window.app.stage.addChild(rect)
                window.app.stage.addChild(animation)
            })
    }
}