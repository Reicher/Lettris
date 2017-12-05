WideBox = function (game, id, tile, x, y) {
    Box.call(this, game, id, 'wide-box', tile.letter, tile.points, 1, 1, x, y)

    var frames = Phaser.Animation.generateFrameNames('box-break', 1, 3)
    this.animations.add('break', frames, 10);
}

WideBox.prototype = Object.create(Box.prototype);
WideBox.prototype.constructor = WideBox;

WideBox.prototype.remove = function () {

    // Animation
    this.animations.play('break')
    this.text.destroy()
    this.point_text.destroy()
    this.animations.currentAnim.onComplete.addOnce(function () {
	this.destroy()
    }, this);

    // Particles!!
    Box.prototype.spitParticles.call(this,
				     ['suitcase-piece1',
				      'suitcase-piece2',
				      'suitcase-piece3',
				      'tophat',
				      'wand',
				      'boxershorts',
				      'bowtie',
				      'book']);
}
