Box = function (game, letter, x = 0, y = 0) {
    Phaser.Sprite.call(this, game, x, y, 'box')

    // Letter
    var style = { font: "30px Arial", fill: "#000000" }

    var text = this.game.add.text(this.width/2,
				  this.width/2,
				  letter,
				  style)
    text.anchor.setTo(0.5)
    this.addChild(text)

    game.physics.arcade.enableBody(this)
    this.body.collideWorldBounds = true
    this.body.bounce.set(0.2);
    game.add.existing(this)
}

Box.prototype = Object.create(Phaser.Sprite.prototype);
Box.prototype.constructor = Box;

Box.prototype.update = function () {

}
