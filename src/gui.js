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
}

GUI.prototype = Object.create(Phaser.Group.prototype)
GUI.prototype.constructor = GUI

GUI.prototype.clear = function () {
    this.markedList.forEach(function(box) {
	box.mark(false)
    }, this);
    this.markedList = []
    this.word.text = ""

    if(!this.accept_sound.playing)
	this.clear_sound.play()
}

GUI.prototype.accept = function () {

    var word = this.word.text.toLowerCase()

    // Check if word is in dictionary
    if(this.word.text.length < 2 ||
       this.dictionary.indexOf(word) == -1)
	return

    	this.accept_sound.play()

    // Remove all word letters
    var score = 0
    var multi = 1
    var info = []
    this.markedList.forEach(function(box) {
	score += box.points
	multi *= box.multi
	this.gameData.tiles_cleared++
	info.push({letter: box.text.text,
		   key: box.key,
		   points: box.points,
		   multi : box.multi})
	box.remove()
    }, this);

    // Karma is given without multipliers
    this.gameData.karma += score
    score *= multi

    if( score > this.gameData.best_word.score){
	this.gameData.best_word.score = score
	this.gameData.best_word.word = info
    }

    this.gameData.score += score
    this.scoreText.setText(this.gameData.score)

    this.clear()
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

    this.word.text = ""
    this.word.fontSize = "40pt"
    var points = 0
    var multi = 1
    this.markedList.forEach(function(b) {
	if(b.multi > 1)
	    multi *= b.multi
	else
	    this.word.text += b.text.text

	points += b.points
    }, this)
    points *= multi

    // Keep even long words inside our box
    var size = this.word.fontSize.replace(/[^0-9\.]/g, '')
    while (this.word.width > 240)
	this.word.fontSize = --size + "pt"

    this.wordScore.x = this.word.width

    this.wordScore.text = ""
    if(multi > 1)
	this.wordScore.text += "x" + multi + "="
    this.wordScore.text += points
}
