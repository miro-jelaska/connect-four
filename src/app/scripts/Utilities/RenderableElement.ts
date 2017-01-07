import 'pixi.js';

export interface RenderableElement {
    getStage(): PIXI.Container;
}