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

	this.game.add.sprite(0, 0, 'sprites', 'background');
	var panel = this.game.add.sprite(50, 50, 'sprites', 'big-panel');
	panel.alpha = 0.9

	this.addLight(panel, 4, 3)
	this.addLight(panel, 360, 3)
	this.addLight(panel, 4, 698)
	this.addLight(panel, 360, 698)
	var logo = this.game.add.sprite(this.game.world.centerX, 60, 'sprites', 'game-over')
	logo.anchor.setTo(0.5)

	var style = { font: "35px Verdana", }

	var tent_back = this.game.add.sprite(this.game.world.centerX,
					     240,
					     'sprites',
					     'point-tent')
	tent_back.anchor.setTo(0.5)

	var score_text = this.game.add.text(this.game.world.centerX,
					    290,
					    this.score,
					    style)
	score_text.anchor.setTo(0.5)

	var curtain = this.game.add.sprite(this.game.world.centerX,
					   240,
					   'sprites',
					   'point-reveal1')
	curtain.anchor.setTo(0.5, 0)
	var curtain_frames = Phaser.Animation.generateFrameNames("point-reveal", 1, 10)
	curtain.animations.add('reveal', curtain_frames, 10, false)
	curtain.animations.play('reveal')

	this.show_best_word()

	this.highscore_key = 'Lettris-best-' +
	    this.game.lang + '-' +
	    'Lettris-best-' + this.game.version

	this.highscore = JSON.parse(localStorage.getItem(this.highscore_key));

	if(!this.highscore) // first time player
	    this.highscore = []

	if(this.highscore.length < 5)
	    this.input_highscore()
	else if( this.highscore[this.highscore.length-1].score < this.score )
	    this.input_highscore()
	else{
	    this.show_highscore()
	    this.game.time.events.add(Phaser.Timer.SECOND * 2,
				      this.ready_to_leave,
				      this)
	}

	var rocket1 = new Rocket(this.game,
				 {x: this.game.world.centerX, y: 900},
				 {x: 100, y: 100})
	var rocket2 = new Rocket(this.game,
				 {x: this.game.world.centerX, y: 900},
				 {x: 400, y: 75})
    },
    addLight: function(parent, x, y) {
	var light = this.game.add.sprite(x, y, 'sprites', 'lamp-off')
	parent.addChild(light)

	var speed = this.game.rnd.integerInRange(3, 6)
	light.animations.add('blink', ['lamp-off', 'lamp-on'], speed, true);
	light.animations.play('blink');
    },
    show_best_word: function() {
	var style = { font: "30px Verdana", fill: "#FFA90B"}
	var best_word_header = this.game.add.text(this.game.world.centerX,
						380,
						"Best word:",
						style)
	best_word_header.anchor.setTo(0.5)
	var text = ""
	for(var i = 0; i < this.bestWord.length; ++i){
	    text += this.bestWord[i].letter
	}
	var x = this.game.world.centerX
	var y = 410
	var best_word = this.game.add.text(this.game.world.centerX,
						430,
						text,
						style)
	best_word.anchor.setTo(0.5)
    },
    input_highscore: function() {
	// Controlls
	this.letter = []
	this.letter[0] = new NickControl(this.game, this.game.world.centerX - 100, 590)
	this.letter[1] = new NickControl(this.game, this.game.world.centerX, 590)
	this.letter[2] = new NickControl(this.game, this.game.world.centerX + 100, 590)

	this.submit = this.game.add.button(this.game.world.centerX,
					   760,
					   'sprites',
					   this.addHighscore,
					   this,
					   'button',
					   'button' )
	this.submit.anchor.setTo(0.5)
	this.submit.scale.setTo(0.75)
	this.submit.inputEnabled = false

	this.game.time.events.add(Phaser.Timer.SECOND * 1,
				  function() { this.submit.inputEnabled = true },
				  this)

	var style = { font: "35px Verdana"}
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
	this.highscore = this.highscore.slice(0, 5);

	this.submit.destroy()
	this.letter.forEach(function(letter) {
	    letter.destroy();
	});
	localStorage.setItem(this.highscore_key, JSON.stringify(this.highscore));

	this.show_highscore()
    },
    show_highscore: function () {
	var style = { font: "30px Verdana", fill: "#FFA90B"}
	this.game.add.text(this.game.world.centerX,
			   490,
			   "High score (" + this.game.language + ")",
			   style).anchor.setTo(0.5)
	var header = this.game.add.text(this.game.world.centerX,
					520,
					"Nick  |  Score  |  Date",
					style)
	header.anchor.setTo(0.5)

	let underline = this.game.add.graphics(header.left, header.bottom -3);
	underline.lineStyle(2, 0x995908);
	underline.moveTo(0, 0);
	underline.lineTo(header.width, 0);

	for( var i = 0; i < this.highscore.length; ++i){
	    var y = 550 + (i * 40)
	    this.game.add.text(header.left, y, this.highscore[i].nick, style)
	    this.game.add.text(this.game.world.centerX, y, this.highscore[i].score, style).anchor.setTo(0.5, 0)
	    this.game.add.text(header.right, y, this.highscore[i].date, style).anchor.setTo(1, 0)
	}
    },
    ready_to_leave: function() {
	this.game.input.onDown.add(()=>{
            this.state.start('MainMenu')
	}, this)
    },
};
