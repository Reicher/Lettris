Lettris.GameOver = function(game){

};
Lettris.GameOver.prototype = {
    init: function( score ) {
	this.endScore = score
    },

    create: function(){
	console.log("Game over man!")

	var scoreText = this.game.add.text(this.game.width/2,
					   this.game.height/2,
					   this.endScore)
	scoreText.anchor.setTo(0.5)

	this.game.input.onDown.add(()=>{
            this.state.start('Game')
	}, this)
   },
};
