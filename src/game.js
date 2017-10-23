Lettris.Game = function (game) {

};

Lettris.Game.prototype = {
	create: function () {
	    console.log("GAME ON!")

	    this.game.physics.startSystem(Phaser.Physics.ARCADE)

	    this.game.physics.arcade.gravity.y = 200

	    var test_box = new Box(this.game, 50, 50, 40)
	},

	update: function () {
	},
};
