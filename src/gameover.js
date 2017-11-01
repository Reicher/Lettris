Lettris.GameOver = function(game){

};
Lettris.GameOver.prototype = {
    create: function(){
	console.log("Game over man!")
	this.game.input.onDown.add(()=>{
            this.state.start('Game')
	}, this)
   },
};
