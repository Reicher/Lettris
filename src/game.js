Lettris.Game = function (game) {
};

Lettris.Game.prototype = {
    create: function (game) {

	game.world.setBounds(0, -40, game.width, game.height-80);

	// Enable p2 physics (Needs tinkering around)
	game.physics.startSystem(Phaser.Physics.Arcade);
	game.physics.arcade.gravity.y = 300;
	game.physics.arcade.restitution = 0.05

	this.boxes = game.add.group();
	this.gui = game.add.group();

	this.gui.create(0, game.height-120, 'lower_panel')

	game.time.events.loop(Phaser.Timer.SECOND * 2,
			      this.spawn_random_box,
			      this)
    },

    spawn_random_box: function () {
	var pos = this.game.rnd.integer()%6


	this.boxes.add(new Box(this.game,
			       pos*40))
    },

    update: function () {
	    this.game.physics.arcade.collide(this.boxes);
    },
};
