WideBox = function (game, id, tile, x, y) {
    Box.call(this, game, id, 'wide-box', tile.letter, tile.points, 1, 1, x, y)
}

WideBox.prototype = Object.create(Box.prototype);
WideBox.prototype.constructor = WideBox;
