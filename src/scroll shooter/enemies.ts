import Game from "./game";
import Enemy from "./Enemy";
import { Spine } from 'pixi-spine';
import { Container } from "pixi.js-legacy";


export default class Enemies {

    public enemies: Enemy[] = [];
    public enemiesInField: Enemy[] = [];
    public ind: number = -1;
    public game: Game;

    constructor(game: Game, dr: Spine) {

        this.game = game;
        for (let i = 0; i < 3; i++) {

            this.enemies.push(new Enemy(this.game, dr));
        }
    }

    currentBox(): Enemy {
        return this.enemiesInField[0];
    }

    newEnen() {
        this.ind = this.ind === 2 ? 0 : this.ind + 1;
        this.enemiesInField.push(this.enemies[this.ind]);
        this.enemies[this.ind].new()

    }
}