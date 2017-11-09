Lettris.MainMenu = function (game) {

};
Lettris.MainMenu.prototype = {
    create: function () {
	console.log("MainMenu!")
	this.startGame()
    },

    startGame: function () {
	// start the Game state
	this.state.start('Game');
    }
};
