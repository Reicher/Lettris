Box = function (game, letter, x = 0, y = 0, size = 40) {
    Phaser.Sprite.call(this, game, x, y)

    // Rounded box
    var graphics = game.add.graphics(0, 0)
    graphics.beginFill(0xFFFFFF, 1)
    graphics.lineStyle(3, 0x0066cc, 1);
    graphics.drawRoundedRect(x, y, size, size, 8)
    this.addChild(graphics)

    // Letter
    var style = { font: "30px Arial", fill: "#000000" }
    var text = this.game.add.text(size/2, size/2, letter, style)
    text.anchor.setTo(0.5)
    this.addChild(text)

    game.physics.arcade.enable(this)
    game.add.existing(this)
}

Box.prototype = Object.create(Phaser.Sprite.prototype);
Box.prototype.constructor = Box;

Box.prototype.update = function () {

}
