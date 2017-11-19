Lettris.GameOver = function(game){

};
Lettris.GameOver.prototype = {
    init: function( gameData ) {
	this.score = gameData.score
	this.bestWord = gameData.best_word.word
	this.bestWordScore = gameData.best_word.score
    },

    create: function(){
	console.log("Game over man!")

	var panel = this.game.add.sprite(25, 25, 'sprites', 'big-panel');
	panel.alpha = 0.9

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
	var style = { font: "20px Verdana"}

	var text = this.game.add.text(this.game.world.centerX,
				      50,
				      "New High Score!",
				      style)
	text.anchor.setTo(0.5)

	// Controlls
	var letter = []
	letter[0] = new NickControl(this.game, this.game.world.centerX - 50, 215)
	letter[1] = new NickControl(this.game, this.game.world.centerX, 215)
	letter[2] = new NickControl(this.game, this.game.world.centerX + 50, 215)

	var submit = this.game.add.button(this.game.world.centerX, 295, 'sprites', this.up, this, 'button', 'button', 'button-pressed')
	submit.anchor.setTo(0.5)
	var submit_text = this.game.add.text(this.game.world.centerX,
					     295,
					     "Submit", style)
	submit_text.anchor.setTo(0.5)
    },
};
