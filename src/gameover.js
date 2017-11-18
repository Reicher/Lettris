Lettris.GameOver = function(game){

};
Lettris.GameOver.prototype = {
    init: function( gameData ) {
	this.endScore = gameData.score
	this.bestWord = gameData.best_word.word
	this.bestPoints = gameData.best_word.score

	this.highscore_key = 'Test2-Lettris-best-' + this.game.lang + '-' + this.game.version
	this.highscore = JSON.parse(localStorage.getItem(this.highscore_key))
    },

    create: function(){
	console.log("Game over man!")

	if(!this.highscore ||
	   this.highscore.length < 3 ||
	   this.endScore > this.highscore[2].score)
	    this.new_highscore()
	else
	    this.show_highscore()
    },

    new_highscore: function() {
	if(!this.highscore)
	    this.highscore = []

	this.input = this.game.add.inputField(50, 100);
	this.input.blockInput = false
	this.input.startFocus()
	PhaserInput.onKeyboardOpen.addOnce(function() {
	    this.game.scale.refresh()
	});
	this.record_text = this.game.add.text(this.game.world.centerX,
					      this.input.y - 25,
					      "New HighScore! \nNick? ",
					      {
						  font: "20px Verdana",
						  fill: "#FFFFFF"
					      })
	this.record_text.anchor.setTo(0.5)

	this.submit = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER)
	this.submit.onDown.addOnce(this.submit_score, this);
    },

    submit_score: function() {
	this.highscore.push({nick: this.input.value, score: this.endScore})

	this.highscore.sort(function(a,b){
            return (a.score < b.score);
        })
	this.highscore = this.highscore.splice(0, 3)

	localStorage.setItem(this.highscore_key, JSON.stringify(this.highscore));

	this.record_text.destroy()
	this.input.endFocus()
	this.input.destroy()
	this.show_highscore()
    },

    show_highscore: function() {
	var graphics = this.game.add.graphics(0, 0);
	graphics.beginFill(0xFFFFFF, 0.7);
	graphics.drawRoundedRect(20, 20, this.game.width-40, 300, 5)
	graphics.endFill();

	var headerStyle = { font: "35px Arial", fill: "#000000"}
	var otherStyle = { font: "17px Arial", fill: "#000000"}

	this.game.add.text(this.game.width/2, 40, "Game Over", headerStyle).anchor.setTo(0.5)
	this.game.add.text(this.game.width/2, 80, "Score: " + this.endScore, otherStyle).anchor.setTo(0.5)

	this.game.add.text(this.game.width/2,
			   120,
			   "Nick | Score",
			   otherStyle).anchor.setTo(0.5)

	for (var i = 0; i <  this.highscore.length; ++i)
	    this.game.add.text(this.game.width/2,
			       150 + (25*i),
			       this.highscore[i].nick + ": " +  this.highscore[i].score,
			       otherStyle).anchor.setTo(0.5)

	this.game.add.text(this.game.width/2,
			   240,
			   "Best word:" + this.bestWord +
			   " (" + this.bestPoints + ")", otherStyle).anchor.setTo(0.5)

	this.game.time.events.add(Phaser.Timer.SECOND * 1,
				  this.ready_to_leave,
				  this)
    },

    ready_to_leave: function() {
	this.game.input.onDown.add(()=>{
            this.state.start('MainMenu')
	}, this)
    },

    update: function() {
	if(this.input)
	    this.input.update();
    }
};
