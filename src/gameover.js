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
	for(var i = 0; i < 3; ++i){
	    this.create_chooser(50+ (i*50), 100)
	}

	var ok = this.game.add.sprite(this.game.world.centerX, 280, 'sprites', 'button')
	ok.anchor.setTo(0.5)
	var ok_text = this.game.add.text(this.game.world.centerX,
					 280,
					 "Submit", style)
	ok_text.anchor.setTo(0.5)

	//this.create_panel()
    },

    create_chooser: function(x, y){
	this.game.add.sprite(x, y, 'sprites', 'arrow')
	this.game.add.sprite(x, y + 50, 'sprites', 'box')

	var style = { font: "18px Verdana"}
	var letter = this.game.add.text(x + 10,
					y + 55,
					"A")
	var flip = this.game.add.sprite(x, y + 140, 'sprites', 'arrow')
	flip.scale.setTo(1, -1)

	return letter
    },

    create_panel: function() {

    },
};
