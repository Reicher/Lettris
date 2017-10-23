Box = function (game, x, y, size) {

    Phaser.Sprite.call(this, game, x, y)

    var graphics = game.add.graphics(0, 0)
    graphics.beginFill(0xFFFFFF, 1)
    graphics.drawRoundedRect(x, y, size, size, 5)

    this.addChild(graphics)

    game.physics.arcade.enable(this)

    game.add.existing(this)
}

Box.prototype = Object.create(Phaser.Sprite.prototype);
Box.prototype.constructor = Box;

Box.prototype.update = function () {

}
