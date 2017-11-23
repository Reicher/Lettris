X2Box = function (game, id, x, y) {
    Box.call(this, game, id, 'box', "x2", 0, x, y)
    this.point_text.destroy()
}

X2Box.prototype = Object.create(Box.prototype);
X2Box.prototype.constructor = X2Box;
