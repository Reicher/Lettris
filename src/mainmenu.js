Lettris.MainMenu = function (game) {

};
Lettris.MainMenu.prototype = {
    create: function () {
	console.log("MainMenu!")

	this.game.add.sprite(0, 0, 'sprites', 'background');


	this.startGame()
    },

    startGame: function () {
	// start the Game state
	this.state.start('Game', false);
    }
};
