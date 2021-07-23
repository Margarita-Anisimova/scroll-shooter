import Game from "./game";
import Enemy from "./Enemy";
import { Spine } from 'pixi-spine';


export default class Enemies {

    public inField: Enemy[] = [];

    private enemies: Enemy[] = [];
    private ind: number = -1;
    private game: Game;

    constructor(game: Game, dragon: Spine) {
        this.game = game;
        for (let i = 0; i < 3; i++) {
            this.enemies.push(new Enemy(this.game, dragon));
        }
    }

    current(): Enemy {
        return this.inField[0];
    }

    newEnen() {
        this.ind = this.ind === 2 ? 0 : this.ind + 1;
        this.inField.push(this.enemies[this.ind]);
        this.enemies[this.ind].start();

    }
}