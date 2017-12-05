GoldBox = function (game, id, tile, x, y) {
    Box.call(this, game, id, 'gold-box', tile.letter, tile.points, 3, 1, x, y)

    Box.prototype.setCoolRemove.call(this, "gold-box-break", 3, ['board1',
							    'board2',
							    'screw1'])
}

GoldBox.prototype = Object.create(Box.prototype);
GoldBox.prototype.constructor = GoldBox;
