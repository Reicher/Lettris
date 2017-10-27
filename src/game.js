Lettris.Game = function (game) {
};

Lettris.Game.prototype = {
    create: function (game) {
	this.boxes = game.add.group();

	this.grid = new Grid(game, 6)

	game.time.events.loop(Phaser.Timer.SECOND * 2,
			      this.spawn_random_box,
			      this)
    },

    spawn_random_box: function () {
	var column = this.game.rnd.integer() % this.grid.columns
	var box = this.grid.addBox(column)
	this.boxes.add(box)
    },

    update: function () {
    },
};
