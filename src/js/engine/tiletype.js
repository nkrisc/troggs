export default class TileType {
    constructor(name, appearance, color, bgColor, passable) {
        this.color = color;
        this.bgColor = bgColor;
        this.passable = passable;
        this.name = name;
        this.appearance = appearance;
        this.explored = false;
        this.visible = true;
    }
};
