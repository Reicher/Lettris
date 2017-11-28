Lettris.Splash = function (game) {};

Lettris.Splash.prototype = {
    create: function () {
	console.log("Splash!")

	this.game.add.sprite(0, 0, 'sprites', 'background');

	// Winner of most unreadable code 2017
	this.showText("Trans-neptunian studios\nproudly presents")
	    .onComplete.add(()=>{
		this.startMenu()
	    }, this)

	// Click to start right away
	this.game.input.onDown.add(()=>{
	    this.startMenu()
	}, this)
    },
    showText: function (text) {
	var style = { font: "15px Arial", fill: "#FF00F0", align: "center"}
	var credits = this.game.add.text(this.game.world.centerX,
					 this.game.world.centerY,
					 text,
					 style)
	credits.anchor.setTo(0.5)
	credits.alpha = 0


	var fadeInTween = this.game.add.tween(credits).to({alpha: 1},
							  2000,
							  Phaser.Easing.Linear.None,
							  true)
	var fadeOutTween = this.game.add.tween(credits).to({alpha: 0},
							   2000,
							   Phaser.Easing.Linear.None,
							   false)
	fadeInTween.onComplete.add(()=>{
	    // Wait one second with full alpha
	    this.game.time.events.add(Phaser.Timer.SECOND * 1, ()=>{
		// Start to fade out
		fadeOutTween.start()
	    }, this)
	})
	return fadeOutTween
    },
    startMenu: function () {
	// start the Game state
	this.state.start('MainMenu');
    }
};
