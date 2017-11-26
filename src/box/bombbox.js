BombBox = function (game, id, tile, x, y) {
    Box.call(this, game, id, 'bomb-box1', tile.letter, 0, x, y)
    this.point_text.destroy()

    var frames = Phaser.Animation.generateFrameNames('bomb-box', 1, 3)
    this.animations.add('pulse', frames, 5, true);

    this.animations.play('pulse');
}

BombBox.prototype = Object.create(Box.prototype);
BombBox.prototype.constructor = BombBox;
