SilverBox = function (game, id, tile, x, y) {
    Box.call(this, game, id, 'silver-box', tile.letter, tile.points*2, x, y)
}

SilverBox.prototype = Object.create(Box.prototype);
SilverBox.prototype.constructor = SilverBox;
