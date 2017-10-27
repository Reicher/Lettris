Box = function (game, gx, size) {
    Phaser.Sprite.call(this, game,
		       size/2  + gx * size,
		       size/2 ,
		       'box')
    this.size = size
    this.anchor.setTo(0.5)

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

Box.prototype.tweenFall = function (gy) {
    var y = -this.size/2 + gy * this.size
    this.game.add.tween(this).to( { y: y }, gy * 100).start()
}

Box.prototype.marked = function () {
    // For now, should be put into a list
    // that represent the possible word?
    this.destroy()
}
