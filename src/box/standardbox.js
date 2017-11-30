StandardBox = function (game, id, tile, x, y) {
    var candidates = ['box_gold', 'box_paper', 'box_wood']
    var key = game.rnd.pick(candidates)
    Box.call(this, game, id, key, tile.letter, tile.points, x, y)
}

StandardBox.prototype = Object.create(Box.prototype);
StandardBox.prototype.constructor = GoldBox;
