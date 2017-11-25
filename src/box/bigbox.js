BigBox = function (game, id, tile, x, y) {
    Box.call(this, game, id, 'big-box', tile.letter, tile.points, x, y)

}

BigBox.prototype = Object.create(Box.prototype);
BigBox.prototype.constructor = BigBox;
