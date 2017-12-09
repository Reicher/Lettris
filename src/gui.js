GUI = function (game, gameData) {
    Phaser.Group.call(this, game);
    this.y = game.height-160

    this.dictionary = game.cache.getJSON('dic')
    this.gameData = gameData
    this.markedList = []

    // Sounds
    this.accept_sound = this.game.add.audio('accept', 0.5);
    this.clear_sound = this.game.add.audio('clear');
    this.select_sound = this.game.add.audio('select', 0.6);

    this.add(game.add.button(20, 18, 'sprites', this.clear, this, 'clear', 'clear', 'clear-pressed'))
    this.add(game.add.button(150, 18, 'sprites', this.accept, this, 'accept', 'accept', 'accept-pressed'))

    var panel  = this.create(0, 0, 'sprites', 'panel')
    this.addLight(panel, 3, 3)
    this.addLight(panel, this.game.world.width-17, 3)
    this.addLight(panel, this.game.world.width-17, 140)
    this.addLight(panel, 3, 140)
    this.addLight(panel, 130, 140)
    this.addLight(panel, 130, 3)

    var style = { font: "25px Arial", align: "center" };
    this.scoreText = game.add.text(game.world.centerX,
				   25,
				   "0",
				   style)
    this.scoreText.anchor.setTo(0.5)
    this.add(this.scoreText)

    var word_style = { font: "40px Verdana", align: "center" };
    this.word = game.add.text(game.world.centerX-60,
    			      70, "", word_style)
    this.add(this.word)

    this.langText = game.add.text(game.world.centerX+100,
				  25,
				  this.game.language,
				  style)
    this.langText.anchor.setTo(0, 0.5)
    this.add(this.langText)


    var ws_style = { font: "20px Verdana", align: "center" };
    this.wordScore = game.add.text(5, -5, "", ws_style)
    this.word.addChild(this.wordScore)

    // Hotkeys
    var space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    space.onDown.add(this.accept, this);

    var x = game.input.keyboard.addKey(Phaser.Keyboard.X)
    x.onDown.add(this.clear, this);

    // Signals
    this.word_accepted = new Phaser.Signal()
}

GUI.prototype = Object.create(Phaser.Group.prototype)
GUI.prototype.constructor = GUI

GUI.prototype.addLight = function(parent, x, y) {
    var light = this.game.add.sprite(x, y, 'sprites', 'lamp-off')
    parent.addChild(light)

    var speed = this.game.rnd.integerInRange(1, 3)
	light.animations.add('blink', ['lamp-off', 'lamp-on'], speed, true);
    light.animations.play('blink');
}

GUI.prototype.clear = function () {
    this.markedList.forEach(function(box) {
	box.mark(false)
    }, this);
    this.markedList = []
    this.word.text = ""

    if(!this.accept_sound.playing)
	this.clear_sound.play()
}

GUI.prototype.removeTutorial = function() {
    this.game.add.tween(this.tutorial).to({alpha: 0},
					  3000,
					  Phaser.Easing.Quadratic.In,
					  true);
}

GUI.prototype.showTutorial = function() {
    this.tutorial = this.game.add.group();
    this.tutorial.x = 80
    this.tutorial.y = 50
    var back = this.tutorial.create(0, 0, 'sprites', 'tutorial-panel');
    back.alpha = 0.8

    var style = { font: "26px Verdana", wordWrap: true, wordWrapWidth: back.width-50 };
    var expl = this.game.add.text(30,
				  140,
				  "Create words by marking letter tiles in order, complete by pressing the big green button. Clear current word with the red button.",
				  style)
    this.tutorial.add(expl)

    this.addLight(this.tutorial, 3, 3)
    this.addLight(this.tutorial, this.tutorial.width-20, 3)
    this.addLight(this.tutorial, 3, 113)
    this.addLight(this.tutorial, this.tutorial.width-20, 113)
    this.addLight(this.tutorial, 3, 339)
    this.addLight(this.tutorial, this.tutorial.width-20, 339)
}

GUI.prototype.accept = function () {

    var word = this.word.text.toLowerCase()

    // Check if word is in dictionary
    if(this.word.text.length < 2 ||
       this.dictionary.indexOf(word) == -1)
	return

    	this.accept_sound.play()

    // Remove all word letters
    var info = []
    this.markedList.forEach(function(box) {
	this.gameData.tiles_cleared++
	info.push({letter: box.text.text,
		   key: box.key,
		   points: box.points,
		   multi : box.multi,
		   base_points : box.base_points})
	box.remove()
    }, this);

    // Karma is given without multipliers
    this.gameData.karma += this.points / this.multi

    if( this.base_points > this.gameData.best_word.score){
	this.gameData.best_word.score = this.base_points
	this.gameData.best_word.word = info
    }

    this.gameData.score += this.points
    this.scoreText.setText(this.gameData.score)

    this.clear()

    this.word_accepted.dispatch()
}

GUI.prototype.box_clicked = function (box) {
    if( box.marked ){
	this.markedList.push(box)
	this.select_sound.play()
    }
    else{
	var index = this.markedList.findIndex(b => b.id == box.id)
	this.markedList.splice(index, 1)
    }

    this.base_points = 0
    this.points = 0
    this.multi = 0
    this.word.text = ""
    this.word.fontSize = "40pt"
    this.markedList.forEach(function(b) {
	if(b.multi > 1)
	    this.multi += (b.multi)
	else
	    this.word.text += b.text.text

	this.points += b.points
    }, this)
    this.multi = this.multi == 0 ? 1 : this.multi
    this.base_points = this.points
    this.points *= this.multi

    // Keep even long words inside our box
    var size = this.word.fontSize.replace(/[^0-9\.]/g, '')
    while (this.word.width > 240)
	this.word.fontSize = --size + "pt"

    this.wordScore.x = this.word.width

    this.wordScore.text = ""
    if(this.multi > 1)
	this.wordScore.text += "x" + this.multi + "="
    this.wordScore.text += this.points
}
