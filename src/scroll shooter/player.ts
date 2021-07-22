import { Spine } from 'pixi-spine';

export default class Player {

    public player: Spine;
    public isJumping: boolean;
    public rect: PIXI.Sprite;
    public lives: PIXI.Sprite[] = [];
    public livesCont: PIXI.Container = new PIXI.Container()
    public livesNumber: number = 5;

    constructor(pl: Spine) {
        this.player = pl;
        this.player.visible = false
        this.livesCont.visible = false;
        // this.player.state.setAnimation(0, 'run', true)
        this.isJumping = false;
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
        let rect = new PIXI.Sprite(PIXI.Texture.EMPTY);
        rect.x = this.player.x - this.player.width / 2 + 50;
        rect.y = this.player.y - this.player.height;
        rect.width = this.player.width - 100;
        rect.height = this.player.height - 150;
        this.rect = rect
        window.app.stage.addChild(rect)
    }


    // createBoy() {
    //     var spineLoaderOptions = { metadata: { spineSkeletonScale: 0.6 } };
    //     var spineLoaderOptions1 = { metadata: { spineSkeletonScale: 0.5 } };
    //     window.app.loader
    //         .add('spineCharacter', 'assets/spineboy-pro.json', spineLoaderOptions)
    //         .add('spineDragon', 'assets/dragon.json', spineLoaderOptions1)
    //         .load((loader, resources) => {
    //             const animation = new Spine(resources.spineCharacter.spineData);
    //             animation.x = window.app.screen.width / 2 - 300;
    //             animation.y = window.app.screen.height / 3 * 2 + 200;

    //             if (animation.state.hasAnimation('aim') &&
    //                 animation.state.hasAnimation('run')) {
    //                 animation.state.setAnimation(0, 'run', true);
    //                 animation.state.timeScale = 0.4;
    //                 console.warn(animation);
    //                 this.player = animation;
    //             }
    //             let rect = new PIXI.Sprite(PIXI.Texture.WHITE);
    //             rect.x = this.player.x - this.player.width / 2 + 50;
    //             rect.y = this.player.y - this.player.height;
    //             rect.width = this.player.width - 100;
    //             rect.height = this.player.height - 150;
    //             this.rect = rect
    //             window.app.stage.addChild(rect)

    //             window.app.stage.addChild(animation)


    //             const animation1 = new Spine(resources.spineDragon.spineData);
    //             animation1.x = 300;
    //             animation1.y = 400;
    //             animation1.width = -animation1.width
    //             animation1.state.setAnimation(0, 'flying', true);
    //             animation1.state.timeScale = 0.4;
    //             console.warn(animation);
    //             window.app.stage.addChild(animation1)

    //         })
    // }
}