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

	// Tip of the day
	var tips = ["The red button in the lower left corner clears current word.",
		    "Gold boxes are worth three times normal!",
		    "Silver boxes are worth twice as much as regular boxes!",
		    "Multiboxes multiplies the whole word two or three times!!",
		    "Bomb boxes are always worth 0 points."]
	var style = { font: "22px Arial", fill: "#EEEEEE"}
	this.tipHeader = this.game.add.text(this.game.world.centerX,
					    this.logo.bottom + 50,
					    "Random Tip:",
					    style)
	this.tipHeader.anchor.setTo(0.5, 1)
	this.tipHeader.fontWeight = 'bold';
	this.tipHeader.stroke = '#000000';
	this.tipHeader.strokeThickness = 3;

	var style = { font: "22px Arial", fill: "#EEEEEE", wordWrap: true, wordWrapWidth: this.game.world.width - 40 };
	this.tip = this.game.add.text(this.game.world.centerX,
				      this.tipHeader.bottom,
				      "\"" + Phaser.ArrayUtils.getRandomItem(tips) + "\"",
				      style)
	this.tip.fontWeight = 'italic';
	this.tip.stroke = '#000000';
	this.tip.strokeThickness = 3;

	this.tip.anchor.setTo(0.5, 0)


	// Buttons
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
				    440 + (this.boxes * 110),
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
