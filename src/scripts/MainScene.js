import * as PIXI from "pixi.js";
import { Globals } from "./Globals";
import { PuzzleGrid } from "./PuzzleGrid";

export class MainScene {

    constructor() {
        this.container = new PIXI.Container();
        Globals.resources.music.sound.play({
            loop:true,
            volume:0.2
        });
        this.createBackground();
        this.createPuzzleGrid();
    }

    createBackground() {
        console.log(Globals);
        this.bg = new PIXI.Sprite(Globals.resources["bg"].texture);
        this.bg.width = window.innerWidth;
        this.bg.height = window.innerHeight;
        this.container.addChild(this.bg);

        //this.bg.width = 500;
        //this.bg.height = 500;

        //this.bg.x = window.innerWidth/2;
        //this.bg.y = window.innerHeight/2;

        //console.log(this.bg.x, this.bg.y);
        //this.bg.anchor.set(0, 0);
        //this.bg.anchor.set(0.5, 0.5);

        //console.log(this.bg);

        //this.bg.scale.set(1, -1);

        //this.bg.alpha = 0.5;
        //this.bg.visible = true;

        //this.bg.tint = 0xFFDD00;
    }

    createPuzzleGrid() {
        const grid = new PuzzleGrid();
        this.container.addChild(grid.container);
    }

}