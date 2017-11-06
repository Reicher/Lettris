GUI = function (game, gameData) {
    Phaser.Group.call(this, game);
    this.y = game.height-80

    this.dictionary = game.cache.getJSON('dic-eng-std')
    this.gameData = gameData
    this.markedList = []

    var reset  = this.create(10, 9, 'sprites', 'clear')
    reset.inputEnabled = true;
    reset.events.onInputDown.add(this.clear, this)

    var accept = this.create(75, 9, 'sprites', 'accept')
    accept.inputEnabled = true;
    accept.events.onInputDown.add(this.accept, this)

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

GUI.prototype.accept = function (box) {

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
    this.markedList.forEach(function(b) {
	this.word.text += b.text.text
    }, this)
}
