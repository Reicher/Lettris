Lettris.MainMenu = function (game) {

};
Lettris.MainMenu.prototype = {
    create: function () {
	this.game.add.sprite(0, 0, 'sprites', 'background');

	this.logo = this.game.add.sprite(this.game.width/2, 100, 'sprites', 'logo')
	this.logo.anchor.setTo(0.5)

	this.boxes = 0
	this.addMenuButton("Play", 'Game')
	this.addMenuButton("Language", 'LangMenu')


	var style = { font: "10px Arial", fill: "#FF00F0"}
	this.version = this.game.add.text(this.game.width-5,
					  this.game.height-5,
					  this.game.version,
					  style)
	this.version.anchor.setTo(1, 1)
    },

    addMenuButton: function (text, next_state) {
	var button = this.game.add.button(this.game.width/2,
					  232 + (this.boxes * 60),
					  'sprites', this.startState,
					  this, null,
					  'button', 'button-pressed')
	button.anchor.setTo(0.5)
	button.state = next_state
	var style = { font: "23px Verdana", align: "center" };
	var label = this.game.add.text(0, 0, text, style)
	label.anchor.setTo(0.5)
	button.addChild(label)

	this.boxes++

	return button
    },

    startState: function (button) {
	// start the Game state
	this.state.start(button.state);
    },
};
