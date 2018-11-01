export default class TileType {
    constructor(name, color, bgColor, passable) {
        this.color = color;
        this.bgColor = bgColor;
        this.passable = passable;
        this.name = name;
        this.explored = false;
        this.visible = true;
    }
};
