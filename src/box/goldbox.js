GoldBox = function (game, id, tile, x, y) {
    Box.call(this, game, id, 'gold-box', tile.letter, tile.points*3, x, y)
}

GoldBox.prototype = Object.create(Box.prototype);
GoldBox.prototype.constructor = GoldBox;
