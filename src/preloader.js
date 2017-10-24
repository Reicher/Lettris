Lettris.Preloader = function (game) {
};
Lettris.Preloader.prototype = {
    preload: function () {
	// set background color and preload image
	this.stage.backgroundColor = '#66ccff';

	//this.preloadBar = this.add.sprite((Lettris.WIDTH - 311) / 2, (Lettris.HEIGHT - 27) / 2, 'preloaderBar');
	//this.load.setPreloadSprite(this.preloadBar);

	this.load.image('box', 'assets/box.png');

    },
    create: function () {
	// start the MainMenu state
	this.state.start('Game');
    }
};
