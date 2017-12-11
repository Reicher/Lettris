Lettris.MainMenu = function (game) {

};
Lettris.MainMenu.prototype = {
    create: function () {
	this.game.add.sprite(0, 0, 'sprites', 'background');

	this.logo = this.game.add.sprite(this.game.width/2, 140, 'sprites', 'logo')
	this.logo.anchor.setTo(0.5)

	this.addLight(this.logo, -179, -92)
	this.addLight(this.logo, 163, -92)
	this.addLight(this.logo, -179, 75)
	this.addLight(this.logo, 163, 75)
	this.addLight(this.logo, 74, -84)

	this.boxes = 0
	this.addMenuButton("PLAY", 'Game')
	this.addMenuButton("CREDITS", 'Credits')
	this.addMenuButton("LANGUAGE", 'LangMenu')

	var style = { font: "20px Arial", fill: "#F0FFF0"}
	this.version = this.game.add.text(this.game.width-5,
					  this.game.height-5,
					  this.game.version,
					  style)
	this.version.anchor.setTo(1, 1)
    },
    addLight: function(parent, x, y) {
	var light = this.game.add.sprite(x, y, 'sprites', 'lamp-off')
	parent.addChild(light)

	var speed = this.game.rnd.integerInRange(3, 6)
	light.animations.add('blink', ['lamp-off', 'lamp-on'], speed, true);
	light.animations.play('blink');
    },
    addMenuButton: function (text, next_state) {

	var choice = new TextButton(this.game,
				    text, this.game.world.centerX,
				    400 + (this.boxes * 120),
				    this.startState,
				    this)
	choice.button.state = next_state

	this.boxes++

	return choice
    },

    startState: function (button) {
	// start the Game state
	this.state.start(button.state);
    },
};
