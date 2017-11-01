Lettris.Game = function (game) {
};

Lettris.Game.prototype = {
    create: function (game) {

	// -1 and width+2 in x-axis to prevent "wall friction"
	game.world.setBounds(0, 0, game.width, game.height-80);

	game.physics.startSystem(Phaser.Physics.P2JS);
	game.physics.p2.setBoundsToWorld(true, true, false, true)
	game.physics.p2.gravity.y = 300;
	game.physics.p2.restitution = 0.05

	this.boxClicked = new Phaser.Signal()

	// Create GUI
	this.gui = new GUI(game, this.boxClicked)

	this.boxes = game.add.group();

	// Start box-droping loop
	game.time.events.loop(Phaser.Timer.SECOND * 2,
			      this.spawn_random_box, this)
    },

    spawn_random_box: function () {
	var widthHalf = this.game.cache.getImage('box').width / 2;
	var pos = this.game.rnd.integerInRange(
	    widthHalf + 1, this.game.width - widthHalf - 1);

	this.boxes.add(new Box(this.game,
			       pos,
			       this.boxClicked))
    },

    update: function () {
    },
};
