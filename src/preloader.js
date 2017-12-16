Lettris.Preloader = function (game) {};

Lettris.Preloader.prototype = {
    preload: function () {
	// set background color and preload image
	this.stage.backgroundColor = '#000000';

	this.preloadBar = this.add.sprite(this.game.width / 2,
					  this.game.height / 2,
					  'preloaderBar');
	this.preloadBar.anchor.setTo(0.5)
	this.load.setPreloadSprite(this.preloadBar);

	this.game.load.atlasJSONArray('sprites',
 				      'assets/spritesheet.png',
 				      'assets/sprites.json')

	// Sounds
	this.game.load.audio('select', './assets/audio/select_bip.wav')
	this.game.load.audio('clear', './assets/audio/no_bip.wav')
	this.game.load.audio('accept', './assets/audio/accept_bip.wav')
	this.game.load.audio('boom', './assets/audio/explosion.wav')
	this.game.load.audio('smash', './assets/audio/woodbox.mp3')
    },
    create: function () {
	// start the MainMenu state
	this.state.start('Splash');
    }
};
