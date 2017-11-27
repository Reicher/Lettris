Lettris.Preloader = function (game) {};

Lettris.Preloader.prototype = {
    preload: function () {
	// set background color and preload image
	this.stage.backgroundColor = '#66ccff';

	this.preloadBar = this.add.sprite((Lettris.WIDTH - 311) / 2,
					  (Lettris.HEIGHT - 27) / 2,
					  'preloaderBar');
	this.load.setPreloadSprite(this.preloadBar);

	this.game.load.atlasJSONArray('sprites',
 				      'assets/spritesheet.png',
 				      'assets/sprites.json')

	this.load.audio('select', '/assets/audio/select_bip.wav')
	this.load.audio('clear', '/assets/audio/no_bip.wav')
	this.load.audio('accept', '/assets/audio/accept_bip.wav')
	// this.load.audio('crown', 'assets/audio/Crown.ogg')

    },
    create: function () {
	// start the MainMenu state
	this.state.start('LangMenu');
    }
};
