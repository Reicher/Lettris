Box = function (game, id, key, letter, points, local_multi, multi, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'sprites', key)

    this.id = id
    this.marked = false
    this.anchor.setTo(0.5)
    this.key = key
    this.base_points = points
    this.points = points * local_multi
    this.multi = multi

    // set random position if there is no position
    if( !x )
	this.x = game.rnd.integerInRange(this.width/2 + 1,
					 game.width - this.width/2 - 1)
    if( !y )
	this.y = -this.width/2

    // Physics
    game.physics.p2.enable(this)
    this.body.collideWorldBounds = true

    // letter text
    var style = { font: "50px Verdana", fill: "#000000" }
    this.text = this.game.add.text(0, 2, letter, style)
    this.text.fontWeight = 'bold';
    this.text.stroke = '#FFFFFF';
    this.text.strokeThickness = 3;
    this.text.anchor.setTo(0.5)
    this.addChild(this.text)

    // points text
    var style = { font: "20px Arial", fill: "#000000" }
    this.point_text = this.game.add.text(this.text.right+15,
					 this.text.bottom+7,
					 this.points,
					 style)
    this.point_text.fontWeight = 'bold';
    this.point_text.anchor.setTo(1, 1)
    this.text.addChild(this.point_text)

    // Interaction
    this.inputEnabled = true;
    this.events.onInputDown.add(this.click, this)
    this.clicked = new Phaser.Signal()
}

Box.prototype = Object.create(Phaser.Sprite.prototype);
Box.prototype.constructor = Box;

Box.prototype.click = function () {
    this.mark( !this.marked )

    this.clicked.dispatch(this)
}

Box.prototype.mark = function (mark) {
    if( mark )
	this.tint = 0x00FF00 // Greenish
    else
	this.tint = 0xFFFFFF // White

    this.marked = mark
}

Box.prototype.remove = function () {
    var shrink = this.game.add.tween(this.scale).to({x: 0, y: 0},
						    400,
						    Phaser.Easing.Quadratic.In,
						    true);
    shrink.onComplete.addOnce(function() {
	this.destroy()
    }, this);
}
