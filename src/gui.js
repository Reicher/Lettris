GUI = function (game, gameData) {
    Phaser.Group.call(this, game);
    this.y = game.height-80

    this.dictionary = game.cache.getJSON('dic-eng-std')
    this.gameData = gameData
    this.markedList = []

    this.add(game.add.button(10, 9, 'sprites', this.clear, this, 'clear', 'clear'))
    this.add(game.add.button(75, 9, 'sprites', this.accept, this, 'accept', 'accept'))

    var panel  = this.create(0, 0, 'sprites', 'panel')

    var style = { font: "15px Arial", align: "center" };
    this.scoreText = game.add.text(game.world.centerX,
				   14,
				   "0",
				   style)
    this.scoreText.anchor.setTo(0.5)
    this.add(this.scoreText)

    this.word = game.add.text(game.world.centerX-30,
    			      35)
    this.add(this.word)

    var ws_style = { font: "10px Arial", align: "center" };
    this.wordScore = game.add.text(5, -5, "0", ws_style)
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
}

GUI.prototype.accept = function () {

    var word = this.word.text.toLowerCase()

    // Check if word is in dictionary
    if(this.word.text.length < 2 ||
       this.dictionary.indexOf(word) == -1)
	return

    // Remove all word letters
    var score = 0
    this.markedList.forEach(function(box) {
	score += box.points
	this.gameData.tiles_cleared++
	box.remove()
    }, this);

    if( score > this.gameData.best_word.score){
	this.gameData.best_word.score = score
	this.gameData.best_word.word = word
    }

    this.gameData.karma += score - 6
    this.gameData.score += score
    this.scoreText.setText(this.gameData.score)

    this.clear()
}

GUI.prototype.box_clicked = function (box) {
    if( box.marked )
	this.markedList.push(box)
    else{
	var index = this.markedList.findIndex(b => b.id == box.id)
	this.markedList.splice(index, 1)
    }

    this.word.text = ""
    var points = 0
    this.markedList.forEach(function(b) {
	this.word.text += b.text.text
	points += b.points
    }, this)
    this.wordScore.x = this.word.width
    this.wordScore.text = points
}
