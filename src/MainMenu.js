Lettris.MainMenu = function (game) {

};
Lettris.MainMenu.prototype = {
	create: function () {
	},
	startGame: function () {
		// start the Game state
		this.state.start('Game');
	}
};
