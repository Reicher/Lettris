Box = function (game, x, y) {

    Phaser.Sprite.call(this, game, x, y, 'box');

    game.physics.arcade.enable(this);

    game.add.existing(this);
}

Box.prototype = Object.create(Phaser.Sprite.prototype);
Box.prototype.constructor = Box;

Box.prototype.update = function () {

}
