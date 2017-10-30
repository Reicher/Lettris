Box = function (game, x, boxClicked) {
    Phaser.Sprite.call(this, game, x-20, -20, 'box')
    this.anchor.setTo(0.5)

    // Physics
    game.physics.p2.enable(this);
    this.body.collideWorldBounds = true
    //this.body.fixedRotation = true;

    // Letter (should probably not be completely random)
    var letter = game.rnd.pick("ABCDEFGHIJKLMNOPQRSTUVWXYZ")
    var style = { font: "30px Arial", fill: "#000000" }
    this.text = this.game.add.text(0, 0, letter, style)
    this.text.anchor.setTo(0.5)
    this.addChild(this.text)

    // Interaction
    this.inputEnabled = true;
    this.events.onInputDown.add(this.click, this);
    this.clickSignal = boxClicked
}

Box.prototype = Object.create(Phaser.Sprite.prototype);
Box.prototype.constructor = Box;

Box.prototype.update = function () {

}

Box.prototype.click = function () {
    if( this.tint == 0xffffff)
	this.tint = 0xfff000
    else
	this.tint = 0xffffff

    this.clickSignal.dispatch(this)
}
