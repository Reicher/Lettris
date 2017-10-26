Lettris.Game = function (game) {
};

Lettris.Game.prototype = {
    create: function (game) {
	this.boxes = game.add.group();
	this.create_grid(6);

	game.time.events.loop(Phaser.Timer.SECOND * 2,
			      this.spawn_random_box,
			      this)
    },

    create_grid: function(width) {
	var size = this.game.width / width
	var height = Math.floor(this.game.height / size)
	this.grid = []
	for(var i=0; i<width; i++) {
	    this.grid[i] = new Array(height);
	    for(var j=0; j<height; j++) {
		var box = new Box(this.game, 20 + i * 40, 20 + j * 40);
		this.grid[i][j] = box
		this.boxes.add(box)
	    }
	}
	return this.grid
    },

    spawn_random_box: function () {
	var pos = this.game.rnd.integer()%this.game.width

	this.boxes.add(new Box(this.game,
			       pos))
    },

    update: function () {
    },
};
