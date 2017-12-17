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

	var tent_back = this.game.add.sprite(this.game.world.centerX,
					     220,
					     'sprites',
					     'point-tent')
	tent_back.anchor.setTo(0.5)

	var style = { font: "40px Arial", fill: "#EEEEEE" }
	var score_text = this.game.add.text(this.game.world.centerX,
					    270,
					    this.score,
					    style)
	score_text.anchor.setTo(0.5)
	score_text.fontWeight = 'bold';
	score_text.stroke = '#000000';
	score_text.strokeThickness = 3;

	this.curtain = this.game.add.sprite(this.game.world.centerX,
					     210,
					     'sprites',
					     'point-reveal1')
	this.curtain.anchor.setTo(0.5, 0)
	var curtain_frames = Phaser.Animation.generateFrameNames("point-reveal", 1, 10)
	this.curtain.animations.add('reveal', curtain_frames, 10, false)

	this.show_best_word()

	this.highscore_key = 'Lettris-best-' +
	    this.game.lang

	this.highscore = JSON.parse(localStorage.getItem(this.highscore_key));

	if(!this.highscore) // first time player
	    this.highscore = []

	if(this.highscore.length < 4 ||
	   this.highscore[this.highscore.length-1].score < this.score)
	    this.input_highscore()
	else{
	    this.show_highscore()
	    this.backButton.enable(false)
	    this.game.time.events.add(Phaser.Timer.SECOND * 1.5,
				      function() {this.backButton.enable(true)},
				      this)
	}
    },
    addLight: function(parent, x, y) {
	var light = this.game.add.sprite(x, y, 'sprites', 'lamp-off')
	parent.addChild(light)

	var speed = this.game.rnd.integerInRange(3, 6)
	light.animations.add('blink', ['lamp-off', 'lamp-on'], speed, true);
	light.animations.play('blink');
    },
    show_best_word: function() {
	var style = { font: "30px Arial", fill: "#EEEEEE" }
	var header = this.game.add.text(this.game.world.centerX,
					370,
					"Best Word",
					style)
	header.anchor.setTo(0.5)
	header.fontWeight = 'bold';
	header.stroke = '#000000';
	header.strokeThickness = 3;

	var text = ""
	for(var i = 0; i < this.bestWord.length; ++i){
	    text += this.bestWord[i].letter
	}
	var panel = new MiniPanel(this.game,
				  text,
				  this.game.world.centerX,
				  420)
    },
    input_highscore: function() {
	var firework_sound = this.game.add.audio('firework')
	firework_sound.play()

	this.game.time.events.add(Phaser.Timer.SECOND * 1.5, function() {
	    this.curtain.animations.play('reveal')
	    new Rocket(this.game,
		       {x: this.game.world.centerX, y: 900},
		       {x: 100, y: 100})
	    new Rocket(this.game,
		       {x: this.game.world.centerX, y: 900},
		       {x: 250, y: 150})
	    new Rocket(this.game,
		       {x: this.game.world.centerX, y: 900},
		       {x: 400, y: 75})
	}, this)
	// Controlls
	this.letter = []
	this.letter[0] = new NickControl(this.game, this.game.world.centerX - 100, 590)
	this.letter[1] = new NickControl(this.game, this.game.world.centerX, 590)
	this.letter[2] = new NickControl(this.game, this.game.world.centerX + 100, 590)

	this.submit = new TextButton(this.game, "Submit",
				    this.game.world.centerX, 760,
				    this.addHighscore, this)
	this.submit.enable(false)

	this.game.time.events.add(Phaser.Timer.SECOND * 1.5,
				  function() {this.submit.enable(true)},
				  this)


    },
    addHighscore: function(){
	var nick = this.letter[0].letter + this.letter[1].letter + this.letter[2].letter
	var date = new Date();
	var now = date.getDate() + '/' + (date.getMonth()+1)
	var max_id = Math.max.apply(Math, this.highscore.map(function(entry){return entry.id;}))
	var id = isNaN(max_id) || !isFinite(max_id) ? 0 : max_id+1
	this.highscore.push({nick: nick, score: this.score, date: now, id: id})

	this.highscore.sort(function (a, b) {
	    return a.score < b.score;
	});
	this.highscore = this.highscore.slice(0, 4);

	this.submit.destroy()
	this.letter.forEach(function(letter) {
	    letter.destroy();
	});
	localStorage.setItem(this.highscore_key, JSON.stringify(this.highscore));

	this.show_highscore(id)
    },
    show_highscore: function (id) {
	var style = { font: "25px Verdana", fill: "#FFA90B"}
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
	    if(this.highscore[i].id == id) // if current highscore
		style = { font: "25px Verdana", fill: "#ffd700"}
	    else
		style = { font: "25px Verdana", fill: "#FFA90B"}

	    var y = 550 + (i * 40)
	    this.game.add.text(header.left, y, this.highscore[i].nick, style)
	    this.game.add.text(this.game.world.centerX, y, this.highscore[i].score, style).anchor.setTo(0.5, 0)
	    this.game.add.text(header.right, y, this.highscore[i].date, style).anchor.setTo(1, 0)
	}

	this.backButton = new TextButton(this.game, "Main Menu",
					 this.game.world.centerX, 760,
					 this.leave, this)
    },
    leave: function() {
        this.state.start('MainMenu')
    },
};
