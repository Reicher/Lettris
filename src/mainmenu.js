Lettris.MainMenu = function (game) {

};
Lettris.MainMenu.prototype = {
    init: function(lang){
	this.lang = lang
    },
    preload: function(){
	if(this.lang == null)
	    return

	var path = 'assets/lang/' + this.lang + '/'
	var l = path + 'letters.json'
	console.log(l)
	this.game.load.json('let', l)
	this.game.load.json('dic', path + 'dictionary.json')
    },
    create: function () {
	this.game.add.sprite(0, 0, 'sprites', 'background');

	this.logo = this.game.add.sprite(this.game.width/2, 100, 'sprites', 'logo')
	this.logo.anchor.setTo(0.5)

	this.play = this.game.add.button(this.game.width/2, 230,
					 'sprites', this.startGame,
					 this, null, 'play', 'play-pressed')
	this.play.anchor.setTo(0.5)

	var style = { font: "10px Arial", fill: "#FF00F0"}
	this.version = this.game.add.text(this.game.width-5,
					  this.game.height-5,
					  "0.5 Beta",
					  style)
	this.version.anchor.setTo(1, 1)
    },

    startGame: function () {
	// start the Game state
	this.logo.destroy()
	this.play.destroy()
	this.state.start('Game', false);
    }
};
