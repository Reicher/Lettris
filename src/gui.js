GUI = function (game, gameData) {
    Phaser.Group.call(this, game);

    this.dictionary = game.cache.getJSON('dic-eng-std')
    this.gameData = gameData
    this.markedList = []

    this.boxClicked = new Phaser.Signal()
    this.boxClicked.add(this.handle_box_click, this)

    var panel = this.create(0, game.height-80, 'panel')

    var style = { font: "15px Arial", align: "center" };
    this.scoreText = game.add.text(game.world.centerX,
				   game.height-65,
				   "0",
				   style)
    this.scoreText.anchor.setTo(0.5)
    this.add(this.scoreText)

    this.word = game.add.text(game.world.centerX,
    			      game.height-30)
    this.word.anchor.setTo(0.5)
    this.word.inputEnabled = true;
    this.word.events.onInputDown.add(this.handle_word_click, this)
    this.add(this.word)
}

GUI.prototype = Object.create(Phaser.Group.prototype)
GUI.prototype.constructor = GUI

GUI.prototype.handle_word_click = function (box) {

    // Check if word is in dictionary
    if(this.word.text.length < 2 ||
       this.dictionary.indexOf(this.word.text.toLowerCase()) == -1)
	return

    // Remove all word letters
    var score = 0
    this.markedList.forEach(function(box) {
	score += box.points
	box.remove()
    }, this);

    this.gameData.karma += (-7 + score)
    this.gameData.score += score
    this.markedList = []
    this.word.text = ""
    this.scoreText.setText(this.gameData.score)
}

GUI.prototype.handle_box_click = function (box) {
    // A little ugly to check x/y positions? but it works :D
    var id = this.markedList.findIndex(b => (b.x == box.x &&
					     b.y == box.y))
    if( id == -1 )
	this.markedList.push(box)
    else
	this.markedList.splice(id, 1)

    this.word.text = ""
    this.markedList.forEach(function(b) {
	this.word.text += b.text.text
    }, this)
}
