Lettris.GameOver = function(game){

};
Lettris.GameOver.prototype = {
    init: function( gameData ) {
	this.score = gameData.score
	this.bestWord = gameData.best_word.word
	//this.bestWord = "penis"
	this.bestWordScore = gameData.best_word.score
    },

    create: function(){
	console.log("Game over man!")

	this.game.add.sprite(0, 0, 'sprites', 'background');
	var panel = this.game.add.sprite(50, 50, 'sprites', 'big-panel');
	panel.alpha = 0.9

	var logo = this.game.add.sprite(this.game.world.centerX, 120, 'sprites', 'game-over')
	logo.anchor.setTo(0.5)

	var style = { font: "25px Verdana"}

	var rotbox = this.game.add.sprite(this.game.world.centerX, 260, 'sprites', 'big-box')
	rotbox.anchor.setTo(0.5)
	rotbox.scale.setTo(0.75)
	this.game.add.tween(rotbox).to( { angle:  + 360 }, 1500, Phaser.Easing.Default, true, 0, -1)
	var score_text = this.game.add.text(this.game.world.centerX,
				      260,
				      this.score,
				      style)
	score_text.anchor.setTo(0.5)

	this.show_best_word()

	this.highscore_key = 'Lettris-best-' +
	    this.game.lang + '-' +
	    'Lettris-best-' + this.game.version

	this.highscore = JSON.parse(localStorage.getItem(this.highscore_key));

	if(!this.highscore) // first time player
	    this.highscore = []

	if(this.highscore.length < 5 ||
	   this.highscore[this.highscore.length-1] < this.score)
	    this.input_highscore()
	else
	    this.show_highscore()

    },
    show_best_word: function() {
	var style = { font: "25px Verdana"}
	var best_word_header = this.game.add.text(this.game.world.centerX,
						350,
						"Best word:",
						style)
	best_word_header.anchor.setTo(0.5)

	var boxes = this.game.add.group();
	for(var i = 0; i < this.bestWord.length; ++i){
	    var info = this.bestWord[i]
	    var x = this.game.world.centerX + 40 -
		(this.bestWord.length/2 * 80) + i * 80
	    var y = 400

	    if(info.multi > 1)
		var box = new MultiBox(this.game, i, info.multi, x, y)
	    else
		var box = new Box(this.game, i, info.key,
				  info.letter, info.points, x, y)
	    box.body.static = true;
	    box.scale.setTo(0.75)
	    boxes.add(box)
	}
    },
    input_highscore: function() {
	// Controlls
	this.letter = []
	this.letter[0] = new NickControl(this.game, this.game.world.centerX - 100, 570)
	this.letter[1] = new NickControl(this.game, this.game.world.centerX, 570)
	this.letter[2] = new NickControl(this.game, this.game.world.centerX + 100, 570)

	var style = { font: "35px Verdana"}
	this.submit = this.game.add.button(this.game.world.centerX,
					   730,
					   'sprites',
					   this.addHighscore,
					   this,
					   'button',
					   'button' )
	this.submit.anchor.setTo(0.5)
	this.submit.scale.setTo(0.75)

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
	this.highscore.slice(0, 5);

	this.submit.destroy()
	this.letter.forEach(function(letter) {
	    letter.destroy();
	});
	localStorage.setItem(this.highscore_key, JSON.stringify(this.highscore));

	this.show_highscore()
    },
    show_highscore: function () {
	var style = { font: "30px Verdana"}
	this.game.add.text(this.game.world.centerX,
			   500,
			   "High score (" + this.game.language + ")",
			   style).anchor.setTo(0.5)
	var header = this.game.add.text(this.game.world.centerX,
					540,
				      "Nick  |  Score  |  Date",
					style)
	header.anchor.setTo(0.5)

	let underline = this.game.add.graphics(header.left, header.bottom -3);
	underline.lineStyle(2, 0x000000);
	underline.moveTo(0, 0);
	underline.lineTo(header.width, 0);

	for( var i = 0; i < this.highscore.length; ++i){
	    this.game.add.text(header.left, 560 + (i * 40), this.highscore[i].nick, style)
	    this.game.add.text(this.game.world.centerX, 560 + (i * 40), this.highscore[i].score, style).anchor.setTo(0.5, 0)
	    this.game.add.text(header.right, 5600 + (i * 40), this.highscore[i].date, style).anchor.setTo(1, 0)
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
