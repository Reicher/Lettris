Lettris.Preloader = function (game) {
};
Lettris.Preloader.prototype = {
    preload: function () {
	// set background color and preload image
	this.stage.backgroundColor = '#66ccff';

	this.preloadBar = this.add.sprite((Lettris.WIDTH - 311) / 2,
					  (Lettris.HEIGHT - 27) / 2,
					  'preloaderBar');
	this.load.setPreloadSprite(this.preloadBar);

	this.game.load.atlasJSONArray('sprites',
 				      'assets/sprites.png',
 				      'assets/sprites.json')

	// Should later be loaded when choosing language
	this.load.json('let-eng-std', 'assets/lang/eng/letters.json');
	this.load.json('dic-eng-std', 'assets/lang/eng/dictionary.json');
    },
    create: function () {
	// start the MainMenu state
	this.state.start('Game');
    }
};
