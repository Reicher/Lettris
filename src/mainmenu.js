Lettris.MainMenu = function (game) {

};
Lettris.MainMenu.prototype = {
    create: function () {
	this.game.add.sprite(0, 0, 'sprites', 'background');

	// Borde nog va en fin bild
	var headerStyle = { font: "40px Arial", fill: "#FF00F0"}
	this.header = this.game.add.text(this.game.width/2,
					 60,
					 "LETTRIS",
					 headerStyle)
	this.header.anchor.setTo(0.5)

	this.game.input.onDown.add(()=>{
	    this.startGame()
	}, this)
    },

    startGame: function () {
	// start the Game state
	this.header.destroy()
	this.state.start('Game', false);
    }
};
