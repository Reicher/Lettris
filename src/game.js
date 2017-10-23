Lettris.Game = function (game) {
};

Lettris.Game.prototype = {
    create: function (game) {
	console.log("GAME ON!")

	game.physics.startSystem(Phaser.Physics.ARCADE)

	game.physics.arcade.gravity.y = 200

	this.boxes = game.add.group();

	this.boxes.add(new Box(game, 50, 50, 40))
    },

    update: function () {
    },

    render: function() {
    }
};
