Box = function (game, x = 0) {
    Phaser.Sprite.call(this, game, x-20, -20, 'box')
    this.anchor.setTo(0.5)

    // Physics (Needs a lot of tinkering)
    game.physics.arcade.enable(this);
    this.body.collideWorldBounds = true
    this.body.fixedRotation = true;

    // Letter (should probably not be completely random)
    var letter = game.rnd.pick("ABCDEFGHIJKLMNOPQRSTUVWXYZ")
    var style = { font: "30px Arial", fill: "#000000" }
    var text = this.game.add.text(0, 0, letter, style)
    text.anchor.setTo(0.5)
    this.addChild(text)

    // Interaction
    this.inputEnabled = true;
    this.events.onInputDown.add(this.marked, this);
}

Box.prototype = Object.create(Phaser.Sprite.prototype);
Box.prototype.constructor = Box;

Box.prototype.update = function () {

}

Box.prototype.marked = function () {
    // For now, should be put into a list
    // that represent the possible word?
    this.destroy()
}
