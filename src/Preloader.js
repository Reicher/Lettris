Lettris.Preloader = function (game) {
	Lettris.WIDTH = 240;
	Lettris.HEIGHT = 400;
};
Lettris.Preloader.prototype = {
	preload: function () {
		// set background color and preload image
		this.stage.backgroundColor = '#000000';
		this.preloadBar = this.add.sprite((Lettris.WIDTH - 311) / 2, (Lettris.HEIGHT - 27) / 2, 'preloaderBar');

		this.load.setPreloadSprite(this.preloadBar);
	},
	create: function () {
		// start the MainMenu state
		this.state.start('Game');
	}
};
