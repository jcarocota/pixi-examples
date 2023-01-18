import * as PIXI from "pixi.js";
import { Globals } from "./Globals";
import TWEEN from "@tweenjs/tween.js";

export class PuzzlePiece extends PIXI.utils.EventEmitter {
    constructor(id, field) {
        super();
        this.sprite = new PIXI.Sprite(Globals.resources[`puzzle${id}`].texture);
        this.sprite.anchor.set(0.5);
        this.sprite.scale.set(0.5);
        this.field = field;

        this.reset();

        this.setInteractive();
    }

    setInteractive() {
        this.sprite.interactive = true;

        this.sprite.on("pointerdown", this.onTouchStart, this);
        this.sprite.on("pointermove", this.onTouchMove, this);
        this.sprite.on("pointerup", this.onTouchEnd, this);
    }

    onTouchStart(event) {
        //console.log("Perrito");
        this.touchPosition = {x: event.data.global.x, y: event.data.global.y};
        this.dragging = true;

        this.sprite.zIndex = 1;

        Globals.resources.click.sound.play();

    }

    onTouchMove(event) {
        if(!this.dragging) {
            return;
        }

        const currentPosition = {x: event.data.global.x, y: event.data.global.y};
        const offsetX = currentPosition.x - this.touchPosition.x;
        const offsetY = currentPosition.y - this.touchPosition.y;

        this.sprite.x = this.field.x + offsetX;
        this.sprite.y = this.field.y + offsetY;

    }

    onTouchEnd(event) {
        Globals.resources.click.sound.play();
        this.dragging = false;
        //this.reset();
        this.sprite.zIndex = 0;
        this.emit("dragend");
    }

    reset() {
        const tween = new TWEEN.Tween(this.sprite);
        tween.to({
            x: this.field.x,
            y: this.field.y
        }, 300);

        tween.onStart(() => {});
        tween.onUpdate(() => {});
        tween.onComplete(() => {});
        tween.easing(TWEEN.Easing.Back.Out);

        tween.start();

        //this.sprite.x = this.field.x;
        //this.sprite.y = this.field.y;
    }

    get left() {
        return this.sprite.x - this.sprite.width/2;
    }

    get right() {
        return this.sprite.x + this.sprite.width/2;
    }
    
    get top() {
        return this.sprite.y - this.sprite.height/2;        
    }

    get bottom() {
        return this.sprite.y + this.sprite.height/2;        
    }

    setField(field) {
        this.field = field;
        this.reset();
    }
}