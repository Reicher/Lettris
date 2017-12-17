Lettris.Tutorial = function (game) {

};
Lettris.Tutorial.prototype = {
    create: function () {
	this.game.add.sprite(0, 0, 'sprites', 'background');

	if(JSON.parse(localStorage.getItem('Have-Played')))
	    this.startState()
	else
	    this.showTutorial()
    },
    showTutorial: function() {
	    this.tutorial = this.game.add.group();
	    this.tutorial.x = 80
	    this.tutorial.y = 150
	    var back = this.tutorial.create(0, 0, 'sprites', 'tutorial-panel');
	    var expl = this.game.add.text(30,
					  140,
					  "Create words by marking letter tiles in order, complete by pressing the big green button. Clear current word with the red button.",
					  this.new_style)
	    expl.fontSize = 20
	    expl.wordWrap = true;
	    expl.wordWrapWidth = 280

	    this.tutorial.add(expl)

	    this.addLight(this.tutorial, 3, 3)
	    this.addLight(this.tutorial, this.tutorial.width-20, 3)
	    this.addLight(this.tutorial, 3, 113)
	    this.addLight(this.tutorial, this.tutorial.width-20, 113)
	    this.addLight(this.tutorial, 3, 339)
	    this.addLight(this.tutorial, this.tutorial.width-20, 339)

	    // Buttons
	    var play = new TextButton(this.game,
				      "Play",
				      this.game.world.centerX,
				      640,
				      this.startState,
				      this)
    },
    addLight: function(parent, x, y) {
	var light = this.game.add.sprite(x, y, 'sprites', 'lamp-off')
	parent.addChild(light)

	var speed = this.game.rnd.integerInRange(1, 3)
	light.animations.add('blink', ['lamp-off', 'lamp-on'], speed, true);
	light.animations.play('blink');
    },
    startState: function (button) {
	localStorage.setItem('Have-Played', JSON.stringify(true));
	// start the Game state
	this.state.start('Game');
    },
};
