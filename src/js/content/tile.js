import TileType from '../engine/tiletype.js';
import Color from './colors.js';
import Glyph from '../engine/utils/glyph.js';

const Tile = {};
Tile.stone = new TileType('stone', Glyph.space, null, Color.black, false);
Tile.wall = new TileType('wall', Glyph.halfBlockBottom, Color.dark_grey, Color.black, false);
Tile.floor = new TileType('floor', Glyph.middleDot, Color.light_grey, Color.grey, true);

export default Tile;
