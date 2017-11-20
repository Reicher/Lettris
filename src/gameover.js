Lettris.GameOver = function(game){

};
Lettris.GameOver.prototype = {
    init: function( gameData ) {
	this.score = gameData.score
	// this.bestWord = gameData.best_word.word
	this.bestWord = "penis"
	this.bestWordScore = gameData.best_word.score
    },

    create: function(){
	console.log("Game over man!")

	var panel = this.game.add.sprite(25, 25, 'sprites', 'big-panel');
	panel.alpha = 0.9

	var style = { font: "20px Verdana"}

	var text = this.game.add.text(this.game.world.centerX,
				      50,
				      "Game Over!",
				      style)
	text.anchor.setTo(0.5)

	var score_text = this.game.add.text(this.game.world.centerX-50,
				      100,
				      this.score,
				      style)
	score_text.anchor.setTo(0.5)

	var best_word_text = this.game.add.text(this.game.world.centerX+50,
				      100,
				      this.bestWord,
				      style)
	best_word_text.anchor.setTo(0.5)


	this.highscore_key = 'Lettris-best-' +
	    this.game.lang + '-' +
	    'Lettris-best-' + this.game.version

	this.highscore = localStorage.getItem(this.highscore_key);

	if(!this.highscore) // first time player
	    this.highscore = []

	if(this.highscore.length < 2 ||
	   this.highscore[2] < this.score)
	    this.input_highscore()
	else
	    this.create_panel()
    },

    input_highscore: function() {
	// Controlls
	this.letter = []
	this.letter[0] = new NickControl(this.game, this.game.world.centerX - 50, 215)
	this.letter[1] = new NickControl(this.game, this.game.world.centerX, 215)
	this.letter[2] = new NickControl(this.game, this.game.world.centerX + 50, 215)

	var style = { font: "20px Verdana"}
	var submit = this.game.add.button(this.game.world.centerX, 295, 'sprites', this.addHighscore, this, 'button', 'button', 'button-pressed')
	submit.anchor.setTo(0.5)
	var submit_text = this.game.add.text(this.game.world.centerX,
					     295,
					     "Submit", style)
	submit_text.anchor.setTo(0.5)
    },
    addHighscore: function(){
	var nick = this.letter[0].letter + this.letter[1].letter + this.letter[2].letter
	console.log(nick)
    },
};
