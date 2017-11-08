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
	var otherStyle = { font: "20px Arial", fill: "#000000"}

	this.game.add.text(this.game.width/2, 40, "Game Over", headerStyle).anchor.setTo(0.5)
	this.game.add.text(this.game.width/2, 100, "Score: " + this.endScore, otherStyle).anchor.setTo(0.5)
	this.game.add.text(this.game.width/2, 150, "Best word:", otherStyle).anchor.setTo(0.5)

	this.game.add.text(this.game.width/2, 170,
			   this.bestWord + " (" + this.bestPoints + ")",
			   otherStyle).anchor.setTo(0.5)

	this.game.time.events.add(Phaser.Timer.SECOND * 2,
				  this.ready_to_leave,
				  this)
    },

    ready_to_leave: function() {
	this.game.input.onDown.add(()=>{
            this.state.start('Game')
	}, this)
    }
};
