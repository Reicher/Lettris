Box = function (game, pos, key, letter, points, boxClicked) {
    var size = game.cache.getImage(key)
    Phaser.Sprite.call(this, game, pos, -size/2, key)
    this.anchor.setTo(0.5)

    // Physics
    game.physics.p2.enable(this);
    this.body.collideWorldBounds = true

    this.points = points

    // letter text
    var style = { font: "30px Arial", fill: "#000000" }
    this.text = this.game.add.text(0, 0, letter.toUpperCase(), style)
    this.text.anchor.setTo(0.5)
    this.addChild(this.text)

    // points text
    var style = { font: "10px Arial", fill: "#000000" }
    var point_text = this.game.add.text(17, 21, this.points, style)
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
    // TODO: Add a cool sound, -BOP!-
    var shrink = this.game.add.tween(this.scale).to({x: 0, y: 0},
						    400,
						    Phaser.Easing.Quadratic.In,
						    true);
    shrink.onComplete.addOnce(function() {
	this.destroy()
    }, this);
}
