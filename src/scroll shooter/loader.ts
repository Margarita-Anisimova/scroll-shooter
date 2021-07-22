
import { Spine } from 'pixi-spine';

export default class Loader {
    public dragon: Spine;
    public player: Spine;

    constructor() {
        this.loadAll();
    }

    loadAll() {
        var spineLoaderOptions = { metadata: { spineSkeletonScale: 0.6 } };
        var spineLoaderOptions1 = { metadata: { spineSkeletonScale: 0.5 } };
        window.app.loader
            .add('spineCharacter', 'assets/spineboy-pro.json', spineLoaderOptions)
            .add('spineDragon', 'assets/dragon.json', spineLoaderOptions1)
            .load((loader, resources) => {
                const animation = new Spine(resources.spineCharacter.spineData);
                animation.x = window.app.screen.width / 2 - 300;
                animation.y = window.app.screen.height / 3 * 2 + 200;
                // animation.state.setAnimation(0, 'run', true);
                animation.state.timeScale = 0.4;
                // console.warn(animation);
                this.player = animation;
                window.app.stage.addChild(animation)


                const animation1 = new Spine(resources.spineDragon.spineData);
                // animation1.x = 300;
                // animation1.y = 400;
                // animation1.width = -animation1.width
                // animation1.state.setAnimation(0, 'flying', true);
                // animation1.state.timeScale = 0.4;
                // // console.warn(animation);
                this.dragon = animation1;
                // window.app.stage.addChild(animation1)

            })
    }
}