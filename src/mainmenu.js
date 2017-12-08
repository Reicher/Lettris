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
	this.addMenuButton("Play", 'Game')
	this.addMenuButton("Credits (Soon)", 'Credits').inputEnabled = false
	this.addMenuButton("Language", 'LangMenu')

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
	var button = this.game.add.button(this.game.width/2,
					  400 + (this.boxes * 120),
					  'sprites', this.startState,
					  this, null,
					  'button', 'button-pressed')
	button.anchor.setTo(0.5)
	button.state = next_state
	var style = { font: "33px Verdana", align: "center"};
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
