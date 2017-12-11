Lettris.Credits = function(game){

};
Lettris.Credits.prototype = {
    create: function(){
	this.game.add.sprite(0, 0, 'sprites', 'background');

	this.logo = this.game.add.sprite(this.game.width/2, 140, 'sprites', 'logo')
	this.logo.anchor.setTo(0.5)

	new TextButton(this.game, "Main Menu",
		       this.game.world.centerX,
		       this.game.world.height-70,
		       this.back,
		       this)
    },
    back: function() {
	this.state.start('MainMenu');
    }
};
