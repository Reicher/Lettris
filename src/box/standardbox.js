StandardBox = function (game, id, tile, x, y) {
    Box.call(this, game, id, 'box', tile.letter, tile.points, 1, 1, x, y)
    var frames = Phaser.Animation.generateFrameNames('box-break', 1, 3)
    this.animations.add('break', frames, 15);
}

StandardBox.prototype = Object.create(Box.prototype);
StandardBox.prototype.constructor = StandardBox;

StandardBox.prototype.remove = function () {
    this.animations.play('break')
    this.text.destroy()
    this.point_text.destroy()
    this.animations.currentAnim.onComplete.addOnce(function () {
	this.destroy()
    }, this);
}
