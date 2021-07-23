
import { Spine } from 'pixi-spine';

export default class Loader {
    public dragon: Spine;
    public player: Spine;

    constructor() {
        this.load();
    }

    load() {
        var spineLoaderOptions = { metadata: { spineSkeletonScale: 0.6 } };
        var spineLoaderOptions1 = { metadata: { spineSkeletonScale: 0.5 } };
        window.app.loader
            .add('spineCharacter', 'assets/spineboy-pro.json', spineLoaderOptions)
            .add('spineDragon', 'assets/dragon.json', spineLoaderOptions1)
            .load((loader, resources) => {
                const animation = new Spine(resources.spineCharacter.spineData);
                animation.x = window.app.screen.width / 2 - 300;
                animation.y = window.app.screen.height / 3 * 2 + 200;
                this.player = animation;

                const animation1 = new Spine(resources.spineDragon.spineData);
                this.dragon = animation1;
            })
    }
}