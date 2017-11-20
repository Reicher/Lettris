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

	this.game.add.sprite(0, 0, 'sprites', 'background');
	var panel = this.game.add.sprite(25, 25, 'sprites', 'big-panel');
	panel.alpha = 0.9

	var logo = this.game.add.sprite(this.game.world.centerX, 70, 'sprites', 'game-over')
	logo.anchor.setTo(0.5)

	var style = { font: "20px Verdana"}

	var rotbox = this.game.add.sprite(this.game.world.centerX-40, 170, 'sprites', 'big-box')
	rotbox.anchor.setTo(0.5)
	this.game.add.tween(rotbox).to( { angle:  + 360 }, 1500, Phaser.Easing.Default, true, 0, -1)
	var score_text = this.game.add.text(this.game.world.centerX-40,
				      170,
				      this.score,
				      style)
	score_text.anchor.setTo(0.5)

	// Best Word
	// var best_word_text = this.game.add.text(this.game.world.centerX+50,
	// 			      170,
	// 			      this.bestWord,
	// 			      style)
	// best_word_text.anchor.setTo(0.5)


	this.highscore_key = 'Lettris-best-' +
	    this.game.lang + '-' +
	    'Lettris-best-' + this.game.version

	this.highscore = JSON.parse(localStorage.getItem(this.highscore_key));

	if(!this.highscore) // first time player
	    this.highscore = []

	if(this.highscore.length < 4 ||
	   this.highscore[2] < this.score)
	    this.input_highscore()
	else
	    this.show_highscore()

    },
    input_highscore: function() {
	// Controlls
	this.letter = []
	this.letter[0] = new NickControl(this.game, this.game.world.centerX - 50, 270)
	this.letter[1] = new NickControl(this.game, this.game.world.centerX, 270)
	this.letter[2] = new NickControl(this.game, this.game.world.centerX + 50, 270)

	var style = { font: "20px Verdana"}
	this.submit = this.game.add.button(this.game.world.centerX,
					   360,
					   'sprites',
					   this.addHighscore,
					   this,
					   'button',
					   'button' )
	this.submit.anchor.setTo(0.5)

	var submit_text = this.game.add.text(0, 0, "Submit", style)
	submit_text.anchor.setTo(0.5)
	this.submit.addChild(submit_text);
    },
    addHighscore: function(){
	var nick = this.letter[0].letter + this.letter[1].letter + this.letter[2].letter
	var date = new Date();
	var now = date.getDate() + '/' + (date.getMonth()+1)
	this.highscore.push({nick: nick, score: this.score, date: now})

	this.highscore.sort(function (a, b) {
	    return a.score < b.score;
	});
	this.highscore.slice(0, 4);

	this.submit.destroy()
	this.letter.forEach(function(letter) {
	    letter.destroy();
	});
	localStorage.setItem(this.highscore_key, JSON.stringify(this.highscore));

	this.show_highscore()
    },
    show_highscore: function () {
	var style = { font: "15px Verdana"}
	this.game.add.text(this.game.world.centerX,
			   270,
			   "High score (" + this.game.language + ")",
			   style).anchor.setTo(0.5)
	var header = this.game.add.text(this.game.world.centerX,
					290,
				      "Nick    |    Score    |    Date",
					style)
	header.anchor.setTo(0.5)

	let underline = this.game.add.graphics(header.left, header.bottom -3);
	underline.lineStyle(2, 0x000000);
	underline.moveTo(0, 0);
	underline.lineTo(header.width, 0);

	for( var i = 0; i < this.highscore.length; ++i){
	    this.game.add.text(header.left, 300 + (i * 20), this.highscore[i].nick, style)
	    this.game.add.text(this.game.world.centerX, 300 + (i * 20), this.highscore[i].score, style).anchor.setTo(0.5, 0)
	    this.game.add.text(header.right, 300 + (i * 20), this.highscore[i].date, style).anchor.setTo(1, 0)
	}
	this.game.time.events.add(Phaser.Timer.SECOND * 2,
				  this.ready_to_leave,
				  this)
    },
    ready_to_leave: function() {
	this.game.input.onDown.add(()=>{
            this.state.start('MainMenu')
	}, this)
    },
};
