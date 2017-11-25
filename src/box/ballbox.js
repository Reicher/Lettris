BallBox = function (game, id, tile, x, y) {
    Box.call(this, game, id, 'bomb-box', tile.letter, tile.points, x, y)
    this.body.setCircle(this.width/2);
    this.text.addColor("#FFFFFF", 0); //white
    this.point_text.addColor("#FFFFFF", 0); //white

    var fuse = this.game.add.sprite(0, -35, 'sprites', 'bomb-box-fuse1');
    fuse.animations.add('burn',
			Phaser.Animation.generateFrameNames('bomb-box-fuse', 1, 3),
			5,
			true);
    fuse.animations.play('burn');
    fuse.anchor.setTo(0.5)
    this.addChild(fuse)
}

BallBox.prototype = Object.create(Box.prototype);
BallBox.prototype.constructor = BallBox;
