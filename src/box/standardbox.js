StandardBox = function (game, id, tile, x, y) {
    Box.call(this, game, id, 'box', tile.letter, tile.points, 1, 1, x, y)

    var frames = Phaser.Animation.generateFrameNames('box-break', 1, 3)
    this.animations.add('break', frames, 10);
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
    var lifetime = 5000
    var particles = 10
    var emitter = this.game.add.emitter(this.x - this.width/2 , this.y - this.height/2, particles);
    emitter.width = this.width
    emitter.height = this.height

    emitter.makeParticles(['sprites'], ['board1', 'board2', 'screw1']);
    emitter.gravity = 200;

    emitter.start(true, lifetime, null, particles);

    //  And 2 seconds later we'll destroy the emitter
    this.game.time.events.add(lifetime, function () { emitter.destroy(); }, this);
}
