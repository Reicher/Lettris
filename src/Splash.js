Lettris.Splash = function (game) {};
Lettris.Splash.prototype = {
	create: function () {
	},
	startGame: function () {
		// start the Game state
		this.state.start('MainMenu');
	}
};
