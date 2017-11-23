SilverBox = function (game, id, letter, points, x, y) {
    Box.call(this, game, id, 'silver-box', letter, points*2, x, y)

}

SilverBox.prototype = Object.create(Box.prototype);
SilverBox.prototype.constructor = SilverBox;
