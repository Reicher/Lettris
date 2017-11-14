Lettris.GameOver = function(game){

};
Lettris.GameOver.prototype = {
    init: function( gameData ) {
	this.endScore = gameData.score
	this.bestWord = gameData.best_word.word
	this.bestPoints = gameData.best_word.score
    },

    create: function(){
	console.log("Game over man!")

	var graphics = this.game.add.graphics(0, 0);
	graphics.beginFill(0xFFFFFF, 0.7);
	graphics.drawRoundedRect(20, 20, this.game.width-40, 250, 5)
	graphics.endFill();

	var headerStyle = { font: "35px Arial", fill: "#000000"}
	var otherStyle = { font: "17px Arial", fill: "#000000"}

	this.game.add.text(this.game.width/2, 40, "Game Over", headerStyle).anchor.setTo(0.5)
	this.game.add.text(this.game.width/2, 80, "Score: " + this.endScore, otherStyle).anchor.setTo(0.5)

	var bestScore = localStorage.getItem('Lettris-best-' + this.game.lang);
	bestScore = !bestScore ? 0 : bestScore
	this.game.add.text(this.game.width/2, 110, "Highscore: " + bestScore, otherStyle).anchor.setTo(0.5)

	if (this.endScore > bestScore) {
	    localStorage.setItem('Lettris-best-' + this.game.lang, this.endScore);

	    this.game.add.text(this.game.world.centerX,
			       140,
			       "New personal best!",
			       otherStyle).anchor.set(0.5);
	}


	this.game.add.text(this.game.width/2, 200, "Best word:", otherStyle).anchor.setTo(0.5)

	this.game.add.text(this.game.width/2, 220,
			   this.bestWord + " (" + this.bestPoints + ")",
			   otherStyle).anchor.setTo(0.5)

	this.game.time.events.add(Phaser.Timer.SECOND * 2,
				  this.ready_to_leave,
				  this)
    },

    ready_to_leave: function() {
	this.game.input.onDown.add(()=>{
            this.state.start('MainMenu')
	}, this)
    }
};
