MultiBox = function (game, id, multi, x, y) {
    Box.call(this, game, id, 'box', "x2", 0, x, y)
    this.point_text.destroy()
    this.multi = multi
}

MultiBox.prototype = Object.create(Box.prototype);
MultiBox.prototype.constructor = MultiBox;
