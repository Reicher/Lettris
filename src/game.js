Lettris.Game = function (game) {
};

Lettris.Game.prototype = {
    create: function (game) {
	console.log("GAME ON!")

	game.physics.startSystem(Phaser.Physics.ARCADE)

	game.physics.arcade.gravity.y = 150

	this.boxes = game.add.group();
	this.boxes.add(new Box(game, 'A'))
    },

    update: function () {
    },

    render: function() {
    }
};
