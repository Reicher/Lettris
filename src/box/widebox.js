WideBox = function (game, id, tile, x, y) {
    Box.call(this, game, id, 'wide-box', tile.letter, tile.points, x, y)
}

WideBox.prototype = Object.create(Box.prototype);
WideBox.prototype.constructor = WideBox;