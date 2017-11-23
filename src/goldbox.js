GoldBox = function (game, id, letter, points, x, y) {
    Box.call(this, game, id, 'gold-box', letter, points*3, x, y)

}

GoldBox.prototype = Object.create(Box.prototype);
GoldBox.prototype.constructor = GoldBox;
