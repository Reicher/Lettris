Box = function (game, pos, size, letter, points, boxClicked) {
    Phaser.Sprite.call(this, game, pos, -size/2, 'box')
    this.anchor.setTo(0.5)

    this.scale.setTo(size/40, size/40) // since our sprite is 40

    // Physics
    game.physics.p2.enable(this);
    this.body.collideWorldBounds = true

    this.points = points

    // letter text
    var style = { font: "30px Arial", fill: "#000000" }
    this.text = this.game.add.text(0, 0, letter, style)
    this.text.anchor.setTo(0.5)
    this.addChild(this.text)

    // points text
    var style = { font: "10px Arial", fill: "#000000" }
    var point_text = this.game.add.text(17, 23,
					this.points,
					style)
    point_text.anchor.setTo(1)
    this.text.addChild(point_text)

    // Interaction
    this.inputEnabled = true;
    this.events.onInputDown.add(this.click, this)
    this.clickSignal = boxClicked
}

Box.prototype = Object.create(Phaser.Sprite.prototype);
Box.prototype.constructor = Box;

Box.prototype.click = function () {
    if( this.tint == 0xffffff)
	this.tint = 0xfff000
    else
	this.tint = 0xffffff

    this.clickSignal.dispatch(this)
}

Box.prototype.remove = function () {
    this.destroy()
}
