BigBox = function (game, id, tile, x, y) {
    Box.call(this, game, id, 'big-box', tile.letter, tile.points, 1, 1, x, y)

}

BigBox.prototype = Object.create(Box.prototype);
BigBox.prototype.constructor = BigBox;
