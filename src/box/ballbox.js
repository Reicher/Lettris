BallBox = function (game, id, tile, x, y) {
    Box.call(this, game, id, 'ball-box', tile.letter, tile.points, 1, 1, x, y)
    this.body.setCircle(this.width/2);
}

BallBox.prototype = Object.create(Box.prototype);
BallBox.prototype.constructor = BallBox;
