StandardBox = function (game, id, tile, x, y) {
    Box.call(this, game, id, 'box', tile.letter, tile.points, 1, 1, x, y)
}

StandardBox.prototype = Object.create(Box.prototype);
StandardBox.prototype.constructor = GoldBox;
