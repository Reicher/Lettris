Lettris.Game = function (game) {
};

Lettris.Game.prototype = {
    create: function (game) {
	console.log("GAME ON!")

	//  Enable p2 physics
	game.physics.startSystem(Phaser.Physics.P2JS);
	game.physics.p2.gravity.y = 300;
	game.physics.p2.restitution = 0.1;

	this.boxes = game.add.group();

	game.time.events.loop(Phaser.Timer.SECOND * 2,
			      this.spawn_random_box,
			      this)
    },

    spawn_random_box: function () {
	var letter = this.game.rnd.pick(['A',
					 'B',
					 'C',
					 'D',
					 'E',
					 'F'])

	var pos = this.game.rnd.integer()%this.game.width

	this.boxes.add(new Box(this.game,
			       letter,
			       pos))
    },

    update: function () {
	//this.game.physics.arcade.collide(this.boxes);
    },

    render: function() {
    }
};
