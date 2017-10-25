Lettris.Game = function (game) {
};

Lettris.Game.prototype = {
    create: function (game) {
	// Enable p2 physics (Needs tinkering around)
	game.physics.startSystem(Phaser.Physics.P2JS);
	game.physics.p2.gravity.y = 300;
	game.physics.p2.restitution = 0.1;

	this.boxes = game.add.group();

	game.time.events.loop(Phaser.Timer.SECOND * 2,
			      this.spawn_random_box,
			      this)
    },

    spawn_random_box: function () {
	var pos = this.game.rnd.integer()%this.game.width

	this.boxes.add(new Box(this.game,
			       pos))
    },

    update: function () {
    },

    render: function() {
    }
};
