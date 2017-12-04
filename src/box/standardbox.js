StandardBox = function (game, id, tile, x, y) {
    Box.call(this, game, id, 'box', tile.letter, tile.points, 1, 1, x, y)

    var frames = Phaser.Animation.generateFrameNames('box-break', 1, 3)
    this.animations.add('break', frames, 10);

    this.emitter = this.game.add.emitter(this.x, this.y, 20);
    this.emitter.makeParticles(['sprites'], ['board1', 'board2', 'screw1']);
}

StandardBox.prototype = Object.create(Box.prototype);
StandardBox.prototype.constructor = StandardBox;

StandardBox.prototype.remove = function () {

    // Animation
    this.animations.play('break')
    this.text.destroy()
    this.point_text.destroy()
    this.animations.currentAnim.onComplete.addOnce(function () {
	this.destroy()
    }, this);

    // Particles!
    this.emitter.start(false, 5000, 10);
}
