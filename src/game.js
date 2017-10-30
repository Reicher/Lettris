Lettris.Game = function (game) {
};

Lettris.Game.prototype = {
    create: function (game) {

	game.world.setBounds(0, -40, game.width, game.height-80);

	game.physics.startSystem(Phaser.Physics.P2JS);
	game.physics.p2.gravity.y = 300;
	game.physics.p2.restitution = 0.5

	this.boxClicked = new Phaser.Signal()

	// Create GUI
	this.gui = new GUI(game, this.boxClicked)

	this.boxes = game.add.group();

	// Start box-droping loop
	game.time.events.loop(Phaser.Timer.SECOND * 2,
			      this.spawn_random_box,
			      this)
    },

    spawn_random_box: function () {
	var pos = this.game.rnd.integer()%6

	this.boxes.add(new Box(this.game,
			       pos*40,
			       this.boxClicked))
    },

    update: function () {
    },
};
