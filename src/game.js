Lettris.Game = function (game) {
};

Lettris.Game.prototype = {
    create: function (game) {
	this.boxes = game.add.group();

	this.grid = new Grid(game, 6, game.width, game.height)

	game.time.events.loop(Phaser.Timer.SECOND * 2,
			      this.spawn_random_box,
			      this)
    },

    spawn_random_box: function () {
	var x = this.game.rnd.integer() % this.grid.columns
	var box = new Box(this.game, x, this.grid.size)
	var y = this.grid.fallTo(x, -1)
	this.grid.cell[x][y] = box
	this.boxes.add(box)

	box.tweenFall(y)
    },

    update: function () {
	// loop through grid, check all non-empty cells for falls.
    },
};
